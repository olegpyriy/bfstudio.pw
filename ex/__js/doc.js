function show_block (e) {
    e.animate({
        bottom:0
    }, 200);
}
function hide_block (e) {
    e.animate({
        bottom:-260
    }, 200);
}
function show_mess (mess) {
    $('.mess-text').text(mess);
    show_block($('.mess-block'));
}
function get_json (url, data, e, type, suc, err) {
    if (e || e !== {}) {
        $(e).addClass('button_loading');
    }
    $.ajax({
        url: url,
        dataType: 'json',
        cache:false,
        type: type || 'get',
        data: data || {},
        success: function (data) {
            console.log(data);
            if (data.status === 'OK' || data.status === 'ok') {
                if (suc) {
                    suc();
                }
            } else {
                if (data.exp) {
                    var mess = '';
                    //data.exp.each(function (i, e) {
                    //    mess += e + '<br>';
                    //});
                    console.log(data.exp);
                    show_mess(mess);
                } else if (err) {
                    err();
                }
            }
            if (e || e !== {}) {
                $(e).removeClass('button_loading');

            }
        },
        error: function () {
            if (e || e !== {}) {
                $(e).removeClass('button_loading');
            }
            if (err) {
                err();
            }
        }
    });

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
function networck_problem () {
    show_mess ('Проблема с соединением. Попробуйте еще раз.');
}
$(document).ready(function () {
    set_button_loaders();
    $('.reg').click(function (e) {
        show_block($('.reg-block'));
    });
    $('.forgot_pass').click(function (e) {
        show_block($('.restore-pass'));
    });
    $('.login-close,.showing-block-ok').click(function (e) {
        hide_block($('.showing-block'));
    });
    $('.login_b').click(function (e) {
        var url = $('#login_url').val();
        get_json(url, {
            email: $("#login-email").val(),
            password: $("#login-password").val()
        }, this, 'post', function () {
            window.location = $("#main_url").val();
        }, function () {
            networck_problem ();
        })
    });
    $('.reg_b').click(function (e) {
        var url = $('#reg_url').val();
        get_json(url, {
            email: $("#reg-email").val(),
            password: $("#reg-password").val(),
            c_password: $("#reg-password_c").val()
        }, this, 'post', function () {
            show_mess('На Ваш емейл отправлено письмо с подтверждением регистрации.');
        }, function () {
            networck_problem ();
        })
    });
    $('.restore-pass_b').click(function (e) {
        var url = $('#forgot_pass_url').val();
        get_json(url, {
            email: $("#restore-email").val()
        }, this, 'post', function () {
            show_mess('На Ваш емейл отправлено письмо с ссылкой для сброса пароля.');
        }, function () {
            networck_problem ();
        })
    });
});
