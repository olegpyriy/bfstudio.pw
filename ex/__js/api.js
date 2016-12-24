function network_problem () {
    show_mess ('Проблема с соединением. Попробуйте еще раз.');
}
function get_json (url, data, e, type, suc, err, noReconnect) {
    url = url || {};
    e = e || {};
    suc = suc || {};
    err = err || {};
    noReconnect = noReconnect || false;

    if (url.length <= 0) {
        console.log('Empty url on ajax request');
        alert('Empty url on ajax request');
        return;
    }


    if (!$.isEmptyObject(e)) {
        $(e).addClass('button_loading');
    }

    console.log('Request ' + type + ' to ', url, ' Sanded data ', data);

    $.ajax({
        url: url,
        dataType: 'json',
        cache:false,
        type: type || 'get',
        data: data || {},
        timeout: 4000,
        success: function (data) {
            console.log(data);
            if (data.status === 'OK' || data.status === 'ok') {
                if (typeof suc == 'function') {
                    console.log(suc);
                    suc(data);
                }
            } else {
                var exp = data.exp || [];
                if (exp.length > 0) {
                    var mess = '';
                    //data.exp.each(function (i, e) {
                    //    mess += e + '<br>';
                    //});
                    console.log(data.exp);
                    //show_mess(mess);
                }
                if (typeof err == 'function') {
                    err();
                }
            }
            if (!$.isEmptyObject(e)) {
                $(e).removeClass('button_loading');

            }
        },
        error: function (e) {
            console.log('Error ajax request ' + url, e);
            if (noReconnect == false) {
                if (!$.isEmptyObject(e)) {
                    $(e).removeClass('button_loading');
                }
                if (typeof err == 'function') {
                    err();
                } else {
                    network_problem ();
                }
            } else {
                console.log('Try again ajax request ' + url);
                get_json (url, data, e, type, suc, err, true);
            }

        }
    });

}

var API = {
    get: function (url, p, cb_s, cb_e, e) {

        return get_json(url, p, e, 'get', cb_s, cb_e)
    },
    post: function (url, p, cb_s, cb_e, e) {

        return get_json(url, p, e, 'post', cb_s, cb_e)
    }
};
$(document).ready(function () {
    API.projects = $('#projects_url').val();



    API.ftp = $('#ftp_url').val();
    API.test_ftp = $('#test_ftp_url').val();
    API.add_ftp = $('#add_ftp_url').val();
    API.edit_ftp = $('#edit_ftp_url').val();
    API.del_ftp = $('#del_ftp_url').val();

    API.websites = $('#websites_url').val();
    API.install = {};
    API.install.check_website = $('#check_website').val();
});