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

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `customer` varchar(100) NOT NULL COMMENT '客户姓名',
  `dateTime` varchar(100) NOT NULL COMMENT '日期',
  `daiyaTime` varchar(100) DEFAULT NULL COMMENT '预计戴牙日期',
  `doctor` varchar(100) DEFAULT NULL COMMENT '面诊医生',
  `proxy` varchar(100) DEFAULT NULL COMMENT '代理人',
  `porcelain` varchar(100) DEFAULT NULL COMMENT '瓷品',
  `tiepianColor` varchar(100) DEFAULT NULL COMMENT '贴片颜色',
  `CADImg` varchar(100) DEFAULT NULL COMMENT 'CAD设计图',
  `checiImg` varchar(100) DEFAULT NULL COMMENT '车瓷设计图',
  `CAD` varchar(100) DEFAULT NULL COMMENT 'CAD设计师',
  `checi` varchar(100) DEFAULT NULL COMMENT '车瓷设计师',
  `frontPhoto` varchar(255) NOT NULL COMMENT '正面微笑照',
  `adviceContent` varchar(255) NOT NULL COMMENT '面诊医生建议',
  `leftFv` varchar(255) DEFAULT NULL COMMENT '左45度',
  `rightFv` varchar(255) DEFAULT NULL COMMENT '右45度',
  `front` varchar(255) DEFAULT NULL COMMENT '正面扩口',
  `leftFvEdge` varchar(255) DEFAULT NULL COMMENT '左45度扩口',
  `rightFvEdge` varchar(255) DEFAULT NULL COMMENT '右45度扩口',
  `intentImg` varchar(255) DEFAULT NULL COMMENT '客户意向照',
  `designAdvice` varchar(255) DEFAULT NULL COMMENT '设计师建议',
  `designList` varchar(65535) DEFAULT NULL COMMENT '设计师图片列表',
  `bianyuanOpen` varchar(255) DEFAULT NULL COMMENT '边缘',
  `bianyuanValue` varchar(255) DEFAULT NULL COMMENT '边缘值',
  `roundOpen` varchar(255) DEFAULT NULL COMMENT '角度方圆',
  `roundValue` varchar(255) DEFAULT NULL COMMENT '角度方圆值',
  `luochaOpen` varchar(255) DEFAULT NULL COMMENT '1号2号落差',
  `luochaValue` varchar(255) DEFAULT NULL COMMENT '1号2号落差值',
  `angleOpen` varchar(255) DEFAULT NULL COMMENT '窄细角度',
  `angleValue` varchar(255) DEFAULT NULL COMMENT '窄细角度值',
  `jiandunOpen` varchar(255) DEFAULT NULL COMMENT '尖or钝',
  `jiandunValue` varchar(255) DEFAULT NULL COMMENT '尖or钝值',
  `qieduanOpen` varchar(255) DEFAULT NULL COMMENT '2号远中切端上扬幅度',
  `qieduanValue` varchar(255) DEFAULT NULL COMMENT '2号远中切端上扬幅度值',
  `textureOpen` varchar(255) DEFAULT NULL COMMENT '纹理',
  `textureValue` varchar(255) DEFAULT NULL COMMENT '纹理值',
  `dotOpen` varchar(255) DEFAULT NULL COMMENT '颈部光点',
  `dotValue` varchar(255) DEFAULT NULL COMMENT '颈部光点值',
  `touliangOpen` varchar(255) DEFAULT NULL COMMENT '透亮',
  `touliangValue` varchar(255) DEFAULT NULL COMMENT '透亮值',
  `linearOpen` varchar(255) DEFAULT NULL COMMENT '切端渐变层',
  `linearValue` varchar(255) DEFAULT NULL COMMENT '切端渐变层值',
  `thicknessOpen` varchar(255) DEFAULT NULL COMMENT '厚度',
  `thicknessValue` varchar(255) DEFAULT NULL COMMENT '厚度值',

  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='客户表';



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


