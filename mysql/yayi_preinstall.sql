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

/*Table structure for table `preinstall` */

DROP TABLE IF EXISTS `preinstall`;

CREATE TABLE `preinstall` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `bianyuan` longtext NOT NULL COMMENT '边缘',
  `round` longtext NOT NULL COMMENT '角度方圆',
  `luocha` longtext DEFAULT NULL COMMENT '1号2号落差',
  `angle` longtext DEFAULT NULL COMMENT '窄细角度',
  `jiandun` longtext DEFAULT NULL COMMENT '尖or钝',
  `qieduan` longtext DEFAULT NULL COMMENT '2号远中切端上扬幅度',
  `texture` longtext DEFAULT NULL COMMENT '纹理',
  `touliang` longtext DEFAULT NULL COMMENT '透亮',
  `dot` longtext DEFAULT NULL COMMENT '颈部光点',
  `linear` longtext DEFAULT NULL COMMENT '切端渐变层',
  `thickness` longtext DEFAULT NULL COMMENT '厚度',
  `root` varchar(255)  DEFAULT NULL COMMENT '超级管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='用户表';


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
