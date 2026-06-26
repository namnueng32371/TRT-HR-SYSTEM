-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: trt_hr_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_addresses`
--

DROP TABLE IF EXISTS `employee_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_addresses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `house_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `moo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `village_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `soi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `road` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sub_district` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `province` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_addresses_employee_id_foreign` (`employee_id`),
  CONSTRAINT `employee_addresses_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_addresses`
--

LOCK TABLES `employee_addresses` WRITE;
/*!40000 ALTER TABLE `employee_addresses` DISABLE KEYS */;
INSERT INTO `employee_addresses` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-15 07:07:06','2026-06-15 07:07:06'),(2,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:02:01','2026-06-26 03:02:01'),(3,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:46:37','2026-06-26 03:46:37'),(4,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:49:46','2026-06-26 03:49:46');
/*!40000 ALTER TABLE `employee_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_documents`
--

DROP TABLE IF EXISTS `employee_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_documents` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `id_card_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `house_reg_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contract_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_book_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `transcript_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `application_form_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `other_docs_path` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_documents_employee_id_foreign` (`employee_id`),
  CONSTRAINT `employee_documents_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_documents`
--

LOCK TABLES `employee_documents` WRITE;
/*!40000 ALTER TABLE `employee_documents` DISABLE KEYS */;
INSERT INTO `employee_documents` VALUES (1,1,'employees/1/documents/bAvKv8LCLEPZOfZNIhBdPyhwntqYSn7bwAiU6pO4.pdf',NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-15 07:07:07','2026-06-15 07:07:58'),(2,2,'documents/2/v2jwUHZsx7E7Y05gKbQbyNorVgioyjd3qhvOCuKN.pdf',NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:02:01','2026-06-26 03:04:09'),(3,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:46:37','2026-06-26 03:46:37'),(4,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:49:46','2026-06-26 03:49:46');
/*!40000 ALTER TABLE `employee_documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_emergency_contacts`
--

DROP TABLE IF EXISTS `employee_emergency_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_emergency_contacts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relationship` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_emergency_contacts_employee_id_foreign` (`employee_id`),
  CONSTRAINT `employee_emergency_contacts_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_emergency_contacts`
--

LOCK TABLES `employee_emergency_contacts` WRITE;
/*!40000 ALTER TABLE `employee_emergency_contacts` DISABLE KEYS */;
INSERT INTO `employee_emergency_contacts` VALUES (1,1,NULL,NULL,NULL,NULL,'2026-06-15 07:07:07','2026-06-15 07:07:07'),(2,2,NULL,NULL,NULL,NULL,'2026-06-26 03:02:01','2026-06-26 03:02:01'),(3,3,NULL,NULL,NULL,NULL,'2026-06-26 03:46:37','2026-06-26 03:46:37'),(4,4,NULL,NULL,NULL,NULL,'2026-06-26 03:49:46','2026-06-26 03:49:46');
/*!40000 ALTER TABLE `employee_emergency_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_identities`
--

DROP TABLE IF EXISTS `employee_identities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_identities` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_id` bigint unsigned NOT NULL,
  `id_card_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passport_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pink_card_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_permit_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ssn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ssn_hospital` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `employee_identities_employee_id_foreign` (`employee_id`),
  CONSTRAINT `employee_identities_employee_id_foreign` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_identities`
--

LOCK TABLES `employee_identities` WRITE;
/*!40000 ALTER TABLE `employee_identities` DISABLE KEYS */;
INSERT INTO `employee_identities` VALUES (1,1,'1560301382470',NULL,NULL,NULL,NULL,NULL,'2026-06-15 07:07:06','2026-06-15 07:07:06'),(2,2,'1749900455926',NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:02:01','2026-06-26 03:02:01'),(3,3,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:46:37','2026-06-26 03:46:37'),(4,4,NULL,NULL,NULL,NULL,NULL,NULL,'2026-06-26 03:49:46','2026-06-26 03:49:46');
/*!40000 ALTER TABLE `employee_identities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `employee_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name_th` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name_th` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name_en` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` date NOT NULL,
  `blood_group` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_condition` text COLLATE utf8mb4_unicode_ci,
  `hired_date` date NOT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employees_employee_code_unique` (`employee_code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'P123456','นาย','ทดสอบ','อินทสนธิ์','Namnueng','Intason','เจ๋ง','Programmer',NULL,NULL,'2015-01-15','A',NULL,'2024-10-15','profile_images/6a2fa4e847bfa_1781507304.png','2026-06-15 07:07:06','2026-06-15 07:08:24',NULL),(2,'TM670522','นางสาว','เขมิกา','เทพประสิทธิ์','Khemika','Thepprasit','แค๊ปหมู','HR&Admin Staff,Asst.QMR,IO','0914233954','khemika@icloud.com','1995-08-09','A',NULL,'2024-02-11','profile_images/6a3ded0882635_1782443272.jpg','2026-06-26 03:02:01','2026-06-26 03:40:36',NULL),(3,'TM670515','นางสาว','ทศสุรีย์','ณ ณสมุทรสาคร','Todsuree','NaSamutsakhon','น้ำอบ','จิปาถะ',NULL,NULL,'2001-06-03',NULL,NULL,'2024-01-01','employees/profiles/iUwj2OS4Eof3btYyKUCenQyM1VkIR75r7PRrZLko.jpg','2026-06-26 03:46:36','2026-06-26 03:46:36',NULL),(4,'TM650352','นางสาว','ศิริพร','อำไพพงษ์','Siriporn','Aumpaipong','ตาล','รับจ้างด่าทุกแผนก',NULL,NULL,'1998-10-11',NULL,NULL,'2020-01-01','employees/profiles/s0R6DIqr6q3gitDFkSjmb7NGmq8Q5GJ7vuFfpntW.jpg','2026-06-26 03:49:46','2026-06-26 03:49:46',NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_04_21_032222_create_hr_system_tables',1),(5,'2026_05_07_023140_create_personal_access_tokens_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('6rYHuIspQBJH7nz9RFor1Xz7hUTbBZ7W6NNT6IT4',NULL,'172.18.0.1','Zoombot','eyJfdG9rZW4iOiIxemNOWXhIMmFVd2lwVUV3dEVjWE5semdGWlJxZXExSUtkeUFjVUxDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXYiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=',1782442554),('9vLwU8B6M7pVjw4lIMBlmy7kwV8Su3nvomfA7UUZ',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJIcllXYVlaQkQ5NWxVMWoyVElyQVA5ZUNqd1kxMW5YZTBrU2N1SGhQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXYiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=',1782440579),('D27T0gDB4pZeAru6fmeqMdyor5khc8lVcBa4IyWJ',NULL,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0','eyJfdG9rZW4iOiJMMHl0V1lwSHdqazlHRVBrMDVSV21ZQXBiNU1hcThFQnJYdElkeXFOIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782440605),('h4bA7Nk2H9lzkXf2SXWnWIfVSCZhcKytqWXFoCzx',1,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','eyJfdG9rZW4iOiJwUTVrdXJXa1JZWHRIdnB3NzN3TlFEb2N3cDg5WjVRNDU4OEdDbjdCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoxfQ==',1782442692),('IicIRoiyYFtfIbFNU6JzL7tG3FgwQJ2ZlrgDeaVE',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJ1TGkxTlFSY3RwWk16Y0tuQzRyc0JFNVNBUzE2MVVBTFp2SGJZNFlnIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782440582),('mLTN6JVu0wOR65MeQ746Fjyg0EVKqTXGueqQZ87J',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJMeU1nVklTTXVkcTBlT1FOc1lITVdrVGNGYXdEOUo3SUZ6T1dOMkRSIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782440598),('rW3U9nrtNUY0MbQH9vIAkN06rBXtxOdLtc1tbPrz',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJ0ODJKMDJLd1p2Tnd5VHVPdUtIczA0b3lMTHFmSTkyR2JrQThoM0ZFIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXYiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=',1782440595),('S3rpqLgBctxCeWDQpsK2jAvB7yqHGRVzWtZKGdUs',1,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0','eyJfdG9rZW4iOiJybTVjM3ljVHdERWhoTjN3OUpvS0VUZ1VSdVg4eW8yUzlmbUtsV05uIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2Rhc2hib2FyZCIsInJvdXRlIjoiZGFzaGJvYXJkIn0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfSwibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiOjF9',1782445802),('UAh1KAYvFSYDWPnigZSiyWCBEhVEk4ZWJ68qSgBA',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJCTU94d0ZOcFY1SWticTJ1Wm5IMUQ2ZHVPTDBqMURDVnJkTnFlRUJHIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXYiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=',1782443465),('Y2zn2wS3Zg0jymZ9xdgcas2GsCnnnx4OSpA6gbHG',NULL,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36','eyJfdG9rZW4iOiJFaktKaEJ2cHRkUlU3WG42RThSa1JFNWRaTHlseWFwQ0FYczZ4Z0s4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782445338),('y7WAkCiAKsBve44X1oqa0kyuLRJ1sIafZJoCLIIa',NULL,'172.18.0.1','facebookexternalhit/1.1;line-poker/1.0','eyJfdG9rZW4iOiJZeFVqSjg0WWRZd3VOSmxkc21qaVZ4RnVBMFBkbWFhd0NtN2U4RkE5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782443475),('Zeh0OwVOK925RpO2VbfM1zwpnbkOz5RKME6g4wIY',NULL,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0','eyJfdG9rZW4iOiJXWFFRQlN4ODF0dWZZUUxoR0kzZGRZQkgyMEI4NHdXVmNxWml4SGNkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2hhcm5lc3MtYnV6ei1zZWxkb20ubmdyb2stZnJlZS5kZXZcL2xvZ2luIiwicm91dGUiOiJsb2dpbiJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19',1782440671);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'น้ำหนึ่ง อินทสนธิ์','namnueng.inta@gmail.com',NULL,'$2y$12$AqaJ9yhaptgiJfbCv0xu4ezxrFrqh48G0uJE8VDG5WeL9WcfvMGFa',NULL,'2026-06-15 07:05:03','2026-06-15 07:05:03');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-26  4:43:00
