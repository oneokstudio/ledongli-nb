<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/8/11
 * Time: 下午10:30
 */

const MAX_NUM = 1;
const RATE = 1;
const MAX_PLAY_TIMES = 5;

date_default_timezone_set('ETC/GMT-8');

if (isset($_COOKIE['play_time']) && isset($_COOKIE['play_times'])) {
    if ($_COOKIE['play_time'] == strtotime(date('Y-m-d')) && $_COOKIE['play_times'] >= MAX_PLAY_TIMES) {
        echo json_encode(['code' => '403', 'msg' => '一天只能抽奖5次哦']);
        die();
    }
}

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=vazee', 'root', 'zxc');
    $result = $db->query('select count(*) from users');
    $num = 0;
    foreach ($result as $value) {
        $num = $value[0];
    }

    $db = null;
} catch (PDOException $e) {
    echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
    die();
}

setcookie('play_time', strtotime(date('Y-m-d')));
if (isset($_COOKIE['play_times'])) {
    setcookie('play_times', $_COOKIE['play_times'] + 1);
} else {
    setcookie('play_times', 1);
}

if ($num > MAX_NUM) {
    setcookie('can_get', 0);
    echo json_encode(['code' => '200', 'success' => false, 'msg' => '名额已满']);
} else {
    $rand = rand(1, 100000);
    if ($rand <= RATE) {
        setcookie('can_get', 1);
        echo json_encode(['code' => '200', 'success' => true, 'msg' => '抽中了']);
    } else {
        setcookie('can_get', 0);
        echo json_encode(['code' => '200', 'success' => false, 'msg' => '没抽中']);
    }
}

?>

