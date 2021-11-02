// HEADER STICKY
$(window).scroll(function () {
    var height = $(window).scrollTop();
    if (height > 50) {
        $('header').addClass('sticky-header');
    } else {
        $('header').removeClass('sticky-header');
    }
});