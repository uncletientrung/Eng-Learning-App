-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2026 at 03:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
(6, 17, 'Technology in daily life', '2026-10-25 16:00:03', 'TOPIC_DISCUSS'),
(7, 15, 'Education', '2026-10-24 01:40:44', 'TOPIC_DISCUSS');

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
  `response_time` int(11) DEFAULT NULL,
  `closing` text DEFAULT NULL,
  `cues` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cues`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `speaking_questions`
--

INSERT INTO `speaking_questions` (`Id`, `exercise_id`, `question_number`, `question_text`, `preparation_time`, `response_time`, `closing`, `cues`) VALUES
(1, 1, 1, 'Let\'s talk about your hometown. Where is your hometown?', 0, 300, NULL, NULL),
(2, 1, 2, 'What do you like most about your hometown?', 0, 300, NULL, NULL),
(3, 1, 3, 'Has your hometown changed much in recent years?', 0, 300, NULL, NULL),
(4, 1, 4, 'Would you say your hometown is a good place for young people to live?', 0, 300, NULL, NULL),
(5, 1, 5, 'Do you think you will live in your hometown in the future?', 0, 300, NULL, NULL),
(6, 4, 1, 'Describe a family member you are closest to.', 60, 120, 'and explain why you feel especially close to this person.', '[\"who this person is\", \"what they are like\", \"what you usually do together\", \"how long you have been close\"]'),
(7, 6, 1, 'How has technology changed people\'s daily lives?', 0, 300, NULL, NULL),
(8, 6, 2, 'Do you think people rely too much on technology?', 0, 300, NULL, NULL),
(9, 6, 3, 'What are the advantages and disadvantages of using smartphones?', 0, 300, NULL, NULL);

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
(20, 'Ý tưởng & Cuộc sống', NULL, 'SPEAKING', 'ADMIN', NULL),
(21, 'Khoa học & Công nghệ', NULL, 'VOCABULARY', 'ADMIN', NULL),
(22, 'Môi trường & Sinh thái', NULL, 'VOCABULARY', 'ADMIN', NULL),
(23, 'Xã hội & Văn hóa', NULL, 'VOCABULARY', 'ADMIN', NULL),
(24, 'Lịch sử & Khảo cổ học', NULL, 'VOCABULARY', 'ADMIN', NULL),
(25, 'Kinh tế & Kinh doanh', NULL, 'VOCABULARY', 'ADMIN', NULL),
(26, 'Sức khỏe & Y tế', NULL, 'VOCABULARY', 'ADMIN', NULL),
(27, 'Giáo dục & Tâm lý học', NULL, 'VOCABULARY', 'ADMIN', NULL),
(28, 'Đô thị & Kiến trúc', NULL, 'VOCABULARY', 'ADMIN', NULL),
(29, 'Truyền thông & Báo chí', NULL, 'VOCABULARY', 'ADMIN', NULL),
(30, 'Vấn đề Toàn cầu', NULL, 'VOCABULARY', 'ADMIN', NULL),
(31, 'Nghệ thuật & Giải trí', NULL, 'VOCABULARY', 'ADMIN', NULL);

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

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Name`, `Role`, `Username`, `Password`, `Email`, `Phone`, `Status`) VALUES
(1, 'test1', 'ADMIN', 'a', 'AQAAAAIAAYagAAAAEDnG6IBcS7dN59XlrketOc3GcncfNBXOWDkCrXKpe2n1c8G4ro5SiUShSJZGFkopHA==', 'test@gmail.com', '0352447642', 1);

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

--
-- Dumping data for table `words`
--

INSERT INTO `words` (`Id`, `topic_id`, `word`, `Meaning`, `Phonetic`, `part_of_speech`, `Example`) VALUES
(1, 21, 'accelerate', 'tăng tốc, đẩy nhanh', 'æk.ˈsɛl.ə.ˌɹeɪt', 'v', 'Technology can accelerate economic growth.'),
(2, 21, 'apparatus', 'thiết bị, dụng cụ', 'æpəˈɹɑːtəs', 'n', 'The laboratory apparatus was carefully calibrated.'),
(3, 21, 'attribute', 'quy cho, thuộc tính', 'ˈætrəbjut', 'v/n', 'Scientists attribute the change to climate shifts.'),
(4, 21, 'biochemical', 'thuộc hóa sinh', 'baɪoʊkˈɛməkəl', 'adj', 'Biochemical reactions occur in living cells.'),
(5, 21, 'catalyst', 'chất xúc tác; nhân tố thúc đẩy', 'ˈkæt.əl.ɪst', 'n', 'Innovation acts as a catalyst for progress.'),
(6, 21, 'calibrate', 'hiệu chỉnh, đánh dấu thang đo', 'kˈæləbreɪt', 'v', 'Engineers calibrate instruments before use.'),
(7, 21, 'cellular', 'thuộc tế bào', 'sˈɛljəlɚ', 'adj', 'Cellular respiration produces energy.'),
(8, 21, 'compound', 'hợp chất; phức tạp', 'ˈkɒmpaʊnd', 'n/adj', 'Water is a compound of hydrogen and oxygen.'),
(9, 21, 'conceive', 'hình thành ý tưởng, thai nghén', 'kənˈsiːv', 'v', 'Darwin conceived the theory of natural selection.'),
(10, 21, 'condense', 'ngưng tụ; cô đọng', 'kənˈdɛns', 'v', 'Steam condenses into water when cooled.'),
(11, 21, 'configuration', 'cấu hình, cách sắp xếp', 'kənfɪgjɚˈeɪʃən', 'n', 'The atomic configuration determines chemical properties.'),
(12, 21, 'contaminate', 'làm ô nhiễm, làm bẩn', 'kənˈtæmɪneɪt', 'v', 'Industrial waste can contaminate water supplies.'),
(13, 21, 'convert', 'chuyển đổi', 'ˈkɒn.vəːt', 'v', 'Solar panels convert light into electricity.'),
(14, 21, 'correlation', 'mối tương quan', 'kɒɹəˈleɪʃən', 'n', 'There is a strong correlation between diet and health.'),
(15, 21, 'decipher', 'giải mã, đọc hiểu', 'dɪˈsaɪfə(ɹ)', 'v', 'Scientists deciphered the human genome.'),
(16, 21, 'decompose', 'phân hủy', 'ˌdiːkəmˈpəʊz', 'v', 'Organic matter decomposes over time.'),
(17, 21, 'deduce', 'suy luận, rút ra kết luận', 'dɪˈdjuːs', 'v', 'Researchers deduced the cause from the data.'),
(18, 21, 'devise', 'phát minh, nghĩ ra', 'dɪˈvaɪz', 'v', 'Engineers devised a new cooling system.'),
(19, 21, 'diagnose', 'chẩn đoán', 'daɪəɡˈnəʊz', 'v', 'Doctors diagnose diseases using blood tests.'),
(20, 21, 'disperse', 'phân tán, lan rộng', 'dɪˈspɜːs', 'v', 'Seeds disperse through wind and water.'),
(21, 21, 'innovation', 'sự đổi mới', 'ˌɪnəˈveɪʃən', 'n', 'Technical innovation is key to staying competitive.'),
(22, 21, 'automation', 'tự động hóa', 'ɔtəmˈeɪʃən', 'n', 'Automation has replaced many manual labor jobs.'),
(23, 21, 'algorithm', 'thuật toán', 'ˈælɡəɹɪðəm', 'n', 'The social media algorithm determines what you see.'),
(24, 21, 'breakthrough', 'bước đột phá', 'ˈbɹeɪkθɹuː', 'n', 'Scientists have made a major breakthrough in cancer research.'),
(25, 21, 'cybersecurity', 'an ninh mạng', 'saɪbəsɪˈkjʊəɹɪtɪ', 'n', 'Companies are investing more in cybersecurity.'),
(26, 21, 'nanotechnology', 'công nghệ nano', 'nænoʊtɛknˈɑlədʒi', 'n', 'Nanotechnology could revolutionize medicine.'),
(27, 21, 'artificial intelligence', 'trí tuệ nhân tạo', 'ɑː(ɹ)təˈfɪʃəl ɪntˈɛlədʒəns', 'n', 'AI can process vast amounts of data quickly.'),
(28, 21, 'robotics', 'rô-bốt học', 'ɹəʊˈbɒt.ɪks', 'n', 'Robotics is used extensively in car manufacturing.'),
(29, 21, 'biotechnology', 'công nghệ sinh học', 'ˈbaɪəʊˌtɛk.nɒl.əʊ.dʒi', 'n', 'Biotechnology is used to develop new vaccines.'),
(30, 21, 'simulation', 'sự mô phỏng', 'sɪmjəlˈeɪʃən', 'n', 'Pilots train using flight simulations.'),
(31, 21, 'virtual reality', 'thực tế ảo', 'vˈɝtʃuəl riˈæləti', 'n', 'VR can create immersive learning experiences.'),
(32, 21, 'encryption', 'mã hóa', 'ɛnkrˈɪpʃən', 'n', 'Encryption protects your personal information online.'),
(33, 21, 'bandwidth', 'băng thông', 'bˈændwɪdθ', 'n', 'Video streaming requires high bandwidth.'),
(34, 21, 'protocol', 'giao thức', 'prˈoʊtəkɑl', 'n', 'The TCP/IP protocol is the foundation of the internet.'),
(35, 21, 'database', 'cơ sở dữ liệu', 'dˈeɪtəbeɪs', 'n', 'All customer information is stored in a database.'),
(36, 21, 'interface', 'giao diện', 'ˈɪntɚfeɪs', 'n', 'A user-friendly interface is essential for any app.'),
(37, 21, 'quantum computing', 'máy tính lượng tử', 'kwˈɑntəm kəmpjˈutɪŋ', 'n', 'Quantum computing could solve complex problems in seconds.'),
(38, 21, 'semiconductor', 'bán dẫn', 'sɛmikəndˈʌktɚ', 'n', 'Chips are made using semiconductor materials.'),
(39, 21, 'infrastructure', 'cơ sở hạ tầng', 'ɪnfrəstrˈʌktʃɚ', 'n', 'Digital infrastructure is critical for modern business.'),
(40, 21, 'telecommunications', 'viễn thông', 'tɛləkəmjunəkˈeɪʃənz', 'n', 'The telecommunications industry has grown rapidly.'),
(41, 21, 'wireless', 'không dây', 'wˈaɪrlɪs', 'adj', 'Wireless technology allows us to stay connected anywhere.'),
(42, 21, 'optimization', 'sự tối ưu hóa', 'ɑptəməzˈeɪʃən', 'n', 'Algorithm optimization improves search results.'),
(43, 21, 'feasibility', 'tính khả thi', 'fizəbˈɪləti', 'n', 'We need to conduct a feasibility study for the new project.'),
(44, 21, 'implementation', 'sự triển khai', 'ɪmpləmɛntˈeɪʃən', 'n', 'The implementation of the new system took six months.'),
(45, 21, 'integration', 'sự tích hợp', 'ɪntəgrˈeɪʃən', 'n', 'System integration is often the hardest part of a project.'),
(46, 21, 'maintenance', 'sự bảo trì', 'mˈeɪntənəns', 'n', 'Regular maintenance prevents system failures.'),
(47, 21, 'upgrade', 'nâng cấp', 'əpgrˈeɪd', 'v/n', 'It\'s time to upgrade our server hardware.'),
(48, 21, 'compatibility', 'tính tương thích', 'kəmpætəbˈɪləti', 'n', 'Software compatibility is a major concern for users.'),
(49, 21, 'efficiency', 'hiệu suất', 'ɪfˈɪʃənsi', 'n', 'Energy efficiency reduces operational costs.'),
(50, 21, 'scalability', 'khả năng mở rộng', 'skˈeɪləbˈɪlɪti', 'n', 'Cloud services provide high scalability for businesses.'),
(51, 21, 'empirical', 'dựa trên kinh nghiệm/thực nghiệm', 'ɛmpˈɪrɪkəl', 'adj', 'Empirical evidence supports the new theory.'),
(52, 21, 'hypothesis', 'giả thuyết', 'haɪpˈɑθəsəs', 'n', 'Scientists are testing the hypothesis in the lab.'),
(53, 21, 'methodology', 'phương pháp luận', 'mɛθədˈɑlədʒi', 'n', 'The research methodology was very rigorous.'),
(54, 21, 'paradigm', 'mô hình, kiểu mẫu', 'pˈɛrədaɪm', 'n', 'The internet caused a paradigm shift in communications.'),
(55, 21, 'precision', 'độ chính xác', 'prisˈɪʒən', 'n', 'Precision engineering is required for spacecraft.'),
(56, 21, 'reliability', 'độ tin cậy', 'rilaɪəbˈɪləti', 'n', 'System reliability is crucial for mission-critical apps.'),
(57, 21, 'specifications', 'thông số kỹ thuật', 'spɛsəfəkˈeɪʃənz', 'n', 'Please check the technical specifications before buying.'),
(58, 21, 'standardization', 'sự tiêu chuẩn hóa', 'stændɚdɪzˈeɪʃən', 'n', 'Standardization ensures product quality.'),
(59, 21, 'synthesis', 'sự tổng hợp', 'sˈɪnθəsəs', 'n', 'The synthesis of new materials is a key research area.'),
(60, 21, 'validation', 'sự xác nhận/phê duyệt', 'vælədˈeɪʃən', 'n', 'Data validation ensures that the input is correct.'),
(61, 21, 'pioneer', 'người tiên phong/tiên phong', 'paɪənˈɪr', 'n/v', 'She pioneered research into renewable energy.'),
(62, 21, 'revolutionize', 'cách mạng hóa', 'rɛvəlˈuʃənaɪz', 'v', 'The smartphone revolutionized the way we communicate.'),
(63, 21, 'sophisticated', 'tinh vi, phức tạp', 'səfˈɪstəkeɪtɪd', 'adj', 'The new software uses sophisticated algorithms.'),
(64, 21, 'transistor', 'bóng bán dẫn', 'trænzˈɪstɚ', 'n', 'Transistors are the building blocks of modern electronics.'),
(65, 21, 'vacuum', 'chân không', 'vˈækjum', 'n', 'Light travels faster in a vacuum than in air.'),
(66, 21, 'wavelength', 'bước sóng', 'wˈeɪvlɛŋθ', 'n', 'Different colors of light have different wavelengths.'),
(67, 21, 'aerodynamics', 'khí động lực học', 'ɛroʊdaɪnˈæmɪks', 'n', 'Aerodynamics is crucial in aircraft design.'),
(68, 21, 'astrophysics', 'vật lý thiên văn', 'æstroʊfˈɪzɪks', 'n', 'Astrophysics studies the physical properties of stars.'),
(69, 21, 'genetics', 'di truyền học', 'dʒənˈɛtɪks', 'n', 'Genetics explains how traits are passed down.'),
(70, 21, 'microbiology', 'vi sinh vật học', 'maɪkroʊbaɪˈɑlədʒi', 'n', 'Microbiology focuses on microscopic organisms.'),
(71, 21, 'neuroscience', 'khoa học thần kinh', 'njˈʊroʊsaɪəns', 'n', 'Neuroscience explores how the brain works.'),
(72, 21, 'thermodynamics', 'nhiệt động lực học', 'θɝmoʊdaɪnˈæmɪks', 'n', 'Thermodynamics describes how heat energy is converted.'),
(73, 21, 'blockchain', 'chuỗi khối', 'blˈɑktʃˈeɪn', 'n', 'Blockchain technology secures digital transactions.'),
(74, 21, 'cryptocurrency', 'tiền điện tử', 'krˈɪptoʊkɝənsi', 'n', 'Bitcoin was the first decentralized cryptocurrency.'),
(75, 21, 'cloud computing', 'điện toán đám mây', 'klˈaʊd kəmpjˈutɪŋ', 'n', 'Cloud computing allows for remote data storage.'),
(76, 21, 'big data', 'dữ liệu lớn', 'bˈɪg dˈeɪtə', 'n', 'Big data analytics helps businesses understand trends.'),
(77, 21, 'internet of things', 'vạn vật kết nối', 'ˈɪntɚnɛt ˈʌv θˈɪŋz', 'n', 'IoT connects everyday objects to the internet.'),
(78, 21, 'machine learning', 'máy học', 'məʃˈin lˈɝnɪŋ', 'n', 'Machine learning allows computers to learn from data.'),
(79, 21, 'natural language processing', 'xử lý ngôn ngữ tự nhiên', 'nˈætʃɚəl lˈæŋgwədʒ prˈɑsɛsɪŋ', 'n', 'NLP enables computers to understand human speech.'),
(80, 21, 'augmented reality', 'thực tế tăng cường', 'ɑgmˈɛntɪd riˈæləti', 'n', 'AR overlays digital information onto the real world.'),
(81, 21, 'biometrics', 'sinh trắc học', 'baɪoʊmˈɛtrɪks', 'n', 'Biometrics like fingerprinting are used for security.'),
(82, 21, 'cloning', 'nhân bản', 'klˈoʊnɪŋ', 'n', 'Genetic cloning is a controversial topic.'),
(83, 21, 'genome', 'bộ gen', 'dʒˈinoʊm', 'n', 'The human genome project was a massive undertaking.'),
(84, 21, 'laser', 'tia la-ze', 'lˈeɪzɚ', 'n', 'Lasers are used in many surgical procedures.'),
(85, 21, 'optics', 'quang học', 'ˈɑptɪks', 'n', 'Optics is the study of light and its properties.'),
(86, 21, 'robot', 'rô-bốt', 'rˈoʊbɑt', 'n', 'Industrial robots perform repetitive tasks in factories.'),
(87, 21, 'satellite', 'vệ tinh', 'sˈætəlaɪt', 'n', 'Satellites provide GPS and communication services.'),
(88, 21, 'sensor', 'cảm biến', 'sˈɛnsɚ', 'n', 'Sensors detect changes in the environment.'),
(89, 21, 'software', 'phần mềm', 'sˈɔftwɛr', 'n', 'Software updates often include security patches.'),
(90, 21, 'hardware', 'phần cứng', 'hˈɑrdwɛr', 'n', 'Upgrading hardware can improve computer performance.'),
(91, 21, 'teleportation', 'dịch chuyển tức thời', 'tɛləpɔrtˈeɪʃən', 'n', 'Teleportation remains a concept of science fiction.'),
(92, 21, 'theory', 'thuyết, lý thuyết', 'θˈɪri', 'n', 'Einstein\'s theory of relativity changed physics.'),
(93, 21, 'velocity', 'vận tốc', 'vəlˈɑsəti', 'n', 'Velocity is speed in a specific direction.'),
(94, 21, 'wireless fidelity', 'Wi-Fi', 'wˈaɪrlɪs fədˈɛləti', 'n', 'Wi-Fi allows devices to connect to the internet.'),
(95, 21, 'x-ray', 'tia X', 'ˈɛksreɪ', 'n', 'X-rays are used to see inside the human body.'),
(96, 21, 'zoom', 'phóng to/thu nhỏ', 'zˈum', 'v/n', 'Use the zoom function to see more detail.'),
(97, 21, 'bandwidth', 'băng thông', 'bˈændwɪdθ', 'n', 'High bandwidth is needed for gaming.'),
(98, 21, 'byte', 'đơn vị đo dữ liệu, bằng 8 bit', 'bˈaɪt', 'n', 'A gigabyte consists of one billion bytes.'),
(99, 21, 'chip', 'chíp vi mạch', 'tʃˈɪp', 'n', 'The computer chip is the brain of the device.'),
(100, 22, 'arid', 'khô hạn, khô cằn', 'ˈærəd', 'adj', 'Desert regions have arid climates.'),
(101, 22, 'barren', 'cằn cỗi, không sinh sản được', 'bˈærən', 'adj', 'The barren land could not support crops.'),
(102, 22, 'biome', 'quần xã sinh địa', 'bˈaɪoʊm', 'n', 'The rainforest is the richest biome on Earth.'),
(103, 22, 'carbon footprint', 'dấu chân carbon', 'kˈɑrbən fˈʊtprɪnt', 'n', 'Reducing our carbon footprint helps the environment.'),
(104, 22, 'carnivorous', 'ăn thịt', 'kɑrnˈɪvɚəs', 'adj', 'Carnivorous plants trap and digest insects.'),
(105, 22, 'climate', 'khí hậu', 'klˈaɪmət', 'n', 'The climate in tropical regions is warm and wet.'),
(106, 22, 'conservation', 'bảo tồn', 'kɑnsɚvˈeɪʃən', 'n', 'Wildlife conservation protects endangered species.'),
(107, 22, 'coral', 'san hô', 'kˈɔrəl', 'n', 'Coral reefs support thousands of marine species.'),
(108, 22, 'cycle', 'chu kỳ, vòng tuần hoàn', 'sˈaɪkəl', 'n', 'The water cycle involves evaporation and precipitation.'),
(109, 22, 'decay', 'phân hủy; sự thối rữa', 'dɪkˈeɪ', 'v/n', 'Fallen leaves decay on the forest floor.'),
(110, 22, 'biodiversity', 'đa dạng sinh học', 'baɪoʊdaɪvˈɝsəti', 'n', 'Rainforests have incredibly high biodiversity.'),
(111, 22, 'deforestation', 'nạn phá rừng', 'dɪfɔrɪstˈeɪʃən', 'n', 'Deforestation leads to habitat loss.'),
(112, 22, 'ecosystem', 'hệ sinh thái', 'ˈikoʊsɪstəm', 'n', 'A pond is a small but complex ecosystem.'),
(113, 22, 'endangered', 'nguy cấp', 'ɛndˈeɪndʒɚd', 'adj', 'The giant panda is an endangered species.'),
(114, 22, 'environment', 'môi trường', 'ɪnvˈaɪrənmənt', 'n', 'We must protect the environment for future generations.'),
(115, 22, 'extinction', 'sự tuyệt chủng', 'ɪkstˈɪŋkʃən', 'n', 'Many species are facing extinction today.'),
(116, 22, 'fossil fuel', 'nhiên liệu hóa thạch', 'fˈɑsəl fjˈuəl', 'n', 'Burning fossil fuels releases carbon dioxide.'),
(117, 22, 'global warming', 'sự nóng lên toàn cầu', 'glˈoʊbəl wˈɔrmɪŋ', 'n', 'Global warming is causing glaciers to melt.'),
(118, 22, 'greenhouse effect', 'hiệu ứng nhà kính', 'grˈinhaʊs ɪfˈɛkt', 'n', 'The greenhouse effect traps heat in the atmosphere.'),
(119, 22, 'habitat', 'môi trường sống', 'hˈæbətæt', 'n', 'The polar bear\'s natural habitat is the Arctic.'),
(120, 22, 'pollution', 'sự ô nhiễm', 'pəlˈuʃən', 'n', 'Air pollution is a major problem in big cities.'),
(121, 22, 'renewable energy', 'năng lượng tái tạo', 'rinˈuəbəl ˈɛnɚdʒi', 'n', 'Solar and wind are forms of renewable energy.'),
(122, 22, 'sustainability', 'sự bền vững', 'səsteɪnəbˈɪlɪti', 'n', 'Sustainable development meets current needs without compromising the future.'),
(123, 22, 'wildlife', 'động vật hoang dã', 'wˈaɪldlaɪf', 'n', 'National parks are designed to protect wildlife.'),
(124, 22, 'atmosphere', 'khí quyển', 'ˈætməsfɪr', 'n', 'The atmosphere protects Earth from harmful radiation.'),
(125, 22, 'biosphere', 'sinh quyển', 'bˈaɪoʊsfɪr', 'n', 'The biosphere includes all living things on Earth.'),
(126, 22, 'carbon dioxide', 'khí CO2', 'kˈɑrbən daɪˈɑksaɪd', 'n', 'Plants absorb carbon dioxide during photosynthesis.'),
(127, 22, 'ecology', 'sinh thái học', 'ɪkˈɑlədʒi', 'n', 'Ecology is the study of how organisms interact.'),
(128, 22, 'emission', 'sự phát thải', 'ɪmˈɪʃən', 'n', 'Vehicle emissions contribute significantly to smog.'),
(129, 22, 'erosion', 'sự xói mòn', 'ɪrˈoʊʒən', 'n', 'Soil erosion can be prevented by planting trees.'),
(130, 22, 'fertilizer', 'phân bón', 'fˈɝtəlaɪzɚ', 'n', 'Chemical fertilizers can run off into water supplies.'),
(131, 22, 'geothermal', 'thuộc địa nhiệt', 'dʒioʊθˈɝməl', 'adj', 'Geothermal energy is heat from inside the Earth.'),
(132, 22, 'glacier', 'sông băng', 'glˈeɪʃɚ', 'n', 'Glaciers are retreating due to rising temperatures.'),
(133, 22, 'herbicide', 'thuốc diệt cỏ', 'hˈɝbɪsaɪd', 'n', 'Herbicides are used to control weeds in agriculture.'),
(134, 22, 'irrigation', 'sự tưới tiêu', 'ɪrəgˈeɪʃən', 'n', 'Irrigation is necessary for farming in dry areas.'),
(135, 22, 'landfill', 'bãi chôn lấp rác', 'lˈændfɪl', 'n', 'Most of our trash ends up in a landfill.'),
(136, 22, 'marine', 'thuộc biển', 'mɚˈin', 'adj', 'Marine biology is the study of ocean life.'),
(137, 22, 'natural resource', 'tài nguyên thiên nhiên', 'nˈætʃɚəl rˈisɔrs', 'n', 'Water is our most precious natural resource.'),
(138, 22, 'ozone layer', 'tầng ozone', 'ˈoʊzoʊn leɪə', 'n', 'The ozone layer filters out UV radiation.'),
(139, 22, 'pesticide', 'thuốc trừ sâu', 'ˈpɛstəsaɪd', 'n', 'Pesticides protect crops from insects.'),
(140, 22, 'recycling', 'sự tái chế', 'risˈaɪkəlɪŋ', 'n', 'Recycling reduces the amount of waste we produce.'),
(141, 22, 'sewage', 'nước thải', 'sˈuədʒ', 'n', 'Proper sewage treatment is vital for health.'),
(142, 22, 'solar power', 'năng lượng mặt trời', 'ˈsəʊlə ˈpaʊ.ə(ɹ)', 'n', 'Solar power is becoming more affordable.'),
(143, 22, 'toxic', 'độc hại', 'ˈtɒk.sɪk', 'adj', 'Toxic waste must be disposed of carefully.'),
(144, 22, 'waste', 'rác thải/lãng phí', 'weɪst', 'n/v', 'We should try to minimize industrial waste.'),
(145, 22, 'wind turbine', 'tua-bin gió', 'ˈwaɪnd ˈtɜ(ɹ)baɪn', 'n', 'Wind turbines generate electricity from wind.'),
(146, 22, 'acid rain', 'mưa axit', 'ˈæs.ɪd rˈeɪn', 'n', 'Acid rain can damage forests and lakes.'),
(147, 22, 'alternative energy', 'năng lượng thay thế', 'ɔltˈɝnətɪv ˈɛnɚdʒi', 'n', 'We need to find alternative energy sources to oil.'),
(148, 22, 'aquatic', 'thuộc nước', 'əˈkwɑ.tɪk', 'adj', 'Aquatic plants live in rivers and oceans.'),
(149, 22, 'biodegradable', 'có thể phân hủy sinh học', 'baɪoʊdəˈɡɹeɪdəbəl', 'adj', 'Paper is biodegradable, but plastic is not.'),
(150, 22, 'drought', 'hạn hán', 'drˈaʊt', 'n', 'The long drought led to a water shortage.'),
(151, 22, 'effluent', 'nước thải công nghiệp', 'ˈɛfluənt', 'n', 'Factories must treat their effluent before release.'),
(152, 22, 'flora', 'hệ thực vật', 'flˈɔrə', 'n', 'The flora of the Amazon is incredibly diverse.'),
(153, 22, 'fauna', 'hệ động vật', 'fˈɔnə', 'n', 'Australia has many unique species of fauna.'),
(154, 22, 'geology', 'địa chất học', 'dʒiˈɑlədʒi', 'n', 'Geology helps us understand Earth\'s history.'),
(155, 22, 'hydroponics', 'thủy canh', 'haɪdrəpˈɑnɪks', 'n', 'Hydroponics allows plants to grow without soil.'),
(156, 22, 'incineration', 'sự thiêu hủy', 'ɪnsˈɪnɚeɪʃən', 'n', 'Incineration is one way to deal with medical waste.'),
(157, 22, 'jungle', 'rừng nhiệt đới', 'dʒˈʌŋgəl', 'n', 'Many rare animals live deep in the jungle.'),
(158, 22, 'landscape', 'phong cảnh', 'lˈændskeɪp', 'n', 'The volcanic landscape was stark and beautiful.'),
(159, 22, 'marsh', 'đầm lầy', 'mˈɑrʃ', 'n', 'Marshes provide critical habitat for birds.'),
(160, 22, 'nature', 'tự nhiên', 'nˈeɪtʃɚ', 'n', 'Spending time in nature is good for mental health.'),
(161, 22, 'ocean', 'đại dương', 'ˈoʊʃən', 'n', 'The ocean covers more than 70% of the Earth.'),
(162, 22, 'precipitation', 'lượng mưa', 'prɪsɪpɪtˈeɪʃən', 'n', 'Annual precipitation varies greatly by region.'),
(163, 22, 'quarry', 'mỏ đá', 'kwˈɔri', 'n', 'The stone for the building came from a local quarry.'),
(164, 22, 'rainforest', 'rừng mưa', 'rˈaɪnfɔrəst', 'n', 'The rainforest is often called the lungs of the Earth.'),
(165, 22, 'sanctuary', 'khu bảo tồn', 'sˈæŋktʃuɛri', 'n', 'The island is a bird sanctuary.'),
(166, 22, 'terrain', 'địa hình', 'tɚˈeɪn', 'n', 'The rugged terrain made hiking difficult.'),
(167, 22, 'undergrowth', 'tầng cây thấp', 'ˈʌndɚgroʊθ', 'n', 'Animals hide in the thick undergrowth.'),
(168, 22, 'vegetation', 'thảm thực vật', 'vɛdʒətˈeɪʃən', 'n', 'Desert vegetation is adapted to low water.'),
(169, 22, 'wetland', 'vùng đất ngập nước', 'wˈɛtlænd', 'n', 'Wetlands act as natural water filters.'),
(170, 22, 'yield', 'sản lượng/mang lại', 'jˈild', 'n/v', 'The crop yield was lower than expected this year.'),
(171, 22, 'zero-emission', 'không phát thải', 'zˈɪroʊɪmˈɪʃən', 'adj', 'Electric cars are zero-emission vehicles.'),
(172, 22, 'compost', 'phân hữu cơ/ủ phân', 'kˈɑmpoʊst', 'n/v', 'You can compost kitchen scraps for your garden.'),
(173, 22, 'desertification', 'sa mạc hóa', 'dɪzɝtəfəkˈeɪʃən', 'n', 'Overgrazing contributes to desertification.'),
(174, 22, 'endemic', 'đặc hữu', 'ɛndˈɛmɪk', 'adj', 'The kangaroo is endemic to Australia.'),
(175, 22, 'forest', 'rừng', 'fˈɔrəst', 'n', 'The forest was full of tall pine trees.'),
(176, 22, 'greenhouse gas', 'khí nhà kính', 'grˈinhaʊs gˈæs', 'n', 'Methane is a potent greenhouse gas.'),
(177, 22, 'habitat destruction', 'sự phá hủy môi trường sống', 'hˈæbətæt dɪstrˈʌkʃən', 'n', 'Habitat destruction is the main threat to tigers.'),
(178, 22, 'island', 'hòn đảo', 'ˈaɪlənd', 'n', 'The island has a unique ecosystem.'),
(179, 22, 'lake', 'hồ', 'lˈeɪk', 'n', 'The lake is popular for fishing and boating.'),
(180, 22, 'mountain', 'núi', 'mˈaʊntən', 'n', 'The highest mountain in the world is Everest.'),
(181, 22, 'nitrogen', 'khí nitơ', 'nˈaɪtrədʒən', 'n', 'The air we breathe is mostly nitrogen.'),
(182, 22, 'oxygen', 'khí oxy', 'ˈɑksədʒən', 'n', 'Humans need oxygen to survive.'),
(183, 22, 'photosynthesis', 'quang hợp', 'foʊtoʊsˈɪnθəsɪs', 'n', 'Photosynthesis converts sunlight into energy.'),
(184, 22, 'river', 'sông', 'rˈɪvɚ', 'n', 'The river flows into the sea.'),
(185, 22, 'soil', 'đất', 'sˈɔɪl', 'n', 'Rich soil is essential for agriculture.'),
(186, 22, 'tide', 'thủy triều', 'tˈaɪd', 'n', 'The tide comes in twice a day.'),
(187, 22, 'urban', 'thuộc thành thị', 'ˈɝbən', 'adj', 'Urban sprawl affects the surrounding environment.'),
(188, 22, 'valley', 'thung lũng', 'vˈæli', 'n', 'The valley was lush and green.'),
(189, 22, 'waterfall', 'thác nước', 'wˈɔtɚfɔl', 'n', 'The waterfall was a popular tourist attraction.'),
(190, 22, 'xerophyte', 'thực vật chịu hạn', 'zˈɪrəfaɪt', 'n', 'Cacti are well-known xerophytes.'),
(191, 22, 'yield', 'sản lượng', 'jˈild', 'n', 'Modern farming techniques increase crop yield.'),
(192, 22, 'zoology', 'động vật học', 'zoʊˈɑlədʒi', 'n', 'Zoology is the study of animals.'),
(193, 22, 'abundant', 'dồi dào', 'əbˈʌndənt', 'adj', 'Renewable energy sources are abundant.'),
(194, 22, 'biological', 'thuộc sinh học', 'baɪəlˈɑdʒɪkəl', 'adj', 'Biological diversity is crucial for resilience.'),
(195, 22, 'climatology', 'khí hậu học', 'klaɪmətˈɑlədʒi', 'n', 'Climatology helps us predict future weather patterns.'),
(196, 22, 'degradation', 'sự suy thoái', 'dɛgrədˈeɪʃən', 'n', 'Environmental degradation affects human health.'),
(197, 22, 'earthquake', 'động đất', 'ˈɝθkweɪk', 'n', 'The earthquake caused widespread damage.'),
(198, 22, 'flood', 'lũ lụt', 'flˈʌd', 'n/v', 'Heavy rain caused the river to flood.'),
(199, 22, 'geology', 'địa chất học', 'dʒiˈɑlədʒi', 'n', 'Geology studies the solid Earth.'),
(200, 23, 'abolish', 'bãi bỏ, xóa bỏ', 'əbˈɑlɪʃ', 'v', 'Many countries have abolished the death penalty.'),
(201, 23, 'affluent', 'giàu có, thịnh vượng', 'ˈæfluənt', 'adj', 'Affluent neighborhoods have better schools.'),
(202, 23, 'allegiance', 'lòng trung thành, sự ủng hộ', 'əlˈidʒəns', 'n', 'Citizens pledge allegiance to their country.'),
(203, 23, 'altruism', 'lòng vị tha', 'ˈæltruɪzəm', 'n', 'Volunteering reflects altruism.'),
(204, 23, 'ancestry', 'tổ tiên, nguồn gốc', 'ˈænsɛstri', 'n', 'She traced her ancestry back to West Africa.'),
(205, 23, 'assimilation', 'sự đồng hóa', 'əsɪməlˈeɪʃən', 'n', 'Cultural assimilation can be a slow process.'),
(206, 23, 'belief', 'niềm tin, tín ngưỡng', 'bɪlˈif', 'n', 'Respect for different beliefs is important.'),
(207, 23, 'bias', 'thành kiến', 'bˈaɪəs', 'n', 'We must try to overcome our unconscious biases.'),
(208, 23, 'citizenship', 'quyền công dân', 'sˈɪtɪzənʃɪp', 'n', 'She applied for Canadian citizenship.'),
(209, 23, 'civilization', 'nền văn minh', 'sɪvəlɪzˈeɪʃən', 'n', 'The Maya had a highly advanced civilization.'),
(210, 23, 'community', 'cộng đồng', 'kəmjˈunəti', 'n', 'Building a strong community takes time.'),
(211, 23, 'conformity', 'sự tuân thủ, rập khuôn', 'kənfˈɔrməti', 'n', 'Social conformity can limit creativity.'),
(212, 23, 'culture', 'văn hóa', 'kˈʌltʃɚ', 'n', 'Every culture has its own unique traditions.'),
(213, 23, 'custom', 'phong tục', 'kˈʌstəm', 'n', 'It is the custom to remove shoes before entering.'),
(214, 23, 'democracy', 'nền dân chủ', 'dɪmˈɑkrəsi', 'n', 'Freedom of speech is a pillar of democracy.'),
(215, 23, 'discrimination', 'sự phân biệt đối xử', 'dɪskrɪmənˈeɪʃən', 'n', 'Discrimination against any group is illegal.'),
(216, 23, 'diversity', 'sự đa dạng', 'dɪvˈɝsəti', 'n', 'Workplace diversity brings different perspectives.'),
(217, 23, 'equality', 'sự bình đẳng', 'ɪkwˈɑləti', 'n', 'The movement fought for gender equality.'),
(218, 23, 'ethics', 'đạo đức', 'ˈɛθɪks', 'n', 'Medical ethics guide doctors in their work.'),
(219, 23, 'ethnic', 'thuộc sắc tộc', 'ˈɛθnɪk', 'adj', 'The city has a diverse ethnic population.'),
(220, 23, 'gender', 'giới tính', 'dʒˈɛndɚ', 'n', 'Gender roles have changed over the decades.'),
(221, 23, 'heritage', 'di sản', 'hˈɛrətədʒ', 'n', 'We are proud of our cultural heritage.'),
(222, 23, 'hierarchy', 'hệ thống cấp bậc', 'hˈaɪɚɑrki', 'n', 'The corporate hierarchy can be rigid.'),
(223, 23, 'identity', 'danh tính, bản sắc', 'aɪdˈɛntəti', 'n', 'Language is a key part of cultural identity.'),
(224, 23, 'immigration', 'sự nhập cư', 'ɪməgrˈeɪʃən', 'n', 'Immigration contributes to economic growth.'),
(225, 23, 'inclusion', 'sự hòa nhập, bao hàm', 'ɪnklˈuʒən', 'n', 'Social inclusion is a key policy goal.'),
(226, 23, 'justice', 'công lý', 'dʒˈʌstəs', 'n', 'The legal system aims to ensure justice for all.'),
(227, 23, 'language', 'ngôn ngữ', 'lˈæŋgwədʒ', 'n', 'Language is a tool for communication.'),
(228, 23, 'minority', 'thiểu số', 'maɪnˈɔrəti', 'n', 'Protecting the rights of minorities is essential.'),
(229, 23, 'norm', 'chuẩn mực', 'nˈɔrm', 'n', 'Social norms dictate how we behave in public.'),
(230, 23, 'oppression', 'sự áp bức', 'əprˈɛʃən', 'n', 'The people rose up against systemic oppression.'),
(231, 23, 'patriotism', 'lòng yêu nước', 'pˈeɪtriətɪzəm', 'n', 'Patriotism is showing love for your country.'),
(232, 23, 'pluralism', 'thuyết đa nguyên', 'plˈʊrəlɪzəm', 'n', 'Cultural pluralism encourages diverse traditions.'),
(233, 23, 'prejudice', 'định kiến', 'prˈɛdʒədɪs', 'n', 'Prejudice often stems from ignorance.'),
(234, 23, 'privilege', 'đặc quyền', 'prˈɪvlədʒ', 'n', 'Awareness of one\'s privilege is important.'),
(235, 23, 'religion', 'tôn giáo', 'rɪlˈɪdʒən', 'n', 'Religion plays a major role in many societies.'),
(236, 23, 'ritual', 'nghi lễ', 'rˈɪtʃuəl', 'n', 'Daily rituals can provide a sense of stability.'),
(237, 23, 'segregation', 'sự phân biệt, cách ly', 'sɛgrəgˈeɪʃən', 'n', 'The movement worked to end racial segregation.'),
(238, 23, 'socialize', 'giao lưu', 'sˈoʊʃəlaɪz', 'v', 'Schools help children socialize with their peers.'),
(239, 23, 'status', 'địa vị', 'stˈætəs', 'n', 'Social status is often linked to wealth.'),
(240, 23, 'stereotype', 'khuôn mẫu', 'stˈɛriətaɪp', 'n', 'We should avoid using gender stereotypes.'),
(241, 23, 'tradition', 'truyền thống', 'trədˈɪʃən', 'n', 'Family traditions are passed down through generations.'),
(242, 23, 'urbanization', 'đô thị hóa', 'ɝbənəzˈeɪʃən', 'n', 'Urbanization has changed social structures.'),
(243, 23, 'values', 'giá trị', 'vˈæljuz', 'n', 'Our personal values guide our decisions.'),
(244, 23, 'welfare', 'phúc lợi', 'wˈɛlfɛr', 'n', 'The state provides a welfare system for the needy.'),
(245, 23, 'xenophobia', 'nỗi sợ/ghét người lạ', 'zɛnəfˈoʊbiə', 'n', 'Education can help reduce xenophobia.'),
(246, 23, 'youth', 'thanh niên', 'jˈuθ', 'n', 'The youth are the future of our society.'),
(247, 23, 'activism', 'chủ nghĩa hoạt động', 'ˈæktɪvɪzəm', 'n', 'Political activism can drive social change.'),
(248, 23, 'advocacy', 'sự vận động, ủng hộ', 'ˈædvəkəsi', 'n', 'Child advocacy groups work to protect minors.'),
(249, 23, 'alienation', 'sự xa lánh', 'eɪliənˈeɪʃən', 'n', 'Social media can sometimes lead to feelings of alienation.'),
(250, 23, 'altruistic', 'vị tha', 'ɔltruˈɪstɪk', 'adj', 'Altruistic behavior benefits others at a cost to oneself.'),
(251, 23, 'anarchy', 'tình trạng vô chính phủ', 'ˈænɚki', 'n', 'The collapse of the government led to anarchy.'),
(252, 23, 'aristocracy', 'tầng lớp quý tộc', 'ɛrəstˈɑkrəsi', 'n', 'The aristocracy held power for centuries.'),
(253, 23, 'authority', 'quyền lực, thẩm quyền', 'əθˈɔrəti', 'n', 'Parents represent authority for young children.'),
(254, 23, 'bureaucracy', 'bộ máy quan liêu', 'bjʊrˈɑkrəsi', 'n', 'Excessive bureaucracy can slow down progress.'),
(255, 23, 'capitalism', 'chủ nghĩa tư bản', 'kˈæpɪtəlɪzəm', 'n', 'Capitalism is based on private ownership.'),
(256, 23, 'charity', 'từ thiện', 'tʃˈɛrɪti', 'n', 'The charity raises money for cancer research.'),
(257, 23, 'class', 'tầng lớp', 'klˈæs', 'n', 'The middle class is the backbone of the economy.'),
(258, 23, 'coalition', 'liên minh', 'koʊəlˈɪʃən', 'n', 'A coalition of nations was formed to tackle the crisis.'),
(259, 23, 'communism', 'chủ nghĩa cộng sản', 'kˈɑmjənɪzəm', 'n', 'Communism advocates for collective ownership.'),
(260, 23, 'conflict', 'xung đột', 'kˈɑnflɪkt', 'n', 'Conflict resolution is an important skill.'),
(261, 23, 'consensus', 'sự đồng thuận', 'kənsˈɛnsəs', 'n', 'The committee reached a consensus on the new rule.'),
(262, 23, 'conservative', 'bảo thủ', 'kənsˈɝvətɪv', 'adj/n', 'Conservative voters prefer traditional values.'),
(263, 23, 'constitution', 'hiến pháp', 'kɑnstətˈuʃən', 'n', 'The constitution protects the rights of citizens.'),
(264, 23, 'corruption', 'sự tham nhũng', 'kɚˈʌpʃən', 'n', 'Corruption undermines public trust in government.'),
(265, 23, 'diplomacy', 'ngoại giao', 'dɪplˈoʊməsi', 'n', 'Diplomacy is better than conflict for solving issues.'),
(266, 23, 'discourse', 'diễn ngôn, đàm thoại', 'dˈɪskɔrs', 'n', 'Public discourse shapes political opinions.'),
(267, 23, 'elite', 'ưu tú, tinh hoa', 'ɪlˈit', 'n/adj', 'The political elite often attend the same schools.'),
(268, 23, 'empathy', 'sự thấu cảm', 'ˈɛmpəθi', 'n', 'Empathy allows us to understand others\' feelings.'),
(269, 23, 'empowerment', 'sự trao quyền', 'ɪmpˈaʊɚmənt', 'n', 'Female empowerment is a goal of many NGOs.'),
(270, 23, 'etiquette', 'phép lịch sự', 'ˈɛtəkət', 'n', 'Proper etiquette is expected at formal dinners.'),
(271, 23, 'feminism', 'chủ nghĩa nữ quyền', 'fˈɛmɪnɪzəm', 'n', 'Feminism seeks equal rights for women.'),
(272, 23, 'freedom', 'tự do', 'frˈidəm', 'n', 'Freedom of the press is vital for a healthy society.'),
(273, 23, 'grassroots', 'từ cơ sở, bình dân', 'grˈæsrˈuts', 'adj', 'The campaign started as a grassroots movement.'),
(274, 23, 'human rights', 'nhân quyền', 'hjˈumən ɹaɪts', 'n', 'Everyone is entitled to basic human rights.'),
(275, 23, 'ideology', 'hệ tư tưởng', 'aɪdiˈɑlədʒi', 'n', 'Political ideologies differ on the role of the state.'),
(276, 23, 'integration', 'sự hội nhập', 'ɪntəgrˈeɪʃən', 'n', 'Social integration of refugees is a priority.'),
(277, 23, 'kinship', 'quan hệ họ hàng', 'kˈɪnʃɪp', 'n', 'Kinship ties are very strong in some cultures.'),
(278, 23, 'liberal', 'tự do', 'ˈlɪbɹəl', 'adj/n', 'Liberal policies often favor social reform.'),
(279, 23, 'lobby', 'vận động hành lang', 'ˈlɒbi', 'v/n', 'Groups lobby the government for better environmental laws.'),
(280, 23, 'marginalized', 'bị gạt ra lề xã hội', 'mˈɑrdʒənəlaɪzd', 'adj', 'Marginalized groups often lack access to healthcare.'),
(281, 23, 'materialism', 'chủ nghĩa duy vật/thực dụng', 'məˈtɪəɹiəlɪzəm', 'n', 'Some argue that modern society is too focused on materialism.'),
(282, 23, 'mediation', 'sự hòa giải', 'midiˈeɪʃən', 'n', 'Mediation can help resolve disputes without court.'),
(283, 23, 'migration', 'sự di cư', 'maɪˈɡɹeɪʃ(ə)n', 'n', 'Climate change is driving human migration.'),
(284, 23, 'morality', 'đạo đức', 'məˈɹælɪti', 'n', 'Morality concerns what is right and wrong.'),
(285, 23, 'nationalism', 'chủ nghĩa dân tộc', 'ˈnæʃənəlɪzəm', 'n', 'Nationalism can be both unifying and divisive.'),
(286, 23, 'ngo', 'tổ chức phi chính phủ', 'ɛŋgˈoʊ', 'n', 'NGOs play a key role in international development.'),
(287, 23, 'obligation', 'nghĩa vụ', 'ɑb.ləˈɡeɪ.ʃən', 'n', 'Citizens have an obligation to vote.'),
(288, 23, 'pacifism', 'chủ nghĩa hòa bình', 'pˈæsɪfɪzəm', 'n', 'Pacifism rejects the use of violence for any reason.'),
(289, 23, 'parliament', 'nghị viện', 'ˈpɑːləmənt', 'n', 'The parliament passed a new law on education.'),
(290, 23, 'poverty', 'sự nghèo đói', 'ˈpɒvəti', 'n', 'Poverty remains a major global challenge.'),
(291, 23, 'propaganda', 'tuyên truyền', 'ˌpɹɒp.əˈɡæn.də', 'n', 'Governments used posters for propaganda during the war.'),
(292, 23, 'protest', 'cuộc biểu tình/phản đối', 'ˈpɹəʊ.tɛst', 'n/v', 'Thousands joined the protest against the new tax.'),
(293, 23, 'public opinion', 'dư luận', 'pˈʌblɪk əpˈɪnjən', 'n', 'Public opinion on climate change has shifted.'),
(294, 23, 'reform', 'sự cải cách/cải cách', 'rəfˈɔrm', 'n/v', 'Educational reform is needed to improve results.'),
(295, 23, 'refugee', 'người tị nạn', 'rˈɛfjudʒi', 'n', 'The camp provides aid to thousands of refugees.'),
(296, 23, 'secular', 'ngoại đạo, thế tục', 'sˈɛkjəlɚ', 'adj', 'A secular state is neutral on religious matters.'),
(297, 23, 'socialism', 'chủ nghĩa xã hội', 'sˈoʊʃəlɪzəm', 'n', 'Socialism advocates for public ownership of key industries.'),
(298, 23, 'sovereignty', 'chủ quyền', 'sˈɑvrənti', 'n', 'Nations value their national sovereignty.'),
(299, 23, 'subsidy', 'tiền trợ cấp', 'sˈʌbsɪdi', 'n', 'The government provides subsidies for low-income families.'),
(300, 23, 'suffrage', 'quyền bầu cử', 'sˈʌfrɪdʒ', 'n', 'The movement fought for universal suffrage.'),
(301, 24, 'artifact', 'hiện vật', 'ˈɑrtəfækt', 'n', 'The museum houses ancient artifacts from Egypt.'),
(302, 24, 'chronology', 'niên đại học', 'krənˈɑlədʒi', 'n', 'Historians established a chronology of the dynasty.'),
(303, 24, 'excavation', 'sự khai quật', 'ɛkskəvˈeɪʃən', 'n', 'The excavation revealed an ancient Roman temple.'),
(304, 24, 'prehistoric', 'tiền sử', 'prihɪstˈɔrɪk', 'adj', 'Cave paintings provide clues about prehistoric life.'),
(305, 24, 'settlement', 'khu định cư', 'sˈɛtəlmənt', 'n', 'The first human settlements were near rivers.'),
(306, 24, 'fossil', 'hóa thạch', 'fˈɑsəl', 'n', 'Fossils are essential for understanding evolution.'),
(307, 24, 'ancestor', 'tổ tiên', 'ˈænsɛstɚ', 'n', 'Our ancestors survived in harsh environments.'),
(308, 24, 'heritage', 'di sản', 'hˈɛrətədʒ', 'n', 'UNESCO protects cultural heritage sites globally.'),
(309, 24, 'remnant', 'tàn tích, vật còn sót lại', 'rˈɛmnənt', 'n', 'The remnants of the wall are still visible today.'),
(310, 24, 'excavate', 'khai quật', 'ˈɛkskəveɪt', 'v', 'Archaeologists excavate sites to find evidence.'),
(311, 24, 'ancient', 'cổ đại', 'ˈeɪntʃənt', 'adj', 'Ancient civilizations developed impressive technologies.'),
(312, 24, 'antiquity', 'thời cổ xưa', 'æntˈɪkwəti', 'n', 'Many great philosophers lived in classical antiquity.'),
(313, 24, 'archaeologist', 'nhà khảo cổ', 'ɑrkiˈɑlədʒɪst', 'n', 'Archaeologists study human history through physical remains.'),
(314, 24, 'archives', 'kho lưu trữ', 'ˈɑrkaɪvz', 'n', 'Historians spend years researching in the national archives.'),
(315, 24, 'civilization', 'nền văn minh', 'sɪvəlɪzˈeɪʃən', 'n', 'The Indus Valley civilization was highly organized.'),
(316, 24, 'colony', 'thuộc địa', 'kˈɑləni', 'n', 'The country was once a colony of the British Empire.'),
(317, 24, 'conquest', 'sự chinh phục', 'kˈɑŋkwɛst', 'n', 'The Norman conquest of England took place in 1066.'),
(318, 24, 'culture', 'văn hóa', 'kˈʌltʃɚ', 'n', 'Historical remains tell us a lot about ancient culture.'),
(319, 24, 'dynasty', 'triều đại', 'dˈaɪnəsti', 'n', 'The Ming dynasty ruled China for nearly 300 years.'),
(320, 24, 'empire', 'đế chế', 'ˈɛmpaɪɚ', 'n', 'The Roman Empire stretched across three continents.'),
(321, 24, 'era', 'kỷ nguyên', 'ˈɛrə', 'n', 'The Victorian era was a time of great change.'),
(322, 24, 'evolution', 'sự tiến hóa', 'ɛvəlˈuʃən', 'n', 'Evolution is a slow process that takes millions of years.'),
(323, 24, 'feudalism', 'chế độ phong kiến', 'fjˈudəlɪzəm', 'n', 'Feudalism was the dominant social system in medieval Europe.'),
(324, 24, 'fortification', 'pháo đài, công sự', 'fɔrtəfəkˈeɪʃən', 'n', 'The city had strong fortifications to protect it from attack.'),
(325, 24, 'genealogy', 'phả hệ học', 'dʒiniˈɑlədʒi', 'n', 'Genealogy helps people trace their family history.'),
(326, 24, 'heirloom', 'vật gia bảo', 'ˈɛrlum', 'n', 'The ring is a family heirloom passed down for generations.'),
(327, 24, 'historian', 'nhà sử học', 'hɪstˈɔriən', 'n', 'Historians use primary sources to reconstruct the past.'),
(328, 24, 'indigenous', 'bản địa', 'ɪndˈɪdʒənəs', 'adj', 'Indigenous people have lived on this land for millennia.'),
(329, 24, 'inscription', 'câu khắc, lời ghi', 'ɪnskrˈɪpʃən', 'n', 'The inscription on the stone was hard to read.'),
(330, 24, 'legacy', 'di sản, để lại', 'lˈɛgəsi', 'n', 'The artist left a lasting legacy of beautiful paintings.'),
(331, 24, 'medieval', 'thuộc trung cổ', 'mɪdˈivəl', 'adj', 'Medieval castles were built for defense.'),
(332, 24, 'migration', 'sự di cư', 'maɪˈɡɹeɪʃ(ə)n', 'n', 'Human migration shaped the history of every continent.'),
(333, 24, 'monument', 'đài tưởng niệm', 'mˈɑnjumənt', 'n', 'The monument commemorates those who fell in battle.'),
(334, 24, 'mythology', 'thần thoại', 'məθˈɑlədʒi', 'n', 'Greek mythology is full of gods and heroes.'),
(335, 24, 'nomad', 'người du mục', 'nˈoʊmæd', 'n', 'Nomadic tribes moved from place to place in search of food.'),
(336, 24, 'origin', 'nguồn gốc', 'ˈɔrədʒən', 'n', 'Scientists are searching for the origin of the universe.'),
(337, 24, 'paleontology', 'cổ sinh vật học', 'peɪliəntˈɑlədʒi', 'n', 'Paleontology studies life on Earth before humans.'),
(338, 24, 'past', 'quá khứ', 'pˈæst', 'n', 'We can learn many lessons from the past.'),
(339, 24, 'period', 'giai đoạn, thời kỳ', 'pˈɪriəd', 'n', 'The Jurassic period is famous for its dinosaurs.'),
(340, 24, 'pottery', 'đồ gốm', 'pˈɑtɚi', 'n', 'Pottery fragments are often found at archaeological sites.'),
(341, 24, 'preservation', 'sự bảo tồn', 'prɛzɚvˈeɪʃən', 'n', 'The preservation of historical buildings is important.'),
(342, 24, 'primitive', 'nguyên thủy', 'prˈɪmətɪv', 'adj', 'Primitive humans used stone tools for hunting.'),
(343, 24, 'reign', 'triều đại/trị vì', 'rˈeɪn', 'n/v', 'Queen Victoria\'s reign lasted for 63 years.'),
(344, 24, 'relic', 'di tích, thánh tích', 'rˈɛlɪk', 'n', 'The holy relic was kept in a golden casket.'),
(345, 24, 'renaissance', 'thời kỳ Phục hưng', 'rɛnəsˈɑns', 'n', 'The Renaissance was a period of artistic revival.'),
(346, 24, 'ruins', 'tàn tích', 'rˈuənz', 'n', 'The ruins of Pompeii are a popular tourist destination.'),
(347, 24, 'sacred', 'thiêng liêng', 'sˈeɪkrəd', 'adj', 'The site was considered sacred by the ancient people.'),
(348, 24, 'shrine', 'ngôi đền, miếu', 'ʃrˈaɪn', 'n', 'People visit the shrine to offer prayers.'),
(349, 24, 'source', 'nguồn', 'sˈɔrs', 'n', 'Letters and diaries are important primary sources.'),
(350, 24, 'temple', 'đền thờ', 'tˈɛmpəl', 'n', 'The temple was dedicated to the sun god.'),
(351, 24, 'tradition', 'truyền thống', 'trədˈɪʃən', 'n', 'Some traditions have been kept alive for centuries.'),
(352, 24, 'tribe', 'bộ lạc', 'trˈaɪb', 'n', 'The tribe lived in the mountains for generations.'),
(353, 24, 'warrior', 'chiến binh', 'wˈɔriɚ', 'n', 'Ancient warriors were trained from a young age.'),
(354, 24, 'weaponry', 'vũ khí', 'wˈɛpənri', 'n', 'The museum displays ancient weaponry like swords and bows.'),
(355, 24, 'writing system', 'hệ thống chữ viết', 'rˈaɪtɪŋ sˈɪstəm', 'n', 'The development of a writing system was a major milestone.'),
(356, 24, 'anachronism', 'sự lỗi thời, sai niên đại', 'ənˈækrənɪzəm', 'n', 'A smartphone in a movie about the 1920s is an anachronism.'),
(357, 24, 'archaeology', 'khảo cổ học', 'ɑrkiˈɑlədʒi', 'n', 'Archaeology reveals the secrets of forgotten cities.'),
(358, 24, 'aristocrat', 'người quý tộc', 'ɚˈɪstəkræt', 'n', 'Aristocrats held high positions in the royal court.'),
(359, 24, 'barbarian', 'người dã man', 'bɑrbˈɛriən', 'n', 'Ancient Greeks called anyone who didn\'t speak Greek a barbarian.'),
(360, 24, 'battle', 'trận chiến', 'bˈætəl', 'n', 'The battle took place on a large grassy plain.'),
(361, 24, 'catacombs', 'hầm mộ', 'kˈætəkoʊmz', 'n', 'The catacombs in Rome are a vast underground network.'),
(362, 24, 'century', 'thế kỷ', 'sˈɛntʃɚi', 'n', 'The 20th century saw incredible technological progress.'),
(363, 24, 'chivalry', 'phong cách hiệp sĩ', 'ʃˈɪvəlri', 'n', 'Chivalry was the code of conduct for medieval knights.'),
(364, 24, 'city-state', 'thành bang', 'sˈɪtisteɪt', 'n', 'Athens and Sparta were powerful Greek city-states.'),
(365, 24, 'classical', 'cổ điển', 'klˈæsɪkəl', 'adj', 'Classical music and art are still highly valued today.'),
(366, 24, 'discovery', 'sự khám phá', 'dɪskˈʌvɚi', 'n', 'The discovery of the tomb was a global sensation.'),
(367, 24, 'enlightenment', 'thời kỳ Khai sáng', 'ɛnlˈaɪtənmənt', 'n', 'The Enlightenment emphasized reason and science.'),
(368, 24, 'fortress', 'pháo đài', 'fˈɔrtrəs', 'n', 'The fortress was built on a hilltop for better defense.'),
(369, 24, 'gladiator', 'võ sĩ giác đấu', 'glˈædieɪtɚ', 'n', 'Gladiators fought for entertainment in ancient Rome.'),
(370, 24, 'hieroglyphics', 'chữ tượng hình', 'haɪroʊglˈɪfɪks', 'n', 'Egyptian hieroglyphics were deciphered using the Rosetta Stone.'),
(371, 24, 'homestead', 'nhà vườn, trang trại', 'hˈoʊmstɛd', 'n', 'Early settlers built homesteads on the frontier.'),
(372, 24, 'imperialism', 'chủ nghĩa đế quốc', 'ɪmpˈɪriəlɪzəm', 'n', 'Imperialism led to the colonization of many countries.'),
(373, 24, 'industrial revolution', 'cách mạng công nghiệp', 'ɪndˈʌstriəl rɛvəlˈuʃən', 'n', 'The industrial revolution changed how products were made.'),
(374, 24, 'invasion', 'sự xâm lược', 'ɪnvˈeɪʒən', 'n', 'The invasion of the island was met with strong resistance.'),
(375, 24, 'knight', 'hiệp sĩ', 'nˈaɪt', 'n', 'Knights served their lords in medieval times.'),
(376, 24, 'legend', 'truyền thuyết', 'lˈɛdʒənd', 'n', 'The legend of King Arthur is still told today.'),
(377, 24, 'manuscript', 'bản thảo', 'mˈænjəskrɪpt', 'n', 'The ancient manuscript was written on parchment.'),
(378, 24, 'milestone', 'cột mốc', 'mˈaɪlstoʊn', 'n', 'The invention of the wheel was a major milestone in history.'),
(379, 24, 'monarchy', 'nền quân chủ', 'mˈɑnɑrki', 'n', 'Some countries still maintain a constitutional monarchy.'),
(380, 24, 'mummy', 'xác ướp', 'mˈʌmi', 'n', 'Mummies provide evidence about ancient Egyptian burial rites.'),
(381, 24, 'nobility', 'tầng lớp quý tộc', 'noʊbˈɪləti', 'n', 'The nobility enjoyed many privileges in the past.'),
(382, 24, 'oral tradition', 'truyền thống truyền miệng', 'ˈɔrəl trədˈɪʃən', 'n', 'Oral tradition keeps stories alive without writing.'),
(383, 24, 'parchment', 'da cừu viết chữ', 'pˈɑrtʃmənt', 'n', 'Parchment was used before paper became widely available.'),
(384, 24, 'peasant', 'nông dân', 'pˈɛzənt', 'n', 'Peasants worked the land in exchange for protection.'),
(385, 24, 'philosophy', 'triết học', 'fəlˈɑsəfi', 'n', 'Ancient Greek philosophy still influences modern thought.'),
(386, 24, 'pilgrimage', 'cuộc hành hương', 'pˈɪlgrəmədʒ', 'n', 'Thousands of people make a pilgrimage to the site every year.'),
(387, 24, 'prehistory', 'thời tiền sử', 'prihˈɪstɚi', 'n', 'Prehistory is the time before written records began.'),
(388, 24, 'prophecy', 'lời tiên tri', 'prˈɑfəsi', 'n', 'The ancient prophecy predicted the fall of the city.'),
(389, 24, 'pyramid', 'kim tự tháp', 'pˈɪrəmɪd', 'n', 'The pyramids of Giza are among the Seven Wonders.'),
(390, 24, 'rebellion', 'cuộc nổi dậy', 'rɪbˈɛljən', 'n', 'The rebellion was suppressed by the king\'s army.'),
(391, 24, 'records', 'hồ sơ, ghi chép', 'rəkˈɔrdz', 'n', 'Historical records show that the winter was very harsh.'),
(392, 24, 'reform', 'sự cải cách', 'rəfˈɔrm', 'n', 'Social reform led to better working conditions.'),
(393, 24, 'republic', 'nền cộng hòa', 'ripˈʌblək', 'n', 'A republic is a country where power is held by the people.'),
(394, 24, 'revolution', 'cuộc cách mạng', 'rɛvəlˈuʃən', 'n', 'The French Revolution had a profound impact on Europe.'),
(395, 24, 'scepter', 'quyền trượng', 'sˈɛptɚ', 'n', 'The king held a golden scepter during the ceremony.'),
(396, 24, 'scribe', 'người chép thuê', 'skrˈaɪb', 'n', 'Scribes were responsible for copying important documents.'),
(397, 24, 'sculpture', 'tác phẩm điêu khắc', 'skˈʌlptʃɚ', 'n', 'Ancient Greek sculptures are famous for their detail.'),
(398, 24, 'siege', 'sự bao vây', 'sˈidʒ', 'n', 'The city was under siege for several months.'),
(399, 24, 'skeletal remains', 'hài cốt', 'skˈɛlətəl rɪmˈeɪnz', 'n', 'Skeletal remains help us understand ancient diets.'),
(400, 24, 'statue', 'bức tượng', 'stˈætʃu', 'n', 'A large statue of the hero stands in the square.'),
(401, 25, 'monopoly', 'độc quyền', 'mənˈɑpəli', 'n', 'The company has a monopoly on the local market.'),
(402, 25, 'entrepreneur', 'doanh nhân', 'ɑntrəprənˈɝ', 'n', 'Successful entrepreneurs take calculated risks.'),
(403, 25, 'inflation', 'lạm phát', 'ɪnflˈeɪʃən', 'n', 'High inflation reduces purchasing power.'),
(404, 25, 'infrastructure', 'cơ sở hạ tầng', 'ɪnfrəstrˈʌktʃɚ', 'n', 'The government invested heavily in infrastructure.'),
(405, 25, 'merger', 'sự sáp nhập', 'mˈɝdʒɚ', 'n', 'The merger created the largest bank in the region.'),
(406, 25, 'revenue', 'doanh thu', 'rˈɛvənu', 'n', 'Annual revenue increased by 20% this year.'),
(407, 25, 'subsidy', 'tiền trợ cấp', 'sˈʌbsɪdi', 'n', 'Farmers receive subsidies to keep food prices low.'),
(408, 25, 'supply and demand', 'cung và cầu', 'səplˈaɪ ənd dɪˈmɑːnd', 'n', 'Prices are determined by supply and demand.'),
(409, 25, 'asset', 'tài sản', 'ˈæsɛt', 'n', 'Real estate is a valuable long-term asset.'),
(410, 25, 'bankruptcy', 'sự phá sản', 'bˈæŋkrəpsi', 'n', 'The economic crisis led to many bankruptcies.'),
(411, 25, 'acquisition', 'sự thâu tóm', 'ækwəzˈɪʃən', 'n', 'The acquisition of the startup cost $500 million.'),
(412, 25, 'advertisement', 'quảng cáo', 'ədvˈɝtəzmənt', 'n', 'Social media advertisements target specific audiences.'),
(413, 25, 'agenda', 'chương trình nghị sự', 'əˈdʒɛn.də', 'n', 'Sustainability is high on the corporate agenda.'),
(414, 25, 'audit', 'kiểm toán', 'ˈɔː.dɪt', 'n/v', 'The company undergoes an annual financial audit.'),
(415, 25, 'brand', 'thương hiệu', 'bɹænd', 'n', 'Strong branding is essential for consumer trust.'),
(416, 25, 'budget', 'ngân sách', 'ˈbʌdʒ.ɪt', 'n', 'We need to stick to the marketing budget.'),
(417, 25, 'capital', 'vốn', 'ˈkæp.ɪ.təl', 'n', 'Startups need capital to grow their operations.'),
(418, 25, 'cash flow', 'dòng tiền', 'kæʃ fləʊ', 'n', 'Managing cash flow is vital for small businesses.'),
(419, 25, 'collateral', 'tài sản thế chấp', 'kəˈlætəɹəl', 'n', 'He used his house as collateral for the loan.'),
(420, 25, 'commodity', 'hàng hóa', 'kəˈmɒdəti', 'n', 'Oil is one of the world\'s most traded commodities.'),
(421, 25, 'competition', 'sự cạnh tranh', 'ˌkɒmpəˈtɪʃən', 'n', 'Fierce competition drives innovation.'),
(422, 25, 'consumer', 'người tiêu dùng', 'kənˈsjuːmə', 'n', 'Consumer confidence is at an all-time high.'),
(423, 25, 'corporation', 'tập đoàn', 'kɔrpɚˈeɪʃən', 'n', 'Multinational corporations operate in many countries.'),
(424, 25, 'currency', 'tiền tệ', 'ˈkʌɹ.ən.si', 'n', 'The exchange rate between currencies fluctuates daily.'),
(425, 25, 'deficit', 'sự thâm hụt', 'ˈdɛfɪsɪt', 'n', 'The government is trying to reduce the budget deficit.'),
(426, 25, 'dividend', 'cổ tức', 'ˈdɪvɪdɛnd', 'n', 'The company paid a generous dividend to shareholders.'),
(427, 25, 'economy', 'nền kinh tế', 'iːˈkɒn.ə.mi', 'n', 'The national economy is showing signs of recovery.'),
(428, 25, 'exchange rate', 'tỷ giá hối đoái', 'ɛksˈtʃeɪndʒ rˈeɪt', 'n', 'The exchange rate affects the cost of imports.'),
(429, 25, 'export', 'xuất khẩu', 'ˈɛkspɔrt', 'v/n', 'The country exports large amounts of wheat.'),
(430, 25, 'finance', 'tài chính/tài trợ', 'fənˈæns', 'n/v', 'He works in the finance industry.'),
(431, 25, 'fiscal', 'thuộc tài chính công', 'fˈɪskəl', 'adj', 'Fiscal policy is used to manage the economy.'),
(432, 25, 'forecast', 'dự báo', 'fˈɔrkæst', 'n/v', 'The economic forecast for next year is positive.'),
(433, 25, 'gross domestic product', 'GDP', 'grˈoʊs dəmˈɛstɪk prˈɑdəkt', 'n', 'GDP measures the value of all goods produced.'),
(434, 25, 'import', 'nhập khẩu', 'ɪmpˈɔrt', 'v/n', 'We import most of our electronics from Asia.'),
(435, 25, 'incentive', 'sự khuyến khích', 'ɪnsˈɛntɪv', 'n', 'Tax incentives can encourage investment.'),
(436, 25, 'interest rate', 'lãi suất', 'ˈɪntrəst rˈeɪt', 'n', 'Lower interest rates make borrowing cheaper.'),
(437, 25, 'investment', 'sự đầu tư', 'ɪnvˈɛstmənt', 'n', 'Investment in education pays off in the long run.'),
(438, 25, 'liability', 'trách nhiệm pháp lý, nợ', 'laɪəbˈɪlɪti', 'n', 'The company has significant long-term liabilities.'),
(439, 25, 'liquidity', 'tính thanh khoản', 'lɪkwˈɪdəti', 'n', 'Cash is the most liquid asset.'),
(440, 25, 'market share', 'thị phần', 'mˈɑrkət ʃˈɛr', 'n', 'The company is trying to increase its market share.'),
(441, 25, 'niche', 'thị trường ngách', 'nˈɪtʃ', 'n', 'They found a niche in the organic food market.'),
(442, 25, 'overhead', 'chi phí chung', 'ˈoʊvɚhˈɛd', 'n', 'Reducing overhead is a priority for the CEO.'),
(443, 25, 'partnership', 'quan hệ đối tác', 'pˈɑrtnɚʃɪp', 'n', 'The two firms entered into a strategic partnership.'),
(444, 25, 'portfolio', 'danh mục đầu tư', 'pɔrtfˈoʊlioʊ', 'n', 'It\'s important to diversify your investment portfolio.'),
(445, 25, 'profit', 'lợi nhuận', 'prˈɑfət', 'n', 'The company\'s profits doubled last quarter.'),
(446, 25, 'recession', 'sự suy thoái', 'rɪsˈɛʃən', 'n', 'The recession led to high unemployment rates.'),
(447, 25, 'shareholder', 'cổ đông', 'ʃˈɛrhoʊldɚ', 'n', 'Shareholders vote on major corporate decisions.'),
(448, 25, 'stock market', 'thị trường chứng khoán', 'stˈɑk mˈɑrkət', 'n', 'The stock market can be very volatile.'),
(449, 25, 'surplus', 'sự dư thừa', 'sˈɝpləs', 'n', 'A budget surplus can be used to pay down debt.'),
(450, 25, 'tariff', 'thuế quan', 'tˈɛrəf', 'n', 'The government imposed tariffs on imported steel.'),
(451, 25, 'taxation', 'sự đánh thuế', 'tæksˈeɪʃən', 'n', 'Taxation provides the revenue for public services.'),
(452, 25, 'trade', 'thương mại/giao dịch', 'trˈeɪd', 'n/v', 'Global trade is essential for economic growth.'),
(453, 25, 'unemployment', 'sự thất nghiệp', 'ʌnɪmplˈɔɪmənt', 'n', 'Unemployment rose during the economic crisis.'),
(454, 25, 'venture capital', 'vốn đầu tư mạo hiểm', 'vˈɛntʃɚ kˈæpətəl', 'n', 'Venture capital is crucial for tech startups.'),
(455, 25, 'wholesale', 'bán buôn', 'hˈoʊlseɪl', 'n/adj/adv', 'Retailers buy products at wholesale prices.'),
(456, 25, 'yield', 'lợi suất', 'jˈild', 'n', 'The bond yield has increased recently.'),
(457, 25, 'asset management', 'quản lý tài sản', 'ˈæsɛt mˈænədʒmənt', 'n', 'He works for an asset management firm.'),
(458, 25, 'bear market', 'thị trường giá xuống', 'bˈɛr mˈɑrkət', 'n', 'A bear market is characterized by falling prices.');
INSERT INTO `words` (`Id`, `topic_id`, `word`, `Meaning`, `Phonetic`, `part_of_speech`, `Example`) VALUES
(459, 25, 'blue chip', 'cổ phiếu hàng đầu', 'blˈu tʃˈɪp', 'adj', 'Blue chip companies are reliable and stable.'),
(460, 25, 'bull market', 'thị trường giá lên', 'bˈʊl mˈɑrkət', 'n', 'Investors are optimistic in a bull market.'),
(461, 25, 'capital gain', 'lợi nhuận vốn', 'kˈæpətəl gˈeɪn', 'n', 'You must pay tax on any capital gains.'),
(462, 25, 'consumer price index', 'CPI', 'kənsˈumɚ prˈaɪs ˈɪndɛks', 'n', 'CPI is used to measure inflation.'),
(463, 25, 'debt', 'nợ', 'dˈɛt', 'n', 'The company is struggling with mounting debt.'),
(464, 25, 'deflation', 'sự giảm phát', 'dɪflˈeɪʃən', 'n', 'Deflation can lead to lower economic output.'),
(465, 25, 'deregulation', 'sự bãi bỏ quy định', 'dirɛgjəlˈeɪʃən', 'n', 'Deregulation of the airline industry led to lower fares.'),
(466, 25, 'diversification', 'sự đa dạng hóa', 'daɪvɝsəfəkˈeɪʃən', 'n', 'Diversification reduces risk in an investment.'),
(467, 25, 'equity', 'vốn chủ sở hữu', 'ˈɛkwəti', 'n', 'He has built up significant equity in his home.'),
(468, 25, 'fixed cost', 'chi phí cố định', 'fˈɪkst kˈɑst', 'n', 'Rent is a fixed cost for most businesses.'),
(469, 25, 'gross margin', 'lợi nhuận gộp', 'grˈoʊs mˈɑrdʒən', 'n', 'Improving gross margin is key to profitability.'),
(470, 25, 'hedge fund', 'quỹ phòng hộ', 'hˈɛdʒ fˈʌnd', 'n', 'Hedge funds use complex strategies to earn returns.'),
(471, 25, 'insider trading', 'giao dịch nội gián', 'ɪnsˈaɪdɚ trˈeɪdɪŋ', 'n', 'Insider trading is a serious financial crime.'),
(472, 25, 'inventory', 'hàng tồn kho', 'ɪnvəntˈɔri', 'n', 'Effective inventory management reduces waste.'),
(473, 25, 'joint venture', 'liên doanh', 'dʒˈɔɪnt vˈɛntʃɚ', 'n', 'The two companies formed a joint venture to build the factory.'),
(474, 25, 'leverage', 'đòn bẩy', 'lˈɛvɚɪdʒ', 'n/v', 'Companies use leverage to finance their growth.'),
(475, 25, 'logistics', 'hậu cần', 'lədʒˈɪstɪks', 'n', 'Efficient logistics are vital for global trade.'),
(476, 25, 'market capitalization', 'vốn hóa thị trường', 'mˈɑrkət kæpɪtəlɪzˈeɪʃən', 'n', 'Market cap measures the total value of a company.'),
(477, 25, 'monetary policy', 'chính sách tiền tệ', 'mˈɑnətɛri pˈɑləsi', 'n', 'The central bank manages monetary policy.'),
(478, 25, 'net worth', 'giá trị tài sản ròng', 'nˈɛt wˈɝθ', 'n', 'Net worth is the difference between assets and liabilities.'),
(479, 25, 'outsourcing', 'thuê ngoài', 'aʊtsˈɔrsɪŋ', 'n', 'Outsourcing can reduce operational costs.'),
(480, 25, 'patent', 'bằng sáng chế', 'pˈætənt', 'n/v', 'The company holds several patents for its technology.'),
(481, 25, 'procurement', 'sự thu mua', 'proʊkjˈʊrmənt', 'n', 'Government procurement rules are very strict.'),
(482, 25, 'productivity', 'năng suất', 'proʊdəktˈɪvəti', 'n', 'Increased productivity leads to economic growth.'),
(483, 25, 'quota', 'hạn ngạch', 'kwˈoʊtə', 'n', 'The government set a quota on imported cars.'),
(484, 25, 'retail', 'bán lẻ', 'rˈiteɪl', 'n/adj', 'The retail sector is changing due to e-commerce.'),
(485, 25, 'return on investment', 'ROI', 'rɪtˈɝn ˈɑn ɪnvˈɛstmənt', 'n', 'We expect a high return on investment for this project.'),
(486, 25, 'scarcity', 'sự khan hiếm', 'skˈɛrsɪti', 'n', 'Economics is the study of managing scarcity.'),
(487, 25, 'small and medium enterprise', 'SME', 'smˈɔl ənd mˈidiəm ˈɛntɚpraɪz', 'n', 'SMEs are the backbone of many economies.'),
(488, 25, 'stakeholder', 'bên liên quan', 'stˈeɪkhoʊldɚ', 'n', 'A company must consider the interests of all stakeholders.'),
(489, 25, 'startup', 'công ty khởi nghiệp', 'stˈɑrtʌp', 'n', 'The tech startup grew rapidly in its first year.'),
(490, 25, 'supply chain', 'chuỗi cung ứng', 'səplˈaɪ tʃˈeɪn', 'n', 'The global supply chain was disrupted by the pandemic.'),
(491, 25, 'tax haven', 'thiên đường thuế', 'tˈæks hˈeɪvən', 'n', 'Some companies use tax havens to avoid paying taxes.'),
(492, 25, 'treasury', 'kho bạc', 'trˈɛʒɚi', 'n', 'The Treasury manages the government\'s finances.'),
(493, 25, 'variable cost', 'chi phí biến đổi', 'vˈɛriəbəl kˈɑst', 'n', 'Raw materials are a variable cost for manufacturers.'),
(494, 25, 'venture', 'dự án kinh doanh mạo hiểm', 'vˈɛntʃɚ', 'n/v', 'The new business venture was a success.'),
(495, 25, 'workforce', 'lực lượng lao động', 'wˈɝkfɔrs', 'n', 'The company has a highly skilled workforce.'),
(496, 25, 'yield', 'mang lại', 'jˈild', 'v', 'The investment yielded a high profit.'),
(497, 25, 'zero-sum game', 'trò chơi có tổng bằng không', 'zˈɪroʊsʌm gˈeɪm', 'n', 'In a zero-sum game, one person\'s gain is another\'s loss.'),
(498, 25, 'balance sheet', 'bảng cân đối kế toán', 'bˈæləns ʃˈit', 'n', 'The balance sheet shows the financial health of the firm.'),
(499, 25, 'benchmark', 'điểm chuẩn, đối sánh', 'bˈɛntʃmɑrk', 'n/v', 'The company uses industry leaders as a benchmark.'),
(500, 25, 'broker', 'người môi giới', 'brˈoʊkɚ', 'n', 'The stock broker advised him on which shares to buy.'),
(501, 26, 'chronic', 'mãn tính', 'krˈɑnɪk', 'adj', 'He suffers from chronic back pain.'),
(502, 26, 'epidemic', 'dịch bệnh', 'ɛpədˈɛmɪk', 'n', 'The flu epidemic spread rapidly through the city.'),
(503, 26, 'immune', 'miễn dịch', 'ɪmjˈun', 'adj', 'Vaccinations help children become immune to diseases.'),
(504, 26, 'obesity', 'béo phì', 'oʊbˈisəti', 'n', 'Obesity is a major public health concern.'),
(505, 26, 'pharmaceutical', 'thuộc dược phẩm', 'fɑrməsˈutɪkəl', 'adj', 'The pharmaceutical industry develops new drugs.'),
(506, 26, 'rehabilitation', 'sự phục hồi chức năng', 'rihəbɪlətˈeɪʃən', 'n', 'Rehabilitation is key after a serious injury.'),
(507, 26, 'symptom', 'triệu chứng', 'sˈɪmptəm', 'n', 'Fever is a common symptom of infection.'),
(508, 26, 'therapy', 'liệu pháp', 'θˈɛrəpi', 'n', 'Physical therapy can improve mobility.'),
(509, 26, 'vaccinate', 'tiêm chủng', 'vˈæksəneɪt', 'v', 'It is important to vaccinate against preventable diseases.'),
(510, 26, 'wellness', 'sự khỏe mạnh, an lạc', 'wˈɛlnəs', 'n', 'The spa focuses on overall health and wellness.'),
(511, 26, 'acute', 'cấp tính', 'əˈkjuːt', 'adj', 'He was admitted to the hospital with acute pain.'),
(512, 26, 'addiction', 'sự gây nghiện', 'əˈdɪkʃən', 'n', 'Drug addiction is a complex health issue.'),
(513, 26, 'allergy', 'dị ứng', 'ˈælɚdʒi', 'n', 'Many people have an allergy to peanuts.'),
(514, 26, 'antibiotic', 'thuốc kháng sinh', 'ˌæn.taɪ.baɪˈɒt.ɪk', 'n', 'Antibiotics are used to treat bacterial infections.'),
(515, 26, 'bacteria', 'vi khuẩn', 'bækˈtɪəɹ.ɪ.ə', 'n', 'Some bacteria are beneficial to human health.'),
(516, 26, 'cancer', 'ung thư', 'ˈkæːnsə', 'n', 'Early detection is key to treating cancer.'),
(517, 26, 'cardiovascular', 'thuộc tim mạch', 'kɑrdioʊvˈæskjəlɚ', 'adj', 'Exercise reduces the risk of cardiovascular disease.'),
(518, 26, 'contagious', 'lây nhiễm', 'kənˈteɪdʒəs', 'adj', 'The common cold is highly contagious.'),
(519, 26, 'diabetes', 'bệnh tiểu đường', 'ˌdaɪəˈbiːdiːz', 'n', 'Diabetes requires careful management of blood sugar.'),
(520, 26, 'diagnosis', 'sự chẩn đoán', 'daɪəɡˈnəʊsɪs', 'n', 'The doctor provided a diagnosis after several tests.'),
(521, 26, 'fatigue', 'sự mệt mỏi', 'fəˈtiːɡ', 'n', 'Chronic fatigue can be a symptom of many illnesses.'),
(522, 26, 'genetics', 'di truyền học', 'dʒənˈɛtɪks', 'n', 'Genetics plays a role in many health conditions.'),
(523, 26, 'hygiene', 'vệ sinh', 'ˈhaɪˌdʒiːn', 'n', 'Good hygiene prevents the spread of germs.'),
(524, 26, 'infection', 'sự nhiễm trùng', 'ɪnˈfɛkʃən', 'n', 'He had a severe ear infection.'),
(525, 26, 'inflammation', 'sự viêm', 'ɪnfləˈmeɪʃən', 'n', 'Ice can help reduce inflammation after an injury.'),
(526, 26, 'insomnia', 'chứng mất ngủ', 'ɪnˈsɒmniə', 'n', 'Stress is a common cause of insomnia.'),
(527, 26, 'medication', 'thuốc', 'mɛdɪˈkeɪʃən', 'n', 'Always follow the instructions on your medication.'),
(528, 26, 'metabolism', 'sự trao đổi chất', 'mɪˈtab.əl.ɪz.əm', 'n', 'A fast metabolism helps you burn calories quickly.'),
(529, 26, 'nutrition', 'dinh dưỡng', 'njuːˈtɹɪ.ʃən', 'n', 'Good nutrition is essential for a healthy body.'),
(530, 26, 'outbreak', 'sự bùng phát', 'ˈaʊtbɹeɪk', 'n', 'The health department is monitoring the disease outbreak.'),
(531, 26, 'pandemic', 'đại dịch', 'pænˈdɛmɪk', 'n', 'The world faced a global pandemic in 2020.'),
(532, 26, 'pathogen', 'mầm bệnh', 'ˈpæθədʒən', 'n', 'Pathogens are organisms that cause disease.'),
(533, 26, 'prevention', 'sự phòng ngừa', 'pɹɪˈvɛnʃən', 'n', 'Prevention is better than cure.'),
(534, 26, 'prognosis', 'tiên lượng', 'pɹɒɡˈnəʊsɪs', 'n', 'The prognosis for her recovery is very good.'),
(535, 26, 'psychiatry', 'tâm thần học', 'saɪˈkaɪ.əˌtɹi', 'n', 'Psychiatry focuses on mental health disorders.'),
(536, 26, 'sedentary', 'ít vận động', 'sˈɛdəntɛri', 'adj', 'A sedentary lifestyle increases the risk of obesity.'),
(537, 26, 'surgery', 'phẫu thuật', 'sˈɝdʒɚi', 'n', 'The patient underwent minor heart surgery.'),
(538, 26, 'trauma', 'chấn thương', 'trˈɔmə', 'n', 'He suffered physical trauma from the accident.'),
(539, 26, 'virus', 'vi-rút', 'vˈaɪrəs', 'n', 'Viruses are much smaller than bacteria.'),
(540, 26, 'vitamin', 'vitamin', 'vˈaɪtəmən', 'n', 'Vitamins are necessary for various bodily functions.'),
(541, 26, 'anemia', 'thiếu máu', 'ənˈimiə', 'n', 'Anemia is often caused by an iron deficiency.'),
(542, 26, 'asthma', 'hen suyễn', 'ˈæzmə', 'n', 'Asthma can make it difficult to breathe.'),
(543, 26, 'blood pressure', 'huyết áp', 'blˈʌd prˈɛʃɚ', 'n', 'High blood pressure is also known as hypertension.'),
(544, 26, 'cholesterol', 'cholesterol', 'kəlˈɛstɚɔl', 'n', 'A healthy diet can help lower your cholesterol.'),
(545, 26, 'deficiency', 'sự thiếu hụt', 'dɪfˈɪʃənsi', 'n', 'A vitamin D deficiency can cause bone pain.'),
(546, 26, 'dosage', 'liều lượng', 'dˈoʊsədʒ', 'n', 'Correct dosage is critical for the medicine to work.'),
(547, 26, 'first aid', 'sơ cứu', 'fˈɝst ˈeɪd', 'n', 'Knowing first aid can save lives in an emergency.'),
(548, 26, 'genetic disorder', 'rối loạn di truyền', 'dʒənˈɛtɪk dɪsˈɔrdɚ', 'n', 'Cystic fibrosis is a genetic disorder.'),
(549, 26, 'hospitalization', 'sự nhập viện', 'hɑspɪtələzˈeɪʃən', 'n', 'The severity of the illness required hospitalization.'),
(550, 26, 'immunity', 'sự miễn dịch', 'ɪmjˈunəti', 'n', 'Vaccines build immunity against specific diseases.'),
(551, 26, 'kidney', 'thận', 'kˈɪdni', 'n', 'The kidneys filter waste from the blood.'),
(552, 26, 'liver', 'gan', 'lˈɪvɚ', 'n', 'The liver performs many vital functions.'),
(553, 26, 'mental health', 'sức khỏe tâm thần', 'mˈɛntəl hˈɛlθ', 'n', 'Mental health is just as important as physical health.'),
(554, 26, 'neurology', 'thần kinh học', 'nʊrˈɑlədʒi', 'n', 'Neurology studies the nervous system.'),
(555, 26, 'oncology', 'ung thư học', 'ɑŋkˈɑlədʒi', 'n', 'Oncology is the branch of medicine dealing with tumors.'),
(556, 26, 'pediatrics', 'nhi khoa', 'pidiˈætrɪks', 'n', 'Pediatrics focuses on the healthcare of children.'),
(557, 26, 'quarantine', 'cách ly', 'kwˈɔrəntin', 'n/v', 'Travelers were required to quarantine for two weeks.'),
(558, 26, 'radiology', 'chẩn đoán hình ảnh', 'reɪdiˈɑlədʒi', 'n', 'Radiology includes X-rays and MRI scans.'),
(559, 26, 'side effect', 'tác dụng phụ', 'sˈaɪd ɪfˈɛkt', 'n', 'One side effect of this medicine is drowsiness.'),
(560, 26, 'transplant', 'cấy ghép', 'trænsplˈænt', 'n/v', 'He is waiting for a kidney transplant.'),
(561, 26, 'ultrasound', 'siêu âm', 'ʌltrəsˈaʊnd', 'n', 'An ultrasound is used to check the health of a fetus.'),
(562, 26, 'venom', 'nọc độc', 'vˈɛnəm', 'n', 'Some snakes have highly lethal venom.'),
(563, 26, 'ward', 'phòng bệnh', 'wˈɔrd', 'n', 'The patient was moved to the surgical ward.'),
(564, 26, 'x-ray', 'tia X', 'ˈɛksreɪ', 'n', 'The doctor ordered an X-ray of his broken leg.'),
(565, 26, 'yeast infection', 'nhiễm nấm men', 'jˈist ɪnfˈɛkʃən', 'n', 'Yeast infections are common and treatable.'),
(566, 26, 'zoonosis', 'bệnh lây từ động vật', 'zoʊˈɑnəsɪs', 'n', 'Rabies is a well-known zoonosis.'),
(567, 26, 'allergen', 'chất gây dị ứng', 'ˈælɚdʒən', 'n', 'Pollen is a common allergen in the spring.'),
(568, 26, 'biopsy', 'sinh thiết', 'bˈaɪɑpsi', 'n', 'A biopsy was performed to check for cancer cells.'),
(569, 26, 'coma', 'tình trạng hôn mê', 'kˈoʊmə', 'n', 'He fell into a coma after the head injury.'),
(570, 26, 'depression', 'bệnh trầm cảm', 'dɪprˈɛʃən', 'n', 'Depression is a serious mental health condition.'),
(571, 26, 'emergency', 'tình trạng khẩn cấp', 'ɪmˈɝdʒənsi', 'n', 'Call 911 in case of a medical emergency.'),
(572, 26, 'fracture', 'gãy xương', 'frˈæktʃɚ', 'n/v', 'The athlete suffered a stress fracture in his foot.'),
(573, 26, 'glucose', 'đường glucose', 'glˈukoʊs', 'n', 'The body converts carbohydrates into glucose.'),
(574, 26, 'hemorrhage', 'sự xuất huyết', 'hˈɛmɚɪdʒ', 'n/v', 'A brain hemorrhage can be life-threatening.'),
(575, 26, 'intensive care unit', 'khoa hồi sức tích cực', 'ɪntˈɛnsɪv kˈɛr jˈunət', 'n', 'The ICU provides 24-hour care for critical patients.'),
(576, 26, 'joint', 'khớp', 'dʒˈɔɪnt', 'n', 'Arthritis causes pain in the joints.'),
(577, 26, 'lesion', 'thương tổn', 'lˈiʒən', 'n', 'The doctor found several lesions on the skin.'),
(578, 26, 'muscle', 'cơ bắp', 'mˈʌsəl', 'n', 'Exercise helps build strong muscles.'),
(579, 26, 'nerve', 'dây thần kinh', 'nˈɝv', 'n', 'Damage to a nerve can cause numbness.'),
(580, 26, 'organ', 'cơ quan', 'ˈɔrgən', 'n', 'The heart is a vital organ.'),
(581, 26, 'plasma', 'huyết tương', 'plˈæzmə', 'n', 'Blood plasma contains various proteins.'),
(582, 26, 'rash', 'phát ban', 'rˈæʃ', 'n', 'The poison ivy caused an itchy red rash.'),
(583, 26, 'skeleton', 'bộ xương', 'skˈɛlətən', 'n', 'The human skeleton consists of 206 bones.'),
(584, 26, 'tendon', 'gân', 'tˈɛndən', 'n', 'He tore a tendon while playing basketball.'),
(585, 26, 'urine', 'nước tiểu', 'jˈɝən', 'n', 'A urine test can detect various health issues.'),
(586, 26, 'vein', 'tĩnh mạch', 'vˈeɪn', 'n', 'Veins carry blood back to the heart.'),
(587, 26, 'wound', 'vết thương', 'wˈaʊnd', 'n/v', 'The wound took several weeks to heal completely.'),
(588, 26, 'yeast', 'nấm men', 'jˈist', 'n', 'Yeast is used in the production of bread.'),
(589, 26, 'abscess', 'áp xe', 'ˈæbsɛs', 'n', 'A dental abscess can be very painful.'),
(590, 26, 'blood donor', 'người hiến máu', 'blˈʌd dˈoʊnɚ', 'n', 'Blood donors help save many lives each year.'),
(591, 26, 'clinical trial', 'thử nghiệm lâm sàng', 'klˈɪnəkəl trˈaɪəl', 'n', 'The new drug is currently in clinical trials.'),
(592, 26, 'dietary', 'thuộc về chế độ ăn uống', 'dˈaɪətɛri', 'adj', 'Many people have specific dietary requirements.'),
(593, 26, 'equilibrium', 'sự thăng bằng', 'ikwəlˈɪbriəm', 'n', 'The inner ear is responsible for maintaining equilibrium.'),
(594, 26, 'general practitioner', 'bác sĩ đa khoa', 'dʒˈɛnɚəl præktˈɪʃənɚ', 'n', 'See your general practitioner for routine check-ups.'),
(595, 26, 'hereditary', 'di truyền', 'hɚˈɛdətɛri', 'adj', 'Some diseases are hereditary and run in families.'),
(596, 26, 'inpatient', 'bệnh nhân nội trú', 'ˈɪnpeɪʃənt', 'n', 'Inpatients stay in the hospital overnight.'),
(597, 26, 'ligament', 'dây chằng', 'lˈɪgəmənt', 'n', 'A torn ligament can take months to heal.'),
(598, 26, 'mortality rate', 'tỷ lệ tử vong', 'mɔrtˈæləti rˈeɪt', 'n', 'The mortality rate for the disease is quite low.'),
(599, 26, 'outpatient', 'bệnh nhân ngoại trú', 'ˈaʊtpeɪʃənt', 'n', 'Outpatients receive treatment without staying overnight.'),
(600, 26, 'prescription', 'đơn thuốc', 'prəskrˈɪpʃən', 'n', 'The doctor wrote a prescription for some painkillers.'),
(601, 27, 'cognition', 'nhận thức', 'kɑgnˈɪʃən', 'n', 'Cognition involves processing information.'),
(602, 27, 'curriculum', 'chương trình học', 'kɚˈɪkjələm', 'n', 'The new curriculum emphasizes critical thinking.'),
(603, 27, 'literacy', 'khả năng biết chữ', 'lˈɪtɚəsi', 'n', 'Literacy rates are improving in developing countries.'),
(604, 27, 'motivation', 'động lực', 'moʊtəvˈeɪʃən', 'n', 'High motivation is crucial for academic success.'),
(605, 27, 'pedagogy', 'sư phạm', 'pˈɛdəgoʊdʒi', 'n', 'Effective pedagogy adapts to different learning styles.'),
(606, 27, 'psychology', 'tâm lý học', 'saɪkˈɑlədʒi', 'n', 'Child psychology studies mental development.'),
(607, 27, 'scholarship', 'học bổng', 'skˈɑlɚʃɪp', 'n', 'She won a full scholarship to Harvard.'),
(608, 27, 'tuition', 'học phí', 'tjuˈɪʃən', 'n', 'Tuition fees have risen significantly lately.'),
(609, 27, 'undergraduate', 'sinh viên đại học', 'ʌndɚgrˈædʒəwət', 'n', 'The university has 20,000 undergraduate students.'),
(610, 27, 'vocational', 'thuộc nghề nghiệp', 'voʊkˈeɪʃənəl', 'adj', 'Vocational training prepares students for specific jobs.'),
(611, 27, 'academic', 'thuộc học thuật', 'ækədˈɛmɪk', 'adj', 'The school has high academic standards.'),
(612, 27, 'assessment', 'sự đánh giá', 'əsˈɛsmənt', 'n', 'Regular assessment helps track student progress.'),
(613, 27, 'bilingual', 'song ngữ', 'baɪlˈɪŋgwəl', 'adj', 'Bilingual education is becoming more common.'),
(614, 27, 'critical thinking', 'tư duy phản biện', 'krˈɪtɪkəl ˈθɪŋkɪŋ', 'n', 'Critical thinking is a vital skill in the 21st century.'),
(615, 27, 'discipline', 'kỷ luật', 'dˈɪsəplən', 'n', 'Self-discipline is key to reaching your goals.'),
(616, 27, 'dropout', 'người bỏ học', 'drˈɑpaʊt', 'n', 'The government is trying to reduce the dropout rate.'),
(617, 27, 'enrollment', 'sự nhập học', 'ɛnrˈoʊlmənt', 'n', 'University enrollment has increased this year.'),
(618, 27, 'extracurricular', 'ngoại khóa', 'ɛkstrəkɚˈɪkjəlɚ', 'adj', 'Extracurricular activities look good on a resume.'),
(619, 27, 'faculty', 'giảng viên, khoa', 'ˈfæ.kəl.ti', 'n', 'The university has a distinguished faculty.'),
(620, 27, 'graduate', 'tốt nghiệp/người tốt nghiệp', 'grˈædʒəwət', 'v/n', 'She graduated with honors in June.'),
(621, 27, 'higher education', 'giáo dục đại học', 'ˈhaɪə ˌɛdjʊˈkeɪʃən', 'n', 'Higher education provides many opportunities.'),
(622, 27, 'instruction', 'sự hướng dẫn', 'ɪnˈstɹʌkʃən', 'n', 'Clear instruction is important for effective learning.'),
(623, 27, 'knowledge', 'kiến thức', 'ˈnɒlɪdʒ', 'n', 'Knowledge is power.'),
(624, 27, 'learning disability', 'khuyết tật học tập', 'ˈlɜːnɪŋ dɪsəˈbɪlɪti', 'n', 'Special education provides support for learning disabilities.'),
(625, 27, 'mentor', 'người hướng dẫn/hướng dẫn', 'ˈmɛn.tɔː', 'n/v', 'A good mentor can help you in your career.'),
(626, 27, 'nursery school', 'trường mẫu giáo', 'ˈnɜːsəɹi skuːl', 'n', 'Nursery school helps kids develop social skills.'),
(627, 27, 'orientation', 'sự định hướng', 'ˌɔɹiɛnˈteɪʃən', 'n', 'The university has an orientation week for new students.'),
(628, 27, 'postgraduate', 'sau đại học', 'poʊstgrˈædʒuət', 'n/adj', 'He is doing a postgraduate degree in science.'),
(629, 27, 'qualification', 'bằng cấp, năng lực', 'ˌkwɒlɪfɪˈkeɪʃən', 'n', 'You need the right qualifications for this job.'),
(630, 27, 'research', 'nghiên cứu', 'ɹɪˈsɜːtʃ', 'n/v', 'Scientific research leads to new discoveries.'),
(631, 27, 'standardized test', 'bài kiểm tra chuẩn hóa', 'stˈændɚdaɪzd test', 'n', 'Standardized tests are used for university admissions.'),
(632, 27, 'syllabus', 'đề cương bài giảng', 'ˈsɪləbəs', 'n', 'The syllabus outlines the course content.'),
(633, 27, 'thesis', 'luận văn', 'ˈθisɪs', 'n', 'She is writing her doctoral thesis on history.'),
(634, 27, 'university', 'trường đại học', 'junəvˈɝsəti', 'n', 'He applied to several universities.'),
(635, 27, 'virtual learning', 'học trực tuyến', 'vˈɝtʃuəl lˈɝnɪŋ', 'n', 'Virtual learning became essential during the pandemic.'),
(636, 27, 'workshop', 'hội thảo, lớp thực hành', 'ˈwɜːk.ʃɒp', 'n', 'The workshop provided hands-on experience.'),
(637, 27, 'youth', 'tuổi trẻ, thanh thiếu niên', 'jˈuθ', 'n', 'Investing in youth education is vital for the future.'),
(638, 27, 'alumni', 'cựu sinh viên', 'əˈlʌmnaɪ', 'n', 'The alumni association raises money for scholarships.'),
(639, 27, 'certificate', 'chứng chỉ', 'sɚtˈɪfɪkət', 'n', 'He received a certificate for completing the course.'),
(640, 27, 'degree', 'bằng cấp', 'dɪgrˈi', 'n', 'She has a master\'s degree in engineering.'),
(641, 27, 'exam', 'kỳ thi', 'ɛɡˈzæm', 'n', 'Students are studying hard for their final exams.'),
(642, 27, 'fellowship', 'học bổng nghiên cứu', 'fˈɛloʊʃɪp', 'n', 'He won a research fellowship to study in Oxford.'),
(643, 27, 'grade', 'điểm số', 'grˈeɪd', 'n/v', 'Her grades have improved significantly.'),
(644, 27, 'homework', 'bài tập về nhà', 'hˈoʊmwɝk', 'n', 'Don\'t forget to do your homework.'),
(645, 27, 'internship', 'thực tập', 'ˈɪntɚnʃɪp', 'n', 'An internship is a great way to get work experience.'),
(646, 27, 'journal', 'tạp chí khoa học', 'dʒˈɝnəl', 'n', 'The study was published in a leading medical journal.'),
(647, 27, 'lecture', 'bài giảng/giảng bài', 'lˈɛktʃɚ', 'n/v', 'The professor gave an interesting lecture on history.'),
(648, 27, 'major', 'chuyên ngành', 'mˈeɪdʒɚ', 'n/v', 'Her major is computer science.'),
(649, 27, 'notebook', 'vở ghi chép', 'nˈoʊtbʊk', 'n', 'Write your notes in your notebook.'),
(650, 27, 'objective', 'mục tiêu', 'əbdʒˈɛktɪv', 'n', 'The objective of the course is to improve writing skills.'),
(651, 27, 'professor', 'giáo sư', 'prəfˈɛsɚ', 'n', 'The professor is an expert in his field.'),
(652, 27, 'quiz', 'bài kiểm tra ngắn', 'kwˈɪz', 'n', 'There will be a short quiz at the end of the lesson.'),
(653, 27, 'semester', 'học kỳ', 'səmˈɛstɚ', 'n', 'The first semester ends in December.'),
(654, 27, 'tutorial', 'bài hướng dẫn', 'tutˈɔriəl', 'n', 'There is an online tutorial for using the software.'),
(655, 27, 'unit', 'đơn vị bài học', 'jˈunət', 'n', 'Each unit covers a different topic.'),
(656, 27, 'viva', 'thi vấn đáp', 'vˈivə', 'n', 'He had to defend his thesis in a viva.'),
(657, 27, 'writing', 'kỹ năng viết', 'rˈaɪtɪŋ', 'n', 'Writing is an important part of the curriculum.'),
(658, 27, 'xerox', 'photo copy', 'zˈɪrɑks', 'v/n', 'Can you xerox these documents for me?'),
(659, 27, 'yearbook', 'kỷ yếu', 'jˈɪrbʊk', 'n', 'She looked through her old high school yearbook.'),
(660, 27, 'zeal', 'sự nhiệt huyết', 'zˈil', 'n', 'She approached her studies with great zeal.'),
(661, 27, 'aptitude', 'năng khiếu', 'ˈæptətud', 'n', 'He has a natural aptitude for mathematics.'),
(662, 27, 'behavior', 'hành vi', 'bɪhˈeɪvjɚ', 'n', 'The study looked at animal behavior.'),
(663, 27, 'conditioning', 'sự điều kiện hóa', 'kəndˈɪʃənɪŋ', 'n', 'Classical conditioning was famously studied by Pavlov.'),
(664, 27, 'development', 'sự phát triển', 'dɪvˈɛləpmənt', 'n', 'Child development is a key area of psychology.'),
(665, 27, 'ego', 'cái tôi', 'ˈigoʊ', 'n', 'Freud\'s theory includes the id, ego, and superego.'),
(666, 27, 'frustration', 'sự thất vọng', 'frəstrˈeɪʃən', 'n', 'Learning a new skill can be full of frustration.'),
(667, 27, 'gestalt', 'tâm lý học cấu trúc', 'gəʃtˈɑlt', 'n', 'Gestalt psychology focuses on the whole rather than parts.'),
(668, 27, 'habit', 'thói quen', 'hˈæbət', 'n', 'Breaking a bad habit takes time and effort.'),
(669, 27, 'insight', 'sự thấu hiểu', 'ˈɪnsaɪt', 'n', 'The research provided deep insights into human nature.'),
(670, 27, 'judgment', 'sự phán xét', 'dʒˈʌdʒmənt', 'n', 'Good judgment is developed through experience.'),
(671, 27, 'knowledge', 'kiến thức', 'ˈnɒlɪdʒ', 'n', 'Acquiring knowledge is a lifelong process.'),
(672, 27, 'memory', 'trí nhớ', 'mˈɛmɚi', 'n', 'Her memory for names is excellent.'),
(673, 27, 'neurosis', 'chứng loạn thần kinh', 'nʊrˈoʊsəs', 'n', 'Neurosis can be treated with therapy.'),
(674, 27, 'observation', 'sự quan sát', 'ɑbzɚvˈeɪʃən', 'n', 'Scientific observation is key to psychological research.'),
(675, 27, 'personality', 'nhân cách', 'pɝsənˈælɪti', 'n', 'Everyone has a unique personality.'),
(676, 27, 'questionnaire', 'bảng câu hỏi', 'kwɛstʃənˈɛr', 'n', 'They used a questionnaire to gather data.'),
(677, 27, 'reaction', 'phản ứng', 'riˈækʃən', 'n', 'What was his reaction to the news?'),
(678, 27, 'self-esteem', 'lòng tự trọng', 'sɛlfɪstˈim', 'n', 'Success can boost your self-esteem.'),
(679, 27, 'trait', 'đặc điểm', 'trˈeɪt', 'n', 'Honesty is a desirable personality trait.'),
(680, 27, 'unconscious', 'vô thức', 'ʌnkˈɑnʃəs', 'n/adj', 'Much of our behavior is driven by the unconscious mind.'),
(681, 27, 'validity', 'tính hợp lệ', 'vəlˈɪdəti', 'n', 'The validity of the test results was questioned.'),
(682, 27, 'willpower', 'nghị lực', 'wˈɪlpaʊɚ', 'n', 'It takes willpower to stay on a diet.'),
(683, 27, 'yearning', 'sự khao khát', 'jˈɝnɪŋ', 'n', 'He had a yearning for adventure.'),
(684, 27, 'zone of proximal development', 'vùng phát triển gần', 'zˈoʊn ˈʌv prˈɑksəməl dɪvˈɛləpmənt', 'n', 'Vygotsky introduced the concept of the ZPD.'),
(685, 27, 'analysis', 'sự phân tích', 'ənˈæləsəs', 'n', 'The analysis of the data took several weeks.'),
(686, 27, 'bias', 'sự thiên lệch', 'bˈaɪəs', 'n', 'Confirmation bias is a common psychological phenomenon.'),
(687, 27, 'concept', 'khái niệm', 'kˈɑnsɛpt', 'n', 'The concept of time is hard for kids to understand.'),
(688, 27, 'data', 'dữ liệu', 'dˈeɪtə', 'n', 'Psychologists collect data to test their theories.'),
(689, 27, 'emotion', 'cảm xúc', 'ɪmˈoʊʃən', 'n', 'Fear is a powerful human emotion.'),
(690, 27, 'feedback', 'phản hồi', 'fˈidbæk', 'n', 'Constructive feedback helps students improve.'),
(691, 27, 'group dynamics', 'động lực nhóm', 'grˈup daɪnˈæmɪks', 'n', 'The study explored group dynamics in the workplace.'),
(692, 27, 'hypothesis', 'giả thuyết', 'haɪpˈɑθəsəs', 'n', 'A hypothesis must be testable.'),
(693, 27, 'intelligence', 'trí thông minh', 'ɪntˈɛlədʒəns', 'n', 'IQ tests measure certain types of intelligence.'),
(694, 27, 'jargon', 'thuật ngữ chuyên môn', 'dʒˈɑrgən', 'n', 'Every field has its own technical jargon.'),
(695, 27, 'kinesthetic', 'thuộc vận động', 'kɪnəsθˈɛtɪk', 'adj', 'Kinesthetic learners learn best by doing.'),
(696, 27, 'logic', 'lô-gic', 'lˈɑdʒɪk', 'n', 'Using logic helps solve complex problems.'),
(697, 27, 'method', 'phương pháp', 'mˈɛθəd', 'n', 'The experimental method is used in many sciences.'),
(698, 27, 'norm', 'chuẩn mực', 'nˈɔrm', 'n', 'Social norms dictate how people act in groups.'),
(699, 27, 'outlook', 'quan điểm, triển vọng', 'ˈaʊtlʊk', 'n', 'She has a positive outlook on life.'),
(700, 27, 'perception', 'sự nhận thức', 'pɚsˈɛpʃən', 'n', 'Perception is how we interpret the world around us.'),
(701, 28, 'urbanization', 'đô thị hóa', 'ɝbənəzˈeɪʃən', 'n', 'Rapid urbanization leads to housing shortages.'),
(702, 28, 'skyscraper', 'tòa nhà chọc trời', 'skˈaɪskreɪpɚ', 'n', 'Skyscrapers dominate the New York skyline.'),
(703, 28, 'residential', 'thuộc dân cư', 'rɛzɪdˈɛnʃəl', 'adj', 'The quiet residential area is ideal for families.'),
(704, 28, 'metropolis', 'đô thị lớn', 'mətrˈɑpələs', 'n', 'Tokyo is a bustling metropolis.'),
(705, 28, 'landmark', 'địa danh nổi tiếng', 'lˈændmɑrk', 'n', 'The Eiffel Tower is a famous landmark in Paris.'),
(706, 28, 'gentrification', 'sự chỉnh trang đô thị', 'dʒɛntrɪfɪkˈeɪʃən', 'n', 'Gentrification can displace long-time residents.'),
(707, 28, 'facade', 'mặt tiền', 'fəsˈɑd', 'n', 'The building has a beautiful glass facade.'),
(708, 28, 'dwelling', 'nơi ở', 'dwˈɛlɪŋ', 'n', 'Modern dwellings are designed for energy efficiency.'),
(709, 28, 'congestion', 'sự tắc nghẽn', 'kəndʒˈɛstʃən', 'n', 'Traffic congestion is a problem in major cities.'),
(710, 28, 'blueprint', 'bản thiết kế', 'blˈuprɪnt', 'n', 'The architect presented the blueprints for the villa.'),
(711, 28, 'amenity', 'tiện nghi', 'əmˈɛnəti', 'n', 'The apartment building has many amenities, including a gym.'),
(712, 28, 'architecture', 'kiến trúc', 'ˈɑrkətɛktʃɚ', 'n', 'The city is famous for its Gothic architecture.'),
(713, 28, 'boulevard', 'đại lộ', 'bˈʊləvɑrd', 'n', 'The tree-lined boulevard was perfect for a stroll.'),
(714, 28, 'cbd (central business district)', 'trung tâm tài chính', 'sˈibidi sˈɛntrəl bˈɪznəs dˈɪstrɪkt', 'n', 'The CBD is the busiest part of the city.'),
(715, 28, 'commute', 'đi làm xa/quãng đường đi làm', 'kəmjˈut', 'v/n', 'Many people commute into the city for work.'),
(716, 28, 'concrete', 'bê tông/cụ thể', 'kənkrˈit', 'n/adj', 'Modern buildings are often made of steel and concrete.'),
(717, 28, 'demographics', 'nhân khẩu học', 'dɛməgrˈæfɪks', 'n', 'The demographics of the city have changed recently.'),
(718, 28, 'density', 'mật độ', 'dˈɛnsəti', 'n', 'Population density is very high in urban areas.'),
(719, 28, 'district', 'quận, huyện', 'dˈɪstrɪkt', 'n', 'The historic district is a popular tourist area.'),
(720, 28, 'expansion', 'sự mở rộng', 'ɪkspˈænʃən', 'n', 'Urban expansion can lead to the loss of farmland.'),
(721, 28, 'infrastructure', 'cơ sở hạ tầng', 'ɪnfrəstrˈʌktʃɚ', 'n', 'Public transport is a vital part of urban infrastructure.'),
(722, 28, 'landscape', 'phong cảnh/làm đẹp phong cảnh', 'lˈændskeɪp', 'n/v', 'The park was beautifully landscaped.'),
(723, 28, 'megalopolis', 'siêu đô thị', 'mɛgəlˈɑpələs', 'n', 'The Northeast Megalopolis is a huge urban chain.'),
(724, 28, 'neighbourhood', 'khu phố', 'nˈeɪbɚhʊd', 'n', 'It\'s a friendly and safe neighbourhood.'),
(725, 28, 'outskirts', 'vùng ngoại ô', 'ˈaʊtskɝts', 'n', 'They live on the outskirts of London.'),
(726, 28, 'pedestrian', 'người đi bộ', 'pədˈɛstriən', 'n/adj', 'The street was closed to cars to create a pedestrian zone.'),
(727, 28, 'planning', 'quy hoạch', 'plˈænɪŋ', 'n', 'Urban planning is essential for sustainable growth.'),
(728, 28, 'pollution', 'sự ô nhiễm', 'pəlˈuʃən', 'n', 'Urban areas often suffer from air and noise pollution.'),
(729, 28, 'public transport', 'giao thông công cộng', 'pˈʌblɪk trænspˈɔrt', 'n', 'A good public transport system reduces traffic.'),
(730, 28, 'redevelopment', 'sự tái phát triển', 'ridɪvˈɛləpmənt', 'n', 'The redevelopment of the waterfront cost millions.'),
(731, 28, 'slum', 'khu ổ chuột', 'slʌm', 'n', 'The city is working to improve living conditions in slums.'),
(732, 28, 'sprawl', 'sự mở rộng ngổn ngang', 'spɹɔːl', 'n/v', 'Urban sprawl affects the surrounding countryside.'),
(733, 28, 'suburb', 'ngoại ô', 'ˈsʌbɜːb', 'n', 'Life in the suburbs is often quieter than in the city.'),
(734, 28, 'tenement', 'nhà chung cư rẻ tiền', 'ˈtɛnɪmənt', 'n', 'Many immigrants lived in crowded tenements.'),
(735, 28, 'zoning', 'quy hoạch khu vực', 'zˈoʊnɪŋ', 'n', 'Zoning laws dictate how land can be used.'),
(736, 28, 'apartment', 'căn hộ', 'əˈpɑːt.mənt', 'n', 'She lives in a small apartment in the city center.'),
(737, 28, 'bridge', 'cây cầu/bắc cầu', 'bɹɪdʒ', 'n/v', 'The new bridge will reduce travel time.'),
(738, 28, 'corridor', 'hành lang', 'ˈkɒɹɪˌdɔː(ɹ)', 'n', 'The long corridor led to the exit.'),
(739, 28, 'design', 'thiết kế', 'dɪˈzaɪn', 'n/v', 'The design of the building is very modern.'),
(740, 28, 'elevator', 'thang máy', 'ˈɛl.ə.veɪ.tɚ', 'n', 'Take the elevator to the 10th floor.'),
(741, 28, 'fountain', 'đài phun nước', 'fˈaʊntən', 'n', 'A large fountain stands in the middle of the square.'),
(742, 28, 'garage', 'nhà để xe', 'ɡəˈɹɑː(d)ʒ', 'n', 'He parked his car in the garage.'),
(743, 28, 'high-rise', 'cao tầng', 'haɪraɪz', 'adj/n', 'High-rise apartments are common in major cities.'),
(744, 28, 'inner city', 'nội thành', 'ˈɪnə sɪtɪ', 'n', 'The inner city has many shops and restaurants.'),
(745, 28, 'junction', 'nút giao thông', 'ˈdʒʌŋkʃən', 'n', 'Traffic was slow at the busy junction.'),
(746, 28, 'kiosk', 'quầy bán hàng nhỏ', 'ˈkiːˌɒsk', 'n', 'You can buy newspapers at the kiosk.'),
(747, 28, 'layout', 'bố cục, cách sắp đặt', 'lˈeɪaʊt', 'n', 'The layout of the office is very open.'),
(748, 28, 'monument', 'tượng đài', 'mˈɑnjumənt', 'n', 'A monument was built to honor the fallen soldiers.'),
(749, 28, 'network', 'mạng lưới', 'nɛtwɜːk', 'n/v', 'The city has a vast network of roads.'),
(750, 28, 'office block', 'tòa nhà văn phòng', 'ˈɑfɪs blˈɑk', 'n', 'Several new office blocks are being built downtown.'),
(751, 28, 'pavement', 'vỉa hè', 'ˈpeɪvmənt', 'n', 'Cars are not allowed to park on the pavement.'),
(752, 28, 'quarter', 'khu vực, khu phố', 'kwˈɔrtɚ', 'n', 'The Latin Quarter is famous for its history.'),
(753, 28, 'roadway', 'phần đường xe chạy', 'rˈoʊdweɪ', 'n', 'The roadway was repaired after the winter.'),
(754, 28, 'skyline', 'đường chân trời của thành phố', 'skˈaɪlaɪn', 'n', 'The New York skyline is iconic.'),
(755, 28, 'tunnel', 'đường hầm', 'tˈʌnəl', 'n/v', 'The train went through a long tunnel.'),
(756, 28, 'underpass', 'đường hầm đi bộ', 'ˈʌndɚpæs', 'n', 'Use the underpass to cross the busy road.'),
(757, 28, 'viaduct', 'cầu cạn', 'vˈaɪədəkt', 'n', 'The old railway viaduct is now a park.'),
(758, 28, 'walkway', 'lối đi bộ', 'wˈɔkweɪ', 'n', 'A scenic walkway runs along the river.'),
(759, 28, 'x-section', 'mặt cắt ngang', 'ˈɛks', 'n', 'The drawing shows a cross-section of the building.'),
(760, 28, 'yard', 'sân', 'jˈɑrd', 'n', 'The children played in the back yard.'),
(761, 28, 'zone', 'khu vực', 'zˈoʊn', 'n/v', 'The city center is a no-car zone.'),
(762, 28, 'aesthetic', 'thẩm mỹ', 'ɛsθˈɛtɪk', 'adj/n', 'The building\'s aesthetic is very pleasing.'),
(763, 28, 'balcony', 'ban công', 'bˈælkəni', 'n', 'The apartment has a small balcony with a view.'),
(764, 28, 'column', 'cột', 'kˈɑləm', 'n', 'The temple was supported by massive stone columns.'),
(765, 28, 'dome', 'mái vòm', 'dˈoʊm', 'n', 'The cathedral has a beautiful golden dome.'),
(766, 28, 'efficiency', 'hiệu suất', 'ɪfˈɪʃənsi', 'n', 'Energy efficiency is a key consideration in modern design.'),
(767, 28, 'frame', 'khung', 'frˈeɪm', 'n/v', 'The house has a wooden frame.'),
(768, 28, 'girder', 'xà ngang', 'gˈɝdɚ', 'n', 'Steel girders support the weight of the roof.'),
(769, 28, 'housing', 'nhà ở', 'hˈaʊzɪŋ', 'n', 'The city needs more affordable housing.'),
(770, 28, 'insulation', 'sự cách nhiệt', 'ɪnsəlˈeɪʃən', 'n', 'Proper insulation keeps the house warm in winter.'),
(771, 28, 'joist', 'dầm nhà', 'dʒˈɔɪst', 'n', 'Joists provide support for the floor.'),
(772, 28, 'keystone', 'đá đỉnh vòm', 'kˈistoʊn', 'n', 'The keystone is the central stone in an arch.'),
(773, 28, 'limestone', 'đá vôi', 'lˈaɪmstoʊn', 'n', 'Many historic buildings are made of limestone.'),
(774, 28, 'mortar', 'vữa', 'mˈɔrtɚ', 'n', 'Mortar is used to hold bricks together.'),
(775, 28, 'ornament', 'đồ trang trí/trang trí', 'ˈɔrnəmənt', 'n/v', 'The building was covered in elaborate ornaments.'),
(776, 28, 'pillar', 'trụ cột', 'pˈɪlɚ', 'n', 'Education is a pillar of society.'),
(777, 28, 'quarry', 'mỏ đá', 'kwˈɔri', 'n', 'The stone was sourced from a nearby quarry.'),
(778, 28, 'roofing', 'vật liệu lợp mái', 'rˈufɪŋ', 'n', 'Slate is a popular choice for roofing.'),
(779, 28, 'staircase', 'cầu thang', 'stˈɛrkeɪs', 'n', 'A grand staircase led to the second floor.'),
(780, 28, 'terrace', 'sân hiên', 'tˈɛrəs', 'n/v', 'We sat on the terrace and enjoyed the view.'),
(781, 28, 'utilities', 'tiện ích (điện, nước...)', 'jutˈɪlətiz', 'n', 'The monthly rent includes all utilities.'),
(782, 28, 'vault', 'vòm, hầm', 'vˈɔlt', 'n/v', 'The ancient tomb had a vaulted ceiling.'),
(783, 28, 'window', 'cửa sổ', 'wˈɪndoʊ', 'n', 'Open the window to let in some fresh air.'),
(784, 28, 'xeriscape', 'cảnh quan chịu hạn', 'zˈɛrɪskeɪp', 'n/v', 'Xeriscaping is popular in dry regions.'),
(785, 28, 'yield', 'mang lại/chịu thua', 'jˈild', 'n/v', 'The design yielded several unexpected benefits.'),
(786, 28, 'ziggurat', 'tháp nhiều tầng cổ', 'zˈɪgɚæt', 'n', 'Ziggurats were massive structures in ancient Mesopotamia.'),
(787, 28, 'accommodation', 'chỗ ở', 'əkɑmədˈeɪʃən', 'n', 'Finding cheap accommodation in the city is hard.'),
(788, 28, 'barrier', 'rào cản', 'bˈæriɚ', 'n', 'Sound barriers reduce noise from the highway.'),
(789, 28, 'construction', 'sự xây dựng', 'kənstrˈʌkʃən', 'n', 'Construction of the new stadium will take two years.'),
(790, 28, 'drainage', 'hệ thống thoát nước', 'drˈeɪnədʒ', 'n', 'Good drainage is essential to prevent flooding.'),
(791, 28, 'elevation', 'độ cao, bản vẽ mặt đứng', 'ɛləvˈeɪʃən', 'n', 'The elevation shows the front of the house.'),
(792, 28, 'foundation', 'nền móng', 'faʊndˈeɪʃən', 'n', 'The foundation of the building is solid rock.'),
(793, 28, 'grid', 'lưới, hệ thống', 'grˈɪd', 'n', 'The city is laid out on a grid system.'),
(794, 28, 'heritage site', 'di sản văn hóa', 'hˈɛrətədʒ sˈaɪt', 'n', 'UNESCO has designated several world heritage sites.'),
(795, 28, 'infill', 'xây chen', 'ˈɪnfɪl', 'n/v', 'Infill development uses vacant land within a city.'),
(796, 28, 'land use', 'sử dụng đất', 'lˈænd jˈus', 'n', 'Land use planning affects the quality of life.'),
(797, 28, 'mixed-use', 'đa chức năng', 'mˈɪkstjˈuz', 'adj', 'The development is a mixed-use residential and retail area.'),
(798, 28, 'open space', 'không gian mở', 'ˈoʊpən spˈeɪs', 'n', 'Parks provide valuable open space in cities.'),
(799, 28, 'parking lot', 'bãi đậu xe', 'pˈɑrkɪŋ lˈɑt', 'n', 'The parking lot was full by 9 AM.'),
(800, 28, 'quality of life', 'chất lượng cuộc sống', 'kwˈɑləti ˈʌv lˈaɪf', 'n', 'Urban planning can improve the quality of life.'),
(801, 29, 'broadcast', 'phát sóng', 'brˈɔdkæst', 'v/n', 'The news is broadcast live every evening.'),
(802, 29, 'censorship', 'sự kiểm duyệt', 'sˈɛnsɚʃɪp', 'n', 'Media censorship limits freedom of expression.'),
(803, 29, 'circulation', 'số lượng phát hành', 'sˈɝkjəleɪʃən', 'n', 'The newspaper has a daily circulation of one million.'),
(804, 29, 'coverage', 'sự đưa tin, bao phủ', 'kˈʌvɚədʒ', 'n', 'Live coverage of the event reached millions.'),
(805, 29, 'journalism', 'báo chí', 'dʒˈɝnəlɪzəm', 'n', 'Investigative journalism uncovers hidden truths.'),
(806, 29, 'mainstream', 'chủ lưu, chính thống', 'mˈeɪnstrim', 'adj', 'Mainstream media often shapes public opinion.'),
(807, 29, 'propaganda', 'tuyên truyền', 'ˌpɹɒp.əˈɡæn.də', 'n', 'The government used posters for propaganda.'),
(808, 29, 'sensationalism', 'xu hướng giật gân', 'sɛnsˈeɪʃənəlɪzəm', 'n', 'Sensationalism can undermine journalistic integrity.'),
(809, 29, 'tabloid', 'báo lá cải', 'tˈæblɔɪd', 'n', 'Tabloids often focus on celebrity gossip.'),
(810, 29, 'viral', 'lan truyền nhanh', 'vˈaɪrəl', 'adj', 'The video went viral within hours of being posted.'),
(811, 29, 'advertising', 'quảng cáo', 'ˈædvɚtaɪzɪŋ', 'n', 'Advertising revenue is crucial for many websites.'),
(812, 29, 'audience', 'khán giả', 'ˈɑdiəns', 'n', 'The show has a very loyal audience.'),
(813, 29, 'blog', 'blog/viết blog', 'blˈɔg', 'n/v', 'She writes a popular blog about travel.'),
(814, 29, 'breaking news', 'tin nóng', 'brˈeɪkɪŋ nˈuz', 'n', 'We interrupted the program for breaking news.'),
(815, 29, 'column', 'cột báo, chuyên mục', 'kˈɑləm', 'n', 'He writes a weekly column for the local paper.'),
(816, 29, 'correspondent', 'phóng viên thường trú', 'kɔrəspˈɑndənt', 'n', 'Our correspondent in Paris filed this report.'),
(817, 29, 'editor', 'biên tập viên', 'ˈɛdətɚ', 'n', 'The editor decided to put the story on the front page.'),
(818, 29, 'fake news', 'tin giả', 'fˈeɪk nˈuz', 'n', 'Fake news can spread quickly on social media.'),
(819, 29, 'headline', 'tiêu đề', 'hˈɛdlaɪn', 'n', 'The headline caught my eye immediately.'),
(820, 29, 'interview', 'cuộc phỏng vấn', 'ˈɪntɚvju', 'n/v', 'The celebrity gave an exclusive interview.'),
(821, 29, 'media outlet', 'cơ quan truyền thông', 'mˈidiə ˈaʊtlɛt', 'n', 'Several media outlets covered the story.'),
(822, 29, 'network', 'mạng lưới, đài truyền hình', 'nɛtwɜːk', 'n', 'The major networks are all covering the election.'),
(823, 29, 'obituary', 'cáo phó', 'oʊbˈɪtʃuɛri', 'n', 'The newspaper published a moving obituary for the artist.'),
(824, 29, 'paparazzi', 'thợ săn ảnh', 'pɑpɑrˈɔzi', 'n', 'The paparazzi followed the stars everywhere.'),
(825, 29, 'press release', 'thông cáo báo chí', 'prˈɛs rilˈis', 'n', 'The company issued a press release about the new product.'),
(826, 29, 'rating', 'tỷ lệ người xem', 'rˈeɪtɪŋ', 'n', 'The TV show has very high ratings.'),
(827, 29, 'reporter', 'phóng viên', 'rɪpˈɔrtɚ', 'n', 'Reporters are at the scene of the accident.'),
(828, 29, 'social media', 'mạng xã hội', 'sˈoʊʃəl mˈidiə', 'n', 'Social media has changed how we communicate.'),
(829, 29, 'source', 'nguồn tin', 'sˈɔrs', 'n', 'The reporter refused to name their source.'),
(830, 29, 'subscriber', 'người đăng ký', 'səbskrˈaɪbɚ', 'n', 'The magazine has over 100,000 subscribers.'),
(831, 29, 'telecast', 'buổi phát hình', 'tˈɛləkæst', 'n/v', 'The telecast reached an international audience.'),
(832, 29, 'vlog', 'vlog', 'vlˈɑg', 'n/v', 'Many young people prefer vlogs to traditional TV.'),
(833, 29, 'website', 'trang web', 'wˈɛbsaɪt', 'n', 'The website provides news and entertainment.'),
(834, 29, 'yellow journalism', 'báo chí vàng (giật gân)', 'jˈɛloʊ dʒˈɝnəlɪzəm', 'n', 'Yellow journalism focuses on scandals rather than facts.'),
(835, 29, 'zapping', 'đảo kênh liên tục', 'zˈæpɪŋ', 'n', 'Channel zapping is common during commercials.'),
(836, 29, 'article', 'bài báo', 'ˈɑrtəkəl', 'n', 'I read an interesting article about AI.'),
(837, 29, 'bias', 'sự thiên kiến', 'bˈaɪəs', 'n', 'Media bias can influence public opinion.'),
(838, 29, 'cable tv', 'truyền hình cáp', 'kˈeɪbəl tˈivˈi', 'n', 'Cable TV offers hundreds of different channels.'),
(839, 29, 'documentary', 'phim tài liệu', 'dɑkjəmˈɛntɚi', 'n', 'She produced a documentary about the environment.'),
(840, 29, 'editorial', 'bài xã luận', 'ɛdətˈɔriəl', 'n/adj', 'The editorial criticized the government\'s decision.'),
(841, 29, 'feature', 'bài đặc biệt/đưa tin chính', 'fˈitʃɚ', 'n/v', 'The magazine\'s cover feature is about space travel.'),
(842, 29, 'gossip', 'chuyện ngồi lê đôi mách', 'gˈɑsəp', 'n/v', 'The tabloid is full of celebrity gossip.'),
(843, 29, 'infotainment', 'thông tin giải trí', 'ɪnfoʊtˈeɪnmənt', 'n', 'Some news programs have turned into infotainment.'),
(844, 29, 'journalist', 'nhà báo', 'dʒˈɝnələst', 'n', 'Journalists often work long and irregular hours.'),
(845, 29, 'keynote', 'chủ đạo, then chốt', 'kˈinoʊt', 'n/adj', 'The keynote speaker talked about future trends.'),
(846, 29, 'libel', 'tội phỉ báng (bằng văn bản)', 'lˈaɪbəl', 'n/v', 'The actress sued the newspaper for libel.'),
(847, 29, 'mass media', 'truyền thông đại chúng', 'mˈæs mˈidiə', 'n', 'Mass media plays a huge role in modern society.'),
(848, 29, 'newscast', 'chương trình tin tức', 'nˈuzkæst', 'n', 'I watch the evening newscast every day.'),
(849, 29, 'opinion piece', 'bài viết bày tỏ quan điểm', 'əpˈɪnjən pˈis', 'n', 'Opinion pieces allow for different perspectives.'),
(850, 29, 'periodical', 'tạp chí xuất bản định kỳ', 'pɪriˈɑdɪkəl', 'n', 'The library has a large collection of periodicals.'),
(851, 29, 'quote', 'lời trích dẫn/trích dẫn', 'kwəʊt', 'n/v', 'The article included a quote from the CEO.'),
(852, 29, 'review', 'bài đánh giá', 'ɹɪˈvjuː', 'n/v', 'The book received a glowing review in the Times.'),
(853, 29, 'slander', 'tội vu khống (bằng lời nói)', 'ˈslændɚ', 'n/v', 'Slander is a serious legal matter.'),
(854, 29, 'talk show', 'chương trình trò chuyện', 'toːk ʃəʊ', 'n', 'Talk shows often feature celebrity guests.'),
(855, 29, 'update', 'cập nhật', 'əpdˈeɪt', 'v/n', 'The reporter gave a live update on the situation.'),
(856, 29, 'viewer', 'người xem', 'vjˈuɚ', 'n', 'The video has millions of viewers worldwide.'),
(857, 29, 'webcast', 'buổi phát sóng qua mạng', 'wˈɛbkæst', 'n/v', 'The company\'s annual meeting was a webcast.'),
(858, 29, 'xml', 'ngôn ngữ đánh dấu mở rộng', 'ɛksɛmˈɛl', 'n', 'XML is used to structure data on the web.'),
(859, 29, 'youtube', 'youtube', 'jˈutub', 'n', 'YouTube is the largest video-sharing platform.'),
(860, 29, 'zine', 'tạp chí nhỏ', 'zˈaɪn', 'n', 'He started a small art zine with his friends.'),
(861, 29, 'anchor', 'biên tập viên chính', 'ˈæŋ.kə', 'n', 'The news anchor presented the evening report.'),
(862, 29, 'blogosphere', 'cộng đồng blog', 'blˈɔgəsfɪr', 'n', 'The story spread quickly through the blogosphere.'),
(863, 29, 'caption', 'phụ đề, lời chú thích', 'ˈkæp.ʃən', 'n/v', 'The photo had a funny caption.'),
(864, 29, 'deadlines', 'hạn chót', 'dˈɛdlaɪnz', 'n', 'Journalists often have to work under tight deadlines.'),
(865, 29, 'exposé', 'bài báo vạch trần', 'ɪkspɪz', 'n', 'The newspaper published an exposé on corruption.'),
(866, 29, 'freelance', 'làm tự do', 'ˈfɹiːlɑːns', 'adj/adv/n', 'She works as a freelance photographer.'),
(867, 29, 'gatekeeper', 'người gác cổng (kiểm soát thông tin)', 'gˈeɪtkipɚ', 'n', 'Editors act as gatekeepers for what gets published.'),
(868, 29, 'hype', 'sự thổi phồng quảng cáo', 'hˈaɪp', 'n/v', 'Don\'t believe all the media hype about the new movie.'),
(869, 29, 'investigative', 'điều tra', 'ɪnvˈɛstəgeɪtɪv', 'adj', 'Investigative reporting takes time and resources.'),
(870, 29, 'jingle', 'điệu nhạc quảng cáo', 'dʒˈɪŋgəl', 'n', 'The catchy jingle stayed in my head all day.'),
(871, 29, 'kudos', 'lời khen ngợi', 'kˈudoʊs', 'n', 'The team received kudos for their excellent coverage.'),
(872, 29, 'layout', 'bố cục bài báo', 'lˈeɪaʊt', 'n', 'The layout of the magazine is very professional.'),
(873, 29, 'media mogul', 'ông trùm truyền thông', 'mˈidiə mˈoʊgəl', 'n', 'The media mogul owns several newspapers and TV stations.'),
(874, 29, 'newsletter', 'bản tin', 'nˈuzlɛtɚ', 'n', 'Subscribe to our newsletter for the latest updates.'),
(875, 29, 'op-ed', 'bài xã luận của khách mời', 'ˈɑp', 'n', 'He wrote an op-ed about the importance of voting.'),
(876, 29, 'pundit', 'chuyên gia, học giả', 'pˈʌndət', 'n', 'Political pundits debated the election results.'),
(877, 29, 'quality press', 'báo chí chất lượng', 'kwˈɑləti prˈɛs', 'n', 'The quality press focuses on serious news and analysis.'),
(878, 29, 'readership', 'lượng độc giả', 'rˈidɚʃɪp', 'n', 'The newspaper\'s readership has grown online.'),
(879, 29, 'scoop', 'tin độc quyền', 'skˈup', 'n/v', 'The reporter got a major scoop about the merger.'),
(880, 29, 'target audience', 'khán giả mục tiêu', 'tˈɑrgət ˈɑdiəns', 'n', 'The show\'s target audience is young adults.'),
(881, 29, 'underground press', 'báo chí không chính thống', 'ˈʌndɚgraʊnd prˈɛs', 'n', 'The underground press flourished during the revolution.'),
(882, 29, 'voice-over', 'lời thuyết minh', 'vˈɔɪsoʊvɝ', 'n', 'The documentary has a voice-over by a famous actor.'),
(883, 29, 'webinar', 'hội thảo trực tuyến', 'wˈɛbˈaɪnɝ', 'n', 'The webinar provided tips for starting a business.'),
(884, 29, 'xyz', 'thông tin cơ bản', 'zˈaɪz', 'n', 'The article explained the XYZ of the new policy.'),
(885, 29, 'yellow press', 'báo chí lá cải', 'jˈɛloʊ prˈɛs', 'n', 'The yellow press often exaggerates the truth.'),
(886, 29, 'zoom', 'phóng to', 'zˈum', 'v/n', 'The camera zoomed in on the speaker\'s face.'),
(887, 29, 'access', 'sự truy cập', 'ˈæksɛs', 'n/v', 'Journalists need access to information to do their jobs.'),
(888, 29, 'brief', 'bản tóm tắt/tóm tắt', 'brˈif', 'n/v', 'The press secretary gave a brief to the reporters.'),
(889, 29, 'copyright', 'bản quyền', 'kˈɑpɪraɪt', 'n/v', 'Copyright laws protect original works of art.'),
(890, 29, 'digital media', 'truyền thông kỹ thuật số', 'dˈɪdʒətəl mˈidiə', 'n', 'Digital media has largely replaced print.'),
(891, 29, 'ethics', 'đạo đức', 'ˈɛθɪks', 'n', 'Journalistic ethics are crucial for maintaining trust.'),
(892, 29, 'freedom of the press', 'tự do báo chí', 'frˈidəm ˈʌv ðə prˈɛs', 'n', 'Freedom of the press is a fundamental right.'),
(893, 29, 'graphic', 'đồ họa/trực quan', 'grˈæfɪk', 'n/adj', 'The article included several helpful graphics.'),
(894, 29, 'influence', 'sự ảnh hưởng', 'ˈɪnfluəns', 'n/v', 'The media has a big influence on public opinion.'),
(895, 29, 'junket', 'chuyến đi quảng bá (miễn phí)', 'dʒˈʌŋkɪt', 'n', 'The reporters were invited on a press junket to Hawaii.'),
(896, 29, 'link', 'liên kết', 'lˈɪŋk', 'n/v', 'Click on the link to read the full article.'),
(897, 29, 'masthead', 'măng-sét báo', 'mˈæsthɛd', 'n', 'The masthead lists the name and staff of the paper.'),
(898, 29, 'newsroom', 'phòng tin tức', 'nˈuzrum', 'n', 'The newsroom was buzzing with activity.'),
(899, 29, 'on the record', 'công khai', 'ˈɑn ðə rəkˈɔrd', 'adv', 'Everything he said was on the record.'),
(900, 29, 'press gallery', 'khu vực dành cho báo chí', 'prˈɛs gˈælɚi', 'n', 'Reporters watched the debate from the press gallery.'),
(901, 30, 'globalization', 'toàn cầu hóa', 'gloʊbəlɪzˈeɪʃən', 'n', 'Globalization has interconnected world economies.'),
(902, 30, 'inequality', 'sự bất bình đẳng', 'ɪnɪkwˈɑləti', 'n', 'Income inequality is a major global issue.'),
(903, 30, 'migration', 'sự di cư', 'maɪˈɡɹeɪʃ(ə)n', 'n', 'Climate change is driving human migration.'),
(904, 30, 'poverty', 'sự nghèo đói', 'ˈpɒvəti', 'n', 'Reducing poverty is a key sustainable goal.'),
(905, 30, 'sanctions', 'lệnh trừng phạt', 'sˈæŋkʃənz', 'n', 'Economic sanctions were imposed on the country.'),
(906, 30, 'sustainability', 'sự bền vững', 'səsteɪnəbˈɪlɪti', 'n', 'Environmental sustainability is vital for the future.'),
(907, 30, 'terrorism', 'khủng bố', 'tˈɛrɚɪzəm', 'n', 'Global cooperation is needed to combat terrorism.'),
(908, 30, 'treaty', 'hiệp ước', 'trˈiti', 'n', 'The peace treaty was signed by both leaders.'),
(909, 30, 'vulnerability', 'sự dễ bị tổn thương', 'vʌlnɚəbˈɪlɪti', 'n', 'Poor nations have high vulnerability to disasters.'),
(910, 30, 'diplomacy', 'ngoại giao', 'dɪplˈoʊməsi', 'n', 'International issues should be solved via diplomacy.'),
(911, 30, 'advocacy', 'sự vận động', 'ˈædvəkəsi', 'n', 'Human rights advocacy is essential for global justice.'),
(912, 30, 'aid', 'viện trợ', 'ˈeɪd', 'n/v', 'Foreign aid helps developing countries improve infrastructure.'),
(913, 30, 'alliance', 'liên minh', 'əlˈaɪəns', 'n', 'The military alliance provides security for its members.'),
(914, 30, 'amnesty', 'sự ân xá', 'ˈæmnəsti', 'n', 'Amnesty was granted to political prisoners.'),
(915, 30, 'asylum', 'quyền tị nạn', 'əsˈaɪləm', 'n', 'Thousands of people applied for political asylum.'),
(916, 30, 'biodiversity', 'đa dạng sinh học', 'baɪoʊdaɪvˈɝsəti', 'n', 'Protecting biodiversity is a global responsibility.'),
(917, 30, 'border', 'biên giới', 'bˈɔrdɚ', 'n', 'Strict border controls were implemented.'),
(918, 30, 'boycott', 'tẩy chay', 'bˈɔɪkɑt', 'v/n', 'Consumers organized a boycott of the company\'s products.'),
(919, 30, 'conflict', 'xung đột', 'kˈɑnflɪkt', 'n/v', 'Conflict resolution is key to global peace.'),
(920, 30, 'cooperation', 'sự hợp tác', 'koʊɑpɚˈeɪʃən', 'n', 'International cooperation is needed to fight climate change.'),
(921, 30, 'crisis', 'khủng hoảng', 'krˈaɪsəs', 'n', 'The world is facing a severe energy crisis.'),
(922, 30, 'debt', 'nợ', 'dˈɛt', 'n', 'Many developing nations are struggling with foreign debt.'),
(923, 30, 'democracy', 'nền dân chủ', 'dɪmˈɑkrəsi', 'n', 'Promoting democracy is a goal of many international groups.'),
(924, 30, 'development', 'sự phát triển', 'dɪvˈɛləpmənt', 'n', 'Sustainable development is a global priority.');
INSERT INTO `words` (`Id`, `topic_id`, `word`, `Meaning`, `Phonetic`, `part_of_speech`, `Example`) VALUES
(925, 30, 'disarmament', 'giải trừ quân bị', 'dɪsˈɑrməmənt', 'n', 'Nuclear disarmament is a long-standing goal.'),
(926, 30, 'displacement', 'sự di dời', 'dɪsplˈeɪsmənt', 'n', 'War led to the displacement of millions of people.'),
(927, 30, 'ecology', 'sinh thái học', 'ɪkˈɑlədʒi', 'n', 'Global ecology is threatened by human activity.'),
(928, 30, 'economy', 'nền kinh tế', 'iːˈkɒn.ə.mi', 'n', 'The global economy is highly interconnected.'),
(929, 30, 'emergency', 'tình trạng khẩn cấp', 'ɪmˈɝdʒənsi', 'n', 'The UN declared a humanitarian emergency.'),
(930, 30, 'environment', 'môi trường', 'ɪnvˈaɪrənmənt', 'n', 'Environmental protection is a global concern.'),
(931, 30, 'epidemic', 'dịch bệnh', 'ɛpədˈɛmɪk', 'n', 'The WHO works to prevent global epidemics.'),
(932, 30, 'ethics', 'đạo đức', 'ˈɛθɪks', 'n', 'Global ethics guide international conduct.'),
(933, 30, 'extinction', 'sự tuyệt chủng', 'ɪkstˈɪŋkʃən', 'n', 'The loss of habitat leads to species extinction.'),
(934, 30, 'famine', 'nạn đói', 'fˈæmən', 'n', 'Drought can lead to widespread famine.'),
(935, 30, 'freedom', 'tự do', 'frˈidəm', 'n', 'Freedom of speech is a basic human right.'),
(936, 30, 'geopolitics', 'địa chính trị', 'dʒioʊpˈɑlətɪks', 'n', 'Geopolitics influences international relations.'),
(937, 30, 'greenhouse effect', 'hiệu ứng nhà kính', 'grˈinhaʊs ɪfˈɛkt', 'n', 'The greenhouse effect causes global warming.'),
(938, 30, 'human rights', 'nhân quyền', 'hjˈumən ɹaɪts', 'n', 'Human rights abuses must be reported.'),
(939, 30, 'humanitarian', 'nhân đạo', 'hjumænətˈɛriən', 'adj/n', 'Humanitarian aid is sent to disaster zones.'),
(940, 30, 'identity', 'danh tính', 'aɪdˈɛntəti', 'n', 'Globalization affects cultural identity.'),
(941, 30, 'immigration', 'sự nhập cư', 'ɪməgrˈeɪʃən', 'n', 'Immigration policies vary from country to country.'),
(942, 30, 'imperialism', 'chủ nghĩa đế quốc', 'ɪmpˈɪriəlɪzəm', 'n', 'The history of imperialism still affects the world today.'),
(943, 30, 'inflation', 'lạm phát', 'ɪnflˈeɪʃən', 'n', 'Global inflation affects the cost of living.'),
(944, 30, 'infrastructure', 'cơ sở hạ tầng', 'ɪnfrəstrˈʌktʃɚ', 'n', 'Developing nations need better infrastructure.'),
(945, 30, 'insurgency', 'sự nổi dậy', 'ɪnsˈɝdʒənsi', 'n', 'The government is fighting an insurgency in the north.'),
(946, 30, 'integration', 'sự hội nhập', 'ɪntəgrˈeɪʃən', 'n', 'Regional integration can boost economic growth.'),
(947, 30, 'interdependence', 'sự phụ thuộc lẫn nhau', 'ɪntɚdəpˈɛndəns', 'n', 'Economic interdependence reduces the risk of war.'),
(948, 30, 'intervention', 'sự can thiệp', 'ɪntɚvˈɛnʃən', 'n', 'The UN authorized military intervention.'),
(949, 30, 'justice', 'công lý', 'dʒˈʌstəs', 'n', 'Global justice is a goal for many activists.'),
(950, 30, 'labor', 'lao động', 'lˈeɪbɚ', 'n', 'Child labor is a serious global issue.'),
(951, 30, 'liability', 'trách nhiệm pháp lý', 'laɪəbˈɪlɪti', 'n', 'Companies have a liability for environmental damage.'),
(952, 30, 'liberty', 'quyền tự do', 'lˈɪbɚti', 'n', 'Liberty is a fundamental human value.'),
(953, 30, 'literacy', 'khả năng biết chữ', 'lˈɪtɚəsi', 'n', 'Global literacy rates are slowly rising.'),
(954, 30, 'malnutrition', 'sự suy dinh dưỡng', 'mælnutrˈɪʃən', 'n', 'Malnutrition is a major health problem in poor regions.'),
(955, 30, 'market', 'thị trường', 'mˈɑrkət', 'n', 'The global market is highly competitive.'),
(956, 30, 'mediation', 'sự hòa giải', 'midiˈeɪʃən', 'n', 'Mediation can help resolve international disputes.'),
(957, 30, 'militarism', 'chủ nghĩa quân phiệt', 'mˈɪlətɚɪzəm', 'n', 'Militarism can lead to arms races.'),
(958, 30, 'minority', 'thiểu số', 'maɪnˈɔrəti', 'n', 'Protecting the rights of minorities is essential.'),
(959, 30, 'nationalism', 'chủ nghĩa dân tộc', 'ˈnæʃənəlɪzəm', 'n', 'Nationalism is rising in many parts of the world.'),
(960, 30, 'ngo (non-governmental organization)', 'tổ chức phi chính phủ', 'ɛŋgˈoʊ nɑngʌvɚnmˈɛntəl ɔrgənəzˈeɪʃən', 'n', 'NGOs play a vital role in international development.'),
(961, 30, 'negotiation', 'sự đàm phán', 'nɪgoʊʃiˈeɪʃən', 'n', 'Negotiations are underway to end the conflict.'),
(962, 30, 'nuclear', 'thuộc hạt nhân', 'nˈukliɚ', 'adj', 'Nuclear proliferation is a major global threat.'),
(963, 30, 'obligation', 'nghĩa vụ', 'ɑb.ləˈɡeɪ.ʃən', 'n', 'Nations have an obligation to protect their citizens.'),
(964, 30, 'oppression', 'sự áp bức', 'əprˈɛʃən', 'n', 'People rose up against systemic oppression.'),
(965, 30, 'outbreak', 'sự bùng phát', 'ˈaʊtbɹeɪk', 'n', 'A sudden outbreak of disease caused alarm.'),
(966, 30, 'overpopulation', 'sự quá tải dân số', 'oʊvɚpɑpjəlˈeɪʃən', 'n', 'Overpopulation puts a strain on natural resources.'),
(967, 30, 'ozone layer', 'tầng ozone', 'ˈoʊzoʊn leɪə', 'n', 'Protecting the ozone layer is a global effort.'),
(968, 30, 'pandemic', 'đại dịch', 'pænˈdɛmɪk', 'n', 'The pandemic had a huge impact on the world.'),
(969, 30, 'parliament', 'nghị viện', 'ˈpɑːləmənt', 'n', 'The European Parliament meets in Brussels.'),
(970, 30, 'peace', 'hòa bình', 'pˈis', 'n', 'The goal of the UN is to maintain world peace.'),
(971, 30, 'petroleum', 'dầu mỏ', 'pətrˈoʊliəm', 'n', 'The world is still heavily dependent on petroleum.'),
(972, 30, 'policy', 'chính sách', 'pˈɑləsi', 'n', 'Foreign policy determines how a nation interacts with others.'),
(973, 30, 'pollution', 'sự ô nhiễm', 'pəlˈuʃən', 'n', 'Pollution is a global problem that knows no borders.'),
(974, 30, 'population', 'dân số', 'pɑpjəlˈeɪʃən', 'n', 'The world population is over 8 billion.'),
(975, 30, 'prejudice', 'định kiến', 'prˈɛdʒədɪs', 'n', 'Prejudice and discrimination are global issues.'),
(976, 30, 'privatization', 'sự tư hữu hóa', 'prˈaɪvətəzˈeɪʃən', 'n', 'Privatization of public services is controversial.'),
(977, 30, 'protest', 'biểu tình', 'ˈpɹəʊ.tɛst', 'n/v', 'Global protests were held against climate change.'),
(978, 30, 'quota', 'hạn ngạch', 'kwˈoʊtə', 'n', 'The government set a quota on the number of refugees.'),
(979, 30, 'racism', 'chủ nghĩa phân biệt chủng tộc', 'rˈeɪsɪzəm', 'n', 'Combatting racism is a global priority.'),
(980, 30, 'rebellion', 'cuộc nổi loạn', 'rɪbˈɛljən', 'n', 'The rebellion was suppressed by the military.'),
(981, 30, 'reform', 'cải cách', 'rəfˈɔrm', 'n/v', 'Economic reform is needed to attract investment.'),
(982, 30, 'refugee', 'người tị nạn', 'rˈɛfjudʒi', 'n', 'Refugee camps provide basic needs for those in flight.'),
(983, 30, 'regulation', 'quy định', 'rɛgjəlˈeɪʃən', 'n', 'International regulations govern global trade.'),
(984, 30, 'religion', 'tôn giáo', 'rɪlˈɪdʒən', 'n', 'Religion can be a source of both peace and conflict.'),
(985, 30, 'resource', 'tài nguyên', 'rˈisɔrs', 'n', 'Water is becoming a scarce global resource.'),
(986, 30, 'revolution', 'cuộc cách mạng', 'rɛvəlˈuʃən', 'n', 'The digital revolution has changed how we live.'),
(987, 30, 'sanctuary', 'nơi trú ẩn, khu bảo tồn', 'sˈæŋktʃuɛri', 'n', 'The country provided sanctuary for political exiles.'),
(988, 30, 'scarcity', 'sự khan hiếm', 'skˈɛrsɪti', 'n', 'Scarcity of food is a major problem in many regions.'),
(989, 30, 'sector', 'lĩnh vực, khu vực', 'sˈɛktɚ', 'n', 'The private sector plays a key role in the economy.'),
(990, 30, 'security', 'an ninh', 'sɪkjˈʊrəti', 'n', 'Global security is a shared responsibility.'),
(991, 30, 'sovereignty', 'chủ quyền', 'sˈɑvrənti', 'n', 'National sovereignty is a key principle of international law.'),
(992, 30, 'standards', 'tiêu chuẩn', 'stˈændɚdz', 'n', 'Global standards ensure product safety and quality.'),
(993, 30, 'state', 'nhà nước, quốc gia', 'stˈeɪt', 'n', 'The state is responsible for protecting its citizens.'),
(994, 30, 'subsidy', 'tiền trợ cấp', 'sˈʌbsɪdi', 'n', 'Subsidies for fossil fuels should be phased out.'),
(995, 30, 'suffrage', 'quyền bầu cử', 'sˈʌfrɪdʒ', 'n', 'Universal suffrage is a goal for all democracies.'),
(996, 30, 'surplus', 'sự dư thừa', 'sˈɝpləs', 'n', 'A food surplus can be used for international aid.'),
(997, 30, 'tariff', 'thuế quan', 'tˈɛrəf', 'n', 'Tariffs can lead to trade wars between nations.'),
(998, 30, 'taxation', 'sự đánh thuế', 'tæksˈeɪʃən', 'n', 'International taxation rules are being updated.'),
(999, 30, 'trade', 'thương mại', 'trˈeɪd', 'n/v', 'Free trade agreements boost economic activity.'),
(1000, 30, 'union', 'liên minh, hiệp hội', 'jˈunjən', 'n', 'The European Union is a powerful regional bloc.'),
(1001, 31, 'aesthetic', 'thuộc mỹ học, thẩm mỹ', 'ɛsθˈɛtɪk', 'adj', 'The building has high aesthetic value.'),
(1002, 31, 'masterpiece', 'kiệt tác', 'mˈæstɚpis', 'n', 'The Mona Lisa is a world-famous masterpiece.'),
(1003, 31, 'genre', 'thể loại', 'ʒˈɑnrə', 'n', 'What genre of music do you prefer?'),
(1004, 31, 'depict', 'tả, vẽ chân dung', 'dɪpˈɪkt', 'v', 'The painting depicts a peaceful landscape.'),
(1005, 31, 'portray', 'vẽ chân dung, đóng vai', 'pɔrtrˈeɪ', 'v', 'The actor portrays a historic figure.'),
(1006, 31, 'symphony', 'bản nhạc giao hưởng', 'sˈɪmfəni', 'n', 'He composed a beautiful symphony.'),
(1007, 31, 'sculpture', 'tác phẩm điêu khắc', 'skˈʌlptʃɚ', 'n', 'The sculpture was carved out of marble.'),
(1008, 31, 'exhibition', 'cuộc triển lãm', 'ɛksəbˈɪʃən', 'n', 'The museum is hosting an exhibition of modern art.'),
(1009, 31, 'gallery', 'phòng trưng bày nghệ thuật', 'gˈælɚi', 'n', 'They visited a local art gallery.'),
(1010, 31, 'dramatic', 'thuộc kịch tính, ấn tượng', 'drəmˈætɪk', 'adj', 'The movie has a dramatic ending.'),
(1011, 31, 'canvas', 'vải vẽ tranh', 'kˈænvəs', 'n', 'The artist painted on a large canvas.'),
(1012, 31, 'audition', 'thử giọng, thử vai', 'ɑdˈɪʃən', 'n/v', 'She went to an audition for a new play.'),
(1013, 31, 'choreography', 'nghệ thuật dàn dựng vũ đạo', 'kɔriˈɑgrəfi', 'n', 'The dance choreography was very complex.'),
(1014, 31, 'improvisation', 'sự ứng biến, ngẫu hứng', 'ɪmprɑvɪzˈeɪʃən', 'n', 'The performance was based on improvisation.'),
(1015, 31, 'performance', 'buổi biểu diễn', 'pɚfˈɔrməns', 'n', 'The theater\'s performance was outstanding.'),
(1016, 31, 'orchestra', 'dàn nhạc giao hưởng', 'ˈɔrkəstrə', 'n', 'The orchestra played music by Beethoven.'),
(1017, 31, 'creative', 'sáng tạo', 'kriˈeɪtɪv', 'adj', 'Creative thinking is essential for artists.'),
(1018, 31, 'curator', 'người quản lý bảo tàng/phòng tranh', 'kjʊrˈeɪtɚ', 'n', 'The museum curator organized the new display.'),
(1019, 31, 'medium', 'phương tiện, chất liệu nghệ thuật', 'mˈidiəm', 'n', 'Oil paint is a popular medium for artists.'),
(1020, 31, 'avant-garde', 'tiên phong (nghệ thuật)', 'əvˈɑntgˈɑrd', 'adj/n', 'The design was very avant-garde for its time.');

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
('20261021095510_UpdateSpeakingWritingConfig', '9.0.0'),
('20261024030952_AddSpeakingQuestionsRelationship', '9.0.0'),
('20261024035621_AddSpeakingQuestionsRelationship2', '9.0.0'),
('20261025121926_AddSpeakingQuestionCuesAndClosing', '9.0.0');

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `translation_exercises`
--
ALTER TABLE `translation_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;

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
