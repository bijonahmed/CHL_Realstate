-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2025 at 07:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_real_state`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_configs`
--

CREATE TABLE `api_configs` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `app_id` varchar(255) NOT NULL,
  `api_url` varchar(255) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `api_configs`
--

INSERT INTO `api_configs` (`id`, `name`, `app_id`, `api_url`, `api_key`, `created_at`, `updated_at`) VALUES
(1, 'Game List', '771', 'https://api-gametest.omgapi.cc/api/game/loadlist', 'dc7df6a77d8e82fcf26062d773b8d385', '2024-10-17 04:52:28', '2024-10-17 04:52:31');

-- --------------------------------------------------------

--
-- Table structure for table `api_key`
--

CREATE TABLE `api_key` (
  `id` int(11) NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `key` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `api_key`
--

INSERT INTO `api_key` (`id`, `merchant_id`, `key`, `password`, `status`, `created_at`, `updated_at`) VALUES
(1, 6, 'hkttruzpxboovmme7s7ua6cppa6m0xp8', 'xRSLnG38I9uH', 1, '2024-12-08 13:33:06', '2024-12-08 15:26:39'),
(4, 3, 'TQUiTZzqypMpwSNTaKS1kye2p1MGd4tNvK', 'LRWwU5D6womf', 1, '2024-12-08 15:26:59', '2025-01-12 23:21:37'),
(5, 5, '5yjjrs1dqc064ikm9zf1opiyblj4xn4n', 'cTQt96aJIQZg', 1, '2024-12-08 15:30:33', '2024-12-08 15:30:33'),
(7, 22, 'a1z796m6004vd9t6euj6aheey7pieprg', 'BuUWvdAEE6pw', 1, '2025-01-10 14:39:03', '2025-01-10 14:39:03');

-- --------------------------------------------------------

--
-- Table structure for table `bed_type`
--

CREATE TABLE `bed_type` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bed_type`
--

INSERT INTO `bed_type` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, '1 large double bed', '1-large-double-bed', 1, '2025-04-03 12:03:28', '2025-04-03 12:03:28'),
(2, '2 large double bed', '2-large-double-bed', 1, '2025-04-03 12:03:57', '2025-04-03 12:03:57'),
(3, '1 extra-large double bed', '1-extra-large-double-bed', 1, '2025-04-03 12:07:29', '2025-04-03 12:07:29'),
(4, '2 extra-large double bed', '2-extra-large-double-bed', 1, '2025-04-03 12:17:16', '2025-04-03 12:17:16');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` int(10) UNSIGNED NOT NULL,
  `booking_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `room_id` int(10) UNSIGNED NOT NULL,
  `adult` int(11) DEFAULT 0,
  `child` int(11) DEFAULT 0,
  `room_price` double(10,2) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `arival_from` text DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `paymenttype` int(11) DEFAULT NULL COMMENT '1=online,2=offline',
  `booking_status` int(11) DEFAULT NULL COMMENT '1=Booked\r\n2=Release\r\n3=Cancel',
  `update_by` int(11) DEFAULT NULL,
  `booking_by` int(11) DEFAULT NULL COMMENT 'this admin entry track which user entry',
  `check_out_reason` text DEFAULT NULL,
  `check_out_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`id`, `booking_id`, `name`, `email`, `phone`, `checkin`, `checkout`, `room_id`, `adult`, `child`, `room_price`, `message`, `arival_from`, `customer_id`, `paymenttype`, `booking_status`, `update_by`, `booking_by`, `check_out_reason`, `check_out_by`, `created_at`, `updated_at`) VALUES
(1, '66962', 'Guest 1', 'guest1@gmail.com', '019155555111', '2025-04-12', '2025-04-20', 4, 20, 10, 19528.00, 'Living room: 1 sofa bed Comfy beds, 10 – Based on 1 review The unit has 2 beds.', 'Dhaka', 8, 2, 2, 1, NULL, 'this booking id relaease 66962', 1, '2025-04-12 05:58:52', '2025-04-15 11:24:34'),
(2, '56039', 'Guest 2', 'Guest2@gmail.com', NULL, '2025-04-20', '2025-04-25', 4, 0, 0, 19528.00, NULL, NULL, 9, 2, 2, NULL, NULL, '56039', 1, '2025-04-12 06:00:42', '2025-04-15 11:29:34'),
(3, '68387', 'Mr. Kamal', 'kamal897@gmail.com', NULL, '2025-04-13', '2025-04-23', 1, 1, 10, 7323.00, NULL, NULL, 9, 2, 2, NULL, NULL, 'testss', 1, '2025-04-12 06:44:51', '2025-04-15 11:31:29'),
(4, '45783', 'Abdur Rahman', 'abdurrahman@gmail.com', '00114568982', '2025-04-25', '2025-04-27', 1, 0, 0, 7323.00, NULL, NULL, 10, 2, 3, NULL, NULL, 'swss', 1, '2025-04-15 06:27:01', '2025-04-15 11:31:51'),
(5, '48956', 'Mowloda Begum', 'mowloda@gmail.com', NULL, '2025-04-17', '2025-04-19', 3, 5, 5, 19528.00, NULL, NULL, 10, 2, 1, NULL, NULL, NULL, NULL, '2025-04-15 06:28:15', '2025-04-15 06:28:15'),
(7, '60174', 'sajibAhmed', 'sajibahmed@gmail.com', '0125647878788', '2025-04-28', '2025-04-30', 2, 7, NULL, 19528.00, NULL, NULL, 14, 2, 1, 1, NULL, NULL, NULL, '2025-04-15 08:31:16', '2025-04-15 08:38:27');

-- --------------------------------------------------------

--
-- Table structure for table `booking_type`
--

CREATE TABLE `booking_type` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `booking_type`
--

INSERT INTO `booking_type` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'SSSSS', 'sssss', 1, '2025-03-31 06:21:21', '2025-03-31 06:37:09'),
(2, 'Instant', 'instant', 1, '2025-03-31 06:21:31', '2025-03-31 06:21:31'),
(3, 'Groups', 'groups', 1, '2025-03-31 06:21:40', '2025-03-31 06:21:40'),
(4, 'Allocation', 'allocation', 1, '2025-03-31 06:21:46', '2025-03-31 06:21:46'),
(5, 'Business Seminar', 'business-seminar', 1, '2025-03-31 06:21:51', '2025-03-31 06:21:51'),
(6, 'Wedding', 'wedding', 1, '2025-03-31 06:21:56', '2025-03-31 06:21:56'),
(7, 'Birthday', 'birthday', 1, '2025-03-31 06:22:01', '2025-03-31 06:22:01'),
(8, 'Photoshoot', 'photoshoot', 1, '2025-03-31 06:22:06', '2025-03-31 06:22:06');

-- --------------------------------------------------------

--
-- Table structure for table `bulk_address`
--

CREATE TABLE `bulk_address` (
  `id` int(11) NOT NULL,
  `merchant_id` int(11) DEFAULT NULL,
  `walletAddress` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `block_status` int(11) NOT NULL DEFAULT 0 COMMENT '0=unblock,1=block',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `entry_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bulk_address`
--

INSERT INTO `bulk_address` (`id`, `merchant_id`, `walletAddress`, `status`, `block_status`, `created_at`, `updated_at`, `entry_by`) VALUES
(2, 3, 'TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:38:30', 1),
(3, 3, 'JkP2d0VjGl98rF3Xz73s5Ye6ZTx4aBcqVJ', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(4, 3, '7pKm1NhbYoVqjW2tFJg8hV5Lp1sXyXtM2Z', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(5, 3, 'L3Pc9VrAK6f0WGb7hy2h7X0jt8Q7JwFcNe', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(6, 3, '0NzQ5R9kmTk04c2J7hZ2pHmQyFxpmW8cuv', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(7, 3, 'Bm5rTY7g1jw0AZ0eqP4k9h11vf4sQJklo1', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(8, 3, '8Wm2j1y1r7l3fXaPzR4Vgt8Q3KL64Db3Fw', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(9, 3, '4Ghp2KxA93NFzVy94P6tkGv7Qf1JxkL2X3', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(10, 3, 'kGfX6bY2aq4d80m3zV3jmGpLmPbF8hR2yX', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(11, 3, 'LdT6s3TqGh7Ykn9mAP0jZ3f5Qs1KwN08po', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(12, 3, '1n9Xf2tmLjv4b7cH5Y1KQwBz7e6s1kpN3E', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(13, 3, 'YR8Kv5PQFgXr2WoQFzXcz77n8bPLk09Z2A', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(14, 3, 'oZ4fTmYbHz88rI6WqP2g3xvL6h81Akh09X', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(15, 3, '3bWxTY4P6L0oC7Z8p9fE5DxNzS0yGVZ1Za', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(16, 3, '4AzM9PnS3t7pXg5u0vKcZ8GJXq2Wtf1lS', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(17, 3, 'P6v0n9p6Lh2XbE2mRyq5m0XsZ8K3V5Wk5H', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(18, 3, '8T7tV13oJbC92H4nS0Y0y7XZ7gKp29fB0h', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(19, 3, '2BxKa3p5JhR16vFzH1k4n9d8rLlm0w9VvD', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(20, 3, 'K2hWm4oFqR3ZkL2N1hN8yZ9Yb1tGvM7f7u', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(21, 3, 'oZt85c7m9W4zH9p6QaV0RZm8kXwP2uQ5Hh', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(22, 3, '0Tj8nN4Lkz5pX63X7g9vQ0sDb61CrZTj1D', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(23, 3, 'fC7t9k6bW0z9Yc8mVR2pLm3qF11XlO2n2y', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(24, 3, '2Gb0uH5jJf8t3m9kR1e2n9v7Z5l0G5Xj6', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(25, 3, 'yA0P8c3oZlK6r1DqR9v3d1W9x5Qh8V1mjY', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(26, 3, '3vGnC0d7R8X8y2jSh5m7fQcW9K7a2rjOhC', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(27, 3, 'YV3P6yJ2l9F0k1R6z9V2t9bPq7n2W0Lj1m', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(28, 3, '7gMr8zP2XkS4tD5nJ1p5V1Hq9bR4G9x0o', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(29, 3, 'fP1L6Vt0h2wR8d7nK2cJg5LmX0t9F9m1z7', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(30, 3, '3Tk8qF6oVbL1m3r1Z5Xy9fN1dJ6V7p9XH6', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(31, 3, 'B8gYf7P0Wm0X7F2T9hQ0J3y1b8g0d6m9oG', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(32, 3, 'V7z5K1v9cP6J4Z2r8qLmT0Wf7vH9Y8P5oD', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(33, 3, 'wU2V8c7mJ4gQ5r1o3p9L6yN9n0B8tG2h1J', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(34, 3, 'd9p8t9F4V3v2H8XK8L1Z9Q3W7t0y9C0r6A', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(35, 3, '5gY7kL9t6m9wH4y2Xr7pD9Z1n9t5V2Xb9L', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(36, 3, 'd8M9XyP6K7g0t8Jz1N3r7v9Wb0p6j9g1K', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(37, 3, 'o0R5d2N5tVb9X4y5qQ0M7P2h1F6C8j7Xy', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(38, 3, 'h2n8c5pV7Y1g3B8F7r0X9v9g6T5q9K1o9', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(39, 3, '3B0qF1R9p3dL7M9J6Y8z5Vb0o5X6H9p1z', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(40, 3, '5R3Z8V6p2F1m1W2tL0pV1K8n3B5x8v2L0', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(41, 3, 'Y7k2Q9z7P1t3F5J6gW0p9b8hV2m0X9R0D', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(42, 3, 'Z6wJ0v9dP1F2r1n8tM6L3t9Q9g5X3d5Xy', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(43, 3, 'f4P9X1Z0gK7v2J3p4mR6L8n5t9X6o7W7G', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(44, 3, 'H3Q9W2b5dR0zK7y9mX3P9t0F6w3o7d5Y6', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(45, 3, '0Q3J7p9L1X8g5Y2V9tW3R2zF9J1p4m7bY', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(46, 3, 'X9F0t2b7m0Q3Z8d9gY6L2J1V5n3H6p0W2', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(47, 3, 'j0L9t5P1fR8y2X5m7b3Q7v1Z5g9V0T7Xx', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(48, 3, '0X5Yt9h1pK7q6d8n2F1g3W9J5V8L9c6m2', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(49, 3, '4b0m6H5K2V3y8N0X7p1t9J1r8g7f3W0m3', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(50, 3, 'J2Q4y9W6g1tR7d3Z8p5F3V2mK8v9L1X0N', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(51, 3, '1P9J2yF5X6vR7L8m9n0b3Q7X9Y0t9K7oP', 1, 0, '2025-01-12 22:07:49', '2025-01-12 22:07:49', 4),
(53, 3, '0Q3J7p9L1X8g5Y2V9tW3R2zF9J1p4m7bY3', 1, 0, '2025-01-13 19:31:38', '2025-01-13 19:31:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categorys`
--

CREATE TABLE `categorys` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `shortname` varchar(3) NOT NULL,
  `name` varchar(150) NOT NULL,
  `phonecode` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`id`, `shortname`, `name`, `phonecode`, `status`) VALUES
(1, 'AF', 'Afghanistan', 93, 1),
(2, 'AL', 'Albania', 355, 1),
(3, 'DZ', 'Algeria', 213, 1),
(4, 'AS', 'American Samoa', 1684, 1),
(5, 'AD', 'Andorra', 376, 1),
(6, 'AO', 'Angola', 244, 1),
(7, 'AI', 'Anguilla', 1264, 1),
(8, 'AQ', 'Antarctica', 0, 1),
(9, 'AG', 'Antigua And Barbuda', 1268, 1),
(10, 'AR', 'Argentina', 54, 1),
(11, 'AM', 'Armenia', 374, 1),
(12, 'AW', 'Aruba', 297, 1),
(13, 'AU', 'Australia', 61, 1),
(14, 'AT', 'Austria', 43, 1),
(15, 'AZ', 'Azerbaijan', 994, 1),
(16, 'BS', 'Bahamas The', 1242, 1),
(17, 'BH', 'Bahrain', 973, 1),
(18, 'BD', 'Bangladesh', 880, 1),
(19, 'BB', 'Barbados', 1246, 1),
(20, 'BY', 'Belarus', 375, 1),
(21, 'BE', 'Belgium', 32, 1),
(22, 'BZ', 'Belize', 501, 1),
(23, 'BJ', 'Benin', 229, 1),
(24, 'BM', 'Bermuda', 1441, 1),
(25, 'BT', 'Bhutan', 975, 1),
(26, 'BO', 'Bolivia', 591, 1),
(27, 'BA', 'Bosnia and Herzegovina', 387, 1),
(28, 'BW', 'Botswana', 267, 1),
(29, 'BV', 'Bouvet Island', 0, 1),
(30, 'BR', 'Brazil', 55, 1),
(31, 'IO', 'British Indian Ocean Territory', 246, 1),
(32, 'BN', 'Brunei', 673, 1),
(33, 'BG', 'Bulgaria', 359, 1),
(34, 'BF', 'Burkina Faso', 226, 1),
(35, 'BI', 'Burundi', 257, 1),
(36, 'KH', 'Cambodia', 855, 1),
(37, 'CM', 'Cameroon', 237, 1),
(38, 'CA', 'Canada', 1, 1),
(39, 'CV', 'Cape Verde', 238, 1),
(40, 'KY', 'Cayman Islands', 1345, 1),
(41, 'CF', 'Central African Republic', 236, 1),
(42, 'TD', 'Chad', 235, 1),
(43, 'CL', 'Chile', 56, 1),
(44, 'CN', 'China', 86, 1),
(45, 'CX', 'Christmas Island', 61, 1),
(46, 'CC', 'Cocos (Keeling) Islands', 672, 1),
(47, 'CO', 'Colombia', 57, 1),
(48, 'KM', 'Comoros', 269, 1),
(49, 'CG', 'Republic Of The Congo', 242, 1),
(50, 'CD', 'Democratic Republic Of The Congo', 242, 1),
(51, 'CK', 'Cook Islands', 682, 1),
(52, 'CR', 'Costa Rica', 506, 1),
(53, 'CI', 'Cote D\'Ivoire (Ivory Coast)', 225, 1),
(54, 'HR', 'Croatia (Hrvatska)', 385, 1),
(55, 'CU', 'Cuba', 53, 1),
(56, 'CY', 'Cyprus', 357, 1),
(57, 'CZ', 'Czech Republic', 420, 1),
(58, 'DK', 'Denmark', 45, 1),
(59, 'DJ', 'Djibouti', 253, 1),
(60, 'DM', 'Dominica', 1767, 1),
(61, 'DO', 'Dominican Republic', 1809, 1),
(62, 'TP', 'East Timor', 670, 1),
(63, 'EC', 'Ecuador', 593, 1),
(64, 'EG', 'Egypt', 20, 1),
(65, 'SV', 'El Salvador', 503, 1),
(66, 'GQ', 'Equatorial Guinea', 240, 1),
(67, 'ER', 'Eritrea', 291, 1),
(68, 'EE', 'Estonia', 372, 1),
(69, 'ET', 'Ethiopia', 251, 1),
(70, 'XA', 'External Territories of Australia', 61, 1),
(71, 'FK', 'Falkland Islands', 500, 1),
(72, 'FO', 'Faroe Islands', 298, 1),
(73, 'FJ', 'Fiji Islands', 679, 1),
(74, 'FI', 'Finland', 358, 1),
(75, 'FR', 'France', 33, 1),
(76, 'GF', 'French Guiana', 594, 1),
(77, 'PF', 'French Polynesia', 689, 1),
(78, 'TF', 'French Southern Territories', 0, 1),
(79, 'GA', 'Gabon', 241, 1),
(80, 'GM', 'Gambia The', 220, 1),
(81, 'GE', 'Georgia', 995, 1),
(82, 'DE', 'Germany', 49, 1),
(83, 'GH', 'Ghana', 233, 1),
(84, 'GI', 'Gibraltar', 350, 1),
(85, 'GR', 'Greece', 30, 1),
(86, 'GL', 'Greenland', 299, 1),
(87, 'GD', 'Grenada', 1473, 1),
(88, 'GP', 'Guadeloupe', 590, 1),
(89, 'GU', 'Guam', 1671, 1),
(90, 'GT', 'Guatemala', 502, 1),
(91, 'XU', 'Guernsey and Alderney', 44, 1),
(92, 'GN', 'Guinea', 224, 1),
(93, 'GW', 'Guinea-Bissau', 245, 1),
(94, 'GY', 'Guyana', 592, 1),
(95, 'HT', 'Haiti', 509, 1),
(96, 'HM', 'Heard and McDonald Islands', 0, 1),
(97, 'HN', 'Honduras', 504, 1),
(98, 'HK', 'Hong Kong S.A.R.', 852, 1),
(99, 'HU', 'Hungary', 36, 1),
(100, 'IS', 'Iceland', 354, 1),
(101, 'IN', 'India', 91, 1),
(102, 'ID', 'Indonesia', 62, 1),
(103, 'IR', 'Iran', 98, 1),
(104, 'IQ', 'Iraq', 964, 1),
(105, 'IE', 'Ireland', 353, 1),
(106, 'IL', 'Israel', 972, 1),
(107, 'IT', 'Italy', 39, 1),
(108, 'JM', 'Jamaica', 1876, 1),
(109, 'JP', 'Japan', 81, 1),
(110, 'XJ', 'Jersey', 44, 1),
(111, 'JO', 'Jordan', 962, 1),
(112, 'KZ', 'Kazakhstan', 7, 1),
(113, 'KE', 'Kenya', 254, 1),
(114, 'KI', 'Kiribati', 686, 1),
(115, 'KP', 'Korea North', 850, 1),
(116, 'KR', 'Korea South', 82, 1),
(117, 'KW', 'Kuwait', 965, 1),
(118, 'KG', 'Kyrgyzstan', 996, 1),
(119, 'LA', 'Laos', 856, 1),
(120, 'LV', 'Latvia', 371, 1),
(121, 'LB', 'Lebanon', 961, 1),
(122, 'LS', 'Lesotho', 266, 1),
(123, 'LR', 'Liberia', 231, 1),
(124, 'LY', 'Libya', 218, 1),
(125, 'LI', 'Liechtenstein', 423, 1),
(126, 'LT', 'Lithuania', 370, 1),
(127, 'LU', 'Luxembourg', 352, 1),
(128, 'MO', 'Macau S.A.R.', 853, 1),
(129, 'MK', 'Macedonia', 389, 1),
(130, 'MG', 'Madagascar', 261, 1),
(131, 'MW', 'Malawi', 265, 1),
(132, 'MY', 'Malaysia', 60, 1),
(133, 'MV', 'Maldives', 960, 1),
(134, 'ML', 'Mali', 223, 1),
(135, 'MT', 'Malta', 356, 1),
(136, 'XM', 'Man (Isle of)', 44, 1),
(137, 'MH', 'Marshall Islands', 692, 1),
(138, 'MQ', 'Martinique', 596, 1),
(139, 'MR', 'Mauritania', 222, 1),
(140, 'MU', 'Mauritius', 230, 1),
(141, 'YT', 'Mayotte', 269, 1),
(142, 'MX', 'Mexico', 52, 1),
(143, 'FM', 'Micronesia', 691, 1),
(144, 'MD', 'Moldova', 373, 1),
(145, 'MC', 'Monaco', 377, 1),
(146, 'MN', 'Mongolia', 976, 1),
(147, 'MS', 'Montserrat', 1664, 1),
(148, 'MA', 'Morocco', 212, 1),
(149, 'MZ', 'Mozambique', 258, 1),
(150, 'MM', 'Myanmar', 95, 1),
(151, 'NA', 'Namibia', 264, 1),
(152, 'NR', 'Nauru', 674, 1),
(153, 'NP', 'Nepal', 977, 1),
(154, 'AN', 'Netherlands Antilles', 599, 1),
(155, 'NL', 'Netherlands The', 31, 1),
(156, 'NC', 'New Caledonia', 687, 1),
(157, 'NZ', 'New Zealand', 64, 1),
(158, 'NI', 'Nicaragua', 505, 1),
(159, 'NE', 'Niger', 227, 1),
(160, 'NG', 'Nigeria', 234, 1),
(161, 'NU', 'Niue', 683, 1),
(162, 'NF', 'Norfolk Island', 672, 1),
(163, 'MP', 'Northern Mariana Islands', 1670, 1),
(164, 'NO', 'Norway', 47, 1),
(165, 'OM', 'Oman', 968, 1),
(166, 'PK', 'Pakistan', 92, 1),
(167, 'PW', 'Palau', 680, 1),
(168, 'PS', 'Palestinian Territory Occupied', 970, 1),
(169, 'PA', 'Panama', 507, 1),
(170, 'PG', 'Papua new Guinea', 675, 1),
(171, 'PY', 'Paraguay', 595, 1),
(172, 'PE', 'Peru', 51, 1),
(173, 'PH', 'Philippines', 63, 1),
(174, 'PN', 'Pitcairn Island', 0, 1),
(175, 'PL', 'Poland', 48, 1),
(176, 'PT', 'Portugal', 351, 1),
(177, 'PR', 'Puerto Rico', 1787, 1),
(178, 'QA', 'Qatar', 974, 1),
(179, 'RE', 'Reunion', 262, 1),
(180, 'RO', 'Romania', 40, 1),
(181, 'RU', 'Russia', 70, 1),
(182, 'RW', 'Rwanda', 250, 1),
(183, 'SH', 'Saint Helena', 290, 1),
(184, 'KN', 'Saint Kitts And Nevis', 1869, 1),
(185, 'LC', 'Saint Lucia', 1758, 1),
(186, 'PM', 'Saint Pierre and Miquelon', 508, 1),
(187, 'VC', 'Saint Vincent And The Grenadines', 1784, 1),
(188, 'WS', 'Samoa', 684, 1),
(189, 'SM', 'San Marino', 378, 1),
(190, 'ST', 'Sao Tome and Principe', 239, 1),
(191, 'SA', 'Saudi Arabia', 966, 1),
(192, 'SN', 'Senegal', 221, 1),
(193, 'RS', 'Serbia', 381, 1),
(194, 'SC', 'Seychelles', 248, 1),
(195, 'SL', 'Sierra Leone', 232, 1),
(196, 'SG', 'Singapore', 65, 1),
(197, 'SK', 'Slovakia', 421, 1),
(198, 'SI', 'Slovenia', 386, 1),
(199, 'XG', 'Smaller Territories of the UK', 44, 1),
(200, 'SB', 'Solomon Islands', 677, 1),
(201, 'SO', 'Somalia', 252, 1),
(202, 'ZA', 'South Africa', 27, 1),
(203, 'GS', 'South Georgia', 0, 1),
(204, 'SS', 'South Sudan', 211, 1),
(205, 'ES', 'Spain', 34, 1),
(206, 'LK', 'Sri Lanka', 94, 1),
(207, 'SD', 'Sudan', 249, 1),
(208, 'SR', 'Suriname', 597, 1),
(209, 'SJ', 'Svalbard And Jan Mayen Islands', 47, 1),
(210, 'SZ', 'Swaziland', 268, 1),
(211, 'SE', 'Sweden', 46, 1),
(212, 'CH', 'Switzerland', 41, 1),
(213, 'SY', 'Syria', 963, 1),
(214, 'TW', 'Taiwan', 886, 1),
(215, 'TJ', 'Tajikistan', 992, 1),
(216, 'TZ', 'Tanzania', 255, 1),
(217, 'TH', 'Thailand', 66, 1),
(218, 'TG', 'Togo', 228, 1),
(219, 'TK', 'Tokelau', 690, 1),
(220, 'TO', 'Tonga', 676, 1),
(221, 'TT', 'Trinidad And Tobago', 1868, 1),
(222, 'TN', 'Tunisia', 216, 1),
(223, 'TR', 'Turkey', 90, 1),
(224, 'TM', 'Turkmenistan', 7370, 1),
(225, 'TC', 'Turks And Caicos Islands', 1649, 1),
(226, 'TV', 'Tuvalu', 688, 1),
(227, 'UG', 'Uganda', 256, 1),
(228, 'UA', 'Ukraine', 380, 1),
(229, 'AE', 'United Arab Emirates', 971, 1),
(230, 'GB', 'United Kingdom', 44, 1),
(231, 'US', 'United States', 1, 1),
(232, 'UM', 'United States Minor Outlying Islands', 1, 1),
(233, 'UY', 'Uruguay', 598, 1),
(234, 'UZ', 'Uzbekistan', 998, 1),
(235, 'VU', 'Vanuatu', 678, 1),
(236, 'VA', 'Vatican City State (Holy See)', 39, 1),
(237, 'VE', 'Venezuela', 58, 1),
(238, 'VN', 'Vietnam', 84, 1),
(239, 'VG', 'Virgin Islands (British)', 1284, 1),
(240, 'VI', 'Virgin Islands (US)', 1340, 1),
(241, 'WF', 'Wallis And Futuna Islands', 681, 1),
(242, 'EH', 'Western Sahara', 212, 1),
(243, 'YE', 'Yemen', 967, 1),
(244, 'YU', 'Yugoslavia', 38, 1),
(245, 'ZM', 'Zambia', 260, 1),
(246, 'ZW', 'Zimbabwe', 263, 1);

-- --------------------------------------------------------

--
-- Table structure for table `currency_type`
--

CREATE TABLE `currency_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `currency_type`
--

INSERT INTO `currency_type` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'USDT-TRC20-TRX', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(2, 'USDT-ERC20', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(3, 'USDT-OMNI', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(4, 'BTC', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(5, 'LTC', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(6, 'ETH', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(7, 'TRX', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11'),
(8, 'ADA', 1, '2024-03-21 19:13:11', '2024-03-21 19:13:11');

-- --------------------------------------------------------

--
-- Table structure for table `deposit_request`
--

CREATE TABLE `deposit_request` (
  `id` int(11) NOT NULL,
  `depositID` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `merchant_id` int(11) DEFAULT NULL,
  `deposit_amount` double(10,2) DEFAULT NULL,
  `receivable_amount` double(10,2) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `to_crypto_wallet_address` varchar(255) DEFAULT NULL,
  `trxId` varchar(255) DEFAULT NULL,
  `depscription` text DEFAULT NULL,
  `wallet_address` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '0=Review,2=Reject,1=Approved',
  `approved_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deposit_request`
--

INSERT INTO `deposit_request` (`id`, `depositID`, `user_id`, `merchant_id`, `deposit_amount`, `receivable_amount`, `payment_method`, `to_crypto_wallet_address`, `trxId`, `depscription`, `wallet_address`, `status`, `approved_by`, `created_at`, `updated_at`) VALUES
(1, 'DEPOSIT.0127b06252935c330e9f23651b398ce4', 6, 3, 600.00, NULL, NULL, 'B8gYf7P0Wm0X7F2T9hQ0J3y1b8g0d6m9oG', NULL, NULL, NULL, 0, NULL, '2025-01-16 02:41:56', '2025-01-16 02:41:56'),
(2, 'DEPOSIT.7e8750d4a701596732953c160d2ae096', 6, 3, 1050.00, NULL, NULL, 'X9F0t2b7m0Q3Z8d9gY6L2J1V5n3H6p0W2', NULL, NULL, NULL, 0, NULL, '2025-01-16 02:50:33', '2025-01-16 02:50:33'),
(3, 'DEPOSIT.c4de8ced6214345614d33fb0b16a8acd', 6, 3, 650.00, NULL, NULL, '7gMr8zP2XkS4tD5nJ1p5V1Hq9bR4G9x0o', NULL, NULL, NULL, 0, NULL, '2025-01-16 04:29:27', '2025-01-16 04:29:27');

-- --------------------------------------------------------

--
-- Table structure for table `facility_group`
--

CREATE TABLE `facility_group` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facility_group`
--

INSERT INTO `facility_group` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'General Amenities', 'general-amenities', 1, '2025-04-01 15:45:39', '2025-04-01 15:45:39'),
(2, 'Bed & Comfort', 'bed-comfort', 1, '2025-04-01 15:45:45', '2025-04-01 15:45:45'),
(3, 'Bathroom Facilities', 'bathroom-facilities', 1, '2025-04-01 15:45:51', '2025-04-01 15:45:51'),
(4, 'Kitchen & Dining', 'kitchen-dining', 1, '2025-04-01 15:45:57', '2025-04-01 15:45:57'),
(5, 'Technology & Security', 'technology-security', 1, '2025-04-01 15:46:04', '2025-04-01 15:46:04'),
(6, 'Leisure & Extras', 'leisure-extras', 1, '2025-04-01 15:46:11', '2025-04-01 15:46:11'),
(7, 'Additional Services', 'additional-services', 1, '2025-04-01 15:46:16', '2025-04-01 15:46:16'),
(8, 'In your private bathroom', 'in-your-private-bathroom', 1, '2025-04-03 06:17:45', '2025-04-03 06:17:45'),
(9, 'View', 'view', 1, '2025-04-03 06:19:20', '2025-04-03 06:19:20'),
(10, 'Bungalow facilities', 'bungalow-facilities', 1, '2025-04-03 06:20:15', '2025-04-03 06:20:15'),
(11, 'Smoking', 'smoking', 1, '2025-04-03 06:41:03', '2025-04-03 06:41:03'),
(12, 'Bungalow with Sea View', 'bungalow-with-sea-view', 1, '2025-04-03 06:44:46', '2025-04-03 06:44:46'),
(13, 'Executive Suite', 'executive-suite', 1, '2025-04-03 08:56:39', '2025-04-03 08:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `features_properties_slider`
--

CREATE TABLE `features_properties_slider` (
  `id` bigint(20) NOT NULL,
  `title_name` varchar(255) DEFAULT NULL,
  `sliderImage` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `features_properties_slider`
--

INSERT INTO `features_properties_slider` (`id`, `title_name`, `sliderImage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Features Properties', '/backend/files/PcQTqBU353FjLn0zWUxa.jpg', 1, '2025-05-19 11:37:55', '2025-05-19 11:37:55'),
(2, 'Features Properties', '/backend/files/K0KpdLxdOWKVQriJrOcd.jpg', 1, '2025-05-19 11:38:25', '2025-05-19 11:38:25'),
(3, 'Features Properties', '/backend/files/dnKGQwZuYSiL2ONeypwe.jpg', 1, '2025-05-19 11:38:33', '2025-05-19 11:38:33'),
(4, 'Features Properties', '/backend/files/pztWj2wgU3BSBxPNp2cF.jpg', 1, '2025-05-19 11:38:39', '2025-05-19 11:38:39'),
(6, 'Features Properties', '/backend/files/Lv2k9axyyppjL2NfqibA.jpg', 1, '2025-05-19 11:38:59', '2025-05-19 11:38:59'),
(7, 'Features Properties', '/backend/files/NNjEpEmODA3SSjnmGpDr.jpeg', 1, '2025-05-19 11:39:14', '2025-05-19 11:39:14');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` bigint(20) NOT NULL,
  `title_name` varchar(255) DEFAULT NULL,
  `sliderImage` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `title_name`, `sliderImage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Gallery-1', '/backend/files/aWETeUmPW5YMQiVOhGSY.jpg', 1, '2025-05-19 13:19:35', '2025-05-19 13:19:35'),
(2, 'Gallery-2', '/backend/files/ye2EvExqV3ZmQJvktNeL.jpg', 1, '2025-05-19 13:19:46', '2025-05-19 13:19:46'),
(3, 'Gallery-3', '/backend/files/700lim0PE2BOeeNYqtzw.jpg', 1, '2025-05-19 13:19:57', '2025-05-19 13:19:57'),
(4, 'Gallery-4', '/backend/files/MuswhjgPCLc7vtC6QiIK.jpg', 1, '2025-05-19 13:20:06', '2025-05-19 13:20:06'),
(5, 'Gallery-5', '/backend/files/ojL1FF6oF2NCzoT1fS3y.jpg', 1, '2025-05-19 13:20:14', '2025-05-19 13:20:14'),
(6, 'Gallery-6', '/backend/files/UoPakb84vnkMV8uafkj0.jpeg', 1, '2025-05-19 13:20:29', '2025-05-19 13:20:29');

-- --------------------------------------------------------

--
-- Table structure for table `global_wallet_address`
--

CREATE TABLE `global_wallet_address` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  `lock_unlock` int(11) NOT NULL COMMENT '1=lock,0=unlock',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `global_wallet_address`
--

INSERT INTO `global_wallet_address` (`id`, `name`, `slug`, `status`, `lock_unlock`, `created_at`, `updated_at`) VALUES
(1, 'TYspxFx6hpoPMY7bQD9sMAr8MXHXRGpZcV', NULL, 1, 0, '2024-07-12 18:37:40', '2024-07-15 22:18:01'),
(2, 'TYqqYjuu7Wu9rntHKkttg4bTRVQBJSKTVx', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-16 17:44:30'),
(3, 'TN2rjjCvFNHJn5GDEeYdtSoiUhS5pb5UBo', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 03:40:19'),
(4, 'TFfy3cXnTDTsbjrDmaxhtDUtegBQMTTsGB', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 03:46:32'),
(5, 'TW7MHZQktuHF3P8hjQtpALhFR3x7xcAarK', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 03:49:20'),
(6, 'TL2gcHbUskPiVBPrf8zFLMfswVp6B2yjK9', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 03:51:50'),
(7, 'TKpEvzgncwWUx252YUdmrJU2RLmoHzm43A', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 05:38:18'),
(8, 'TKvQL9ykYyDCEkNSoktjzDhQppX3Gz5oWE', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-13 06:16:18'),
(9, 'TAosrFLVXqRk1eEPisoKLAZ6KRu5yBSgVK', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-12 18:37:49'),
(10, 'TJ31ZrjgFBsdySaLqUaM2FQaGmNjqQBVb6', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-12 18:37:49'),
(11, 'TXbbicZTeHY3nv3g9v5GWjwpu6f9hGSNVN', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-12 18:37:49'),
(12, 'TFpS6PeSvGSRK6xv1GNftPb4dvfTHoeUfh', NULL, 1, 0, '2024-07-12 18:37:49', '2024-07-12 18:37:49'),
(13, 'TQUiTZzqypMpwSNTaKS1kye2p1MGd4tNvK', 'tquitzzqypmpwsntaks1kye2p1mgd4tnvk', 1, 0, '2024-07-12 18:37:49', '2024-12-09 18:47:54');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` text NOT NULL,
  `attempts` int(10) UNSIGNED DEFAULT 0,
  `reserved_at` timestamp NULL DEFAULT NULL,
  `available_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `queue`, `payload`, `attempts`, `reserved_at`, `available_at`, `created_at`) VALUES
(1, 'default', '{\"uuid\":\"6e08bc6a-fb56-41e5-8b8a-bf44b880f1ca\",\"displayName\":\"App\\\\Mail\\\\Guestsendingmail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:25:\\\"App\\\\Mail\\\\Guestsendingmail\\\":3:{s:10:\\\"customData\\\";s:47:\\\"email=mdbijon%40gmail.com&password=%23123456%23\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:17:\\\"mdbijon@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:3:\\\"job\\\";N;}\"}}', 0, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'default', '{\"uuid\":\"aef278e5-a753-498b-b1b0-acfb138ef995\",\"displayName\":\"App\\\\Mail\\\\Guestsendingmail\",\"job\":\"Illuminate\\\\Queue\\\\CallQueuedHandler@call\",\"maxTries\":null,\"maxExceptions\":null,\"failOnTimeout\":false,\"backoff\":null,\"timeout\":null,\"retryUntil\":null,\"data\":{\"commandName\":\"Illuminate\\\\Mail\\\\SendQueuedMailable\",\"command\":\"O:34:\\\"Illuminate\\\\Mail\\\\SendQueuedMailable\\\":15:{s:8:\\\"mailable\\\";O:25:\\\"App\\\\Mail\\\\Guestsendingmail\\\":3:{s:7:\\\"details\\\";s:48:\\\"email=1mdbijon%40gmail.com&password=%23123456%23\\\";s:2:\\\"to\\\";a:1:{i:0;a:2:{s:4:\\\"name\\\";N;s:7:\\\"address\\\";s:18:\\\"1mdbijon@gmail.com\\\";}}s:6:\\\"mailer\\\";s:4:\\\"smtp\\\";}s:5:\\\"tries\\\";N;s:7:\\\"timeout\\\";N;s:13:\\\"maxExceptions\\\";N;s:17:\\\"shouldBeEncrypted\\\";b:0;s:10:\\\"connection\\\";N;s:5:\\\"queue\\\";N;s:15:\\\"chainConnection\\\";N;s:10:\\\"chainQueue\\\";N;s:19:\\\"chainCatchCallbacks\\\";N;s:5:\\\"delay\\\";N;s:11:\\\"afterCommit\\\";N;s:10:\\\"middleware\\\";a:0:{}s:7:\\\"chained\\\";a:0:{}s:3:\\\"job\\\";N;}\"}}', 0, NULL, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `status` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`, `status`, `created_at`, `updated_at`) VALUES
(1, 'English', 'en', 1, '2024-10-26 11:34:03', '2024-10-26 11:34:03'),
(2, 'Bengali', 'bn', 1, '2024-10-26 11:34:03', '2024-10-27 06:00:00'),
(3, 'Hindi', 'hi', 0, '2024-10-26 11:34:03', '2024-10-26 11:34:03'),
(4, 'Tamil', 'ta', 0, '2024-10-26 11:34:03', '2024-10-27 10:16:45'),
(5, 'Chinese', 'zh', 0, '2024-10-26 11:34:03', '2024-10-27 11:10:21'),
(6, 'Spanish', 'es', 0, '2024-10-26 11:34:03', '2024-10-26 11:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `method` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `merchant_request`
--

CREATE TABLE `merchant_request` (
  `id` int(10) UNSIGNED NOT NULL,
  `api_key_id` int(10) UNSIGNED NOT NULL,
  `merchant_id` int(10) UNSIGNED NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(11) DEFAULT 0 COMMENT '1=approved\r\n0=not approved',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 2),
(3, '2019_08_19_000000_create_failed_jobs_table', 3),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `our_properties`
--

CREATE TABLE `our_properties` (
  `id` bigint(20) NOT NULL,
  `title_name` varchar(255) DEFAULT NULL,
  `sliderImage` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `our_properties`
--

INSERT INTO `our_properties` (`id`, `title_name`, `sliderImage`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Dhaka', '/backend/files/APWyZGGk9XdZ1aeCHxkt.jpg', 1, '2025-05-19 12:26:56', '2025-05-19 12:26:56'),
(2, 'Mirpur', '/backend/files/m4DK2wsMVxkBdFKrD07Z.jpg', 1, '2025-05-19 12:27:08', '2025-05-19 12:27:08'),
(3, 'B.Baria', '/backend/files/UVisuUxJWqY8QBjtiyUP.jpg', 1, '2025-05-19 12:27:32', '2025-05-19 12:27:32'),
(4, 'Cox\'s Bazar', '/backend/files/v1xZHBrNxZf4VyBi0LvA.jpg', 1, '2025-05-19 12:27:50', '2025-05-19 12:27:50'),
(5, 'Sylhet', '/backend/files/NiQFCYf9PTsaHeF8VvxI.png', 1, '2025-05-19 12:28:04', '2025-05-19 12:28:04'),
(6, 'Chittagong', '/backend/files/6qdhHIby4WXW0gEoYNbY.png', 1, '2025-05-19 12:31:53', '2025-05-19 12:31:53');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `created_at`) VALUES
(1, 'gazigiashuddin@gmail.com', 'cBk8LmFh6xfydQ2ao78Qznbj4XtNcPMSJRlNxSUePN07sEr9Vg2yCl3Ou9Y9', '2024-07-11 17:39:05'),
(2, 'gazigiashuddin@gmail.com', 'mhEUCcET2u0JHkrS9srpcahx1Uz9g7D4AcohXUW4VutHE5qiNw73Ozjifyi4', '2024-07-11 17:44:39');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `post_category_id` int(11) DEFAULT NULL,
  `entry_by` int(11) DEFAULT NULL,
  `thumnail_img` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `name`, `slug`, `description`, `post_category_id`, `entry_by`, `thumnail_img`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Concrete Holdings Ltd.', 'concrete-holdings-ltd-', '<p>Concrete Holdings Ltd. is a trusted name in the real estate industry, known for its unwavering commitment to quality, innovation, and client satisfaction. Established with a vision to redefine the urban landscape, our company has emerged as a symbol of reliability and excellence in the construction and property development sector. With years of experience and a portfolio that reflects thoughtful design and meticulous execution, we have successfully transformed ideas into iconic structures that stand as hallmarks of durability and elegance.<br><br></p>\r\n<p>At Concrete Holdings Ltd., we believe in more than just building structures&mdash;we create environments that enhance lives and support sustainable communities. Our projects range from premium residential apartments to modern commercial complexes, each tailored to meet the evolving needs of today&rsquo;s dynamic lifestyles. We ensure every development blends functionality, aesthetics, and environmental consciousness, delivering long-term value for homeowners and investors alike.<br><br></p>\r\n<p>From the outset, we have prioritized quality construction practices, ethical business conduct, and transparency in all our dealings. These core values have earned us the trust of thousands of satisfied clients, partners, and stakeholders. Our team consists of seasoned professionals, architects, engineers, and real estate experts who bring passion and precision to every project, ensuring that we meet deadlines, stay within budget, and exceed expectations.<br><br></p>\r\n<p>One of our key differentiators is our attention to detail and focus on customer needs. Whether it\'s helping families find their perfect home or assisting businesses in securing a strategic commercial space, our team is dedicated to guiding clients through every step of the real estate journey. We invest in technology and market research to ensure we offer relevant, future-ready solutions in a fast-changing world.<br><br></p>\r\n<p>Choosing Concrete Holdings Ltd. means choosing a partner that values your investment, understands your aspirations, and works tirelessly to bring your vision to life. We invite you to explore our projects, meet our team, and become part of a future built on solid foundations.</p>', 1, 1, NULL, 1, '2025-05-18 16:25:19', '2025-05-19 04:12:16'),
(2, 'Vision & Mision', 'vision-mision', '<p>At Concrete Holdings Ltd., we are dedicated to providing expert guidance, cutting-edge technology, and personalized solutions that empower our clients to make confident real estate decisions. Whether you are searching for your dream home, maximizing the value of your property, or investing in commercial spaces, we strive to deliver excellence, trust, and innovation at every step of the journey. Our commitment to quality and customer satisfaction is what sets us apart in an ever-evolving real estate industry.<br><br><br></p>\r\n<h3>Our Mission</h3>\r\n<p style=\"text-align: justify;\">Our mission is to simplify real estate transactions through innovation, transparency, and expert guidance. At Concrete Holdings Ltd., we recognize that real estate is a significant investment, and making informed decisions is crucial for long-term success. With this in mind, we are committed to offering a seamless experience for our clients. Whether it&rsquo;s assisting with buying, selling, or renting properties, we empower our clients with the knowledge, tools, and resources necessary to make confident decisions.</p>\r\n<p style=\"text-align: justify;\">We aim to streamline the often-complex real estate process by providing clear, up-to-date information and tailored solutions to meet the specific needs of our clients. Our team of experts is here to guide clients through every step, ensuring that their goals are met efficiently and effectively. With an emphasis on innovation, we continuously adopt the latest technologies and market insights, enabling us to offer the most current solutions and opportunities to our clients.</p>\r\n<p>At Concrete Holdings Ltd., we believe that trust is the foundation of every successful real estate transaction. Our mission is not only to deliver exceptional service but also to foster long-term relationships with our clients, built on transparency and integrity. Our commitment to excellence drives us to set higher standards for ourselves and the industry, delivering results that exceed expectations and build a lasting legacy.<br><br><br></p>\r\n<h3>Our Vision</h3>\r\n<p>Our vision is to be the most trusted and innovative real estate platform, transforming the way people buy, sell, and invest in properties. We envision a future where every real estate experience is effortless, transparent, and impactful&mdash;empowering clients to unlock the full potential of their investments. As the real estate market continues to evolve, Concrete Holdings Ltd. aspires to lead the charge by integrating modern technologies, expert insights, and sustainable practices into everything we do.</p>\r\n<p>We aim to redefine the real estate experience by making it more accessible, transparent, and customer-centric. Our goal is to create a future where clients, whether individuals or businesses, feel confident and well-supported throughout their real estate journeys. We believe that innovation and adaptability will be the key drivers in reshaping how real estate services are delivered, and we are determined to stay at the forefront of these changes.</p>\r\n<p>Ultimately, our vision is to foster a world where every real estate transaction brings added value, not only to the buyer or seller but also to the community at large. We are committed to creating sustainable, livable spaces that positively impact the environment and the people who live and work in them. By continuing to innovate and challenge the status quo, Concrete Holdings Ltd. will remain a trusted partner in the real estate industry, empowering clients and communities alike to thrive.</p>', 2, 1, NULL, 1, '2025-05-18 16:27:07', '2025-05-19 04:08:41'),
(3, 'Our Services', 'our-services', '<p><strong>Our Services at Concrete Holdings Ltd.</strong></p>\r\n<p>At Concrete Holdings Ltd., we go beyond traditional real estate services to offer a comprehensive, client-first experience built on elegance, precision, and smart innovation. Whether you\'re buying, selling, renting, or investing, our mission is to provide tailored solutions that deliver long-term value and peace of mind.<br><br></p>\r\n<p><strong>Property Buying Assistance</strong></p>\r\n<p>Finding your dream home should be exciting&mdash;not stressful. Our team combines deep local knowledge with professional legal guidance to help you identify, evaluate, and purchase the perfect property. From first-time buyers to seasoned investors, we provide a seamless and transparent process that ensures confidence in every decision.<br><br></p>\r\n<p><strong>Property Selling &amp; Listing</strong></p>\r\n<p>Maximize your property&rsquo;s potential in the market. We craft compelling listings, offer expert home staging advice, and implement targeted marketing strategies to attract serious buyers. With our negotiation expertise, we help you close deals faster and at the best possible price&mdash;while minimizing hassle and maximizing returns.<br><br></p>\r\n<p><strong>Rental &amp; Leasing Solutions</strong></p>\r\n<p>We simplify the rental process for both landlords and tenants. Our services include tenant sourcing, background verification, lease agreement drafting, and full rental management. Whether you\'re renting out your apartment or looking for the ideal place to stay, we ensure a reliable, secure, and legally compliant experience.<br><br></p>\r\n<p><strong>Investment Advisory</strong></p>\r\n<p>Real estate is one of the safest and most rewarding investments&mdash;when done right. Our dedicated investment advisors provide personalized strategies focused on ROI, risk mitigation, and market trends. From residential to commercial projects, we help you grow your wealth through smart, data-backed property decisions.<br><br></p>\r\n<p><strong>Property Management</strong></p>\r\n<p>Enjoy the benefits of property ownership without the day-to-day stress. We offer comprehensive property management services, including tenant communication, rent collection, maintenance coordination, and inspections. Our goal is to protect your investment and keep your tenants satisfied&mdash;so you don&rsquo;t have to worry.<br><br></p>\r\n<p><strong>Land &amp; Project Development</strong></p>\r\n<p>Turn vacant land into profitable ventures with our expert development services. From concept design and feasibility studies to permits, approvals, and construction management, we bring together the expertise and partnerships needed to transform ideas into impactful real estate projects.<br><br></p>\r\n<p><strong>The Concrete Difference</strong></p>\r\n<p>At Concrete Holdings Ltd., we blend vision, strategy, and technology to build more than just properties&mdash;we build real estate success stories. Every client engagement is an opportunity to deliver excellence, transparency, and sustainable growth. Whether you\'re starting your journey or expanding your portfolio, let us help you unlock your property&rsquo;s full potential&mdash;with confidence and clarity.<br><br></p>', 3, 1, NULL, 1, '2025-05-18 16:29:34', '2025-05-19 04:20:09');

-- --------------------------------------------------------

--
-- Table structure for table `post_category`
--

CREATE TABLE `post_category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_category`
--

INSERT INTO `post_category` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'About Us', NULL, 1, '2025-05-18 15:48:43', '2025-05-18 15:48:43'),
(2, 'Vision & Mision', NULL, 1, '2025-05-18 15:49:18', '2025-05-18 15:49:18'),
(3, 'Our Services', NULL, 1, '2025-05-18 15:49:42', '2025-05-18 15:49:42'),
(4, 'Why Choose us', NULL, 1, '2025-05-18 16:30:37', '2025-05-18 16:30:37');

-- --------------------------------------------------------

--
-- Table structure for table `promocode`
--

CREATE TABLE `promocode` (
  `id` bigint(20) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `form_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `discount` decimal(10,2) DEFAULT NULL,
  `promoCode` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `promocode`
--

INSERT INTO `promocode` (`id`, `room_id`, `form_date`, `to_date`, `discount`, `promoCode`, `status`, `created_at`, `updated_at`) VALUES
(1, 7, '2025-03-12', '2025-03-15', 500.00, 'BEFO-488', 1, '2025-04-01 13:20:55', '2025-04-01 13:20:55'),
(2, 5, '2025-04-07', '2025-04-17', 5366.00, 'BEFO-4882', 1, '2025-04-01 13:26:03', '2025-04-01 14:33:07'),
(3, 1, '2025-04-01', '2025-04-15', 33.00, 'BEFO-488233', 1, '2025-04-01 13:27:03', '2025-04-01 13:27:03');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `roomType` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `extraCapacity` varchar(255) DEFAULT NULL COMMENT 'extraCapability',
  `roomPrice` decimal(10,2) DEFAULT NULL,
  `bedCharge` int(11) DEFAULT NULL,
  `room_size_id` int(11) DEFAULT NULL,
  `bedNumber` varchar(255) DEFAULT NULL,
  `bed_type_id` int(11) DEFAULT NULL,
  `roomDescription` text DEFAULT NULL,
  `reserveCondition` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `booking_status` int(11) DEFAULT NULL COMMENT '1=Booked 2=Release 3=Cancel',
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `slug`, `roomType`, `capacity`, `extraCapacity`, `roomPrice`, `bedCharge`, `room_size_id`, `bedNumber`, `bed_type_id`, `roomDescription`, `reserveCondition`, `status`, `booking_status`, `created_at`, `updated_at`) VALUES
(1, 'Bungalow with Sea View', 'bungalow-with-sea-view', 'Bungalow with Sea View', 5, '', 7323.00, 0, 0, '', 1, 'Comfy beds, 10 – Based on 1 review\nThis bungalow includes 1 living room, 1 separate bedroom and 1 bathroom with a shower and free toiletries. The unit has air conditioning, sea views, a balcony and fruit is offered for guests. The unit has 1 bed. Bungalow size: 29 m²', '', 1, 2, '2025-04-03 14:43:03', '2025-04-15 17:31:51'),
(2, 'Executive Suite', 'executive-suite', 'Executive Suite', 5, '', 19528.00, 0, 0, '', 3, 'Living room: 1 sofa bed\n\nComfy beds, 10 – Based on 1 review\nThe unit has 2 beds.', '', 1, 1, '2025-04-03 14:56:26', '2025-04-15 14:31:16'),
(3, 'Deluxe Room', 'Deluxe-room', 'Deluxe-room', 5, '', 19528.00, 0, 0, '', 3, 'Living room: 1 sofa bed\r\n\r\nComfy beds, 10 – Based on 1 review\r\nThe unit has 2 beds.', '', 1, 1, '2025-04-03 14:56:26', '2025-04-15 14:22:28'),
(4, 'King Room', 'king-room', 'king-room', 5, '', 19528.00, 0, 0, '', 3, 'Living room: 1 sofa bed\r\n\r\nComfy beds, 10 – Based on 1 review\r\nThe unit has 2 beds.', '', 1, 2, '2025-04-03 14:56:26', '2025-04-15 17:29:34');

-- --------------------------------------------------------

--
-- Table structure for table `room_facility`
--

CREATE TABLE `room_facility` (
  `id` bigint(20) NOT NULL,
  `room_facility_group_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_facility`
--

INSERT INTO `room_facility` (`id`, `room_facility_group_id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Air conditioning', 'air-conditioning', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(2, 1, 'Free Wi-Fi', 'free-wifi', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(3, 1, 'Smart TV / Cable TV', 'smart-tv', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(4, 1, 'Work desk & chair', 'work-desk-chair', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(5, 1, 'Sofa or seating area', 'sofa-seating-area', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(6, 1, 'Wardrobe/Closet', 'wardrobe-closet', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(7, 1, 'Safe deposit box', 'safe-deposit-box', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(8, 1, 'Telephone', 'telephone', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(9, 1, 'Alarm clock', 'alarm-clock', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(10, 1, 'Full-length mirror', 'full-length-mirror', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(11, 1, 'Private entrance', 'private-entrance', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(12, 1, 'Coat rack', 'coat-rack', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(13, 1, 'Soundproof walls', 'soundproof-walls', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(14, 1, 'Blackout curtains', 'blackout-curtains', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(15, 1, 'Carpeting / Wooden flooring', 'carpeting-wooden-flooring', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(16, 2, 'King/Queen/Twin beds', 'king-queen-twin-beds', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(17, 2, 'High-quality mattress', 'high-quality-mattress', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(18, 2, 'Soft pillows & cushions', 'soft-pillows-cushions', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(19, 2, 'Extra blanket', 'extra-blanket', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(20, 2, 'Bedside table', 'bedside-table', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(21, 2, 'Adjustable bed lighting', 'adjustable-bed-lighting', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(22, 2, 'Reading lamp', 'reading-lamp', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(23, 2, 'Electric blanket (for winter)', 'electric-blanket', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(24, 10, 'Mosquito net', 'mosquito-net', 1, '2025-04-01 18:02:03', '2025-04-03 06:27:26'),
(25, 2, 'Hypoallergenic bedding', 'hypoallergenic-bedding', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(26, 3, 'Private bathroom', 'private-bathroom', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(27, 3, 'Rain shower', 'rain-shower', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(28, 3, 'Bathtub', 'bathtub', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(29, 3, 'Hot & cold water', 'hot-cold-water', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(30, 3, 'Fresh towels', 'fresh-towels', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(31, 3, 'Hairdryer', 'hairdryer', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(32, 3, 'Bathrobe & slippers', 'bathrobe-slippers', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(33, 3, 'Complimentary toiletries', 'complimentary-toiletries', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(34, 3, 'Magnifying makeup mirror', 'magnifying-makeup-mirror', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(35, 3, 'Bidet / Toilet hose', 'bidet-toilet-hose', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(36, 3, 'Heated towel rack', 'heated-towel-rack', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(37, 4, 'Mini refrigerator', 'mini-refrigerator', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(38, 4, 'Electric kettle', 'electric-kettle', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(39, 4, 'Coffee maker', 'coffee-maker', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(40, 4, 'Microwave oven', 'microwave-oven', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(41, 4, 'Dining table & chairs', 'dining-table-chairs', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(42, 4, 'Cutlery & crockery set', 'cutlery-crockery-set', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(43, 4, 'Bottled drinking water', 'bottled-drinking-water', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(44, 5, 'Electronic key card access', 'electronic-key-card', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(45, 5, 'Fire alarm & smoke detector', 'fire-alarm-smoke-detector', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(46, 5, 'Emergency evacuation plan', 'emergency-evacuation-plan', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(47, 5, 'CCTV security', 'cctv-security', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(48, 5, 'Power backup / Generator', 'power-backup-generator', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(49, 6, 'Balcony / Terrace', 'balcony-terrace', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(50, 6, 'In-room jacuzzi', 'in-room-jacuzzi', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(51, 6, 'Private swimming pool', 'private-swimming-pool', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(52, 6, 'City/Mountain/Sea view rooms', 'city-mountain-sea-view', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(53, 7, 'Room service (24/7)', 'room-service', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(54, 7, 'Newspaper delivery', 'newspaper-delivery', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(55, 7, 'Concierge service', 'concierge-service', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(56, 7, 'Laundry & dry-cleaning service', 'laundry-dry-cleaning', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(57, 7, 'Shoe polishing kit', 'shoe-polishing-kit', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(58, 7, 'Luggage storage', 'luggage-storage', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(59, 7, 'Turndown service', 'turndown-service', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(60, 7, 'Express check-in/check-out', 'express-check-in-out', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(61, 7, 'Babysitting service', 'babysitting-service', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(62, 7, 'Car rental assistance', 'car-rental-assistance', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(63, 7, 'Airport transfer service', 'airport-transfer-service', 1, '2025-04-01 18:02:03', '2025-04-01 18:02:03'),
(65, 8, 'Free toiletries', 'free-toiletries', 1, '2025-04-03 06:18:02', '2025-04-03 06:18:02'),
(66, 8, 'Toilet', 'toilet', 1, '2025-04-03 06:18:19', '2025-04-03 06:18:19'),
(67, 8, 'Shower', 'shower', 1, '2025-04-03 06:18:28', '2025-04-03 06:18:28'),
(68, 8, 'Toilet paper', 'toilet-paper', 1, '2025-04-03 06:18:37', '2025-04-03 06:18:37'),
(69, 8, 'Bidet', 'bidet', 1, '2025-04-03 06:18:54', '2025-04-03 06:18:54'),
(70, 9, 'Balcony', 'balcony', 1, '2025-04-03 06:19:46', '2025-04-03 06:46:39'),
(71, 9, 'Mountain view', 'mountain-view', 1, '2025-04-03 06:19:53', '2025-04-03 06:19:53'),
(72, 9, 'Sea view', 'sea-view', 1, '2025-04-03 06:20:00', '2025-04-03 06:20:00'),
(73, 10, 'Desk', 'desk', 1, '2025-04-03 06:26:27', '2025-04-03 06:26:27'),
(74, 10, 'Sofa', 'sofa', 1, '2025-04-03 06:26:35', '2025-04-03 06:26:35'),
(75, 10, 'Fan', 'fan', 1, '2025-04-03 06:26:41', '2025-04-03 06:26:41'),
(76, 10, 'Towels', 'towels', 1, '2025-04-03 06:26:48', '2025-04-03 06:26:48'),
(77, 10, 'Seating Area', 'seating-area', 1, '2025-04-03 06:26:53', '2025-04-03 06:26:53'),
(78, 11, 'Smoking permitted', 'smoking-permitted', 1, '2025-04-03 06:41:16', '2025-04-03 06:41:16'),
(79, 12, 'Entire bungalow', 'entire-bungalow', 1, '2025-04-03 06:44:59', '2025-04-03 06:44:59'),
(80, 12, '29 m²', '29-m-', 1, '2025-04-03 06:45:06', '2025-04-03 06:45:06'),
(81, 12, 'Balcony', 'balcony', 1, '2025-04-03 06:46:16', '2025-04-03 06:46:16'),
(82, 12, 'Sea view', 'sea-view', 1, '2025-04-03 06:47:04', '2025-04-03 06:47:12'),
(83, 12, 'Mountain view', 'mountain-view', 1, '2025-04-03 06:47:29', '2025-04-03 06:47:36'),
(84, 12, 'Private bathroom', 'private-bathroom', 1, '2025-04-03 06:47:52', '2025-04-03 06:47:59'),
(85, 13, 'Private suite', 'private-suite', 1, '2025-04-03 08:56:49', '2025-04-03 08:56:49');

-- --------------------------------------------------------

--
-- Table structure for table `room_images`
--

CREATE TABLE `room_images` (
  `id` bigint(20) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `roomImage` varchar(255) DEFAULT NULL,
  `roomImgDescription` text DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_images`
--

INSERT INTO `room_images` (`id`, `room_id`, `roomImage`, `roomImgDescription`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '/backend/files/s1SN4qUmrWizPxuKJarC.jpg', '', 1, '2025-04-03 14:48:09', '2025-04-03 14:48:09'),
(2, 1, '/backend/files/Ba0w970urOW4I2T6Mvms.jpg', '', 1, '2025-04-03 14:48:19', '2025-04-03 14:48:19'),
(3, 1, '/backend/files/cwUw8bJYAmoLODFqn88a.jpg', '', 1, '2025-04-03 14:48:27', '2025-04-03 14:48:27'),
(4, 1, '/backend/files/Dubpa6yUt4rm913yYmGk.jpg', '', 1, '2025-04-03 14:48:35', '2025-04-03 14:48:35'),
(5, 2, '/backend/files/mx7KULphkqXmCQNgdSGh.jpg', '', 1, '2025-04-03 14:59:21', '2025-04-03 14:59:21'),
(6, 2, '/backend/files/OQLjTlhmOZU98U93CeMP.jpg', '', 1, '2025-04-03 14:59:30', '2025-04-03 14:59:30'),
(7, 2, '/backend/files/XeEbspMBRrItpIratdBH.jpg', '', 1, '2025-04-03 14:59:36', '2025-04-03 14:59:36'),
(8, 2, '/backend/files/uQqq6pQo4KonWwCjs2a9.jpg', '', 1, '2025-04-03 14:59:44', '2025-04-03 14:59:44'),
(9, 2, '/backend/files/TMC44McTxlWjLA95VPP5.jpg', '', 1, '2025-04-03 14:59:53', '2025-04-03 14:59:53'),
(10, 2, '/backend/files/LRsLChikzBJ1PHQ3h7Uw.jpg', '', 1, '2025-04-03 15:00:01', '2025-04-03 15:00:01'),
(16, 3, '/backend/files/mx7KULphkqXmCQNgdSGh.jpg', '', 1, '2025-04-03 14:59:21', '2025-04-03 14:59:21'),
(17, 3, '/backend/files/LRsLChikzBJ1PHQ3h7Uw.jpg', '', 1, '2025-04-03 15:00:01', '2025-04-03 15:00:01'),
(18, 4, '/backend/files/LRsLChikzBJ1PHQ3h7Uw.jpg', '', 1, '2025-04-03 15:00:01', '2025-04-03 15:00:01'),
(19, 4, '/backend/files/Dubpa6yUt4rm913yYmGk.jpg', '', 1, '2025-04-03 15:00:01', '2025-04-03 15:00:01');

-- --------------------------------------------------------

--
-- Table structure for table `room_size`
--

CREATE TABLE `room_size` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_size`
--

INSERT INTO `room_size` (`id`, `name`, `slug`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Singal', 'singal', 1, '2025-03-31 06:40:50', '2025-03-31 06:40:50'),
(2, 'Double', 'double', 1, '2025-03-31 06:40:54', '2025-03-31 06:40:54'),
(3, 'Tripal', 'tripal', 1, '2025-03-31 06:40:58', '2025-03-31 06:40:58'),
(4, 'Quad', 'quad', 1, '2025-03-31 06:41:01', '2025-03-31 06:41:01'),
(5, 'Queen', 'queen', 1, '2025-03-31 06:41:05', '2025-03-31 06:41:05'),
(6, 'King', 'king', 1, '2025-03-31 06:41:09', '2025-03-31 06:41:09'),
(7, 'Studio', 'studio', 1, '2025-03-31 06:41:15', '2025-03-31 06:41:15'),
(8, 'Suite', 'suite', 1, '2025-03-31 06:41:21', '2025-03-31 06:41:21'),
(9, 'Penthouse', 'penthouse', 1, '2025-03-31 06:41:28', '2025-03-31 06:41:28'),
(10, 'Presidential Suite', 'presidential-suite', 1, '2025-03-31 06:41:34', '2025-03-31 06:41:34'),
(11, 'Duplex', 'duplex', 1, '2025-03-31 06:41:39', '2025-03-31 06:41:39'),
(12, 'Others', 'others', 1, '2025-03-31 06:41:46', '2025-03-31 06:41:46'),
(13, 'Twin', 'twin', 1, '2025-03-31 19:57:48', '2025-03-31 20:54:12'),
(14, 'Small', 'small', 1, '2025-03-31 21:02:43', '2025-03-31 21:02:43'),
(15, 'Vip', 'vip', 1, '2025-03-31 23:10:03', '2025-03-31 23:10:03'),
(16, 'Vip Guest', 'vip-guest', 1, '2025-03-31 23:10:18', '2025-03-31 23:10:18');

-- --------------------------------------------------------

--
-- Table structure for table `rule`
--

CREATE TABLE `rule` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rule`
--

INSERT INTO `rule` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 1, '2024-04-16 10:33:46', '2024-04-16 10:33:46'),
(2, 'Customer', 1, '2024-04-16 10:56:15', '2024-04-16 10:56:15'),
(3, 'Admin', 1, '2024-04-16 10:56:27', '2024-12-06 12:43:05'),
(4, 'User', 1, '2024-04-16 10:56:27', '2024-12-06 12:43:05');

-- --------------------------------------------------------

--
-- Table structure for table `select_room_facilities`
--

CREATE TABLE `select_room_facilities` (
  `id` bigint(20) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `room_facility_group_id` int(11) DEFAULT NULL,
  `facilities_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `select_room_facilities`
--

INSERT INTO `select_room_facilities` (`id`, `room_id`, `room_facility_group_id`, `facilities_id`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 12, 79, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(2, 1, 12, 80, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(3, 1, 12, 81, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(4, 1, 12, 82, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(5, 1, 12, 83, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(6, 1, 12, 84, 1, 6, '2025-04-03 08:44:06', '2025-04-03 08:44:06'),
(7, 1, 8, 65, 1, 6, '2025-04-03 08:44:18', '2025-04-03 08:44:18'),
(8, 1, 8, 66, 1, 6, '2025-04-03 08:44:18', '2025-04-03 08:44:18'),
(9, 1, 8, 67, 1, 6, '2025-04-03 08:44:18', '2025-04-03 08:44:18'),
(10, 1, 8, 68, 1, 6, '2025-04-03 08:44:18', '2025-04-03 08:44:18'),
(11, 1, 8, 69, 1, 6, '2025-04-03 08:44:18', '2025-04-03 08:44:18'),
(12, 1, 9, 70, 1, 6, '2025-04-03 08:44:31', '2025-04-03 08:44:31'),
(13, 1, 9, 71, 1, 6, '2025-04-03 08:44:31', '2025-04-03 08:44:31'),
(14, 1, 9, 72, 1, 6, '2025-04-03 08:44:31', '2025-04-03 08:44:31'),
(15, 1, 10, 24, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(16, 1, 10, 73, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(17, 1, 10, 74, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(18, 1, 10, 75, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(19, 1, 10, 76, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(20, 1, 10, 77, 1, 6, '2025-04-03 08:45:10', '2025-04-03 08:45:10'),
(21, 1, 11, 78, 1, 6, '2025-04-03 08:45:46', '2025-04-03 08:45:46'),
(22, 2, 13, 85, 1, 6, '2025-04-03 08:57:15', '2025-04-03 08:57:15'),
(23, 2, 11, 78, 1, 6, '2025-04-03 08:57:33', '2025-04-03 08:57:33');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `designation` text DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `slug`, `designation`, `message`, `status`, `created_at`, `updated_at`) VALUES
(14, 'Md. Mamunur Rashid', NULL, 'FuturegenIT, CEO', 'FuturegenIT helped me find the perfect apartment in Gulshan. The process was smooth and the service was very professional. Highly recommended!', 1, '2025-05-18 16:12:44', '2025-05-18 16:12:44'),
(15, 'Sharmin Akter', NULL, 'Homeowner in B.Baria', 'I am very happy with their service. They answered all my questions and guided me through the purchase step by step. Excellent support!', 1, '2025-05-18 16:13:38', '2025-05-18 16:13:38'),
(16, 'Gazi Giash Uddin', NULL, 'FuturegenIT, Programmer', 'Finding a home seemed difficult until I contacted FuturegenIT. Their team was friendly, efficient, and truly understood my needs.', 1, '2025-05-18 16:14:08', '2025-05-18 16:14:08');

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` mediumtext NOT NULL,
  `whatsApp` varchar(255) NOT NULL,
  `about_us` mediumtext NOT NULL,
  `copyright` varchar(255) NOT NULL,
  `fblink` varchar(255) DEFAULT NULL,
  `twitterlink` varchar(255) DEFAULT NULL,
  `linkdinlink` varchar(255) DEFAULT NULL,
  `instragramlink` varchar(255) DEFAULT NULL,
  `slugan` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `youtubelink` varchar(255) DEFAULT NULL,
  `update_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `name`, `email`, `address`, `whatsApp`, `about_us`, `copyright`, `fblink`, `twitterlink`, `linkdinlink`, `instragramlink`, `slugan`, `banner_image`, `youtubelink`, `update_by`, `created_at`, `updated_at`) VALUES
(1, 'Concrete Holdings Ltd.,', 'concreteholgingsltd@gmail.com', 'Eastern Housing 2nd phase , Pallabi, Mirpur , Dhaka, Bangladesh, 1216', '01712-903789', 'Concrete Holdings Ltd., we believe a home is more than just bricks and walls—it’s where life happens, memories are made, and futures are built. Whether you\'re searching for your first apartment, upgrading to a larger space, or investing in property, we’re here to guide you every step of the way.', 'All Right Reserved.Designed By Concrete Holdings Ltd.,', 'https://www.facebook.com/chl.propertys', NULL, NULL, '#', 'Work with Experts Who Care About Your Future', '/backend/files/xdInJWnIq7uZzlOe3mKo.jpg', 'https://www.youtube.com/embed/aoJEbllaj2c?si=kIVLuI-hWyoV19NH', NULL, '2024-05-12 05:32:50', '2025-05-19 06:42:20');

-- --------------------------------------------------------

--
-- Table structure for table `slider_images`
--

CREATE TABLE `slider_images` (
  `id` bigint(20) NOT NULL,
  `title_name` varchar(255) DEFAULT NULL,
  `sliderImage` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `slider_images`
--

INSERT INTO `slider_images` (`id`, `title_name`, `sliderImage`, `status`, `created_at`, `updated_at`) VALUES
(8, 'SLIDER', '/backend/files/Q7QoaEovXkwdLAWMIIYg.jpg', 1, '2025-05-19 11:36:22', '2025-05-19 11:36:22'),
(9, 'SLIDER', '/backend/files/abENnDrwoWW6TG1KqvmT.png', 1, '2025-05-19 11:36:56', '2025-05-19 11:36:56'),
(10, 'SLIDER', '/backend/files/Pwn8JNXL6f321RzsHSbT.png', 1, '2025-05-19 11:37:21', '2025-05-19 11:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `country_id` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fg_id` varchar(255) DEFAULT NULL,
  `fg_wallet_address` varchar(255) DEFAULT NULL,
  `inviteCode` varchar(255) DEFAULT NULL,
  `ref_id` int(11) DEFAULT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL COMMENT '1=Supper admin, 2=Customer, 3=Admin, 4=User',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `available_balance` double(10,8) DEFAULT NULL,
  `show_password` varchar(225) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `real_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(225) DEFAULT NULL,
  `image` varchar(225) DEFAULT NULL,
  `doc_file` varchar(255) DEFAULT NULL,
  `address` varchar(225) DEFAULT NULL,
  `address_1` varchar(255) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `website` varchar(225) DEFAULT NULL,
  `github` varchar(225) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `twitter` varchar(225) DEFAULT NULL,
  `instagram` varchar(225) DEFAULT NULL,
  `nationality_id` int(11) DEFAULT NULL,
  `state_id` int(11) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `facebook` varchar(225) DEFAULT NULL,
  `wallet_balance` decimal(10,2) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `telegram` varchar(255) DEFAULT NULL,
  `whtsapp` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `entry_by` int(11) DEFAULT NULL,
  `register_ip` varchar(255) DEFAULT NULL,
  `lastlogin_ip` varchar(255) DEFAULT NULL,
  `lastlogin_country` varchar(255) DEFAULT NULL,
  `lastlogin_datetime` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT 0,
  `logged_out` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fg_id`, `fg_wallet_address`, `inviteCode`, `ref_id`, `employee_id`, `company_name`, `role_id`, `name`, `email`, `username`, `phone`, `available_balance`, `show_password`, `password`, `real_name`, `phone_number`, `image`, `doc_file`, `address`, `address_1`, `address_2`, `website`, `github`, `gender`, `date_of_birth`, `twitter`, `instagram`, `nationality_id`, `state_id`, `otp`, `facebook`, `wallet_balance`, `email_verified_at`, `telegram`, `whtsapp`, `remember_token`, `entry_by`, `register_ip`, `lastlogin_ip`, `lastlogin_country`, `lastlogin_datetime`, `created_at`, `updated_at`, `status`, `logged_out`) VALUES
(1, NULL, '6f21357fs863ce24ce21c1a82f49a7d5d13', '0000123', 0, 4, 'FG IT', 1, 'Black jons', 'dev1@mail.com', 'dev', '019155555', NULL, 'dev', '$2y$10$egNt4iHOZ4sWab8IcaHE9..QCyQc3z4oFRYUwesyeTH52KDFzM5.y', NULL, '01915728982', '/backend/files/hZkagctUSINKsFU64UJr.png', NULL, 'Dhaka', '', '', 'http://localhost:3000/profile', 'http://localhost:3000/profile', '', '1982-01-30', 'http://localhost:3000/profile', 'http://localhost:3000/profile', 0, 0, NULL, 'http://localhost:3000/profile', NULL, NULL, NULL, NULL, NULL, 1, NULL, '127.0.0.1', NULL, '2024-11-22 09:50:10', '2023-06-22 03:20:43', '2025-04-15 02:56:37', 1, NULL),
(2, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'Ibraheem', '12ibraheem@gmail.com', '4888', '045878787888', NULL, 'Ibraheem', '$2y$10$xD8SNrVUclcpYXMtzfx9OeMz98V4bTDYQG/0OwYS.xFv1rwMnufWC', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '2025-04-12 04:01:49', '2025-04-12 04:01:56', 1, NULL),
(3, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'Mr. Hasan', 'Hasan@gmail.com', 'Hasan', '0265968989', NULL, 'Hasan@gmail.com', '$2y$10$SIbY9L7Sd2oHn4Cw5YraDecDtrKXsTsIUsNe8LSAKxaqqA1yPDd/O', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, '2025-05-18 15:47:02', '2025-05-18 15:47:02', 1, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_configs`
--
ALTER TABLE `api_configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_code_unique` (`app_id`);

--
-- Indexes for table `api_key`
--
ALTER TABLE `api_key`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bed_type`
--
ALTER TABLE `bed_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `booking_id` (`booking_id`),
  ADD KEY `idx_room_id` (`room_id`),
  ADD KEY `idx_customer_id` (`customer_id`);

--
-- Indexes for table `booking_type`
--
ALTER TABLE `booking_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bulk_address`
--
ALTER TABLE `bulk_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `walletAddress` (`walletAddress`);

--
-- Indexes for table `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `currency_type`
--
ALTER TABLE `currency_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposit_request`
--
ALTER TABLE `deposit_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facility_group`
--
ALTER TABLE `facility_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `features_properties_slider`
--
ALTER TABLE `features_properties_slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `global_wallet_address`
--
ALTER TABLE `global_wallet_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- Indexes for table `merchant_request`
--
ALTER TABLE `merchant_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `our_properties`
--
ALTER TABLE `our_properties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `post_category`
--
ALTER TABLE `post_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promocode`
--
ALTER TABLE `promocode`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_facility`
--
ALTER TABLE `room_facility`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_images`
--
ALTER TABLE `room_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room_size`
--
ALTER TABLE `room_size`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rule`
--
ALTER TABLE `rule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `select_room_facilities`
--
ALTER TABLE `select_room_facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slider_images`
--
ALTER TABLE `slider_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `fg_wallet_address` (`fg_wallet_address`),
  ADD UNIQUE KEY `fg_id` (`fg_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_configs`
--
ALTER TABLE `api_configs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `api_key`
--
ALTER TABLE `api_key`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `bed_type`
--
ALTER TABLE `bed_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `booking_type`
--
ALTER TABLE `booking_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `bulk_address`
--
ALTER TABLE `bulk_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=247;

--
-- AUTO_INCREMENT for table `currency_type`
--
ALTER TABLE `currency_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `deposit_request`
--
ALTER TABLE `deposit_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `facility_group`
--
ALTER TABLE `facility_group`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `features_properties_slider`
--
ALTER TABLE `features_properties_slider`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `global_wallet_address`
--
ALTER TABLE `global_wallet_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `merchant_request`
--
ALTER TABLE `merchant_request`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `our_properties`
--
ALTER TABLE `our_properties`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `post_category`
--
ALTER TABLE `post_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `promocode`
--
ALTER TABLE `promocode`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `room_facility`
--
ALTER TABLE `room_facility`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `room_images`
--
ALTER TABLE `room_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `room_size`
--
ALTER TABLE `room_size`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `rule`
--
ALTER TABLE `rule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `select_room_facilities`
--
ALTER TABLE `select_room_facilities`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `slider_images`
--
ALTER TABLE `slider_images`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
