<?php
include "WX.php";
include "wechat.class.php";
$options = array(
        'appid'=>WX_APP_ID,
        'appsecret'=>WX_APP_SECRET
    );
$wechat = new Wechat($options);
?>