CREATE TABLE `users` (
`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
`phone` BIGINT(20) NOT NULL COMMENT '手机号码',
`user_name` VARCHAR(32) NOT NULL COMMENT '用户名字',
`ctime` INT(11) COMMENT '操作时间',
PRIMARY KEY (`id`, `phone`)
) ENGINE = InnoDB COMMENT = '用户信息';