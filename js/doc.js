$(document).ready(function () {

    function cursorPos (e) {
        return {
            x: e.clientX,
            y: e.clientY
        };
    }
    var obj = $(".terminal");
    var mouseDown = false;
    var startPos = {};
    var startX = obj.offset().left;
    var startY = obj.offset().top;
    var main = $('body');
    $('.header').mousedown(function (e) {
        main.css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none'
        });
        startPos = cursorPos(e);
        startX = obj.offset().left;
        startY = obj.offset().top;
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
            //console.log(pos);
            var deltaPos = {};
            deltaPos.x = pos.x - startPos.x;
            deltaPos.y = pos.y - startPos.y;
            obj.offset({
                left: startX + deltaPos.x,
                top: startY + deltaPos.y
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
