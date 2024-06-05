$(document).ready(function() {
    $('.menu').on('click', function() {
        scorm.saveObject('game', $(this).attr('game'));
        navigate.next();
    })
});
