-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2026 at 12:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `englearning`
--

-- --------------------------------------------------------

--
-- Table structure for table `grammar_categories`
--

CREATE TABLE `grammar_categories` (
  `Id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `display_order` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `grammar_sections`
--

CREATE TABLE `grammar_sections` (
  `Id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `display_order` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `idioms`
--

CREATE TABLE `idioms` (
  `Id` int(11) NOT NULL,
  `idiom_text` varchar(255) NOT NULL,
  `first_letter` varchar(1) NOT NULL,
  `Phonetic` varchar(255) DEFAULT NULL,
  `meaning_en` text NOT NULL,
  `meaning_vi` text NOT NULL,
  `Example` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listening_exercises`
--

CREATE TABLE `listening_exercises` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `Level` varchar(2) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `audio_type` varchar(255) NOT NULL,
  `audio_url` varchar(500) NOT NULL,
  `Transcript` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listening_fill_blank_answers`
--

CREATE TABLE `listening_fill_blank_answers` (
  `Id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `blank_number` tinyint(4) NOT NULL,
  `correct_answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listening_questions`
--

CREATE TABLE `listening_questions` (
  `Id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `question_number` tinyint(4) NOT NULL,
  `question_type` varchar(30) NOT NULL,
  `question_text` text NOT NULL,
  `correct_answer` varchar(255) NOT NULL,
  `Explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listening_question_options`
--

CREATE TABLE `listening_question_options` (
  `Id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_key` varchar(1) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_exercises`
--

CREATE TABLE `reading_exercises` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `Level` varchar(2) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `Passage` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_fill_blank_answers`
--

CREATE TABLE `reading_fill_blank_answers` (
  `Id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `blank_number` tinyint(4) NOT NULL,
  `correct_answer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_questions`
--

CREATE TABLE `reading_questions` (
  `Id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `question_number` tinyint(4) NOT NULL,
  `question_type` varchar(30) NOT NULL,
  `question_text` text NOT NULL,
  `correct_answer` text NOT NULL,
  `Explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_question_options`
--

CREATE TABLE `reading_question_options` (
  `Id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_key` varchar(10) NOT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speaking_criterion_scores`
--

CREATE TABLE `speaking_criterion_scores` (
  `Id` int(11) NOT NULL,
  `grade_id` int(11) NOT NULL,
  `criterion_code` varchar(50) NOT NULL,
  `Score` decimal(3,1) NOT NULL,
  `Feedback` text DEFAULT NULL,
  `Strengths` text DEFAULT NULL,
  `Weaknesses` text DEFAULT NULL,
  `Suggestions` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speaking_exercises`
--

CREATE TABLE `speaking_exercises` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `speaking_type` varchar(50) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `speaking_exercises`
--

INSERT INTO `speaking_exercises` (`Id`, `topic_id`, `Title`, `created_at`, `speaking_type`) VALUES
(1, 14, 'Hometown', '2026-10-21 10:46:31', 'INTRODUCTION_INTERVIEW'),
(2, 15, 'Work or Study', '2026-10-21 10:46:35', 'INTRODUCTION_INTERVIEW'),
(3, 17, 'Technology', '2026-10-21 10:46:37', 'INTRODUCTION_INTERVIEW'),
(4, 14, 'Family member', '2026-10-21 10:16:38', 'TOPIC'),
(5, 14, 'Your hometown', '2026-10-21 10:16:38', 'TOPIC'),
(6, 14, 'Technology', '2026-10-21 10:16:38', 'TOPIC_DISCUSS'),
(7, 14, 'Education', '2026-10-21 10:16:38', 'TOPIC_DISCUSS');

-- --------------------------------------------------------

--
-- Table structure for table `speaking_grades`
--

CREATE TABLE `speaking_grades` (
  `Id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `grader_id` int(11) NOT NULL,
  `overall_score` decimal(3,1) DEFAULT NULL,
  `Feedback` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `speaking_questions`
--

CREATE TABLE `speaking_questions` (
  `Id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `question_number` tinyint(4) NOT NULL,
  `question_text` text NOT NULL,
  `preparation_time` int(11) DEFAULT NULL,
  `response_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `module_type` varchar(255) NOT NULL,
  `create_by` varchar(255) DEFAULT NULL,
  `create_by_user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`Id`, `Name`, `Description`, `module_type`, `create_by`, `create_by_user_id`) VALUES
(2, 'Pie Chart', NULL, 'WRITING', 'ADMIN', NULL),
(3, 'Bar chart', NULL, 'WRITING', 'ADMIN', NULL),
(4, 'Line Graph', NULL, 'WRITING', 'ADMIN', NULL),
(5, 'Map', NULL, 'WRITING', 'ADMIN', NULL),
(6, 'Mixed Graph', NULL, 'WRITING', 'ADMIN', NULL),
(7, 'Process', NULL, 'WRITING', 'ADMIN', NULL),
(8, 'Table', NULL, 'WRITING', 'ADMIN', NULL),
(9, 'Discuss Both Views', NULL, 'WRITING', 'ADMIN', NULL),
(10, 'Opinion Essay', NULL, 'WRITING', 'ADMIN', NULL),
(11, 'Advantages & Disadvantages', NULL, 'WRITING', 'ADMIN', NULL),
(12, 'Problem & Solution', NULL, 'WRITING', 'ADMIN', NULL),
(13, 'Two-part Question', NULL, 'WRITING', 'ADMIN', NULL),
(14, 'Bản thân & Gia đình', NULL, 'SPEAKING', 'ADMIN', NULL),
(15, 'Học tập & Nghề nghiệp', NULL, 'SPEAKING', 'ADMIN', NULL),
(16, 'Giải trí & Sở thích', NULL, 'SPEAKING', 'ADMIN', NULL),
(17, 'Công nghệ & Xã hội', NULL, 'SPEAKING', 'ADMIN', NULL),
(18, 'Lối sống & Sức khỏe', NULL, 'SPEAKING', 'ADMIN', NULL),
(19, 'Môi trường & Du lịch', NULL, 'SPEAKING', 'ADMIN', NULL),
(20, 'Ý tưởng & Cuộc sống', NULL, 'SPEAKING', 'ADMIN', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `translation_exercises`
--

CREATE TABLE `translation_exercises` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `Level` varchar(2) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `source_text` text NOT NULL,
  `reference_translation` text NOT NULL,
  `Explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_listening_answers`
--

CREATE TABLE `user_listening_answers` (
  `Id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_answer` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_listening_attempts`
--

CREATE TABLE `user_listening_attempts` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `Score` tinyint(4) NOT NULL,
  `total_questions` tinyint(4) NOT NULL,
  `correct_answers_num` tinyint(4) NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_reading_answers`
--

CREATE TABLE `user_reading_answers` (
  `Id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_answer` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_reading_attempts`
--

CREATE TABLE `user_reading_attempts` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `Score` tinyint(4) NOT NULL,
  `total_questions` tinyint(4) NOT NULL,
  `correct_answers_num` tinyint(4) NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_speaking_answers`
--

CREATE TABLE `user_speaking_answers` (
  `Id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `audio_url` varchar(500) NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_speaking_attempts`
--

CREATE TABLE `user_speaking_attempts` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `Status` varchar(30) NOT NULL,
  `overall_score` decimal(3,1) DEFAULT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_translation_attempts`
--

CREATE TABLE `user_translation_attempts` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `user_response` text NOT NULL,
  `Score` tinyint(4) NOT NULL,
  `llm_feedback` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_word_progress`
--

CREATE TABLE `user_word_progress` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `word_id` int(11) NOT NULL,
  `Status` tinyint(4) NOT NULL,
  `next_review_at` date NOT NULL,
  `last_reviewed_at` date NOT NULL,
  `Level` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_writing_attempts`
--

CREATE TABLE `user_writing_attempts` (
  `Id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `user_response` text NOT NULL,
  `overall_score` decimal(3,1) NOT NULL,
  `llm_raw_response` longtext NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `completed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_writing_criterion_scores`
--

CREATE TABLE `user_writing_criterion_scores` (
  `Id` int(11) NOT NULL,
  `attempt_id` int(11) NOT NULL,
  `criterion_code` varchar(50) NOT NULL,
  `Score` decimal(3,1) NOT NULL,
  `Feedback` text NOT NULL,
  `Strengths` text NOT NULL,
  `Weaknesses` text NOT NULL,
  `Suggestions` text NOT NULL,
  `Issues` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `words`
--

CREATE TABLE `words` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `word` varchar(255) NOT NULL,
  `Meaning` text NOT NULL,
  `Phonetic` varchar(255) NOT NULL,
  `part_of_speech` varchar(255) NOT NULL,
  `Example` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `writing_exercises`
--

CREATE TABLE `writing_exercises` (
  `Id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `writing_type` varchar(50) DEFAULT NULL,
  `question_text` text NOT NULL,
  `Instruction` text DEFAULT NULL,
  `reference_answer` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `writing_exercises`
--

INSERT INTO `writing_exercises` (`Id`, `topic_id`, `Title`, `image_url`, `writing_type`, `question_text`, `Instruction`, `reference_answer`, `created_at`) VALUES
(1, 12, 'Causes and Solutions for Traffic Congestion', 'writing_1.jpg', NULL, 'Traffic congestion in cities around the world is increasing. What are the causes of this? What solutions can be suggested?', NULL, NULL, '2026-10-20 07:28:56'),
(2, 2, 'Pie Chart: Percentage of volunteers by organisation type (2008 and 2014)', 'writing_2.jpg', NULL, 'The charts below show the percentage of volunteers by organizations in 2008 and 2014. Summarise the information by selecting and reporting the main features and make comparisons where relevant.', 'HƯỚNG DẪN VIẾT BÀI\r\nVolunteers by Organizations\r\n1. Giải thích đề\r\nHai biểu đồ tròn cho thấy tỷ lệ người tình nguyện trong sáu lĩnh vực (Environmental, Art, Sport, Health Care, Educational, Others) vào năm 2008 và 2014.\r\n\r\n→ Dạng: pie charts – so sánh 2 mốc thời gian\r\n\r\n2. Introduction (paraphrase)\r\nGiữ: participation / different organisations / two years.\r\n\r\nMẫu: The pie charts illustrate the proportions of volunteers working in six different sectors in 2008 and 2014.\r\n\r\n3. Overview (ý chính)\r\nEnvironmental và Sport tăng đáng kể, trở thành hai nhóm lớn nhất vào 2014\r\nEducational giảm rõ rệt\r\nArt và Others giảm nhẹ\r\nHealth Care tăng nhẹ, gần như ổn định\r\n4. Chia BODY\r\nBODY 1 – Nhóm tăng\r\nEnvironmental: 21% → 29% → tăng mạnh nhất, trở thành lớn nhất\r\nSport: 15% → 25% → tăng đáng kể\r\nHealth Care: 7% → 8% → tăng nhẹ\r\nBODY 2 – Nhóm giảm\r\nEducational: 24% → 17% → giảm rõ rệt\r\nArt: 18% → 12% → giảm\r\nOthers: 15% → 9% → giảm\r\n5. Gợi ý từ vựng\r\naccount for\r\nmake up\r\nincrease significantly\r\ndecline noticeably\r\nrise steadily\r\nremain relatively stable\r\novertake\r\nSample 8.0\r\nThe two pie charts compare the proportions of volunteers working in six different sectors in 2008 and 2014.\r\n\r\nOverall, environmental and sports-related volunteering increased over the period, while participation in educational activities, art, and \"other\" categories declined. The most notable change was the rise of environmental work, which became the largest sector by 2014.\r\n\r\nIn 2008, educational volunteering accounted for the largest share at 24%, followed by environmental work at 21% and art at 18%. Sport and \"other\" activities each represented 15%, while health care was the least common sector at just 7%.\r\n\r\nBy 2014, environmental volunteering had grown significantly to 29%, overtaking all other categories. Sport also increased markedly to 25%, becoming the second most popular sector. In contrast, art saw a noticeable decline to 12%, and educational activities fell to 17%. Health care rose slightly from 7% to 8%, whereas the proportion of volunteers in other activities dropped considerably to 9%.', NULL, '2026-10-19 18:30:18');

-- --------------------------------------------------------

--
-- Table structure for table `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20261018061907_InitialCreate', '9.0.0'),
('20261019192042_SyncModelChanges', '9.0.0'),
('20261019195403_SyncLatestEntityChanges', '9.0.0'),
('20261021021405_SyncTopicEntityChanges', '9.0.0'),
('20261021081621_MoveSpeakingTypeToExercise', '9.0.0'),
('20261021095510_UpdateSpeakingWritingConfig', '9.0.0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grammar_categories`
--
ALTER TABLE `grammar_categories`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_grammar_categories_parent_id` (`parent_id`);

--
-- Indexes for table `grammar_sections`
--
ALTER TABLE `grammar_sections`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_grammar_sections_category_id` (`category_id`);

--
-- Indexes for table `idioms`
--
ALTER TABLE `idioms`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `listening_exercises`
--
ALTER TABLE `listening_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_listening_exercises_topic_id` (`topic_id`);

--
-- Indexes for table `listening_fill_blank_answers`
--
ALTER TABLE `listening_fill_blank_answers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_listening_fill_blank_answers_question_id` (`question_id`);

--
-- Indexes for table `listening_questions`
--
ALTER TABLE `listening_questions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_listening_questions_exercise_id` (`exercise_id`);

--
-- Indexes for table `listening_question_options`
--
ALTER TABLE `listening_question_options`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_listening_question_options_question_id` (`question_id`);

--
-- Indexes for table `reading_exercises`
--
ALTER TABLE `reading_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_reading_exercises_topic_id` (`topic_id`);

--
-- Indexes for table `reading_fill_blank_answers`
--
ALTER TABLE `reading_fill_blank_answers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_reading_fill_blank_answers_question_id` (`question_id`);

--
-- Indexes for table `reading_questions`
--
ALTER TABLE `reading_questions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_reading_questions_exercise_id` (`exercise_id`);

--
-- Indexes for table `reading_question_options`
--
ALTER TABLE `reading_question_options`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_reading_question_options_question_id` (`question_id`);

--
-- Indexes for table `speaking_criterion_scores`
--
ALTER TABLE `speaking_criterion_scores`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `IX_speaking_criterion_scores_grade_id_criterion_code` (`grade_id`,`criterion_code`),
  ADD KEY `IX_speaking_criterion_scores_grade_id` (`grade_id`);

--
-- Indexes for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_speaking_exercises_topic_id` (`topic_id`);

--
-- Indexes for table `speaking_grades`
--
ALTER TABLE `speaking_grades`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_speaking_grades_attempt_id` (`attempt_id`),
  ADD KEY `IX_speaking_grades_grader_id` (`grader_id`);

--
-- Indexes for table `speaking_questions`
--
ALTER TABLE `speaking_questions`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_speaking_questions_exercise_id` (`exercise_id`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_topics_create_by_user_id` (`create_by_user_id`);

--
-- Indexes for table `translation_exercises`
--
ALTER TABLE `translation_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_translation_exercises_topic_id` (`topic_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `user_listening_answers`
--
ALTER TABLE `user_listening_answers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_listening_answers_attempt_id` (`attempt_id`),
  ADD KEY `IX_user_listening_answers_question_id` (`question_id`);

--
-- Indexes for table `user_listening_attempts`
--
ALTER TABLE `user_listening_attempts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_listening_attempts_exercise_id` (`exercise_id`),
  ADD KEY `IX_user_listening_attempts_user_id` (`user_id`);

--
-- Indexes for table `user_reading_answers`
--
ALTER TABLE `user_reading_answers`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_reading_answers_attempt_id` (`attempt_id`),
  ADD KEY `IX_user_reading_answers_question_id` (`question_id`);

--
-- Indexes for table `user_reading_attempts`
--
ALTER TABLE `user_reading_attempts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_reading_attempts_exercise_id` (`exercise_id`),
  ADD KEY `IX_user_reading_attempts_user_id` (`user_id`);

--
-- Indexes for table `user_speaking_answers`
--
ALTER TABLE `user_speaking_answers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `IX_user_speaking_answers_attempt_id_question_id` (`attempt_id`,`question_id`),
  ADD KEY `IX_user_speaking_answers_attempt_id` (`attempt_id`),
  ADD KEY `IX_user_speaking_answers_question_id` (`question_id`);

--
-- Indexes for table `user_speaking_attempts`
--
ALTER TABLE `user_speaking_attempts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_speaking_attempts_exercise_id` (`exercise_id`),
  ADD KEY `IX_user_speaking_attempts_user_id` (`user_id`);

--
-- Indexes for table `user_translation_attempts`
--
ALTER TABLE `user_translation_attempts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_translation_attempts_exercise_id` (`exercise_id`),
  ADD KEY `IX_user_translation_attempts_user_id` (`user_id`);

--
-- Indexes for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_word_progress_user_id` (`user_id`),
  ADD KEY `IX_user_word_progress_word_id` (`word_id`);

--
-- Indexes for table `user_writing_attempts`
--
ALTER TABLE `user_writing_attempts`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_user_writing_attempts_exercise_id` (`exercise_id`),
  ADD KEY `IX_user_writing_attempts_user_id` (`user_id`);

--
-- Indexes for table `user_writing_criterion_scores`
--
ALTER TABLE `user_writing_criterion_scores`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `IX_user_writing_criterion_scores_attempt_id_criterion_code` (`attempt_id`,`criterion_code`);

--
-- Indexes for table `words`
--
ALTER TABLE `words`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_words_topic_id` (`topic_id`);

--
-- Indexes for table `writing_exercises`
--
ALTER TABLE `writing_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_writing_exercises_topic_id` (`topic_id`);

--
-- Indexes for table `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grammar_categories`
--
ALTER TABLE `grammar_categories`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `grammar_sections`
--
ALTER TABLE `grammar_sections`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `idioms`
--
ALTER TABLE `idioms`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listening_exercises`
--
ALTER TABLE `listening_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listening_fill_blank_answers`
--
ALTER TABLE `listening_fill_blank_answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listening_questions`
--
ALTER TABLE `listening_questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listening_question_options`
--
ALTER TABLE `listening_question_options`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_exercises`
--
ALTER TABLE `reading_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_fill_blank_answers`
--
ALTER TABLE `reading_fill_blank_answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_questions`
--
ALTER TABLE `reading_questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_question_options`
--
ALTER TABLE `reading_question_options`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speaking_criterion_scores`
--
ALTER TABLE `speaking_criterion_scores`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `speaking_grades`
--
ALTER TABLE `speaking_grades`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `speaking_questions`
--
ALTER TABLE `speaking_questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `translation_exercises`
--
ALTER TABLE `translation_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_listening_answers`
--
ALTER TABLE `user_listening_answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_listening_attempts`
--
ALTER TABLE `user_listening_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_reading_answers`
--
ALTER TABLE `user_reading_answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_reading_attempts`
--
ALTER TABLE `user_reading_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_speaking_answers`
--
ALTER TABLE `user_speaking_answers`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_speaking_attempts`
--
ALTER TABLE `user_speaking_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_translation_attempts`
--
ALTER TABLE `user_translation_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_writing_attempts`
--
ALTER TABLE `user_writing_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_writing_criterion_scores`
--
ALTER TABLE `user_writing_criterion_scores`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `words`
--
ALTER TABLE `words`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `writing_exercises`
--
ALTER TABLE `writing_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grammar_categories`
--
ALTER TABLE `grammar_categories`
  ADD CONSTRAINT `FK_grammar_categories_grammar_categories_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `grammar_categories` (`Id`);

--
-- Constraints for table `grammar_sections`
--
ALTER TABLE `grammar_sections`
  ADD CONSTRAINT `FK_grammar_sections_grammar_categories_category_id` FOREIGN KEY (`category_id`) REFERENCES `grammar_categories` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `listening_exercises`
--
ALTER TABLE `listening_exercises`
  ADD CONSTRAINT `FK_listening_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `listening_fill_blank_answers`
--
ALTER TABLE `listening_fill_blank_answers`
  ADD CONSTRAINT `FK_listening_fill_blank_answers_listening_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `listening_questions` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `listening_questions`
--
ALTER TABLE `listening_questions`
  ADD CONSTRAINT `FK_listening_questions_listening_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `listening_exercises` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `listening_question_options`
--
ALTER TABLE `listening_question_options`
  ADD CONSTRAINT `FK_listening_question_options_listening_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `listening_questions` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `reading_exercises`
--
ALTER TABLE `reading_exercises`
  ADD CONSTRAINT `FK_reading_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `reading_fill_blank_answers`
--
ALTER TABLE `reading_fill_blank_answers`
  ADD CONSTRAINT `FK_reading_fill_blank_answers_reading_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `reading_questions` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `reading_questions`
--
ALTER TABLE `reading_questions`
  ADD CONSTRAINT `FK_reading_questions_reading_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `reading_exercises` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `reading_question_options`
--
ALTER TABLE `reading_question_options`
  ADD CONSTRAINT `FK_reading_question_options_reading_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `reading_questions` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `speaking_criterion_scores`
--
ALTER TABLE `speaking_criterion_scores`
  ADD CONSTRAINT `FK_speaking_criterion_scores_speaking_grades_grade_id` FOREIGN KEY (`grade_id`) REFERENCES `speaking_grades` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  ADD CONSTRAINT `FK_speaking_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`);

--
-- Constraints for table `speaking_grades`
--
ALTER TABLE `speaking_grades`
  ADD CONSTRAINT `FK_speaking_grades_user_speaking_attempts_attempt_id` FOREIGN KEY (`attempt_id`) REFERENCES `user_speaking_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `topics`
--
ALTER TABLE `topics`
  ADD CONSTRAINT `FK_topics_user_create_by_user_id` FOREIGN KEY (`create_by_user_id`) REFERENCES `user` (`Id`);

--
-- Constraints for table `translation_exercises`
--
ALTER TABLE `translation_exercises`
  ADD CONSTRAINT `FK_translation_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_listening_answers`
--
ALTER TABLE `user_listening_answers`
  ADD CONSTRAINT `FK_user_listening_answers_listening_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `listening_questions` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_listening_answers_user_listening_attempts_attempt_id` FOREIGN KEY (`attempt_id`) REFERENCES `user_listening_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_listening_attempts`
--
ALTER TABLE `user_listening_attempts`
  ADD CONSTRAINT `FK_user_listening_attempts_listening_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `listening_exercises` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_listening_attempts_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_reading_answers`
--
ALTER TABLE `user_reading_answers`
  ADD CONSTRAINT `FK_user_reading_answers_reading_questions_question_id` FOREIGN KEY (`question_id`) REFERENCES `reading_questions` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_reading_answers_user_reading_attempts_attempt_id` FOREIGN KEY (`attempt_id`) REFERENCES `user_reading_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_reading_attempts`
--
ALTER TABLE `user_reading_attempts`
  ADD CONSTRAINT `FK_user_reading_attempts_reading_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `reading_exercises` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_reading_attempts_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_speaking_answers`
--
ALTER TABLE `user_speaking_answers`
  ADD CONSTRAINT `FK_user_speaking_answers_user_speaking_attempts_attempt_id` FOREIGN KEY (`attempt_id`) REFERENCES `user_speaking_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_translation_attempts`
--
ALTER TABLE `user_translation_attempts`
  ADD CONSTRAINT `FK_user_translation_attempts_translation_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `translation_exercises` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_translation_attempts_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_word_progress`
--
ALTER TABLE `user_word_progress`
  ADD CONSTRAINT `FK_user_word_progress_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_user_word_progress_words_word_id` FOREIGN KEY (`word_id`) REFERENCES `words` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `user_writing_attempts`
--
ALTER TABLE `user_writing_attempts`
  ADD CONSTRAINT `FK_user_writing_attempts_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`),
  ADD CONSTRAINT `FK_user_writing_attempts_writing_exercises_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `writing_exercises` (`Id`);

--
-- Constraints for table `user_writing_criterion_scores`
--
ALTER TABLE `user_writing_criterion_scores`
  ADD CONSTRAINT `FK_user_writing_criterion_scores_user_writing_attempts_attempt_~` FOREIGN KEY (`attempt_id`) REFERENCES `user_writing_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `words`
--
ALTER TABLE `words`
  ADD CONSTRAINT `FK_words_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `writing_exercises`
--
ALTER TABLE `writing_exercises`
  ADD CONSTRAINT `FK_writing_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
