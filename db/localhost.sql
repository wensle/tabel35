-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 28 aug 2013 om 20:59
-- Serverversie: 5.5.20
-- PHP-Versie: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webapp`
--
CREATE DATABASE `webapp` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `webapp`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `eenheden`
--

CREATE TABLE IF NOT EXISTS `eenheden` (
  `eenheid_id` int(11) NOT NULL AUTO_INCREMENT,
  `eenheid_woord` varchar(50) NOT NULL COMMENT 'Hier staat de woorden die voor het eenheid staan.',
  `eenheid_symbool` varchar(10) NOT NULL COMMENT 'Hier staat de symbolen die voor het eenheid staan, geformatteerd in LATEX.',
  PRIMARY KEY (`eenheid_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `formules`
--

CREATE TABLE IF NOT EXISTS `formules` (
  `formule_id` int(11) NOT NULL AUTO_INCREMENT,
  `grootheid_id` int(11) NOT NULL,
  `formule` varchar(50) NOT NULL COMMENT 'Dit is de formule zelf, geformatteerd in LATEX. De spaties is waar de formule gescheiden wordt.',
  `formule_omschrijving` varchar(70) NOT NULL,
  PRIMARY KEY (`formule_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Gegevens worden uitgevoerd voor tabel `formules`
--

INSERT INTO `formules` (`formule_id`, `grootheid_id`, `formule`, `formule_omschrijving`) VALUES
(1, 1, 'v,t', 'verplaatsing bij eenparige beweging'),
(2, 1, 'v,_{gem},t', 'verplaatsing bij willekeurige beweging'),
(3, 1, '\\frac{1}{2},a,t,^{2}', 'versnelde beweging zonder beginsnelheid'),
(4, 1, '\\frac{1}{2},a,t,^{2} +,v,(0),t', 'versnelde beweging met beginsnelheid'),
(5, 2, '\\frac{,s,}{,v,}', 'tijd bij eenparige beweging'),
(6, 2, '\\frac{,s,}{,v,_{gem}}', 'tijd bij gemiddelde snelheid'),
(7, 2, '\\sqrt{\\frac{2\\cdot,s,}{,a,}}', 'tijd bij versnelde beweging zonder beginsnelheid'),
(8, 1, '\\Delta ,x, = ,x, (t) - ,x, (0)', 'verplaatsing'),
(9, 4, '\\frac{\\Delta ,v,}{\\Delta ,t,}', 'gemiddelde versnelling'),
(10, 4, '\\frac{2\\cdot ,s}{,t,^{2}}', 'versnelling bij een versnelde beweging zonder beginsnelheid');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `groepen_formules`
--

CREATE TABLE IF NOT EXISTS `groepen_formules` (
  `groep_formules_id` int(11) NOT NULL AUTO_INCREMENT,
  `groep_formules` varchar(50) NOT NULL,
  PRIMARY KEY (`groep_formules_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Gegevens worden uitgevoerd voor tabel `groepen_formules`
--

INSERT INTO `groepen_formules` (`groep_formules_id`, `groep_formules`) VALUES
(1, 'Mechanica'),
(2, 'Trillingen, golven en optica'),
(3, 'Vloeistoffen, gassen en warmteleer'),
(4, 'Elektriciteit en magnetisme'),
(5, 'Overige onderwerpen');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `grootheden`
--

CREATE TABLE IF NOT EXISTS `grootheden` (
  `grootheid_id` int(11) NOT NULL AUTO_INCREMENT,
  `grootheid_woord` varchar(50) NOT NULL COMMENT 'Hier staat de woorden die voor het grootheid staan.',
  `grootheid_symbool` varchar(10) NOT NULL COMMENT 'Hier staat de symbolen die voor het grootheid staan, geformatteerd in LATEX.',
  PRIMARY KEY (`grootheid_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Gegevens worden uitgevoerd voor tabel `grootheden`
--

INSERT INTO `grootheden` (`grootheid_id`, `grootheid_woord`, `grootheid_symbool`) VALUES
(1, 'verplaatsing', 's'),
(2, 'tijd', 't'),
(3, 'snelheid', 'v'),
(4, 'versnelling', 'a'),
(6, 'verplaatsing', 'x');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `subgroepen_formules`
--

CREATE TABLE IF NOT EXISTS `subgroepen_formules` (
  `subgroep_formules_id` int(11) NOT NULL AUTO_INCREMENT,
  `groep_formules_id` int(11) NOT NULL,
  `subgroep_formules` varchar(50) NOT NULL,
  PRIMARY KEY (`subgroep_formules_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

--
-- Gegevens worden uitgevoerd voor tabel `subgroepen_formules`
--

INSERT INTO `subgroepen_formules` (`subgroep_formules_id`, `groep_formules_id`, `subgroep_formules`) VALUES
(1, 1, 'rechtlijnige beweging'),
(2, 1, 'horizontale worp'),
(3, 1, 'eenparige cirkelbeweging'),
(4, 1, 'kracht en impuls'),
(5, 1, 'arbeid en energie'),
(6, 2, 'trillingen'),
(7, 2, 'golven'),
(8, 2, 'geometrische optica'),
(9, 2, 'golfoptica'),
(14, 3, 'algemeen'),
(15, 3, 'vloeistoffen'),
(16, 3, 'gassen'),
(17, 3, 'warmteleer'),
(18, 4, 'stromende elektriciteit'),
(19, 4, 'elektrisch veld'),
(20, 4, 'wisselstroom en inductie'),
(21, 4, 'condensator'),
(22, 5, 'atoomfysica'),
(23, 5, 'kernfysica');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
