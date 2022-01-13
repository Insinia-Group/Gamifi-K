-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Temps de generació: 12-01-2022 a les 18:59:40
-- Versió del servidor: 8.0.25
-- Versió de PHP: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `Ranking` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `description` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `logo` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

CREATE TABLE `RankingUser` (
  `id` int NOT NULL,
  `idRanking` int NOT NULL,
  `idUser` int NOT NULL,
  `points` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `email` int NOT NULL,
  `description` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_spanish2_ci NOT NULL,
  `dateBirth` date NOT NULL,
  `avatar` mediumblob NOT NULL,
  `role` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `dateJoined` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_spanish2_ci;

ALTER TABLE `Ranking`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `RankingUser`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `User`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Ranking`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `RankingUser`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `User`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;
