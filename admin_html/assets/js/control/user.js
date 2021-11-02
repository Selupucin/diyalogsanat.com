$('#passwordIcon').click(function () {
    var type = $('#userPassword').attr('type')
    if (type == 'password') {
        $('#userPassword').attr('type', 'text');
        $('#passwordIcon').toggleClass('fa-eye');
        $('#passwordIcon').toggleClass('fa-eye-slash')
    } else {
        $('#userPassword').attr('type', 'password');
        $('#passwordIcon').toggleClass('fa-eye');
        $('#passwordIcon').toggleClass('fa-eye-slash')
    }
})

function addUser() {
    if ($('#userMail').val() || $('#userPassword').val()) {
        $.post("/add_user", {
            userName: $('#userName').val(),
            userMail: $('#userMail').val(),
            userPassword: $('#userPassword').val(),
            userPhone: $('#userPhone').val(),
        }, (data) => {
            alert(data)
            location.reload()
        })
    } else {
        alert("Lütfen bilgileri doldurunuz")
    }
}

function updateUser(id) {
    $.post("/update_user", {
        userName: $('#userName' + id).val(),
        userMail: $('#userMail' + id).val(),
        userPassword: $('#userPassword' + id).val(),
        userPhone: $('#userPhone' + id).val(),
        userPermission: {
            userEdit: $('#userEdit' + id).is(':checked')
        },
        id: id
    }, (data) => {
        alert(data)
        location.reload()
    })
}
function removeUser(id) {
    var approve = confirm("Kullanıcıyı silmek istediğinizden emin misiniz?")
    if (approve == true) {
        $.post("/remove_user", {
            id: id
        }, (data) => {
            alert(data)
            location.reload();
        })
    }
}