# ************************************************************
# Human Servers Data Specification API (HSDA)
# Version 1.2
#
# http://www.openreferral.com/
#
# Host: {your host}
# Database: hsda
# Generation Time: 2019-03-31 20:33:01 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `details`;

CREATE TABLE `details` (
  `value` text,
  `location_id` varchar(100) DEFAULT NULL,
  `Detail Type` text,
  `service_id` varchar(100) DEFAULT NULL,
  `organization_id` varchar(100) DEFAULT NULL,
  `description` text,
  `phone_id` varchar(100) DEFAULT NULL
) ;

# Dump of table contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` varchar(100) NOT NULL DEFAULT '',
  `organization_id` varchar(100) DEFAULT NULL,
  `service_id` varchar(100) DEFAULT NULL,
  `service_at_location_id` varchar(100) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `department` varchar(500) DEFAULT NULL,
  `email` varchar(750) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;


# Dump of table locations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `locations`;

CREATE TABLE `locations` (
  `id` varchar(38) NOT NULL,
  `organization_id` varchar(38) DEFAULT NULL,
  `name` varchar(500) DEFAULT NULL,
  `alternate_name` varchar(500) DEFAULT NULL,
  `description` text,
  `transportation` varchar(500) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;


# Dump of table organizations
# ------------------------------------------------------------

DROP TABLE IF EXISTS `organizations`;

CREATE TABLE `organizations` (
  `id` varchar(38) NOT NULL,
  `name` varchar(500) DEFAULT NULL,
  `alternate_name` varchar(500) DEFAULT NULL,
  `description` text,
  `email` varchar(500) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `tax_status` varchar(100) DEFAULT NULL,
  `tax_id` varchar(50) DEFAULT NULL,
  `year_incorporated` varchar(50) DEFAULT NULL,
  `legal_status` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;


# Dump of table phones
# ------------------------------------------------------------

DROP TABLE IF EXISTS `phones`;

CREATE TABLE `phones` (
  `id` varchar(100) NOT NULL DEFAULT '',
  `location_id` varchar(100) DEFAULT NULL,
  `service_id` varchar(100) DEFAULT NULL,
  `organization_id` varchar(100) DEFAULT NULL,
  `contact_id` varchar(100) DEFAULT NULL,
  `service_at_location_id` varchar(100) DEFAULT NULL,
  `number` varchar(50) DEFAULT NULL,
  `extension` int(10)  DEFAULT '0',
  `type` varchar(100) DEFAULT NULL,
  `department` varchar(250) DEFAULT NULL,
  `language` varchar(100) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;



# Dump of table address
# ------------------------------------------------------------

DROP TABLE IF EXISTS `address`;

CREATE TABLE `address` (
  `id` varchar(38) NOT NULL,
  `location_id` varchar(38) DEFAULT NULL,
  `attention` varchar(500) DEFAULT NULL,
  `address_1` varchar(250) DEFAULT NULL,
  `address_2` varchar(250) DEFAULT NULL,
  `address_3` varchar(250) DEFAULT NULL,
  `address_4` varchar(250) DEFAULT NULL,
  `city` varchar(250) DEFAULT NULL,
  `region` varchar(250) DEFAULT NULL,
  `state_province` varchar(100) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `country` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;


# Dump of table schedule
# ------------------------------------------------------------

DROP TABLE IF EXISTS `schedule`;

CREATE TABLE `schedule` (
  `id` varchar(100) NOT NULL DEFAULT '',
  `service_id` varchar(100) DEFAULT NULL,
  `location_id` varchar(100) DEFAULT NULL,
  `service_at_location_id` varchar(100) DEFAULT NULL,
  `weekday` varchar(75) DEFAULT '0',
  `opens_at` varchar(75) DEFAULT NULL,
  `closes_at` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;


# Dump of table services
# ------------------------------------------------------------

DROP TABLE IF EXISTS `services`;

CREATE TABLE `services` (
  `id` varchar(38) NOT NULL,
  `organization_id` varchar(38) DEFAULT NULL,
  `program_id` varchar(38) DEFAULT NULL,
  `location_id` varchar(38) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `alternate_name` varchar(1000) DEFAULT NULL,
  `description` text,
  `url` varchar(1000) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `interpretation_services` varchar(1500) DEFAULT NULL,
  `application_process` varchar(1000) DEFAULT NULL,
  `wait_time` varchar(100) DEFAULT NULL,
  `fees` varchar(250) DEFAULT NULL,
  `accreditations` varchar(250) DEFAULT NULL,
  `licenses` varchar(250) DEFAULT NULL,
  `taxonomy_ids` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;



# Dump of table service_area
# ------------------------------------------------------------

DROP TABLE IF EXISTS `service_area`;

CREATE TABLE `service_area` (
  `id` varchar(38) NOT NULL,
  `service_id` varchar(38) DEFAULT NULL,
  `service_area` varchar(1000) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ;


# Dump of table taxonomy
# ------------------------------------------------------------

DROP TABLE IF EXISTS `taxonomy`;

CREATE TABLE `taxonomy` (
  `id` varchar(100) DEFAULT NULL,
  `name` varchar(250) DEFAULT NULL,
  `parent_id` varchar(100) DEFAULT NULL,
  `parent_name` varchar(100) DEFAULT NULL,
  `vocabulary` varchar(250) DEFAULT NULL
) ;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
