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
  `pais` int(11) DEFAULT NULL,
  `organizador` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bet365` int(11) DEFAULT NULL,
  `bet365_season` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `esporte` (`esporte`),
  KEY `pais` (`pais`) USING BTREE,
  CONSTRAINT `campeonato_pais` FOREIGN KEY (`pais`) REFERENCES `paises` (`id`),
  CONSTRAINT `campeonatos_ibfk_1` FOREIGN KEY (`esporte`) REFERENCES `esportes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1938 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clubes`
--

DROP TABLE IF EXISTS `clubes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `abbr` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `founded` varchar(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iscountry` tinyint(1) NOT NULL,
  `mediumname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `suffix` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bet365` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `country` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `country` (`country`) USING BTREE,
  CONSTRAINT `clube_pais` FOREIGN KEY (`country`) REFERENCES `paises` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6246 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `desempenho_clube`
--

DROP TABLE IF EXISTS `desempenho_clube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desempenho_clube` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clube` int(11) NOT NULL,
  `matches` int(11) DEFAULT NULL,
  `goal_attempts_average` int(11) DEFAULT NULL,
  `goal_attempts_total` int(11) DEFAULT NULL,
  `shots_on_goal_average` int(11) DEFAULT NULL,
  `shots_on_goal_total` int(11) DEFAULT NULL,
  `shots_off_goal_average` int(11) DEFAULT NULL,
  `shots_off_goal_total` int(11) DEFAULT NULL,
  `corner_kicks_average` int(11) DEFAULT NULL,
  `corner_kicks_total` int(11) DEFAULT NULL,
  `ball_possession_average` int(11) DEFAULT NULL,
  `ball_possession_total` int(11) DEFAULT NULL,
  `shots_blocked_average` int(11) DEFAULT NULL,
  `shots_blocked_total` int(11) DEFAULT NULL,
  `cards_given_average` int(11) DEFAULT NULL,
  `cards_given_total` int(11) DEFAULT NULL,
  `freekicks_average` int(11) DEFAULT NULL,
  `freekicks_total` int(11) DEFAULT NULL,
  `offside_average` int(11) DEFAULT NULL,
  `offside_total` int(11) DEFAULT NULL,
  `shots_on_post_average` int(11) DEFAULT NULL,
  `shots_on_post_total` int(11) DEFAULT NULL,
  `shots_on_bar_average` int(11) DEFAULT NULL,
  `shots_on_bar_total` int(11) DEFAULT NULL,
  `goals_by_foot_average` int(11) DEFAULT NULL,
  `goals_by_foot_total` int(11) DEFAULT NULL,
  `goals_by_head_average` int(11) DEFAULT NULL,
  `goals_by_head_total` int(11) DEFAULT NULL,
  `attendance_average` int(11) DEFAULT NULL,
  `attendance_total` int(11) DEFAULT NULL,
  `yellow_cards_average` int(11) DEFAULT NULL,
  `yellow_cards_total` int(11) DEFAULT NULL,
  `red_cards_average` int(11) DEFAULT NULL,
  `red_cards_total` int(11) DEFAULT NULL,
  `goals_scored_average` int(11) DEFAULT NULL,
  `goals_scored_total` int(11) DEFAULT NULL,
  `goals_conceded_average` int(11) DEFAULT NULL,
  `goals_conceded_total` int(11) DEFAULT NULL,
  `yellowred_cards_average` int(11) DEFAULT NULL,
  `yellowred_cards_total` int(11) DEFAULT NULL,
  `shootingefficiency_average` int(11) DEFAULT NULL,
  `shootingefficiency_total` varchar(11) DEFAULT NULL,
  `penalty_success_count_average` int(11) DEFAULT NULL,
  `penalty_success_count_total` varchar(11) DEFAULT NULL,
  `clean_sheet_average` int(11) DEFAULT NULL,
  `clean_sheet_total` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clube` (`clube`),
  CONSTRAINT `estatisticas_desempenhoclube` FOREIGN KEY (`clube`) REFERENCES `clubes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
  `bet365` varchar(30) DEFAULT NULL,
  `typeid` varchar(30) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `matchid` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `seconds` int(11) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `team` varchar(30) DEFAULT NULL,
  `player` int(11) DEFAULT NULL,
  `X` int(11) DEFAULT NULL,
  `Y` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `evento_partida` (`partida`),
  KEY `jogador` (`player`),
  CONSTRAINT `evento_partida` FOREIGN KEY (`partida`) REFERENCES `partida` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=213230 DEFAULT CHARSET=utf16;
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
  `nationality` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nickname` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `imc` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24406 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=24406 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
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
  `active` tinyint(1) DEFAULT NULL,
  `assists` int(11) DEFAULT '0',
  `corners` int(11) DEFAULT '0',
  `first_goals` int(11) DEFAULT '0',
  `goal_points` int(11) DEFAULT '0',
  `goals` int(11) DEFAULT '0',
  `goals_by_header` int(11) DEFAULT '0',
  `last_goals` int(11) DEFAULT '0',
  `lastevent` date DEFAULT NULL,
  `matches` int(11) DEFAULT '0',
  `matches_drawn` int(11) DEFAULT '0',
  `matches_lost` int(11) DEFAULT '0',
  `matches_won` int(11) DEFAULT '0',
  `minutes_played` int(11) DEFAULT '0',
  `number_of_cards_1st_half` int(11) DEFAULT '0',
  `number_of_cards_2nd_half` int(11) DEFAULT '0',
  `offside` int(11) DEFAULT '0',
  `own_goals` int(11) DEFAULT '0',
  `penalties` int(11) DEFAULT '0',
  `red_cards` int(11) DEFAULT '0',
  `shots_blocked` int(11) DEFAULT '0',
  `shots_off_goal` int(11) DEFAULT '0',
  `shots_on_goal` int(11) DEFAULT '0',
  `started` int(11) DEFAULT '0',
  `substituted_in` int(11) DEFAULT '0',
  `substituted_out` int(11) DEFAULT '0',
  `team_conceded` int(11) DEFAULT '0',
  `team_matches` int(11) DEFAULT '0',
  `team_scored` int(11) DEFAULT '0',
  `total_shots` int(11) DEFAULT '0',
  `yellow_cards` int(11) DEFAULT '0',
  `yellowred_card` int(11) DEFAULT '0',
  `yellowred_cards` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `jogador_clube` (`jogador_clube`),
  CONSTRAINT `jogadores_clube_estatistica_ibfk_1` FOREIGN KEY (`jogador_clube`) REFERENCES `jogadores_clube` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8093 DEFAULT CHARSET=utf16;
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
) ENGINE=InnoDB AUTO_INCREMENT=50706 DEFAULT CHARSET=utf16;
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
-- Table structure for table `overunder_clube`
--

DROP TABLE IF EXISTS `overunder_clube`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `overunder_clube` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clube` int(11) NOT NULL,
  `matches` int(11) DEFAULT NULL,
  `homematches` int(11) DEFAULT NULL,
  `awaymatches` int(11) DEFAULT NULL,
  `goalsscored_p1_total` int(11) DEFAULT NULL,
  `goalsscored_p1_average` int(11) DEFAULT NULL,
  `goalsscored_p1_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p1_matches` int(11) DEFAULT NULL,
  `goalsscored_p1_home_total` int(11) DEFAULT NULL,
  `goalsscored_p1_home_average` int(11) DEFAULT NULL,
  `goalsscored_p1_home_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p1_home_matches` int(11) DEFAULT NULL,
  `goalsscored_p1_away_total` int(11) DEFAULT NULL,
  `goalsscored_p1_away_average` int(11) DEFAULT NULL,
  `goalsscored_p1_away_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p1_away_matches` int(11) DEFAULT NULL,
  `goalsscored_ft_total` int(11) DEFAULT NULL,
  `goalsscored_ft_average` int(11) DEFAULT NULL,
  `goalsscored_ft_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_ft_matches` int(11) DEFAULT NULL,
  `goalsscored_ft_home_total` int(11) DEFAULT NULL,
  `goalsscored_ft_home_average` int(11) DEFAULT NULL,
  `goalsscored_ft_home_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_ft_home_matches` int(11) DEFAULT NULL,
  `goalsscored_ft_away_total` int(11) DEFAULT NULL,
  `goalsscored_ft_away_average` int(11) DEFAULT NULL,
  `goalsscored_ft_away_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_ft_away_matches` int(11) DEFAULT NULL,
  `goalsscored_p2_total` int(11) DEFAULT NULL,
  `goalsscored_p2_average` int(11) DEFAULT NULL,
  `goalsscored_p2_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p2_matches` int(11) DEFAULT NULL,
  `goalsscored_p2_home_total` int(11) DEFAULT NULL,
  `goalsscored_p2_home_average` int(11) DEFAULT NULL,
  `goalsscored_p2_home_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p2_home_matches` int(11) DEFAULT NULL,
  `goalsscored_p2_away_total` int(11) DEFAULT NULL,
  `goalsscored_p2_away_average` int(11) DEFAULT NULL,
  `goalsscored_p2_away_atleastonegoal` int(11) DEFAULT NULL,
  `goalsscored_p2_away_matches` int(11) DEFAULT NULL,
  `conceded_p1_total` int(11) DEFAULT NULL,
  `conceded_p1_average` int(11) DEFAULT NULL,
  `conceded_p1_cleansheets` int(11) DEFAULT NULL,
  `conceded_p1_matches` int(11) DEFAULT NULL,
  `conceded_p1_home_total` int(11) DEFAULT NULL,
  `conceded_p1_home_average` int(11) DEFAULT NULL,
  `conceded_p1_home_cleansheets` int(11) DEFAULT NULL,
  `conceded_p1_home_matches` int(11) DEFAULT NULL,
  `conceded_p1_away_total` int(11) DEFAULT NULL,
  `conceded_p1_away_average` int(11) DEFAULT NULL,
  `conceded_p1_away_cleansheets` int(11) DEFAULT NULL,
  `conceded_p1_away_matches` int(11) DEFAULT NULL,
  `conceded_ft_total` int(11) DEFAULT NULL,
  `conceded_ft_average` int(11) DEFAULT NULL,
  `conceded_ft_cleansheets` int(11) DEFAULT NULL,
  `conceded_ft_matches` int(11) DEFAULT NULL,
  `conceded_ft_home_total` int(11) DEFAULT NULL,
  `conceded_ft_home_average` int(11) DEFAULT NULL,
  `conceded_ft_home_cleansheets` int(11) DEFAULT NULL,
  `conceded_ft_home_matches` int(11) DEFAULT NULL,
  `conceded_ft_away_total` int(11) DEFAULT NULL,
  `conceded_ft_away_average` int(11) DEFAULT NULL,
  `conceded_ft_away_cleansheets` int(11) DEFAULT NULL,
  `conceded_ft_away_matches` int(11) DEFAULT NULL,
  `conceded_p2_total` int(11) DEFAULT NULL,
  `conceded_p2_average` int(11) DEFAULT NULL,
  `conceded_p2_cleansheets` int(11) DEFAULT NULL,
  `conceded_p2_matches` int(11) DEFAULT NULL,
  `conceded_p2_home_total` int(11) DEFAULT NULL,
  `conceded_p2_home_average` int(11) DEFAULT NULL,
  `conceded_p2_home_cleansheets` int(11) DEFAULT NULL,
  `conceded_p2_home_matches` int(11) DEFAULT NULL,
  `conceded_p2_away_total` int(11) DEFAULT NULL,
  `conceded_p2_away_average` int(11) DEFAULT NULL,
  `conceded_p2_away_cleansheets` int(11) DEFAULT NULL,
  `conceded_p2_away_matches` int(11) DEFAULT NULL,
  `total_p1_0_5_over` int(11) DEFAULT NULL,
  `total_p1_0_5_under` int(11) DEFAULT NULL,
  `total_p1_1_5_over` int(11) DEFAULT NULL,
  `total_p1_1_5_under` int(11) DEFAULT NULL,
  `total_p1_2_5_over` int(11) DEFAULT NULL,
  `total_p1_2_5_under` int(11) DEFAULT NULL,
  `total_p1_3_5_over` int(11) DEFAULT NULL,
  `total_p1_3_5_under` int(11) DEFAULT NULL,
  `total_p1_4_5_over` int(11) DEFAULT NULL,
  `total_p1_4_5_under` int(11) DEFAULT NULL,
  `total_p1_5_5_over` int(11) DEFAULT NULL,
  `total_p1_5_5_under` int(11) DEFAULT NULL,
  `total_ft_0_5_over` int(11) DEFAULT NULL,
  `total_ft_0_5_under` int(11) DEFAULT NULL,
  `total_ft_1_5_over` int(11) DEFAULT NULL,
  `total_ft_1_5_under` int(11) DEFAULT NULL,
  `total_ft_2_5_over` int(11) DEFAULT NULL,
  `total_ft_2_5_under` int(11) DEFAULT NULL,
  `total_ft_3_5_over` int(11) DEFAULT NULL,
  `total_ft_3_5_under` int(11) DEFAULT NULL,
  `total_ft_4_5_over` int(11) DEFAULT NULL,
  `total_ft_4_5_under` int(11) DEFAULT NULL,
  `total_ft_5_5_over` int(11) DEFAULT NULL,
  `total_ft_5_5_under` int(11) DEFAULT NULL,
  `total_p2_0_5_over` int(11) DEFAULT NULL,
  `total_p2_0_5_under` int(11) DEFAULT NULL,
  `total_p2_1_5_over` int(11) DEFAULT NULL,
  `total_p2_1_5_under` int(11) DEFAULT NULL,
  `total_p2_2_5_over` int(11) DEFAULT NULL,
  `total_p2_2_5_under` int(11) DEFAULT NULL,
  `total_p2_3_5_over` int(11) DEFAULT NULL,
  `total_p2_3_5_under` int(11) DEFAULT NULL,
  `total_p2_4_5_over` int(11) DEFAULT NULL,
  `total_p2_4_5_under` int(11) DEFAULT NULL,
  `total_p2_5_5_over` int(11) DEFAULT NULL,
  `total_p2_5_5_under` int(11) DEFAULT NULL,
  `home_p1_0_5_over` int(11) DEFAULT NULL,
  `home_p1_0_5_under` int(11) DEFAULT NULL,
  `home_p1_1_5_over` int(11) DEFAULT NULL,
  `home_p1_1_5_under` int(11) DEFAULT NULL,
  `home_p1_2_5_over` int(11) DEFAULT NULL,
  `home_p1_2_5_under` int(11) DEFAULT NULL,
  `home_p1_3_5_over` int(11) DEFAULT NULL,
  `home_p1_3_5_under` int(11) DEFAULT NULL,
  `home_p1_4_5_over` int(11) DEFAULT NULL,
  `home_p1_4_5_under` int(11) DEFAULT NULL,
  `home_p1_5_5_over` int(11) DEFAULT NULL,
  `home_p1_5_5_under` int(11) DEFAULT NULL,
  `home_ft_0_5_over` int(11) DEFAULT NULL,
  `home_ft_0_5_under` int(11) DEFAULT NULL,
  `home_ft_1_5_over` int(11) DEFAULT NULL,
  `home_ft_1_5_under` int(11) DEFAULT NULL,
  `home_ft_2_5_over` int(11) DEFAULT NULL,
  `home_ft_2_5_under` int(11) DEFAULT NULL,
  `home_ft_3_5_over` int(11) DEFAULT NULL,
  `home_ft_3_5_under` int(11) DEFAULT NULL,
  `home_ft_4_5_over` int(11) DEFAULT NULL,
  `home_ft_4_5_under` int(11) DEFAULT NULL,
  `home_ft_5_5_over` int(11) DEFAULT NULL,
  `home_ft_5_5_under` int(11) DEFAULT NULL,
  `home_p2_0_5_over` int(11) DEFAULT NULL,
  `home_p2_0_5_under` int(11) DEFAULT NULL,
  `home_p2_1_5_over` int(11) DEFAULT NULL,
  `home_p2_1_5_under` int(11) DEFAULT NULL,
  `home_p2_2_5_over` int(11) DEFAULT NULL,
  `home_p2_2_5_under` int(11) DEFAULT NULL,
  `home_p2_3_5_over` int(11) DEFAULT NULL,
  `home_p2_3_5_under` int(11) DEFAULT NULL,
  `home_p2_4_5_over` int(11) DEFAULT NULL,
  `home_p2_4_5_under` int(11) DEFAULT NULL,
  `home_p2_5_5_over` int(11) DEFAULT NULL,
  `home_p2_5_5_under` int(11) DEFAULT NULL,
  `away_p1_0_5_over` int(11) DEFAULT NULL,
  `away_p1_0_5_under` int(11) DEFAULT NULL,
  `away_p1_1_5_over` int(11) DEFAULT NULL,
  `away_p1_1_5_under` int(11) DEFAULT NULL,
  `away_p1_2_5_over` int(11) DEFAULT NULL,
  `away_p1_2_5_under` int(11) DEFAULT NULL,
  `away_p1_3_5_over` int(11) DEFAULT NULL,
  `away_p1_3_5_under` int(11) DEFAULT NULL,
  `away_p1_4_5_over` int(11) DEFAULT NULL,
  `away_p1_4_5_under` int(11) DEFAULT NULL,
  `away_p1_5_5_over` int(11) DEFAULT NULL,
  `away_p1_5_5_under` int(11) DEFAULT NULL,
  `away_ft_0_5_over` int(11) DEFAULT NULL,
  `away_ft_0_5_under` int(11) DEFAULT NULL,
  `away_ft_1_5_over` int(11) DEFAULT NULL,
  `away_ft_1_5_under` int(11) DEFAULT NULL,
  `away_ft_2_5_over` int(11) DEFAULT NULL,
  `away_ft_2_5_under` int(11) DEFAULT NULL,
  `away_ft_3_5_over` int(11) DEFAULT NULL,
  `away_ft_3_5_under` int(11) DEFAULT NULL,
  `away_ft_4_5_over` int(11) DEFAULT NULL,
  `away_ft_4_5_under` int(11) DEFAULT NULL,
  `away_ft_5_5_over` int(11) DEFAULT NULL,
  `away_ft_5_5_under` int(11) DEFAULT NULL,
  `away_p2_0_5_over` int(11) DEFAULT NULL,
  `away_p2_0_5_under` int(11) DEFAULT NULL,
  `away_p2_1_5_over` int(11) DEFAULT NULL,
  `away_p2_1_5_under` int(11) DEFAULT NULL,
  `away_p2_2_5_over` int(11) DEFAULT NULL,
  `away_p2_2_5_under` int(11) DEFAULT NULL,
  `away_p2_3_5_over` int(11) DEFAULT NULL,
  `away_p2_3_5_under` int(11) DEFAULT NULL,
  `away_p2_4_5_over` int(11) DEFAULT NULL,
  `away_p2_4_5_under` int(11) DEFAULT NULL,
  `away_p2_5_5_over` int(11) DEFAULT NULL,
  `away_p2_5_5_under` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clube` (`clube`),
  CONSTRAINT `estatisticas_clube` FOREIGN KEY (`clube`) REFERENCES `clubes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `bet365` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf16;
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
  `data` date NOT NULL,
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
  KEY `campeonato` (`campeonato`),
  CONSTRAINT `partica_campeonato` FOREIGN KEY (`campeonato`) REFERENCES `campeonatos` (`id`),
  CONSTRAINT `partidas_away_clube_ibfk_1` FOREIGN KEY (`away_id`) REFERENCES `clubes` (`id`),
  CONSTRAINT `partidas_home_clube_ibfk_1` FOREIGN KEY (`home_id`) REFERENCES `clubes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1478 DEFAULT CHARSET=utf16;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-05 23:53:24
