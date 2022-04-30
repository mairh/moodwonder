$(document).ready(function () {

    $('#fullpage').fullpage({
        anchors: ['home', 'engaging-employees', 'get-started', 'features', 'why-mw', 'sneak-peek', 'contact'],
        sectionsColor: ['#26A69A', '#26A69A', '#efb57c', '#cb5234', '#edb431', '#3499e0', '#8a74b9'],
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['HOME', 'ENGAGING EMPLOYEES', 'GET STARTED', 'FEATURES', 'WHY MOODWONDER', 'SNEAK PEEK', 'REQUEST A DEMO'],
        responsiveWidth: 1100
    });


    $('.ui.menu .ui.dropdown').dropdown({
        on: 'click'
    });

    $('.ui.menu a.item').on('click', function () {
        $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
    });

});
