// Site Info
function saveSiteInfo(x) {
    $.post("/savesiteinfo", {
        id: x,
        tel: $("#sitePhoneNumber").val(),
        mail: $("#siteEmail").val(),
        adress: $("#siteAdress").val(),
        promotionText: $("#promotionText").val(),
        mapURL: $("#mapURL").val(),
    }, (data) => {
        if (data == "ok") {
            location.reload()
        } else {
            alert(data)
        }
    })
}

function clearSiteInfo() {
    $("#sitePhoneNumber").val("")
    $("#siteEmail").val("")
    $("#siteAdress").val("")
    $("#promotionText").val("")
    $("#mapURL").val("")
}

// About
function saveAbout(x) {
    $.post("/saveabout", {
        id: x,
        aboutText: CKEDITOR.instances.aboutTextCkeditor.getData(),
        sectionOne: {
            firstBlock: {
                title: $("#firstHeader").val(),
                text: $("#firstText").val()
            },
            secondBlock: {
                title: $("#secondHeader").val(),
                text: $("#secondText").val()
            },
            thirdBlock: {
                title: $("#thirdHeader").val(),
                text: $("#thirdText").val()
            }
        }
    }, (data) => {
        if (data == "ok") {
            location.reload()
        } else {
            alert(data)
        }
    })
}

function clearFormAbout() {
    CKEDITOR.instances.aboutTextCkeditor.setData("")
    $("#firstHeader").val("")
    $("#firstText").val("")
    $("#secondHeader").val("")
    $("#secondText").val("")
    $("#thirdHeader").val("")
    $("#thirdText").val("")
}

function horseWashing(value) {
    if (value == "right") {
        $.post("/getslider", {
            data: $("#selectSliderType").val(),
            th: $("#selectSlider").val()
        }, (data) => {
            $("#sliderImage").attr("src", "https://volkanmarin.com/sliderimages/" + data.img)
            $("#sliderLink").val(data.link)
            $("#sliderText").val(data.text)
            $("#selectSlideArea").show()
        })
    } else {
        $.post("/getslider", {
            data: $("#selectSliderType").val()
        }, (data) => {
            $("#sliderImage").attr("src", "https://volkanmarin.com/sliderimages/" + data.img)
            $("#sliderLink").val(data.link)
            $("#sliderText").val(data.text)
            $("#selectSlideArea").hide()
        })
    }
}
function inAndOut() {
    $.post("/getslider", {
        th: $("#selectSlider").val()
    }, (data) => {
        $("#sliderImage").attr("src", "https://volkanmarin.com/sliderimages/" + data.img)
        $("#sliderLink").val(data.link)
        $("#sliderText").val(data.text)
    })
}

$('#saveSlider').click(function (e) {
    var form = $('#sliderForm')[0];
    var formData = new FormData(form);

    $.ajax({
        url: '/saveslider',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data) {
            alert(data)
        }
    });
});

$('#savePartnerCompany').click(function (e) {
    var form = $('#partnerCompany')[0];
    var formData = new FormData(form);

    $.ajax({
        url: '/savePartnerCompany',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        success: function (data) {
            alert(data)
        }
    });
});

function removePartner(id) {
    $.post("/removePartner", {
        id: id
    }, (data) => {
        location.reload()
    })
}