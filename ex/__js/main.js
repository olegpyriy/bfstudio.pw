function show_block (e) {
    e.parent().fadeIn(200);
    e.animate({
        bottom:0
    }, 200);
}
function hide_modal_block (e) {
    $(e).closest('.mBox').fadeOut(200);
    $(e).closest('.mBox_block').animate({
        bottom:-260
    }, 200);
}
function show_mess (mess) {
    $(".mess-block .mess-text").text(mess);
    show_block($('.mess-block_'));
}

var loader_html = "<div class='sk-circle'>" +
    "<div class='sk-circle1 sk-child'></div>" +
    "<div class='sk-circle2 sk-child'></div>" +
    "<div class='sk-circle3 sk-child'></div>" +
    "<div class='sk-circle4 sk-child'></div>" +
    "<div class='sk-circle5 sk-child'></div>" +
    "<div class='sk-circle6 sk-child'></div>" +
    "<div class='sk-circle7 sk-child'></div>" +
    "<div class='sk-circle8 sk-child'></div>" +
    "<div class='sk-circle9 sk-child'></div>" +
    "<div class='sk-circle10 sk-child'></div>" +
    "<div class='sk-circle11 sk-child'></div>" +
    "<div class='sk-circle12 sk-child'></div>" +
    "</div>";
function set_button_loaders() {
    $('.button').each(function (i, e) {
        $(e).append('<div>' + loader_html + "</div>");
    });
}

function mb_mess(text) {
    alert(text);
}

$(document).ready(function () {
    set_button_loaders();
    $('.logout').click(function (e) {
        var url = $('#logout_url').val();
        get_json(url, {
            logout: 'true'
        }, e, 'post', function () {
            window.location = $('#front_url').val();
        }, function () {
            network_problem ();
        })
    });
    $('.mBox_close,.mBox_close_,.mBox_cancel').click(function (e) {
        hide_modal_block(this);
    });
});


var Modules = [];