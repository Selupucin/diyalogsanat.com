function listSub() {
    $("#productLastCategory").html("")
    $.post("/productlistsubcategory", {
        categoryId: $("#selectMainCategory").val(),
        type: "standart"
    }, (data) => {
        if (data == "hata") {
            alert($("#selectMainCategory").children(":selected").attr("data-name") + " kategorisine ait alt kategori bulunamadı!")
            $("#productSubCategory").html("")
        } else if (data == "Kategori seçiniz") {
            alert("Lütfen kategori seçiniz.")
            $("#productSubCategory").html("")
        } else {
            $("#productSubCategory").html(data)
        }
    })
}

function listLast() {
    $.post("/productlistlastcategory", {
        mainCategoryId: $("#selectMainCategory").val(),
        categoryId: $("#selectSubCategory").val(),
        type: "standart"
    }, (data) => {
        if (data == "hata") {
            alert($("#selectSubCategory").children(":selected").attr("data-name") + " kategorisine ait alt kategori bulunamadı!")
            $("#productLastCategory").html("")
        } else if (data == "Kategori seçiniz") {
            alert("Lütfen kategori seçiniz.")
            $("#productLastCategory").html("")
        } else {
            $("#productLastCategory").html(data)
        }
    })
}

function saveProduct() {

    // $.ajax({
    //     type: "POST",
    //     url: "/saveproduct",
    //     data: $("#form1").serialize(),
    //     beforeSend: function () {
    //       $('#result').html('<img src="loading.gif" />');
    //     },
    //     success: function (data) {
    //       $('#result').html(data);
    //     }
    //   })

    // $.post("/saveproduct", {
    //     name: $("#newProductName").val(),
    //     th: $("#newProductNumber").val(),
    //     comment: $("#newProductComment").val(),
    //     description: CKEDITOR.instances.newProductCkeditor.getData(),
    //     category: {
    //         mainName: $("#selectMainCategory").children(":selected").attr("data-name"),
    //         subName: $("#selectSubCategory").children(":selected").attr("data-name"),
    //         lastName: $("#selectLastCategory").children(":selected").attr("data-name"),
    //         mainId: $("#selectMainCategory").val(),
    //         subId: $("#selectSubCategory").val(),
    //         lastId: $("#selectLastCategory").val()
    //     },
    // }, (data) => {
    //     if (data == "ok") {
    //         alert("Ürün yüklenmiştir")
    //         location.reload()
    //     } else {
    //         alert(data)
    //     }
    // })
}

function changeModal(productId) {
    $.post("/openmodal", {
        productId: productId,
    }, (data) => {
        if (data == "hata") {
            $("#modalBody").html(data)
        } else {
            $("#modalBody").html(data)
            var modalId = 'changeProductCkeditor'
            ckEditorInstall(modalId);
        }
    })
}

function changeCategory(Id) {
    if ($("#changeCategoryActive").is(":checked")) {
        $.post("/changecategory", {
            productId: Id,
        }, (data) => {
            if (data != "hata") {
                $("#showCategoryArea").hide()
                $("#selectCategoryArea").show()
                $("#selectCategoryArea").html(data)
            } else {
                alert(data)
            }
        })
    } else {
        $("#showCategoryArea").show()
        $("#selectCategoryArea").hide()
        $("#selectCategoryArea").html("")
    }
}

function listSubModal() {
    $.post("/productlistsubcategory", {
        categoryId: $("#selectMainCategoryModal").val(),
        type: "modal"
    }, (data) => {
        if (data == "hata") {
            alert(data)
            $("#productSubCategoryModal").html("")
        } else {
            $("#productSubCategoryModal").html(data)
        }
    })
}

function listLastModal() {
    $.post("/productlistlastcategory", {
        mainCategoryId: $("#selectMainCategoryModal").val(),
        categoryId: $("#selectSubCategoryModal").val(),
        type: "modal"
    }, (data) => {
        if (data == "hata") {
            alert(data)
            $("#productLastCategoryModal").html("")
        } else {
            $("#productLastCategoryModal").html(data)
        }
    })
}

function changeProduct(Id) {
    if ($("#changeCategoryActive").is(":checked")) {
        $.post("/changeProduct", {
            changeCategory: true,
            id: Id,

            name: $("#changeProductName").val(),
            th: $("#changeProductNumber").val(),
            comment: $("#changeProductComment").val(),
            description: CKEDITOR.instances.changeProductCkeditor.getData(),
            category: {
                mainName: $("#selectMainCategoryModal").children(":selected").attr("data-name"),
                subName: $("#selectSubCategoryModal").children(":selected").attr("data-name"),
                lastName: $("#selectLastCategoryModal").children(":selected").attr("data-name"),
                mainId: $("#selectMainCategoryModal").val(),
                subId: $("#selectSubCategoryModal").val(),
                lastId: $("#selectLastCategoryModal").val()
            },
        }, (data) => {
            if (data == "hata") {
                alert(data)
                location.reload()
            } else {
                alert("Ürün değişikliği onaylandı.")
                location.reload()
            }
        })
    } else {
        $.post("/changeProduct", {
            changeCategory: false,
            id: Id,

            name: $("#changeProductName").val(),
            th: $("#changeProductNumber").val(),
            comment: $("#changeProductComment").val(),
            description: CKEDITOR.instances.changeProductCkeditor.getData(),
        }, (data) => {
            if (data == "hata") {
                alert(data)
                location.reload()
            } else {
                alert("Ürün değişikliği onaylandı.")
                location.reload()
            }
        })
    }

}

function deleteProduct(Id) {
    var confirmation = confirm("Bu işlem geri alınamaz! Ürünü silmek istediğinizden emin misiniz?");
    if (confirmation == true) {
        $.post("/deleteProduct", {
            id: Id,
        }, (data) => {
            alert("Ürün silinmiştir.")
            location.reload()
        })
    }
}

$('#saveProduct').click(function (e) {
    var form = $('form')[0];
    var formData = new FormData(form);
    formData.append('ckEditor', CKEDITOR.instances.newProductCkeditor.getData());



    formData.append("mainName", $("#selectMainCategory").children(":selected").attr("data-name"))
    formData.append("midName", $("#selectSubCategory").children(":selected").attr("data-name"))
    formData.append("lastName", $("#selectLastCategory").children(":selected").attr("data-name"))


    $.ajax({
        url: '/saveproduct',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == "Hata /270") {
                alert("Sadece son kategoriye ürün ekleyebilirsiniz. Lütfen bir alt kategori seçerek devam ediniz.")
            } else {
                alert(data)
                location.reload()
            }
        }
    });
});