// HEADER STICKY
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 50) {
        $('header').addClass('sticky-header');
        $('#site-logo').addClass('site-logo-active')
    } else {
        $('header').removeClass('sticky-header');
        $('#site-logo').removeClass('site-logo-active')
    }
});
//PLAY FILTER HOVER
$(".filter-buttons").hover(function () {
    $(this).next().show()
}, function () {
    $(this).next().hide()
});
//PLAY FILTER OPEN EFFECT
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 550 && $(".filter-area ul li").length > 0) {
        const li = $(".filter-area ul li")
        var time = 0
        Array.from(li).forEach(e => {
            time = time + 200
            openIcon(e, time,)
        });
    }
    if (height > 550 && $(".filter-area ul li").length > 0) {
        const buttons = $(".filter-area ul li button")
        var time = 0
        Array.from(buttons).forEach(f => {
            time = time + 200
            openBtn(f, time,)
        });
    }
});
$(document).ready(function () {
    var x = $(window).scrollTop();
    if (x > 550 && $(".filter-area ul li").length > 0) {
        const li = $(".filter-area ul li")
        var time = 0
        Array.from(li).forEach(e => {
            time = time + 200
            openIcon(e, time,)
        });
    }
    if (x > 550 && $(".filter-area ul li").length > 0) {
        const buttons = $(".filter-area ul li button")
        var time = 0
        Array.from(buttons).forEach(f => {
            time = time + 200
            openBtn(f, time,)
        });
    }
})
function openIcon(e, time) {
    setTimeout(() => {
        e.style.opacity = 1
    }, time);
}
function openBtn(f, time) {
    setTimeout(() => {
        var styles = {
            width: "80px",
            height: "80px",
        }
        Object.assign(f.style, styles);
    }, time);
}
//SEARCH BAR
function searchBar() {
    $("#search-area").removeClass("col-md-1")
    $("#search-area").addClass("col-md-11")
    $("#header-search-icon").hide()
    $(".header-search").fadeIn()
    $("#header-close-icon").fadeIn()
    $(".header-search").focus()
}
function searchBarClose() {
    setTimeout(() => {
        $("#search-area").removeClass("col-md-11")
        $("#search-area").addClass("col-md-1")
        $("#header-search-icon").fadeIn()
        $(".header-search").hide()
        $("#header-close-icon").hide()
    }, 300);
}
function searchNow() {
    var searchVal = $(".header-search").val()
    console.log(searchVal)
}
$(".header-search").keyup(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchNow()
    }
});
//HEADER ACTIVE
$(document).ready(function () {
    var menuItem = $(".header-menu-item")
    var href = location.pathname
    if (href.length > 1) {
        Array.from(menuItem).forEach(e => {
            var ahref = e.getAttribute("href")
            if (ahref == href) {
                e.parentNode.classList.add("menu-active")
            }
        });
    } else {
        $("#index").addClass("menu-active")
    }
})
//MODAL
$(".modal-open").click(function () {
    if ($(".modal").length > 0) {
        $(".modal").show()
    } else {
        var playID = $(".modal-open").data("play")
        $.post("/modal_open", playID, (data) => {
            $("body").append(data)
            setTimeout(() => {
                $(".modal").show()
            }, 300);
        })
    }
})
function closeModal() {
    $(".modal").hide()
}