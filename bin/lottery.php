<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/8/11
 * Time: 下午10:30
 */

const MAX_NUM = 1;
const RATE = 1;

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=vazee', 'root', 'zxc');
    $result = $db->query('select count(*) from users');
    $num = 0;
    foreach ($result as $value) {
        $num = $value[0];
    }

    $db = null;
} catch (PDOException $e) {
    echo json_encode(['code' => '0', 'msg' => '服务器繁忙，请稍后重试']);
    die();
}


if ($num > MAX_NUM) {
    setcookie('can_get', 0);
    echo json_encode(['code' => '0']);
} else {
    $rand = rand(1, 10000);
    if ($rand <= RATE) {
        setcookie('can_get', 1);
        echo json_encode(['code' => '1']);
    } else {
        setcookie('can_get', 0);
        echo json_encode(['code' => '0']);
    }
}


?>

