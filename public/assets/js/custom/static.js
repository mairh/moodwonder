$(document).ready(function () {

    // fix menu when passed
    $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function () {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function () {
                    $('.fixed.menu').transition('fade out');
                }
            })
            ;

    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item');


    $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
    });

    $('.ui.menu a.item').on('click', function () {
        $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
    });


    $('.special.card .image').dimmer({
        on: 'hover'
    });

    $('.star.rating').rating();

    $('.card .dimmer').dimmer({
        on: 'hover'
    });

});