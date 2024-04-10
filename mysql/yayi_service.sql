/*
SQLyog Ultimate v11.3 (64 bit)
MySQL - 5.7.32-log : Database - ssm9087m
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`yayi` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `yayi`;

/*Table structure for table `service` */

DROP TABLE IF EXISTS `service`;

CREATE TABLE `service` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer_id` bigint(20) NOT NULL  COMMENT '用户表ID',
  `tryInfo`longtext NOT NULL COMMENT '试戴次数',
  `recoverInfo` longtext NOT NULL COMMENT '修改次数',
  `imgList` longtext DEFAULT NULL COMMENT '牙齿列表',
 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='售后表';


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
