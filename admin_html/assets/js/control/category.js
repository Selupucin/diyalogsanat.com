function showSubMenu() {
    if ($("#subCategoryActive").is(":checked")) {
        $("#openNewWorld").show()
        $("#helloNewWorldButton").show()
    } else {
        $("#openNewWorld").hide()
        $("#helloNewWorldButton").hide()
    }
}

function clearForm() {
    document.getElementById('selectMainCategory').value == "empty"
    document.getElementById('selectSubCategory').value == "empty"
    $('#newCategoryName').val("")
    $("#openNewWorld").hide()
    $("#helloNewWorld").hide()
    $("#helloNewWorldButton").hide()
    $("#subCategoryActive").prop("checked", false);
    $("#lastCategoryActive").prop("checked", false);
}

function openSecondSub() {
    if ($("#lastCategoryActive").is(":checked")) {
        $("#helloNewWorld").show()
        if (document.getElementById('selectMainCategory').value != "empty") {
            $.post("/listcategory", {
                categoryId: $("#selectMainCategory").val(),
            }, (data) => {
                if (data == "hata") {
                    alert(data)
                } else {
                    $("#helloNewWorld").html(data)
                    $("#helloNewWorld").show()
                }
            })
        } else {
            alert("Lütfen bir kategori seçiniz")
            setTimeout(() => {
                $("#lastCategoryActive").prop("checked", false);
            }, 500);
        }
    } else {
        $("#helloNewWorld").hide()
    }
}

function listAgain() {
    if ($("#lastCategoryActive").is(":checked")) {
        $.post("/listcategory", {
            categoryId: $("#selectMainCategory").val(),
        }, (data) => {
            if (data == "hata") {
                alert(data)
            } else {
                $("#helloNewWorld").html(data)
                $("#helloNewWorld").show()
            }
        })
    }
}

function saveCategory() {
    var catName = $("#newCategoryName").val()
    if (catName == "" || catName == " ") {
        alert("Tüm alanların doldurulduğundan emin olunuz!")
    } else if ($("#subCategoryActive").is(":checked")) {
        if ($("#lastCategoryActive").is(":checked")) {
            if (document.getElementById('selectMainCategory').value != "empty" && document.getElementById('selectSubCategory').value != "empty") {
                $.post("/savecategory", {
                    categoryName: $('#newCategoryName').val(),
                    categoryStatus: "last",
                    categoryNumber: $('#newCategoryNumber').val(),
                    parentId: $("#selectSubCategory").val(),
                    parentMainId: $("#selectMainCategory").val()
                }, (data) => {
                    if (data == "Kategoriniz Kaydedildi") {
                        alert(data)
                        location.reload()
                    } else {
                        alert(data)
                    }
                })
            } else {
                alert("Tüm kategorilerin seçili olduğundan emin olun")
            }
        } else if (document.getElementById('selectMainCategory').value != "empty") {
            $.post("/savecategory", {
                categoryName: $('#newCategoryName').val(),
                categoryStatus: "mid",
                categoryNumber: $('#newCategoryNumber').val(),
                parentId: $("#selectMainCategory").val()
            }, (data) => {
                if (data == "Kategoriniz Kaydedildi") {
                    alert(data)
                    location.reload()
                } else {
                    alert(data)
                }
            })
        } else {
            alert("Tüm kategorilerin seçili olduğundan emin olun")
        }
    } else {
        $.post("/savecategory", {
            categoryName: $('#newCategoryName').val(),
            categoryStatus: "main",
            categoryNumber: $('#newCategoryNumber').val()
        }, (data) => {
            if (data == "Kategoriniz Kaydedildi") {
                alert(data)
                location.reload()
            } else {
                alert(data)
            }
        })
    }
}

function changeModal(categoryId) {
    $.post("/openmodal2", {
        categoryId: categoryId,
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

function deleteCategory(categoryId, status) {
    $.post("/deletecategory", {
        categoryId: categoryId,
    }, (data) => {
        if (data == "hata") {
            alert(data)
        } else if (data == "ask") {
            var confirmation = confirm("Bu işlem geri alınamaz! Seçtiğiniz kategorinin alt kategorileri ile beraber silinecektir, onaylıyor musunuz?");
            if (confirmation == true) {
                $.post("/deletecategorycolletion", {
                    categoryId: categoryId,
                    status: status
                }, (data) => {
                    alert(data)
                    location.reload()
                })
            } else {
                location.reload()
            }
        } else {
            alert("Kategori silindi.")
            location.reload()
        }
    })
}

function changeCategory(categoryId, categoryStatus) {
    var number = 0
    if ($("#changeProductNumber").val()) {
        number = $("#changeProductNumber").val()
    }
    $.post("/changecategory", {
        categoryId: categoryId,
        categoryStatus: categoryStatus,
        name: $("#changeProductName").val(),
        th: number
    }, (data) => {
        if (data == "hata") {
            alert(data)
        } else {
            alert("Kategori bilgileri değiştirildi.")
            location.reload()
        }
    })
}