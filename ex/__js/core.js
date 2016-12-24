var Core = function () {
    this.menu_selector = $('.tool_panel ul');
    this.menu_active_class = 'tool_panel_active';


    this.hide_content_blocks = function () {
        $('.content').fadeOut(200);
        $('.content_loader').fadeIn(100);
    };
    this.show_content_block = function (selector) {
        $(selector).delay(200).fadeIn(200);
        $('.content_loader').fadeOut(200);
    };

    var _this = this;

    this.module = this.default;

    this.menu_triggers = function () {
        Modules.forEach(function (item, i) {
            $('.' + item.class).click(function (e) {
                _this.init_module(item.name);
            });
        });
    };
    this.menu_wrapper = function () {
        var html = '';
        var _this = this;
        Modules.forEach(function (item, i) {
            if (item.class && item.title && item.name) {
                var _class = item.class;
                if (item.name === _this.module) {
                    _class += ' ' + _this.menu_active_class;
                }
                html += '<li class="' + _class + '">' + item.title + '</li>';
            }
        });
        this.menu_selector.html(html);
        this.menu_triggers()
    };
    this.default = 'websites';

    Modules.forEach(function (item, i) {
        console.log(item);
        Modules[i].f = item.f();

    });

    this.get_moduleByName = function (module) {
        return $.grep(Modules, function(e){ return e.name == module; });
    };

    this.init_module = function (module) {
        //this.modules = Modules;

        console.log('Modules list: ', Modules);
        var m = _this.get_moduleByName(module);

        if (m.length > 0) {
            m = m[0];
            console.log(m);
            m.f.init(m, this);
            this.module = m.name;

        } else {
            console.error('Cannot find module: ', module);
        }
        this.menu_wrapper();
    };

    this.init_module(this.default);

};


var APP;
$(document).ready(function () {
    APP = new Core();
});