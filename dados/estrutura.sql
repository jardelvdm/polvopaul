-- MySQL dump 10.13  Distrib 5.7.31, for Win64 (x86_64)
--
-- Host: localhost    Database: polvopaul
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `campeonatos`
--

DROP TABLE IF EXISTS `campeonatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campeonatos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `esporte` int(11) NOT NULL,
  `pais` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `organizador` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bet365` int(11) DEFAULT NULL,
  `bet365_season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `esporte` (`esporte`),
  CONSTRAINT `campeonatos_ibfk_1` FOREIGN KEY (`esporte`) REFERENCES `esportes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clubes`
--

DROP TABLE IF EXISTS `clubes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abbr`  varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `founded`  varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iscountry` tinyint(1) NOT NULL,
  `mediumname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name`  varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nickname`  varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `suffix` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bet365` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_unicode_ci NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `esportes`
--

DROP TABLE IF EXISTS `esportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `esportes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `eventos_partida`
--

DROP TABLE IF EXISTS `eventos_partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `eventos_partida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partida` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogadores`
--

DROP TABLE IF EXISTS `jogadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nascimento` date NOT NULL,
  `posicao` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `numero` int(11) NOT NULL,
  `bet365` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `marketValue` int(11) DEFAULT NULL,
  `nationality` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogadores_clube`
--

DROP TABLE IF EXISTS `jogadores_clube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogadores_clube` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jogador_id` int(11) NOT NULL,
  `clube_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jogador_clube` (`jogador_id`),
  KEY `clube` (`clube_id`),
  CONSTRAINT `jogadores_clube_ibfk_1` FOREIGN KEY (`jogador_id`) REFERENCES `jogadores` (`id`),
  CONSTRAINT `jogadores_clube_ibfk_2` FOREIGN KEY (`clube_id`) REFERENCES `clubes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogadores_estatisticas`
--

DROP TABLE IF EXISTS `jogadores_estatisticas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogadores_estatisticas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `jogador_clube` int(11) NOT NULL,
  `yellow_cards` int(11) DEFAULT NULL,
  `matches` int(11) DEFAULT NULL,
  `shots_on_goal` int(11) DEFAULT NULL,
  `shots_off_goal` int(11) DEFAULT NULL,
  `shots_blocked` int(11) DEFAULT NULL,
  `minutes_played` int(11) DEFAULT NULL,
  `substituted_in` int(11) DEFAULT NULL,
  `substituted_out` int(11) DEFAULT NULL,
  `team_scored` int(11) DEFAULT NULL,
  `team_conceded` int(11) DEFAULT NULL,
  `total_shots` int(11) DEFAULT NULL,
  `matches_won` int(11) DEFAULT NULL,
  `matches_lost` int(11) DEFAULT NULL,
  `matches_drawn` int(11) DEFAULT NULL,
  `number_of_cards_2nd_half` int(11) DEFAULT NULL,
  `goals` int(11) DEFAULT NULL,
  `offside` int(11) DEFAULT NULL,
  `penalties` int(11) DEFAULT NULL,
  `goal_points` int(11) DEFAULT NULL,
  `last_goals` int(11) DEFAULT NULL,
  `assists` int(11) DEFAULT NULL,
  `first_goals` int(11) DEFAULT NULL,
  `corners` int(11) DEFAULT NULL,
  `number_of_cards_1st_half` int(11) DEFAULT NULL,
  `goals_by_header` int(11) DEFAULT NULL,
  `red_cards` int(11) DEFAULT NULL,
  `own_goals` int(11) DEFAULT NULL,
  `yellowred_card` int(11) DEFAULT NULL,
  `yellowred_cards` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `jogador_clube` (`jogador_clube`),
  CONSTRAINT `jogadores_clube_estatistica_ibfk_1` FOREIGN KEY (`jogador_clube`) REFERENCES `jogadores_clube` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogadores_partida`
--

DROP TABLE IF EXISTS `jogadores_partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogadores_partida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partida` int(11) NOT NULL,
  `jogador_clube` int(11) DEFAULT NULL,
  `bet365` int(11) NOT NULL,
  `local` tinyint(1) NOT NULL,
  `titular` tinyint(1) DEFAULT NULL,
  `shirtnumber` int(11) DEFAULT NULL,
  `minutosjogados` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `partida` (`partida`),
  KEY `jogador_clube` (`jogador_clube`),
  CONSTRAINT `jogadores_partidas_jogadorID` FOREIGN KEY (`jogador_clube`) REFERENCES `jogadores_clube` (`id`),
  CONSTRAINT `jogadores_partidas_partidaID` FOREIGN KEY (`partida`) REFERENCES `partida` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogadores_skills`
--

DROP TABLE IF EXISTS `jogadores_skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogadores_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `skill_id` int(11) NOT NULL,
  `jogador_clube` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `skill_id` (`skill_id`),
  KEY `jogador_clube` (`jogador_clube`),
  CONSTRAINT `jogadores_clube_ref_ibfk_1` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  CONSTRAINT `jogadores_clube_skill_ibfk_1` FOREIGN KEY (`jogador_clube`) REFERENCES `jogadores_clube` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partida`
--

DROP TABLE IF EXISTS `partida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partida` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `esporte` int(11) NOT NULL,
  `campeonato` int(11) DEFAULT NULL,
  `bet365` int(11) NOT NULL,
  `home_id` int(11) DEFAULT NULL,
  `away_id` int(11) DEFAULT NULL,
  `round` int(11) NOT NULL,
  `intervalo_home` varchar(20) DEFAULT NULL,
  `intervalo_away` varchar(20) DEFAULT NULL,
  `result_home` varchar(20) DEFAULT NULL,
  `result_away` varchar(20) DEFAULT NULL,
  `period` enum('nt','prorroga├º├úo','penalti','ap') NOT NULL,
  `vencedor` varchar(100) NOT NULL,
  `week` int(11) NOT NULL,
  `comment` text,
  `stadiumid` int(11) NOT NULL,
  `matchdifficultyrating_home` int(11) NOT NULL,
  `matchdifficultyrating_away` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `home_id` (`home_id`),
  KEY `away_id` (`away_id`),
  CONSTRAINT `partidas_away_clube_ibfk_1` FOREIGN KEY (`away_id`) REFERENCES `clubes` (`id`),
  CONSTRAINT `partidas_home_clube_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `clubes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skiils_tipos`
--

DROP TABLE IF EXISTS `skiils_tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skiils_tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` text,
  `key` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tipo` (`tipo`),
  CONSTRAINT `skills_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `skiils_tipos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-30 22:27:13
