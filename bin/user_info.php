<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/8/12
 * Time: 上午10:41
 */

if ($_COOKIE['can_get']) {
    if (isset($_REQUEST['phone']) && isset($_REQUEST['name'])) {
        try {
            $db = new PDO('mysql:host=127.0.0.1;dbname=vazee', 'root', 'zxc');
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $db->prepare("insert into users(phone, user_name, ctime) values(:phone, :username, :ctime)");

            $phone = (int)addslashes($_REQUEST['phone']);
            $username = addslashes($_REQUEST['name']);
            $time = time();
            $stmt->bindParam(':phone', $phone, PDO::PARAM_INT);
            $stmt->bindParam(':username', $username, PDO::PARAM_STR);
            $stmt->bindParam(':ctime', $time, PDO::PARAM_INT);

            $stmt->execute();
            $db = null;
        } catch (PDOException $e) {
            echo json_encode(['code' => '500', 'msg' => '服务器繁忙，请稍后重试']);
            die();
        }

        setcookie('can_get', 0);
        echo json_encode(['code' => '200', 'msg' => '登记成功']);
    } else {
        echo json_encode(['code' => '400', 'msg' => '请按要求填写手机号码和姓名']);
    }

} else {
    echo json_encode(['code' => '400', 'msg' => '不满足领奖条件']);
}



?>