<?php
/**
 * Created by PhpStorm.
 * User: sysumeepo
 * Date: 15/8/14
 * Time: 上午12:36
 */

require_once '../Classes/PHPExcel.php';

date_default_timezone_set('ETC/GMT-8');

try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=vazee', 'root', 'zxc');
    $result = $db->query('select phone, user_name from users');
    $excel = new PHPExcel();
    $excel->getActiveSheet()->setCellValue('A1', '手机号码');
    $excel->getActiveSheet()->setCellValue('B1', '姓名');

    $i = 2;
    foreach ($result as $value) {
        $excel->getActiveSheet()->setCellValue('A' . $i, $value['phone']);
        $excel->getActiveSheet()->setCellValue('B' . $i, $value['user_name']);
        $i++;
    }

    $filename = '中奖名单.xls';
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename=$filename');
    header('Cache-Control: max-age=0');
    $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
    $objWriter->save($filename);

    $db = null;
} catch (PDOException $e) {
    echo "can't connect to mysql";
}



?>