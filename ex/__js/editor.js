var editor = function () {
    this.resizeble = function () {
        function cursorPos (e) {
            return {
                x: e.clientX,
                y: e.clientY
            };
        }
        var obj = $(".dt_container");
        var mouseDown = false;
        var startPos = {};
        var startW = obj.width();
        $('.resize').mousedown(function (e) {
            startPos = cursorPos(e);
            startW = obj.width();
            mouseDown = true;
            $('.overlay').fadeIn();
        });
        var elem = $('body');
        elem.mouseup(function() {
            mouseDown = false;
            $('.overlay').fadeOut();
        });
        elem.mouseleave(function() {
            mouseDown = false;
            $('.overlay').fadeOut();
        });
        elem.mousemove(function(e) {
            if (mouseDown === true) {
                var pos = cursorPos(e);
                //console.log(pos);
                var deltaPos = {};
                deltaPos.x = pos.x - startPos.x;
                deltaPos.y = pos.y - startPos.y;
                obj.width(startW + deltaPos.x);
            }
        });
    };
    this.change_resolution = function (res) {
        var e = $('.dt_container');
        e.animate({
            width: res.w,
            height: res.h
        },200);
    };
    this.resolution_list = function() {
        var resolutions = [
            {
                name: "1024x768",
                w:1024,
                h:768
            }, {
                name: "1280x800",
                w:1280,
                h:800
            }, {
                name: "1366x768",
                w:1366,
                h:768
            }, {
                name: "1280x1024",
                w:1280,
                h:1024
            }, {
                name: "1440x900",
                w:1440,
                h:900
            }, {
                name: "1680x1050",
                w:1680,
                h:1050
            }, {
                name: "1920x1080",
                w:1920,
                h:1080
            }, {
                name: "1600x900",
                w:1600,
                h:900
            }, {
                name: "1152x864",
                w:1152,
                h:864
            }
        ];
        var html = '';
        for (var item in resolutions) {
            html += "<option class=\"res_options\" data-res_id=\"" + resolutions[item].name + "\">" + resolutions[item].name + "</option>";
        }
        $('.res_select').html(html);

        var _this = this;
        $('.res_select').change(function () {
            var name = $(this).find(':selected').attr('data-res_id');
            var r = $.grep(resolutions, function(e){ return e.name == name; })[0];
            console.log('resolution', name, r);
            _this.change_resolution(r);
        });

        //ftp_select.find('.ftp_select_empty').attr("selected", "selected");
    };
    this.fullPageMod = function (cb) {
        var s = cb.prop("checked");
        console.log(s);
        if (s == true) {
            $('.dt_container').addClass('fullPageMod');
            $('.editor').css('overflow', 'hidden');
        } else {
            $('.dt_container').removeClass('fullPageMod');
            $('.editor').css('overflow', 'auto');
        }
    };
    this.init = function () {
        this.resizeble();
        this.resolution_list();
        var cb = $('#fullPageMod_c');
        this.fullPageMod(cb);
        var _this = this;
        cb.click(function () {
            _this.fullPageMod(cb);
        });

    };
    this.init();
};

$(document).ready(function () {



    new editor;
    $('.back').click(function () {
        var dt_container = $('.dt_container');
        dt_container.find('iframe').attr('src', 'about:blank');
        $('body,html').css('overflow', 'auto');
        $('.editor').fadeOut();
    });
    $('.reload').click(function () {
        var dt_container = $('.dt_container');
        var src = dt_container.find('iframe').attr('src');
        dt_container.find('iframe').attr('src', src);
    });

    function closeOrNot(e) {
        if(!e) e = window.event;
        e.cancelBubble = true;
        e.returnValue = 'Вы действительно хотите уйти со страницы?\nВнимание: данные могут не сохраниться!\n ';
        if (e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    window.onbeforeunload=closeOrNot;


});
