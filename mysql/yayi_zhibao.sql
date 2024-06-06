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

/*Table structure for table `zhibao` */

DROP TABLE IF EXISTS `zhibao`;

CREATE TABLE `zhibao` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `patient` varchar(100) NOT NULL COMMENT '患者',
  `dateTime` varchar(100) NOT NULL COMMENT '日期',
  `orderNo` varchar(100) DEFAULT NULL COMMENT '订单编号',
  `zhibaoDate` varchar(100) DEFAULT NULL COMMENT '质保日期',
  `hospital` varchar(100) DEFAULT NULL COMMENT '医院、诊所',
  `origin` varchar(100) DEFAULT NULL COMMENT '产品产地',
  `product` varchar(100) DEFAULT NULL COMMENT '产品名称',
  `colorNo` varchar(100) DEFAULT NULL COMMENT '色号',
  `top` varchar(100) DEFAULT NULL COMMENT '上牙位',
  `bottom` varchar(100) DEFAULT NULL COMMENT '下牙位',
  `liscens` varchar(100) DEFAULT NULL COMMENT '生产许可证',
  `certificate` varchar(100) DEFAULT NULL COMMENT '注册证',
  `business` varchar(100) DEFAULT NULL COMMENT '营业执照',
  `imgQr` varchar(100) DEFAULT NULL COMMENT '二维码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='质保表';

/*Data for the table `zhibao` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
