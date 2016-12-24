var Websites = function () {

    var model;
    var Core;

    this.init = function (_model, _Core) {

        model = _model;
        Core = _Core;

        console.log('Model: ', model);

        Core.hide_content_blocks();

        API.get(API.websites, {}, this.table_wrapper);

    };

    this.table_wrapper = function (data) {
        var tpl = function (title, can_delete) {
            var _can_delete = '';
            if (can_delete == true) {
                _can_delete = ' item_can_delete';
            }
            return  '<div class="item">' +
                '<div class="item_delete' + _can_delete + '">x</div>' +
                '<div class="item_header">' + title + '</div>' +
                '<div class="item_line"></div>' +
                '<div class="item_sel item_edit">Конфигурация</div>' +
                '<div class="item_sel item_edit">Конфигурация</div>' +
                '<div class="item_sel item_block_r">Порядок отображения блоков</div>' +
                '</div>'
        };
        var html = '';
        for (var item in data.projects) {
            html += '\n' + tpl(data.projects[item].name, data.projects[item].can_delete);
        }

        console.log(html);
        $(model.content + ' .table_content').html(html);

        $(model.count).text(data.count);
        $(model.max_count).text(data.max_count);

        Core.show_content_block(model.content);
    };

    return this;
};

function websites_module () {
    var websites = new Websites();




    $('#websites_content').find('.add').click(function (e) {
        show_block($('.add-website .mBox_block'));
    });

    return websites;
}

$(document).ready(function () {

    var dataStep = [
        {
            name: 'site_a',
            e: $('#site_a'),
            //next: 'site_type_install',
            f_next: function (e) {
                function err () {
                    mb_mess('Не вдалось добавити сайт');
                }
                API.post(API.install.check_website, {
                    host: $('#ws_site').val()
                }, function (data) {
                    console.log('API.install.check_website ', API.install.check_website, data);
                    if (data.check == true) {
                        e.showByName('site_type_install');
                    } else {
                        err ();
                    }

                }, err);
            }
        }, {
            name: 'site_type_install',
            e: $('#site_type_install'),
            prev: 'site_a',
            next: ''
        }, {
            name: 'site_ftp_profile',
            e: $('#site_ftp_profile'),
            prev: 'site_type_install',
            next: 'site_file_upload',
            f_next: function () {
                var ws_site = $('#ws_site').val();
                var ws_ftp_select = $('#ws_ftp_select').val();
                var ws_ftp_dir = $('#ws_ftp_dir').val();


            }
        }, {
            name: 'site_file_upload',
            e: $('#site_file_upload'),
            prev: 'site_ftp_profile',
            next: 'site_db_config'
        }, {
            name: 'site_db_config',
            e: $('#site_db_config'),
            prev: 'site_file_upload',
            next: ''
        }

    ];
    console.log(dataStep);

    var s = new StepByStep(dataStep, '.add-website', function (e) {
        e.fadeIn(200);
    });
    var add_website = $('.add-website');
    add_website.find('.site_step_next').click(function () {
        s.next();
    });
    add_website.find('.site_step_prev').click(function () {
        s.prev();
    });
    add_website.find('.site_step_type_install_auto').click(function () {
        API.get(API.ftp, {}, function (data) {
            var html = '';
            for (var item in data.ftp) {
                html += "<option class=\"ftp_select_option\" data-ftp_id=\"" + data.ftp[item].id + "\">" + data.ftp[item].name + "</option>";
            }
            $(html).insertAfter('.ftp_select_empty');
            s.showByName('site_ftp_profile');
        });


    });


    var ftp_select = $('.ftp_select');

    ftp_select.find('.ftp_select_empty').attr("selected", "selected");

    ftp_select.change(function () {

        var id = $(this).find(":selected").attr('data-id');
        //console.log(id, 'add');
        if (id == 'add') {
            var m = $.grep(Modules, function(e){ return e.name == 'ftp'; })[0];
            //console.log(m);
            if (m.f) {
                m.f.editItem('Добавить профиль', function () {
                    $('.mBox_add_ftp').fadeIn(0);
                    $('.mBox_ftp_delete').fadeOut(0);
                    $('.mBox_save_ftp').fadeOut(0);
                });
            } else {
                console.error('Cannot find or wrong module ftp')
            }
        }
    });


    Modules.push({
        name: 'websites',
        title: 'Сайты',
        class: 'tool_websites',
        content: '#websites_content',
        count: '._ws_count',
        max_count: '.ws_max_count',
        f: websites_module
    });
});