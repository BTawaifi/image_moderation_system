CREATE DATABASE IF NOT EXISTS moderation_db;

USE moderation_db;

START TRANSACTION;

CREATE TABLE
    IF NOT EXISTS `report` (
        `id` int NOT NULL AUTO_INCREMENT,
        `userId` int NOT NULL,
        `imagePath` text NOT NULL,
        `callbackUrl` text NOT NULL,
        `creationDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        `status` varchar(255) NOT NULL,
        `prefilterReport` text NULL,
        `prefilterReportScore` float NOT NULL DEFAULT '0',
        PRIMARY KEY (`id`)
    );

CREATE TABLE
    IF NOT EXISTS `archive` (
        `id` int NOT NULL AUTO_INCREMENT,
        `userId` int NOT NULL,
        `imagePath` text NOT NULL,
        `callbackUrl` text NOT NULL,
        `creationDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        `status` varchar(255) NOT NULL,
        `prefilterReport` text NULL,
        `prefilterReportScore` float NOT NULL DEFAULT '0',
        PRIMARY KEY (`id`)
    );

COMMIT;