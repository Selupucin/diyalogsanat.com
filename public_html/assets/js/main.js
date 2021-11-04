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