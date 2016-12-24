var projects = function () {

    var model;
    var Core;



    this.init = function (_model, _Core) {
        model = _model;
        Core = _Core;

        console.log('Model: ', model);

        Core.hide_content_blocks();

        API.get(API.projects, {}, this.table_wrapper);
    };

    this.table_wrapper = function (data) {
        var tpl = function (id, title, can_delete, hash) {
            var _can_delete = '';
            if (can_delete == true) {
                _can_delete = ' item_can_delete';
            }
            return  '<div class="item">' +
                '<div class="item_delete' + _can_delete + '">x</div>' +
                '<div class="item_header">' + title + '</div>' +
                '<div class="item_line"></div>' +
                '<div class="item_sel item_install" data-id="' + id + '">Установить</div>' +
                '<a href="http://' + hash + '.' + location.host + '" target="_blank" class="item_sel item_see">Просмотр</a>' +
                '<div class="item_sel item_edit" data-hash="' + hash + '">Редактирование</div>' +
                '<div class="item_sel item_block_r">Порядок отображения блоков</div>' +
                '</div>'
        };
        var html = '';
        for (var item in data.projects) {
            html += '\n' + tpl(data.projects[item].id, data.projects[item].name, data.projects[item].can_delete, data.projects[item].hash);
        }

        //console.log(html);
        $(model.content + ' .table_content').html(html);

        $(model.count).text(data.count);
        $(model.max_count).text(data.max_count);

        Core.show_content_block(model.content);

        $('.item_edit').click(function () {
            var hash = $(this).attr('data-hash');
            var dt_container = $('.dt_container');
            dt_container.find('iframe').attr('src', 'about:blank');
            dt_container.find('iframe').attr('src', 'http://' + hash + '.landiguana.com');
            $('body,html').css('overflow', 'hidden');
            $('.editor').fadeIn();
        });
        $('.item_block_r').click(function () {
            show_block($('.block-sort  .mBox_block'));
        });
    };

        $('.sortable').sortable();


    return this;
};

function projects_module () {
    var Projects = new projects();

    $('#project_content').find('.add').click(function (e) {
        show_block($('.add-project .mBox_block'));
    });

    return Projects;
}

$(document).ready(function () {


    Modules.push({
        name: 'projects',
        title: 'Проекты',
        class: 'tool_project',
        content: '#project_content',
        count: '._project_count',
        max_count: '.project_max_count',
        f: projects_module
    });
});