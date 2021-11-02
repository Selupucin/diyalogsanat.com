function lightMode() {
    $("body").toggleClass("dark-only");
    if ($(".feather.feather-sun").length > 0) {
        $(".feather.feather-sun").replaceWith(feather.icons['moon'].toSvg());
        sessionStorage.lightMode = "sun"
    } else if ($(".feather.feather-moon").length > 0) {
        $(".feather.feather-moon").replaceWith(feather.icons['sun'].toSvg());
        sessionStorage.lightMode = "moon"
    }
}

$(function() {
    if (sessionStorage.lightMode == "sun") {
        $("body").toggleClass("dark-only");
        setTimeout(() => {
            $(".feather.feather-sun").replaceWith(feather.icons['moon'].toSvg());
        }, 500);
    }
})