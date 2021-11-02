const express = require('express')
const app = express()
const port = 3011
const session = require("express-session")
const elastic = require("./myModules/elastic")
const ping = require('ping')
const fs = require("fs")
const mkdirp = require('mkdirp')
const { TwingEnvironment, TwingLoaderFilesystem } = require('twing');
let loader = new TwingLoaderFilesystem('./admin');
let twing = new TwingEnvironment(loader);

const request = require('axios')

const db = require('./myModules/mongodb');

const mobilMi = require("./myModules/ismobile")

const md5 = require("./myModules/md5")

const bodyParser = require('body-parser');

const sizeOf = require('object-sizeof');

const nodemailer = require('nodemailer');

const beautify = require("./myModules/beautifier");

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public_html/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage })

var fileFilter = function (req, file, cb) {
    var typeArray = file.mimetype.split('/');
    var fileType = typeArray[1];
    if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png') {
        cb(null, true);
    } else {
        cb("Hatalı Dosya", false)
    }
}

function loginControl(req) {
    if (req.session.mail) {
        return { status: true, user: req.session.mail }
    } else {
        return false
    }
}

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}))


// - Login
app.get("/login", (req, res) => {
    if (req.session.mail) {
        res.redirect('/dashboard')
    } else {
        twing.render("login.html", {}).then(output => {
            res.send(output)
        })
    }
})

app.post("/login_user", (req, res) => {
    db.find({ userMail: req.body.mail, userPassword: req.body.password }, "users").then(reply => {
        if (reply.length > 0) {
            req.session.mail = req.body.mail
            req.session.user = reply[0].userName
            res.send("ok")
        } else {
            res.send("error")
        }
    })
})

app.use('/*', function (req, res, next) {
    if (!loginControl(req).status) {
        if (req.method == "POST") {
            res.redirect(307, "/kullanicigirisiyapilmali")
        } else {
            res.redirect("/login")
        }
    } else {
        next()
    }
})
// - Login End

// Gets

app.get("/", (req, res) => {
    res.redirect("/dashboard")
})

app.get("/dashboard", (req, res) => {
    db.find({}, "category").then(replyCat => {
        db.find({}, "about").then(replyAbout => {
            db.find({}, "site").then(replySite => {
                db.find({}, "slider").then(slider => {
                    db.find({}, "product").then(replyProduct => {
                        db.find({}, "partnerCompany").then(partnerCompany => {
                            twing.render("dashboard.html", { partnerCompanies: partnerCompany, user: req.session.user, categories: replyCat, about: replyAbout[0], site: replySite[0], products: replyProduct, slider: slider }).then(outpost => {
                                res.send(outpost)
                            })
                        })
                    })
                })

            })
        })
    })
})

//- Category
app.get("/category", (req, res) => {
    db.findOrderBy({}, "th", "category").then(reply => {
        twing.render("category.html", { categories: reply }).then(output => {
            res.send(output)
        })
    })
})
// - Category End

//- Category
app.get("/product", (req, res) => {
    db.findOrderBy({ status: "main" }, "th", "category").then(reply => {
        db.findOrderBy({}, "th", "product").then(replyProducts => {
            twing.render("products.html", { categories: reply, products: replyProducts }).then(output => {
                res.send(output)
            })
        })
    })
})
// - Category End

// - Users
app.get("/users", (req, res) => {
    db.find({}, "users").then(reply => {
        twing.render("users.html", { users: reply }).then(output => {
            res.send(output)
        })
    })
})
// - Users End
// Gets End

// Posts
// - Reload
app.post("/reload", (req, res) => {
    request.post("https://volkanmarin.com/reload", req.body).then(data => {
        if (data = "ok") {
            res.send("ok")
        } else {
            res.send("Hata")
        }
    })
})

// - Reload End

// - Logout
app.post("/logout", (req, res) => {
    req.session.destroy();
    res.send("Quit");
})
// - Logout End

// - Category
app.post("/listcategory", (req, res) => {
    if (req.body.categoryId == "empty") {
        res.send("Kategori seçiniz")
    } else {
        var categoryId = Number(req.body.categoryId)
        db.find({ parentId: categoryId }, "category").then(reply => {
            if (reply.length > 0) {
                twing.render("parts/category/_secondsub.html", { categories: reply }).then(output => {
                    res.send(output)
                })
            } else {
                res.send("hata")
            }
        })
    }
})

app.post("/savecategory", (req, res) => {
    if (req.body.categoryStatus == "main") {
        db.write({
            name: req.body.categoryName,
            upperName: beautify.upper(req.body.categoryName),
            lowerName: beautify.lower(req.body.categoryName),
            id: Date.now(),
            th: Number(req.body.categoryNumber),
            status: "main"
        }, "category").then(reply => {
            if (reply.insertedCount > 0) {
                res.send("Kategoriniz Kaydedildi")
            } else {
                res.send("Hata")
            }
        })
    } else if (req.body.categoryStatus == "mid") {
        db.write({
            name: req.body.categoryName,
            upperName: beautify.upper(req.body.categoryName),
            lowerName: beautify.lower(req.body.categoryName),
            id: Date.now(),
            th: Number(req.body.categoryNumber),
            parentId: Number(req.body.parentId),
            status: "mid"
        }, "category").then(reply => {
            if (reply.insertedCount > 0) {
                res.send("Kategoriniz Kaydedildi")
            } else {
                res.send("Hata")
            }
        })
    } else if (req.body.categoryStatus == "last") {
        db.write({
            name: req.body.categoryName,
            upperName: beautify.upper(req.body.categoryName),
            lowerName: beautify.lower(req.body.categoryName),
            id: Date.now(),
            th: Number(req.body.categoryNumber),
            parentId: Number(req.body.parentId),
            parentMainId: Number(req.body.parentMainId),
            status: "last"
        }, "category").then(reply => {
            if (reply.insertedCount > 0) {
                res.send("Kategoriniz Kaydedildi")
            } else {
                res.send("Hata")
            }
        })
    }
})

function deleteProducts(arr, total, n) {
    if (n < total) {
        db.deleteIdDocument(arr[n]._id, "product").then(d => {
            n++
            deleteProducts(arr, total, n)
        })
    } else {
        console.log("Hepsi Silindi - Ürünler")
    }
}

function deleteProductsAll(arr) {
    arr.forEach(e => {
        db.find({ "categoryHierarchy.last.id": e.id }, "product").then(r => {
            deleteProducts(r, r.length, 0)
        })
    });
}

function deleteCategory(arr, total, n) {
    if (n < total) {
        db.deleteIdDocument(arr[n]._id, "category").then(d => {
            n++
            deleteCategory(arr, total, n)
        })
    } else {
        console.log("Hepsi Silindi")
    }
}

app.post("/deletecategory", (req, res) => {
    var id = Number(req.body.categoryId)
    db.find({ $or: [{ parentId: id }, { parentMainId: id }] }, "category").then(replyCats => {
        if (replyCats.length > 0) {
            res.send("ask")
        } else {
            db.find({ "categoryHierarchy.last.id": id }, "product").then(pr => {
                deleteProducts(pr, pr.length, 0)
            })
            db.deleteFindDocument(id, "id", "category").then(reply => {
                if (reply.deletedCount > 0) {
                    res.send("ok")
                } else {
                    res.send("hata")
                }
            })
        }
    })
})

app.post("/deletecategorycolletion", (req, res) => {
    var id = Number(req.body.categoryId)
    var deleteCategoryList = []

    db.find({ $or: [{ parentId: id }, { parentMainId: id }, { id: id }] }, "category").then(deleteList => {
        deleteCategoryList = deleteList
        var lastCats = deleteCategoryList.filter(e => e.status == "last")
        deleteCategory(deleteCategoryList, deleteCategoryList.length, 0)
        deleteProductsAll(lastCats, lastCats.length, 0)
        res.send("Silindi")
    })
})

function changeProducts(arr, total, n, name, status) {
    if (n < total) {
        var tempName = "categoryHierarchy." + status + ".name"
        var tempLowername = "categoryHierarchy." + status + ".lowerName"
        db.updateId(arr[n]._id, {
            [tempName]: name,
            [tempLowername]: beautify.lower(name)
        }, "product").then(d => {
            n++
            changeProducts(arr, total, n)
        })
    } else {
        console.log("Ürünler Düzeltildi.")
    }
}

function findProduct(status, name, id) {
    var productList = []
    if (status == "main") {
        db.find({ "categoryHierarchy.main.id": id }, "product").then(replyz => {
            if (replyz.length > 0) {
                productList = replyz
                changeProducts(productList, productList.length, 0, name, status)
            }
        })
    } else if (status == "mid") {
        db.find({ "categoryHierarchy.mid.id": id }, "product").then(replyx => {
            if (replyx.length > 0) {
                productList = replyx
                changeProducts(productList, productList.length, 0, name, status)
            }
        })
    } else {
        db.find({ "categoryHierarchy.last.id": id }, "product").then(replyy => {
            if (replyy.length > 0) {
                productList = replyy
                changeProducts(productList, productList.length, 0, name, status)
            }
        })
    }
}

// app.post("/changecategory", (req, res) => {
//     var id = Number(req.body.categoryId)
//     var status = req.body.categoryStatus
//     delete req.body.categoryId
//     db.update({ id: id }, {
//         name: req.body.name,
//         lowerName: beautify.lower(req.body.name),
//         upperName: beautify.upper(req.body.name),
//         th: Number(req.body.th)
//     }, "category").then(reply => {
//         if (reply.modifiedCount > 0) {
//             findProduct(status, req.body.name, id)
//             res.send("ok")
//         } else {
//             res.send("hata")
//         }
//     })
// })

app.post("/openmodal2", (req, res) => {
    var categoryId = Number(req.body.categoryId)
    db.find({ id: categoryId }, "category").then(reply => {
        if (reply.length > 0) {
            twing.render("parts/category/_modal.html", { category: reply[0], system: true }).then(output => {
                res.send(output)
            })
        } else {
            twing.render("parts/category/_modal.html", { system: false }).then(output => {
                res.send(output)
            })
        }
    })
})
// - Category End

// - Product
app.post("/productlistsubcategory", (req, res) => {
    if (req.body.type == "modal") {
        if (req.body.categoryId == "empty") {
            res.send("Kategori seçiniz")
        } else {
            var categoryId = Number(req.body.categoryId)
            db.find({ id: categoryId }, "category").then(reply => {
                if (reply.length > 0) {
                    twing.render("parts/product/_subcategoryModal.html", { categories: reply[0].subs }).then(output => {
                        res.send(output)
                    })
                } else {
                    res.send("hata")
                }
            })
        }
    } else {
        if (req.body.categoryId == "empty") {
            res.send("Kategori seçiniz")
        } else {
            var categoryId = Number(req.body.categoryId)
            db.find({ parentId: categoryId }, "category").then(reply => {
                if (reply.length > 0) {
                    twing.render("parts/product/_subcategory.html", { categories: reply }).then(output => {
                        res.send(output)
                    })
                } else {
                    res.send("hata")
                }
            })
        }
    }
})

app.post("/productlistlastcategory", (req, res) => {
    if (req.body.type == "modal") {
        if (req.body.categoryId == "empty" || req.body.mainCategoryId == "empty") {
            res.send("Kategori seçiniz")
        } else {
            var categoryId = Number(req.body.categoryId)
            var mainCategoryId = Number(req.body.mainCategoryId)
            db.find({ id: mainCategoryId }, "category").then(reply => {
                var mainSubs = reply[0].subs
                var lastCat
                for (let i = 0; i < mainSubs.length; i++) {
                    if (mainSubs[i].id == categoryId) {
                        lastCat = mainSubs[i].subs
                    }
                }
                if (lastCat.length > 0) {
                    twing.render("parts/product/_lastcategoryModal.html", { categories: lastCat }).then(output => {
                        res.send(output)
                    })
                } else {
                    res.send("hata")
                }
            })
        }
    } else {
        if (req.body.categoryId == "empty" || req.body.mainCategoryId == "empty") {
            res.send("Kategori seçiniz")
        } else {
            var categoryId = Number(req.body.categoryId)
            db.find({ parentId: categoryId }, "category").then(reply => {
                if (reply.length > 0) {
                    twing.render("parts/product/_lastcategory.html", { categories: reply }).then(output => {
                        res.send(output)
                    })
                } else {
                    res.send("hata")
                }
            })
        }
    }
})

function getPathNames(arr) {
    var tempArr = []
    arr.forEach(e => {
        tempArr.push({
            path: e.path,
            name: e.filename
        })
    });
    return tempArr
}

app.post("/saveproduct", upload.array("productImages", 15), (req, res) => {
    var tempImages = getPathNames(req.files)
    console.log(req.body)
    if (req.body.selectMainCategory == "empty" || req.body.selectSubCategory == "empty" || req.body.selectLastCategory == "empty") {
        res.send("Kategori seçiniz")
    } else if (req.body.lastName == "undefined") {
        res.send("Hata /270")
    } else {
        var newProduct = {
            name: req.body.newProductName,
            upperName: beautify.upper(req.body.newProductName),
            lowerName: beautify.lower(req.body.newProductName),
            lowerNameImage: beautify.lower(req.body.newProductName),
            id: Date.now(),
            th: req.body.newProductNumber,
            comment: req.body.newProductComment,
            description: req.body.ckEditor,
            categoryHierarchy: {
                main: {
                    id: Number(req.body.selectMainCategory),
                    name: req.body.mainName,
                    lowerName: beautify.lower(req.body.mainName)
                },
                mid: {
                    id: Number(req.body.selectSubCategory),
                    name: req.body.midName,
                    lowerName: beautify.lower(req.body.midName)
                },
                last: {
                    id: Number(req.body.selectLastCategory),
                    name: req.body.lastName,
                    lowerName: beautify.lower(req.body.lastName)
                }
            },
            images: []
        }
        var made = mkdirp.sync('../public_html/productimages/' + [newProduct.lowerName])

        var newProductImages = []
        tempImages.forEach(img => {
            var oldPath = img.path
            var newPath = '../public_html/productimages/' + [newProduct.lowerName] + '/' + img.name
            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err
                newProductImages.push({
                    name: img.name,
                    path: newPath
                })
            })
        });

        newProduct.images = newProductImages

        db.find({ lowerName: newProduct.lowerName }, "product").then(reply => {
            if (reply.length > 0) {
                res.send("Aynı isme sahip başka bir ürün var.")
            } else {
                db.write(newProduct, "product").then(replyWrite => {
                    if (replyWrite.insertedCount > 0) {
                        res.send("ok")
                    } else {
                        res.send("hata")
                    }
                })
            }
        })
    }
})

app.post("/openmodal", (req, res) => {
    var productId = Number(req.body.productId)
    db.find({ id: productId }, "product").then(reply => {
        if (reply.length > 0) {
            twing.render("parts/product/_modal.html", { product: reply[0], system: true }).then(output => {
                res.send(output)
            })
        } else {
            twing.render("parts/product/_modal.html", { system: false }).then(output => {
                res.send(output)
            })
        }
    })
})

app.post("/changecategory", (req, res) => {
    var productId = Number(req.body.productId)
    var productCategory
    db.find({}, "category").then(reply => {
        if (reply.length > 0) {
            db.find({ id: productId }, "product").then(replyProduct => {
                productCategory = replyProduct[0].categoryIdHierarchy
                twing.render("parts/product/_modalchangecategory.html", { categories: reply }).then(output => {
                    res.send(output)
                })
            })
        } else {
            res.send("hata")
        }
    })
})

app.post("/changeProduct", (req, res) => {
    var productId = Number(req.body.id)
    if (req.body.changeCategory == true) {
        if ((req.body.category.mainId == "empty" || req.body.category.subId == "empty" || req.body.category.lastId == "empty")) {
            res.send("Kategori seçiniz")
        } else {
            productInfo = {
                name: req.body.name,
                upperName: beautify.upper(req.body.name),
                lowerName: beautify.lower(beautify.upper(req.body.name)),
                th: req.body.th,
                comment: req.body.comment,
                description: req.body.description,
                category: {
                    categoryId: Number(req.body.category.lastId),
                    categoryIdHierarchy: {
                        main: Number(req.body.category.mainId),
                        sub: Number(req.body.category.subId),
                        last: Number(req.body.category.lastId),
                    },
                    categoryName: req.body.category.lastName,
                    categoryNameHierarchy: {
                        main: req.body.category.mainName,
                        sub: req.body.category.subName,
                        last: req.body.category.lastName
                    }
                }
            }
            db.update({ id: productId }, productInfo, "product").then(reply => {
                if (reply.modifiedCount > 0) {
                    res.send("ok")
                } else {
                    res.send("Hata")
                }
            })
        }
    } else {
        productInfo = {
            name: req.body.name,
            upperName: beautify.upper(req.body.name),
            lowerName: beautify.lower(beautify.upper(req.body.name)),
            th: req.body.th,
            comment: req.body.comment,
            description: req.body.description,
        }
        db.update({ id: productId }, productInfo, "product").then(reply => {
            if (reply.modifiedCount > 0) {
                res.send("ok")
            } else {
                res.send("Hata")
            }
        })
    }
})

app.post("/deleteProduct", (req, res) => {
    var productId = Number(req.body.id)
    db.deleteFindDocument(productId, "id", "product").then(reply => {
        if (reply.deletedCount > 0) {
            res.send("ok")
        } else {
            res.send("Hata")
        }
    })
})
// - Product End

// - User
app.post("/add_user", (req, res) => {
    db.write(req.body, "users").then(write => {
        if (write.insertedCount > 0) {
            res.send("ok")
        } else {
            res.send("error")
        }
    })
})

app.post("/update_user", (req, res) => {
    var userID = req.body.id
    delete req.body.id
    db.updateId(userID, req.body, "users").then(update => {
        if (update.modifiedCount > 0) {
            res.send("ok")
        } else {
            res.send("error")
        }
    })
})

app.post("/remove_user", (req, res) => {
    db.deleteIdDocument(req.body.id, "users").then(remove => {
        if (remove.deletedCount > 0) {
            res.send("ok")
        } else {
            res.send("error")
        }
    })
})
// - User End

// - About 
app.post("/saveabout", (req, res) => {
    var id = req.body.id
    delete req.body.id
    db.updateId(id, req.body, "about").then(reply => {
        if (reply.modifiedCount > 0) {
            res.send("ok")
        } else {
            res.send("hata")
        }
    })
})

app.post("/savesiteinfo", (req, res) => {
    var id = req.body.id
    delete req.body.id
    db.updateId(id, req.body, "site").then(reply => {
        if (reply.modifiedCount > 0) {
            res.send("ok")
        } else {
            res.send("hata")
        }
    })
})
// - About End

// - Slider
function getSliderPathNames(arr) {
    var tempArr = []
    arr.forEach(e => {
        tempArr.push({
            path: e.path,
            name: e.filename
        })
    });
    return tempArr
}

app.post("/getslider", (req, res) => {
    if (req.body.th) {
        db.find({ th: req.body.th }, "slider").then(reply => {
            res.send(reply[0])
        })
    } else {
        db.find({ position: req.body.data }, "slider").then(reply => {
            res.send(reply[0])
        })
    }
})

app.post("/saveslider", upload.array("sliderImage", 1), (req, res) => {
    if (req.files.length == 0) {
        if (req.body.selectSliderType != "right") {
            db.update({ position: req.body.selectSliderType }, {
                text: req.body.sliderText,
                link: req.body.sliderLink
            }, "slider").then(q => {
                if (q.modifiedCount > 0) {
                    res.send("ok")
                } else {
                    res.send("hata")
                }
            })
        } else { // sağ seçili ise
            db.update({ th: req.body.selectSlider }, {
                text: req.body.sliderText,
                link: req.body.sliderLink
            }, "slider").then(q => {
                if (q.modifiedCount > 0) {
                    res.send("ok")
                } else {
                    res.send("hata")
                }
            })
        }
    } else {
        if (req.body.selectSliderType != "right") {
            var oldPath = req.files[0].path
            var newPath = '../public_html/sliderimages/' + req.files[0].filename

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err

                db.update({ position: req.body.selectSliderType }, {
                    text: req.body.sliderText,
                    link: req.body.sliderLink,
                    img: req.files[0].filename
                }, "slider").then(q => {
                    if (q.modifiedCount > 0) {
                        res.send("ok")
                    } else {
                        res.send("hata")
                    }
                })
            })
        } else { // sağ seçili ise

            var oldPath = req.files[0].path
            var newPath = '../public_html/sliderimages/' + req.files[0].filename

            fs.rename(oldPath, newPath, function (err) {
                if (err) throw err

                db.update({ th: req.body.selectSlider }, {
                    text: req.body.sliderText,
                    link: req.body.sliderLink,
                    img: req.files[0].filename
                }, "slider").then(q => {
                    if (q.modifiedCount > 0) {
                        res.send("ok")
                    } else {
                        res.send("hata")
                    }
                })
            })
        }
    }
})

app.post("/savePartnerCompany", upload.array("imagesPartnerCompany", 1), (req, res) => {
    var oldPath = req.files[0].path
    var newPath = '../public_html/partnercompany/' + req.files[0].filename

    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err

        db.write({
            id: Date.now(),
            img: req.files[0].filename
        }, "partnerCompany").then(q => {
            res.send("ok")
        })
    })
})

app.post("/removePartner", (req, res) => {
    db.findId(req.body.id, "partnerCompany").then(reply => {
        fs.unlink("../public_html/partnercompany/" + reply[0].img, function (err) {
            if (err) throw err
            console.log("silindi")
            db.deleteIdDocument(req.body.id, "partnerCompany").then(deleted => {
                res.send("ok")
            })
        })
    })
})


app.listen(port, () => console.log("Sistem Başlatıldı"))