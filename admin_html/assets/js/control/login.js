function login() {
    var data = {
        mail: $('#userMail').val(),
        password: $('#userPassword').val()
    }
    $.post("/login_user", data, (data) => {
        if (data == "ok") {
            location.assign("/")
            saveMe()
        } else {
            alert(data)
        }
    })
}

function enter31(event) {
    var x = event.which || event.keyCode;
    if (x == 13) {
        login()
    }
}

function saveMe() {
    var saveButton = $('#saveMe').is(':checked')
    if (saveButton == true) {
        localStorage.setItem("mail", $('#userMail').val())
        localStorage.setItem("password", $('#userPassword').val())
        localStorage.setItem("saveMod", true)
    } else {
        localStorage.clear()
        localStorage.setItem("saveMod", false)
    }
}

$(document).ready(function () {
    var saveMod = localStorage.getItem("saveMod")
    if (saveMod == "true") {
        $('#userMail').val(localStorage.getItem("mail"))
        $('#userPassword').val(localStorage.getItem("password"))
        $('#saveMe').prop('checked', true)
    }
})