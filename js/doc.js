function typeText (str, f, interval, cb) {
    if (!str || !str[0]) {
        cb();
        return;
    }
    f(str[0]);
    str = str.substring(1, str.length);
    setTimeout(function () {
        typeText(str, f, interval, cb);
    }, interval);
}

function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}
function terminal(command) {
    command = command.trim();
    var response = "";

    if (command.toLowerCase() == 'about') {
        response += $('.about_tpl').html();
    } else if (command.toLowerCase() == 'what_we_do') {
        response += $('.what_we_do_tpl').html();
    } else if (command.toLowerCase() == 'contacts') {
        response += $('.contact_tpl').html();
    }  else if (command.toLowerCase() == 'sudo') {
        response +='<p>Access not allowed.</p>';
    } else if (!command) {} else {
        response += "<p>Command not found</p>";
    }

    response += "<p>%USERNAME%@BlackFoxStudio:~$&ensp;<input maxlength=\"53\" /></p>";

    return response;
}


function dialog (d) {
    if (d == 0) {
        document.cookie = "pe=1";
        hide_p();
        return;
    }
    $('.dialog').fadeOut(200, function () {
        setTimeout(function () {
            $('.dialog-' + d).fadeIn(300);
        }, 100);
    });
}
function hide_p () {
    $('.dialog_box').fadeOut(200, function() {
        $('#p').animate({
            'right': -400
        }, 2500, function () {
            $('#p_container').fadeOut(0);
        });
    });
}
function show_p () {
    $('#p_container').fadeIn(0, function () {
        $('#p').animate({
            'right': 10
        }, 2500);
    });
    setTimeout(function () {
        $('.dialog_box').fadeIn(300);
        dialog(1);
    }, 2900)
}

$(document).ready(function () {


    $('.answer').click(function () {
        dialog($(this).attr('data-goto'));
    });

    var li = 0;

    var terminal_obj = $(".terminal");
    terminal_obj.jScrollPane();
    var jScrollPane_api = terminal_obj.data('jsp');


    function enter_terminal (terminal_e, no_type_text) {
        var input = $(terminal_e).find('input');
        var command = input.val();
        input.remove();
        var type_interval = 100;
        if (no_type_text) {
            type_interval = 0;
        }
        var p = $(terminal_e).find('p').last();
        typeText(command, function (str) {
            p.append(str);
        }, type_interval, function () {
            $(terminal_e).find('.jspPane').append(terminal(command));
            jScrollPane_api.reinitialise();
            $(terminal_e).find('input').focus();
            if (li === 1) {
                if (getCookie('pe') !== '1') {
                    show_p ();
                }
            }
        });

    }
    var u  = new Url;

    $(window).bind("load", function () {
        setTimeout(function () {
            if ($.inArray(u.hash.toLowerCase(), ['about', 'what_we_do', 'contacts']) >= 0) {
                var terminal_e = $(".terminal");
                terminal_e.find('input').val(u.hash);
                enter_terminal (terminal_e);
            }
        }, 700);
    });

    $('.about').click(function () {
        var terminal_e = $(".terminal");
        terminal_e.find('input').val('about');
        enter_terminal (terminal_e);
        li++;
    });
    $('.what_we_do').click(function () {
        var terminal_e = $(".terminal");
        terminal_e.find('input').val('what_we_do');
        enter_terminal (terminal_e);
        li++;
    });
    $('.contacts').click(function () {
        var terminal_e = $(".terminal");
        terminal_e.find('input').val('contacts');
        enter_terminal (terminal_e);
        li++;
    });




    $(".terminal").keyup(function(e){
        if(e.keyCode == 13){
            enter_terminal (this, true);
        }
    });


    $(".jspPane").click(function (e) {
        if (e.target.tagName == 'P')
            return;

        $(this).find('input').focus();
    });


    function cursorPos (e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }
    var obj = $(".terminal_container");
    var mouseDown = false;
    var startMousePos = {};
    var windowSize = {};
    var objSize = {};
    var startObjPos = {
        x: obj.offset().left,
        y: obj.offset().top
    };
    var main = $('body');
    $('.header').mousedown(function (e) {
        main.css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none'
        });
        startMousePos = cursorPos(e);
        startObjPos.x = obj.offset().left;
        startObjPos.y = obj.offset().top;

        windowSize.w = main.outerWidth();
        windowSize.h = main.outerHeight();

        objSize.w = obj.outerWidth();
        objSize.h = obj.outerHeight();

        mouseDown = true;
    });
    main.mouseup(function() {
        mouseDown = false;
        main.css({
            '-webkit-user-select': 'auto',
            '-moz-user-select': 'auto'
        });
    });
    main.mouseleave(function() {
        mouseDown = false;
        main.css({
            '-webkit-user-select': 'auto',
            '-moz-user-select': 'auto'
        });
    });
    main.mousemove(function(e) {
        if (mouseDown === true) {
            var pos = cursorPos(e);
            var deltaPos = {};
            deltaPos.x = pos.x - startMousePos.x;
            deltaPos.y = pos.y - startMousePos.y;
            var newPos = {
                x: startObjPos.x + deltaPos.x,
                y: startObjPos.y + deltaPos.y
            };
            if (newPos.x < 0) {
                newPos.x = 0
            }
            if (newPos.y < 0) {
                newPos.y = 0
            }
            if (newPos.x + objSize.w > windowSize.w) {
                newPos.x = windowSize.w - objSize.w;
            }
            if (newPos.y + objSize.h > windowSize.h) {
                newPos.y = windowSize.h - objSize.h;
            }
            obj.offset({
                left: newPos.x,
                top: newPos.y
            });
        }
    });
    //$(".terminal").drags();



    var offset_bg_efect = 200;

    var window_h = $(window).height();
    var window_w = $(window).width();
    $(window).resize(function () {
        window_h = $(window).height();
        window_w = $(window).width();
    });

    var bg_obj = $('.bg');
    $(document).mousemove(function(e){
        //console.log(e.pageX, e.pageY);
        var x = (e.pageX - window_w/2);
        var y = (e.pageY - window_h/2);
        //console.log(x, y);

        var k_w = x/(window_w/2);
        var k_h = y/(window_h/2);

        var offset_x = offset_bg_efect * k_w * -1;
        var offset_y = offset_bg_efect * k_h * -1;

        bg_obj.css('margin-top', offset_y + 'px');
        bg_obj.css('margin-left', offset_x + 'px');
    });

});
