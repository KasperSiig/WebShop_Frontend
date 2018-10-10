$(function () {
    setScrollBar();
});

function setScrollBar() {
    const scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    const pos = ($(window).height() - 135) * scrollPercent / 100 + 80;
    $(".scrollbar__img").css({top: pos});
}

$(window).scroll(function () {
    setScrollBar();
});