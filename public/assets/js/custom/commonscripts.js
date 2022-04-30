$(document).ready(function () {

    $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
    });

    $('.ui.menu a.item').on('click', function () {
        $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
    });


    // fix menu when passed
    $('.masthead').visibility({
        once: false,
        onBottomPassed: function () {
            $('.fixed.menu').transition('show');
        },
        onBottomPassedReverse: function () {
            $('.fixed.menu').transition('show');
        }
    });

    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');

});