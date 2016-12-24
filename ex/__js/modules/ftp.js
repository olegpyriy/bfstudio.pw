ftp = function () {

    var model;
    var Core;

    var act_editItem = 0;

    var _this = this;

    this.items = [];

    this.table_init = function () {
        API.get(API.ftp, {}, this.table_wrapper);
    };

    this.init = function (_model, _Core) {
            model = _model;
            Core = _Core;

        console.log('Model: ', model);

        Core.hide_content_blocks();

        this.table_init();
    };

    this.events = function () {

        $('.ftp_item').click(function () {
            //console.log(this);
            var id = parseInt($(this).attr('data-ftp-id'));
            if (id > 0) {
                _this.act_editItem = id;
                var data = _this.items[id];
                if (data) {
                    _this.editItem('Редактировать профиль', function () {
                        $('.mBox_add_ftp').fadeOut(0);
                        if (data.can_delete == true) {
                            $('.mBox_ftp_delete').fadeIn(0);
                        } else {
                            $('.mBox_ftp_delete').fadeOut(0);
                        }
                        $('.mBox_save_ftp').fadeIn(0);
                    }, data);
                } else {
                    console.error('Cannot find ftp item ', id);
                }
            } else {
                console.error('Wrong item ftp attr id');
            }

        });
    };

    this.editItem = function (text, f, data) {

        console.log(text, data);
        data = data || {};
        var _data = {
            name: data.name || '',
            host: data.host || '',
            login: data.login || '',
            pass: data.pass || '',
            port: data.port || ''
        };
        var e = $('.add-ftp');
        e.find('h2').text(text);
        e.find('#ftp_name').val(_data.name);
        e.find('#ftp_host').val(_data.host);
        e.find('#ftp_login').val(_data.login);
        e.find('#ftp_pass').val(_data.pass);
        e.find('#ftp_port').val(_data.port);

        if (typeof f == 'function') {
            f(this);
        }

        show_block($('.add-ftp .mBox_block'));

    };

    this.get_items = function (data) {
        for (var item in data.ftp) {
            _this.items[parseInt(data.ftp[item].id)] = data.ftp[item];
        }
    };

    this.table_wrapper = function (data) {
        var tpl = function (id, name, login, host,  can_delete) {
            var _can_delete = '';
            if (can_delete == true) {
                _can_delete = ' item_can_delete';
            }
            return  '<tr data-ftp-id="' + id + '" class="ftp_item' + _can_delete + '">' +
                '<td>' + name + '</td>' +
                '<td>' + login + '</td>' +
                '<td>' + host + '</td>' +
                '</tr>'
        };
        var html = '<tr>\n    <th>Имя</th>\n    <th>Логин</th>\n    <th>Хост</th>\n</tr>';

        _this.get_items(data);

        for (var item in _this.items) {
            html += '\n' + tpl(_this.items[item].id, _this.items[item].name, _this.items[item].login, _this.items[item].host, _this.items[item].can_delete);
        }

        //console.log(html);
        $(model.content + ' .table_content').find('table').html(html);

        $(model.count).text(data.count);
        $(model.max_count).text(data.max_count);

        Core.show_content_block(model.content);

        _this.events();
    };


    return this;

};

var ftp_module = function () {
    var FTP = new ftp();

    $('#ftp_content').find('.add').click(function () {
       // console.log('Core: ', Core);
        FTP.editItem('Добавить профиль', function () {
            $('.mBox_add_ftp').fadeIn(0);
            $('.mBox_ftp_delete').fadeOut(0);
            $('.mBox_save_ftp').fadeOut(0);
        });
    });

    $('.ftp_test_butt').click(function () {
        var suc = function () {
            show_mess('Тест соединения успешно завершен.');
            //alert(1);
        };

        API.post(API.test_ftp, {
            host: $('#ftp_host').val(),
            login: $('#ftp_login').val(),
            pass: $('#ftp_pass').val(),
            port: 21
        }, suc, function () {
            show_mess('Не удалось подключиться. Проверьте данные подключения.');
        }, this);
    });

    $('.mBox_add_ftp').click(function () {
        var id = parseInt($(this).attr('data-ftp-id'));
        API.post(API.add_ftp, {
            name: $('#ftp_name').val(),
            host: $('#ftp_host').val(),
            login: $('#ftp_login').val(),
            pass: $('#ftp_pass').val(),
            port: 21
        }, function () {
            show_mess('Профиль успешно добавлен.');
            FTP.reload();
        }, function () {
            show_mess('Ошибка добавления.');
        }, this);

    });

    $('.mBox_save_ftp').click(function () {
        API.post(API.edit_ftp, {
            id: FTP.act_editItem,
            name: $('#ftp_name').val(),
            host: $('#ftp_host').val(),
            login: $('#ftp_login').val(),
            pass: $('#ftp_pass').val(),
            port: 21
        }, function () {
            show_mess('Профиль успешно сохранен.');
            FTP.table_init();
        }, function () {
            show_mess('Ошибка сохранения.');
        }, this);
    });

    $('.mBox_ftp_delete').click(function () {
        API.post(API.del_ftp, {
            id: FTP.act_editItem
        }, function () {
            show_mess('Профиль успешно удален.');
            FTP.table_init();
            hide_modal_block('.add-ftp');
        }, function () {
            show_mess('Ошибка удаления.');
        }, this);
    });

    return FTP;
};
$(document).ready(function () {
    Modules.push({
        name: 'ftp',
        title: 'FTP профили',
        class: 'tool_ftp',
        content: '#ftp_content',
        count: '._ftp_count',
        max_count: '.ftp_max_count',
        f: ftp_module
    });
});