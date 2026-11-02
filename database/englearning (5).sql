-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2026 at 06:17 PM
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
  `criterion_code` varchar(50) NOT NULL,
  `Score` decimal(3,1) NOT NULL,
  `Feedback` text DEFAULT NULL,
  `Strengths` text DEFAULT NULL,
  `Weaknesses` text DEFAULT NULL,
  `Suggestions` text DEFAULT NULL,
  `attempt_id` int(11) NOT NULL,
  `Issues` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `speaking_criterion_scores`
--

INSERT INTO `speaking_criterion_scores` (`Id`, `criterion_code`, `Score`, `Feedback`, `Strengths`, `Weaknesses`, `Suggestions`, `attempt_id`, `Issues`) VALUES
(1, 'FLUENCY_COHERENCE', 1.0, 'Bài nói bị ngắt quãng hoàn toàn, không có sự liên kết và thí sinh sử dụng ngôn từ không phù hợp thay vì trả lời câu hỏi.', 'Không có điểm mạnh.', 'Mất kiểm soát hoàn toàn thời gian và nội dung bài nói, nói tục và chuyển sang tiếng mẹ đẻ.', 'Cần tập trung vào câu hỏi và cố gắng duy trì bài nói bằng tiếng Anh một cách lịch sự.', 2, '[]'),
(2, 'LEXICAL_RESOURCE', 1.0, 'Vốn từ vựng không thể đánh giá do thí sinh không trả lời đúng trọng tâm và dùng từ ngữ thô tục.', 'Không có.', 'Hạn chế nghiêm trọng về từ vựng học thuật hoặc thông dụng cho chủ đề gia đình.', 'Học các từ vựng cơ bản về mô tả người và các mối quan hệ trong gia đình.', 2, '[]'),
(3, 'GRAMMAR_ACCURACY', 1.0, 'Không đủ dữ liệu câu hoàn chỉnh để đánh giá ngữ pháp.', 'Không có.', 'Không thể hiện được cấu trúc ngữ pháp nào do nói lan man.', 'Luyện tập các câu đơn và câu phức cơ bản khi miêu tả người.', 2, '[]'),
(4, 'PRONUNCIATION', 1.0, 'Phát âm không rõ ràng, bị lẫn tiếng ồn và tiếng Việt, ngữ điệu không phù hợp.', 'Không có.', 'Phát âm kém, nói nhỏ và không rõ tiếng Anh.', 'Cần luyện tập phát âm từng từ và ngữ điệu câu hỏi cơ bản.', 2, '[]'),
(5, 'FLUENCY_COHERENCE', 0.0, 'Không có nội dung bài nói để đánh giá độ trôi chảy và mạch lạc.', 'Không có.', 'Không có câu trả lời.', 'Hãy nói một cách tự nhiên và trả lời đầy đủ các gợi ý trong đề bài.', 3, '[]'),
(6, 'LEXICAL_RESOURCE', 0.0, 'Không có từ vựng nào được sử dụng trong bài.', 'Không có.', 'Không có từ vựng.', 'Sử dụng các từ vựng phong phú hơn khi miêu tả người thân.', 3, '[]'),
(7, 'GRAMMAR_ACCURACY', 0.0, 'Không có cấu trúc ngữ pháp nào được thể hiện.', 'Không có.', 'Không có câu.', 'Sử dụng đa dạng các thì quá khứ và hiện tại khi kể về mối quan hệ gia đình.', 3, '[]'),
(8, 'PRONUNCIATION', 0.0, 'Không ghi nhận được phát âm từ phía thí sinh ngoài các âm thanh nhiễu.', 'Không có.', 'Không có lời nói.', 'Cần đảm bảo thiết bị thu âm hoạt động tốt và nói rõ ràng hơn.', 3, '[]'),
(13, 'FLUENCY_COHERENCE', 2.0, 'Tốc độ nói rất chậm, ngập ngừng nhiều và không thể phát triển câu trả lời cho chủ đề được giao.', 'Cố gắng nói theo chủ đề được hỏi.', 'Ngập ngừng liên tục, thời gian chết nhiều, không hoàn thành được bài nói.', 'Hãy luyện tập trả lời các câu hỏi dài hơn bằng cách triển khai các ý nhỏ liên quan đến chủ đề.', 15, '[{\"OriginalText\":\"just sleep on family member you are close to you suicide put this person was saying what\\u0027s inside it together how long you have been blow and explain why you feel especially alone\",\"Correction\":\"Describe a family member you are close to.\",\"Explanation\":\"Ph\\u1EA7n n\\u00F3i b\\u1ECB ng\\u1EAFt qu\\u00E3ng v\\u00E0 kh\\u00F4ng th\\u1EC3 hi\\u1EC7n \\u0111\\u01B0\\u1EE3c n\\u1ED9i dung m\\u1EA1ch l\\u1EA1c.\",\"Category\":\"Fluency\"}]'),
(14, 'LEXICAL_RESOURCE', 2.0, 'Vốn từ vựng rất hạn chế và bị sai nghĩa do phát âm hoặc dùng từ không chính xác.', 'Sử dụng được một số từ cơ bản như \'family member\'.', 'Dùng từ sai hoàn toàn so với yêu cầu đề bài.', 'Học thêm từ vựng chủ đề miêu tả người và luyện phát âm chuẩn xác từng từ.', 15, '[{\"OriginalText\":\"suicide put this person\",\"Correction\":\"describe this person\",\"Explanation\":\"D\\u00F9ng sai t\\u1EEB v\\u1EF1ng ho\\u00E0n to\\u00E0n.\",\"Category\":\"Vocabulary\"}]'),
(15, 'GRAMMAR_ACCURACY', 2.5, 'Cấu trúc câu bị phá vỡ, không thể hiện được các thì phức tạp hoặc cấu trúc ngữ pháp chính xác.', 'Có ý định sử dụng thì hiện tại hoàn thành.', 'Lỗi ngữ pháp nặng nề trong việc cấu thành câu.', 'Ôn tập lại các cấu trúc câu đơn và câu ghép cơ bản.', 15, '[{\"OriginalText\":\"how long you have been blow\",\"Correction\":\"how long you have been close\",\"Explanation\":\"Sai c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p v\\u00E0 t\\u1EEB v\\u1EF1ng.\",\"Category\":\"Grammar\"}]'),
(16, 'PRONUNCIATION', 2.0, 'Phát âm rất kém, nhiều từ không rõ âm hoặc phát âm sai hoàn toàn khiến người nghe không hiểu.', 'Cố gắng phát âm các từ tiếng Anh.', 'Nuốt âm, phát âm sai trọng âm và ngữ điệu đơn điệu.', 'Luyện tập từng âm tiết (phonemes) và các từ đơn lẻ trước khi nói câu dài.', 15, '[{\"OriginalText\":\"sleep\",\"Correction\":\"describe\",\"Explanation\":\"Ph\\u00E1t \\u00E2m sai ho\\u00E0n to\\u00E0n t\\u1EEB \\u0027describe\\u0027.\",\"Category\":\"Pronunciation\"}]'),
(17, 'FLUENCY_COHERENCE', 1.0, 'Không có nội dung nói để đánh giá độ trôi chảy và mạch lạc.', 'Không có.', 'Không thể nói hoặc không phản hồi câu hỏi.', 'Cần đưa ra câu trả lời đầy đủ cho mỗi câu hỏi.', 20, '[]'),
(18, 'LEXICAL_RESOURCE', 1.0, 'Không có từ vựng nào được sử dụng bởi thí sinh.', 'Không có.', 'Không sử dụng từ vựng.', 'Sử dụng vốn từ vựng phong phú hơn khi trả lời.', 20, '[]'),
(19, 'GRAMMAR_ACCURACY', 1.0, 'Không có cấu trúc ngữ pháp nào được thể hiện.', 'Không có.', 'Không có dữ liệu ngữ pháp.', 'Thực hành đặt câu hoàn chỉnh.', 20, '[]'),
(20, 'PRONUNCIATION', 1.0, 'Không ghi nhận được phát âm của thí sinh.', 'Không có.', 'Không có âm thanh tiếng nói.', 'Cần nói rõ ràng và thu âm lại bài tập.', 20, '[]');

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
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transcript` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_speaking_answers`
--

INSERT INTO `user_speaking_answers` (`Id`, `attempt_id`, `question_id`, `audio_url`, `submitted_at`, `transcript`) VALUES
(1, 1, 1, '1/1/1-3f02384097bb43328dd24c085104ef72.wav', '2026-10-31 08:28:24', 'I don\'t know'),
(2, 1, 2, '1/1/2-f62d887a0fc14179a16ce6b67a636b8e.wav', '2026-10-31 08:28:51', 'I don\'t know dwwww'),
(3, 1, 3, '1/1/3-9eeac58b07314970a89ddf5e4c528ffd.wav', '2026-10-31 08:29:21', 'McDonald\'s don\'t know I don\'t know like talk about your own child with your hometown'),
(4, 1, 4, '1/1/4-3e35a66c1bc743ccb1610a48834cdcc6.wav', '2026-10-31 08:29:31', 'I don\'t know'),
(5, 1, 5, '1/1/5-28cceab151da4768a17c4f59651c0c99.wav', '2026-10-31 08:29:42', 'I don\'t know'),
(6, 2, 6, '1/2/6-3f10cea7ba28451bb31809669e257bd1.wav', '2026-10-31 09:03:46', 'I don\'t know what the fuck is that it\'s really a family member you are close to this Society and flying what you feel Advanced me'),
(7, 3, 6, '1/3/6-acf746781b194eda893c1180a1f416f3.wav', '2026-10-31 09:41:55', 'Describe a family member you are closest to.\r\n\r\nYou should say:\r\n\r\nwho this person is\r\nwhat they are like\r\nwhat you usually do together\r\nhow long you have been close\r\nand explain why you feel especially close to this person.Describe a family member you are closest to.\r\n\r\nYou should say:\r\n\r\nwho this person is\r\nwhat they are like\r\nwhat you usually do together\r\nhow long you have been close\r\nand explain why you feel especially close to this person.Describe a family member you are closest to.\r\n\r\nYou should say:\r\n\r\nwho this person is\r\nwhat they are like\r\nwhat you usually do together\r\nhow long you have been close\r\nand explain why you feel especially close to this person.\r\nDescribe a family member you are closest to.\r\n\r\nYou should say:\r\n\r\nwho this person is\r\nwhat they are like\r\nwhat you usually do together\r\nhow long you have been close\r\nand explain why you feel especially close to this person.'),
(8, 7, 1, '1/7/1-d70e22485da24ae98a1ce7de51cf0b56.wav', '2026-10-31 09:50:01', 'I don\'t know come on'),
(9, 15, 6, '1/15/6-d843f8402c354b01af1ba30170ca85cf.wav', '2026-10-31 10:05:15', 'just sleep on family member you are close to you suicide put this person was saying what\'s inside it together how long you have been blow and explain why you feel especially alone'),
(10, 16, 1, '1/16/1-2fcda34e54cd44be960da2fcfbaef11a.wav', '2026-10-31 10:08:08', 'let\'s talk me on that where are you Hunter'),
(11, 17, 1, '1/17/1-76a93789b0ec45f4bf7b602b98fbc987.wav', '2026-10-31 10:11:49', 'let\'s talk about your hometown where your hometown'),
(12, 17, 2, '1/17/2-cd87c6332fa047ad8e8d3f326de68040.wav', '2026-10-31 10:11:59', 'what do you like most about your hometown'),
(13, 17, 3, '1/17/3-ab6b87d9629443a792c5af7a60ba19b8.wav', '2026-10-31 10:12:10', 'as long as I changed but in recent years'),
(14, 17, 4, '1/17/4-d297e64fda0d4010b5791aa6ebf9741e.wav', '2026-10-31 10:12:21', 'a good plane for young people to lie'),
(15, 17, 5, '1/17/5-2d4a8efe017440768d359207009ed305.wav', '2026-10-31 10:12:34', 'can you live in your hometown in the future'),
(16, 19, 7, '1/19/7-63bc45f0f4784700a5d7378086d46119.wav', '2026-10-31 10:15:08', 'How has technology changed people\'s daily lives?'),
(17, 19, 8, '1/19/8-036189af71104b91b9fbc26c130a8f69.wav', '2026-10-31 10:15:13', 'How has technology changed people\'s daily lives?'),
(18, 19, 9, '1/19/9-26afabb12be148efb7cbc7f2733ae931.wav', '2026-10-31 10:15:19', 'How has technology changed people\'s daily lives?'),
(19, 20, 7, '1/20/7-be5b31c21b984369b1ee4d7e8c0b43e4.wav', '2026-10-31 10:15:34', 'How has technology changed people\'s daily lives?\r\nHow has technology changed people\'s daily lives?'),
(20, 20, 8, '1/20/8-4c490bd7e5e6464fb2596f132a6fb452.wav', '2026-10-31 10:15:40', 'How has technology changed people\'s daily lives?'),
(21, 20, 9, '1/20/9-0d5e762108c246f2be95ac1d739f0afe.wav', '2026-10-31 10:15:50', 'How has technology changed people\'s daily lives?\r\nHow has technology changed people\'s daily lives?');

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
  `completed_at` timestamp NULL DEFAULT NULL,
  `grading_result` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_speaking_attempts`
--

INSERT INTO `user_speaking_attempts` (`Id`, `user_id`, `exercise_id`, `Status`, `overall_score`, `started_at`, `completed_at`, `grading_result`) VALUES
(1, 1, 1, 'ABANDONED', NULL, '2026-10-31 16:49:11', '2026-10-31 09:49:11', NULL),
(2, 1, 4, 'GRADED', 1.0, '2026-10-31 16:34:11', '2026-10-31 09:03:47', '{\"OverallScore\":1,\"OverallFeedback\":\"Th\\u00ED sinh kh\\u00F4ng ho\\u00E0n th\\u00E0nh b\\u00E0i thi m\\u1ED9t c\\u00E1ch nghi\\u00EAm t\\u00FAc, s\\u1EED d\\u1EE5ng t\\u1EEB ng\\u1EEF kh\\u00F4ng ph\\u00F9 h\\u1EE3p v\\u00E0 c\\u00F3 nhi\\u1EC1u ti\\u1EBFng \\u1ED3n/ti\\u1EBFng Vi\\u1EC7t trong \\u0111o\\u1EA1n ghi \\u00E2m, d\\u1EABn \\u0111\\u1EBFn vi\\u1EC7c kh\\u00F4ng th\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 ch\\u00EDnh x\\u00E1c c\\u00E1c ti\\u00EAu ch\\u00ED.\",\"Criteria\":[{\"CriterionCode\":\"FLUENCY_COHERENCE\",\"Score\":1,\"Feedback\":\"B\\u00E0i n\\u00F3i b\\u1ECB ng\\u1EAFt qu\\u00E3ng ho\\u00E0n to\\u00E0n, kh\\u00F4ng c\\u00F3 s\\u1EF1 li\\u00EAn k\\u1EBFt v\\u00E0 th\\u00ED sinh s\\u1EED d\\u1EE5ng ng\\u00F4n t\\u1EEB kh\\u00F4ng ph\\u00F9 h\\u1EE3p thay v\\u00EC tr\\u1EA3 l\\u1EDDi c\\u00E2u h\\u1ECFi.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3 \\u0111i\\u1EC3m m\\u1EA1nh.\",\"Weaknesses\":\"M\\u1EA5t ki\\u1EC3m so\\u00E1t ho\\u00E0n to\\u00E0n th\\u1EDDi gian v\\u00E0 n\\u1ED9i dung b\\u00E0i n\\u00F3i, n\\u00F3i t\\u1EE5c v\\u00E0 chuy\\u1EC3n sang ti\\u1EBFng m\\u1EB9 \\u0111\\u1EBB.\",\"Suggestions\":\"C\\u1EA7n t\\u1EADp trung v\\u00E0o c\\u00E2u h\\u1ECFi v\\u00E0 c\\u1ED1 g\\u1EAFng duy tr\\u00EC b\\u00E0i n\\u00F3i b\\u1EB1ng ti\\u1EBFng Anh m\\u1ED9t c\\u00E1ch l\\u1ECBch s\\u1EF1.\"},{\"CriterionCode\":\"LEXICAL_RESOURCE\",\"Score\":1,\"Feedback\":\"V\\u1ED1n t\\u1EEB v\\u1EF1ng kh\\u00F4ng th\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 do th\\u00ED sinh kh\\u00F4ng tr\\u1EA3 l\\u1EDDi \\u0111\\u00FAng tr\\u1ECDng t\\u00E2m v\\u00E0 d\\u00F9ng t\\u1EEB ng\\u1EEF th\\u00F4 t\\u1EE5c.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"H\\u1EA1n ch\\u1EBF nghi\\u00EAm tr\\u1ECDng v\\u1EC1 t\\u1EEB v\\u1EF1ng h\\u1ECDc thu\\u1EADt ho\\u1EB7c th\\u00F4ng d\\u1EE5ng cho ch\\u1EE7 \\u0111\\u1EC1 gia \\u0111\\u00ECnh.\",\"Suggestions\":\"H\\u1ECDc c\\u00E1c t\\u1EEB v\\u1EF1ng c\\u01A1 b\\u1EA3n v\\u1EC1 m\\u00F4 t\\u1EA3 ng\\u01B0\\u1EDDi v\\u00E0 c\\u00E1c m\\u1ED1i quan h\\u1EC7 trong gia \\u0111\\u00ECnh.\"},{\"CriterionCode\":\"GRAMMAR_ACCURACY\",\"Score\":1,\"Feedback\":\"Kh\\u00F4ng \\u0111\\u1EE7 d\\u1EEF li\\u1EC7u c\\u00E2u ho\\u00E0n ch\\u1EC9nh \\u0111\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 ng\\u1EEF ph\\u00E1p.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng th\\u1EC3 hi\\u1EC7n \\u0111\\u01B0\\u1EE3c c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p n\\u00E0o do n\\u00F3i lan man.\",\"Suggestions\":\"Luy\\u1EC7n t\\u1EADp c\\u00E1c c\\u00E2u \\u0111\\u01A1n v\\u00E0 c\\u00E2u ph\\u1EE9c c\\u01A1 b\\u1EA3n khi mi\\u00EAu t\\u1EA3 ng\\u01B0\\u1EDDi.\"},{\"CriterionCode\":\"PRONUNCIATION\",\"Score\":1,\"Feedback\":\"Ph\\u00E1t \\u00E2m kh\\u00F4ng r\\u00F5 r\\u00E0ng, b\\u1ECB l\\u1EABn ti\\u1EBFng \\u1ED3n v\\u00E0 ti\\u1EBFng Vi\\u1EC7t, ng\\u1EEF \\u0111i\\u1EC7u kh\\u00F4ng ph\\u00F9 h\\u1EE3p.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Ph\\u00E1t \\u00E2m k\\u00E9m, n\\u00F3i nh\\u1ECF v\\u00E0 kh\\u00F4ng r\\u00F5 ti\\u1EBFng Anh.\",\"Suggestions\":\"C\\u1EA7n luy\\u1EC7n t\\u1EADp ph\\u00E1t \\u00E2m t\\u1EEBng t\\u1EEB v\\u00E0 ng\\u1EEF \\u0111i\\u1EC7u c\\u00E2u h\\u1ECFi c\\u01A1 b\\u1EA3n.\"}],\"AnswerFeedback\":[{\"QuestionId\":6,\"Feedback\":\"Th\\u00ED sinh \\u0111\\u00E3 kh\\u00F4ng tr\\u1EA3 l\\u1EDDi c\\u00E2u h\\u1ECFi m\\u00E0 thay v\\u00E0o \\u0111\\u00F3 s\\u1EED d\\u1EE5ng t\\u1EEB ng\\u1EEF kh\\u00F4ng ph\\u00F9 h\\u1EE3p v\\u00E0 n\\u00F3i ti\\u1EBFng Vi\\u1EC7t. C\\u1EA7n nghi\\u00EAm t\\u00FAc th\\u1EF1c hi\\u1EC7n b\\u00E0i thi.\"}]}'),
(3, 1, 4, 'GRADED', 0.0, '2026-10-31 16:42:05', '2026-10-31 09:42:01', '{\"OverallScore\":0.0,\"OverallFeedback\":\"Th\\u00ED sinh ch\\u01B0a \\u0111\\u01B0a ra c\\u00E2u tr\\u1EA3 l\\u1EDDi cho c\\u00E2u h\\u1ECFi m\\u00E0 ch\\u1EC9 c\\u00F3 \\u00E2m thanh kh\\u00F4ng r\\u00F5 r\\u00E0ng. Vui l\\u00F2ng th\\u1EED l\\u1EA1i v\\u00E0 cung c\\u1EA5p b\\u00E0i n\\u00F3i ho\\u00E0n ch\\u1EC9nh.\",\"Criteria\":[{\"CriterionCode\":\"FLUENCY_COHERENCE\",\"Score\":0.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 n\\u1ED9i dung b\\u00E0i n\\u00F3i \\u0111\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 \\u0111\\u1ED9 tr\\u00F4i ch\\u1EA3y v\\u00E0 m\\u1EA1ch l\\u1EA1c.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 c\\u00E2u tr\\u1EA3 l\\u1EDDi.\",\"Suggestions\":\"H\\u00E3y n\\u00F3i m\\u1ED9t c\\u00E1ch t\\u1EF1 nhi\\u00EAn v\\u00E0 tr\\u1EA3 l\\u1EDDi \\u0111\\u1EA7y \\u0111\\u1EE7 c\\u00E1c g\\u1EE3i \\u00FD trong \\u0111\\u1EC1 b\\u00E0i.\",\"Issues\":[]},{\"CriterionCode\":\"LEXICAL_RESOURCE\",\"Score\":0.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 t\\u1EEB v\\u1EF1ng n\\u00E0o \\u0111\\u01B0\\u1EE3c s\\u1EED d\\u1EE5ng trong b\\u00E0i.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 t\\u1EEB v\\u1EF1ng.\",\"Suggestions\":\"S\\u1EED d\\u1EE5ng c\\u00E1c t\\u1EEB v\\u1EF1ng phong ph\\u00FA h\\u01A1n khi mi\\u00EAu t\\u1EA3 ng\\u01B0\\u1EDDi th\\u00E2n.\",\"Issues\":[]},{\"CriterionCode\":\"GRAMMAR_ACCURACY\",\"Score\":0.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p n\\u00E0o \\u0111\\u01B0\\u1EE3c th\\u1EC3 hi\\u1EC7n.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 c\\u00E2u.\",\"Suggestions\":\"S\\u1EED d\\u1EE5ng \\u0111a d\\u1EA1ng c\\u00E1c th\\u00EC qu\\u00E1 kh\\u1EE9 v\\u00E0 hi\\u1EC7n t\\u1EA1i khi k\\u1EC3 v\\u1EC1 m\\u1ED1i quan h\\u1EC7 gia \\u0111\\u00ECnh.\",\"Issues\":[]},{\"CriterionCode\":\"PRONUNCIATION\",\"Score\":0.0,\"Feedback\":\"Kh\\u00F4ng ghi nh\\u1EADn \\u0111\\u01B0\\u1EE3c ph\\u00E1t \\u00E2m t\\u1EEB ph\\u00EDa th\\u00ED sinh ngo\\u00E0i c\\u00E1c \\u00E2m thanh nhi\\u1EC5u.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 l\\u1EDDi n\\u00F3i.\",\"Suggestions\":\"C\\u1EA7n \\u0111\\u1EA3m b\\u1EA3o thi\\u1EBFt b\\u1ECB thu \\u00E2m ho\\u1EA1t \\u0111\\u1ED9ng t\\u1ED1t v\\u00E0 n\\u00F3i r\\u00F5 r\\u00E0ng h\\u01A1n.\",\"Issues\":[]}],\"AnswerFeedback\":[{\"QuestionId\":6,\"Feedback\":\"B\\u1EA1n ch\\u01B0a tr\\u1EA3 l\\u1EDDi c\\u00E2u h\\u1ECFi n\\u00E0y. H\\u00E3y th\\u1EED thu \\u00E2m l\\u1EA1i v\\u00E0 n\\u00F3i v\\u1EC1 m\\u1ED9t th\\u00E0nh vi\\u00EAn trong gia \\u0111\\u00ECnh m\\u00E0 b\\u1EA1n th\\u00E2n thi\\u1EBFt nh\\u00E9.\"}]}'),
(4, 1, 4, 'ABANDONED', NULL, '2026-10-31 16:49:34', '2026-10-31 09:49:34', NULL),
(5, 1, 1, 'ABANDONED', NULL, '2026-10-31 16:49:38', '2026-10-31 09:49:38', NULL),
(6, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:02', '2026-10-31 10:04:02', NULL),
(7, 1, 1, 'ABANDONED', NULL, '2026-10-31 16:51:56', '2026-10-31 09:51:56', NULL),
(8, 1, 1, 'ABANDONED', NULL, '2026-10-31 17:04:25', '2026-10-31 10:04:25', NULL),
(9, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:05', '2026-10-31 10:04:05', NULL),
(10, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:12', '2026-10-31 10:04:12', NULL),
(11, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:14', '2026-10-31 10:04:14', NULL),
(12, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:22', '2026-10-31 10:04:22', NULL),
(13, 1, 4, 'ABANDONED', NULL, '2026-10-31 17:04:44', '2026-10-31 10:04:44', NULL),
(14, 1, 1, 'ABANDONED', NULL, '2026-10-31 17:07:53', '2026-10-31 10:07:53', NULL),
(15, 1, 4, 'GRADED', 2.0, '2026-10-31 17:05:58', '2026-10-31 10:05:22', '{\"OverallScore\":2.0,\"OverallFeedback\":\"B\\u00E0i n\\u00F3i c\\u1EE7a b\\u1EA1n r\\u1EA5t ng\\u1EAFn v\\u00E0 c\\u00F3 nhi\\u1EC1u l\\u1ED7i ph\\u00E1t \\u00E2m nghi\\u00EAm tr\\u1ECDng khi\\u1EBFn ng\\u01B0\\u1EDDi nghe kh\\u00F4ng th\\u1EC3 hi\\u1EC3u \\u0111\\u01B0\\u1EE3c. B\\u1EA1n c\\u1EA7n c\\u1EA3i thi\\u1EC7n \\u0111\\u00E1ng k\\u1EC3 v\\u1EC1 \\u0111\\u1ED9 l\\u01B0u lo\\u00E1t, t\\u1EEB v\\u1EF1ng v\\u00E0 ng\\u1EEF ph\\u00E1p.\",\"Criteria\":[{\"CriterionCode\":\"FLUENCY_COHERENCE\",\"Score\":2.0,\"Feedback\":\"T\\u1ED1c \\u0111\\u1ED9 n\\u00F3i r\\u1EA5t ch\\u1EADm, ng\\u1EADp ng\\u1EEBng nhi\\u1EC1u v\\u00E0 kh\\u00F4ng th\\u1EC3 ph\\u00E1t tri\\u1EC3n c\\u00E2u tr\\u1EA3 l\\u1EDDi cho ch\\u1EE7 \\u0111\\u1EC1 \\u0111\\u01B0\\u1EE3c giao.\",\"Strengths\":\"C\\u1ED1 g\\u1EAFng n\\u00F3i theo ch\\u1EE7 \\u0111\\u1EC1 \\u0111\\u01B0\\u1EE3c h\\u1ECFi.\",\"Weaknesses\":\"Ng\\u1EADp ng\\u1EEBng li\\u00EAn t\\u1EE5c, th\\u1EDDi gian ch\\u1EBFt nhi\\u1EC1u, kh\\u00F4ng ho\\u00E0n th\\u00E0nh \\u0111\\u01B0\\u1EE3c b\\u00E0i n\\u00F3i.\",\"Suggestions\":\"H\\u00E3y luy\\u1EC7n t\\u1EADp tr\\u1EA3 l\\u1EDDi c\\u00E1c c\\u00E2u h\\u1ECFi d\\u00E0i h\\u01A1n b\\u1EB1ng c\\u00E1ch tri\\u1EC3n khai c\\u00E1c \\u00FD nh\\u1ECF li\\u00EAn quan \\u0111\\u1EBFn ch\\u1EE7 \\u0111\\u1EC1.\",\"Issues\":[{\"OriginalText\":\"just sleep on family member you are close to you suicide put this person was saying what\\u0027s inside it together how long you have been blow and explain why you feel especially alone\",\"Correction\":\"Describe a family member you are close to.\",\"Explanation\":\"Ph\\u1EA7n n\\u00F3i b\\u1ECB ng\\u1EAFt qu\\u00E3ng v\\u00E0 kh\\u00F4ng th\\u1EC3 hi\\u1EC7n \\u0111\\u01B0\\u1EE3c n\\u1ED9i dung m\\u1EA1ch l\\u1EA1c.\",\"Category\":\"Fluency\"}]},{\"CriterionCode\":\"LEXICAL_RESOURCE\",\"Score\":2.0,\"Feedback\":\"V\\u1ED1n t\\u1EEB v\\u1EF1ng r\\u1EA5t h\\u1EA1n ch\\u1EBF v\\u00E0 b\\u1ECB sai ngh\\u0129a do ph\\u00E1t \\u00E2m ho\\u1EB7c d\\u00F9ng t\\u1EEB kh\\u00F4ng ch\\u00EDnh x\\u00E1c.\",\"Strengths\":\"S\\u1EED d\\u1EE5ng \\u0111\\u01B0\\u1EE3c m\\u1ED9t s\\u1ED1 t\\u1EEB c\\u01A1 b\\u1EA3n nh\\u01B0 \\u0027family member\\u0027.\",\"Weaknesses\":\"D\\u00F9ng t\\u1EEB sai ho\\u00E0n to\\u00E0n so v\\u1EDBi y\\u00EAu c\\u1EA7u \\u0111\\u1EC1 b\\u00E0i.\",\"Suggestions\":\"H\\u1ECDc th\\u00EAm t\\u1EEB v\\u1EF1ng ch\\u1EE7 \\u0111\\u1EC1 mi\\u00EAu t\\u1EA3 ng\\u01B0\\u1EDDi v\\u00E0 luy\\u1EC7n ph\\u00E1t \\u00E2m chu\\u1EA9n x\\u00E1c t\\u1EEBng t\\u1EEB.\",\"Issues\":[{\"OriginalText\":\"suicide put this person\",\"Correction\":\"describe this person\",\"Explanation\":\"D\\u00F9ng sai t\\u1EEB v\\u1EF1ng ho\\u00E0n to\\u00E0n.\",\"Category\":\"Vocabulary\"}]},{\"CriterionCode\":\"GRAMMAR_ACCURACY\",\"Score\":2.5,\"Feedback\":\"C\\u1EA5u tr\\u00FAc c\\u00E2u b\\u1ECB ph\\u00E1 v\\u1EE1, kh\\u00F4ng th\\u1EC3 hi\\u1EC7n \\u0111\\u01B0\\u1EE3c c\\u00E1c th\\u00EC ph\\u1EE9c t\\u1EA1p ho\\u1EB7c c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p ch\\u00EDnh x\\u00E1c.\",\"Strengths\":\"C\\u00F3 \\u00FD \\u0111\\u1ECBnh s\\u1EED d\\u1EE5ng th\\u00EC hi\\u1EC7n t\\u1EA1i ho\\u00E0n th\\u00E0nh.\",\"Weaknesses\":\"L\\u1ED7i ng\\u1EEF ph\\u00E1p n\\u1EB7ng n\\u1EC1 trong vi\\u1EC7c c\\u1EA5u th\\u00E0nh c\\u00E2u.\",\"Suggestions\":\"\\u00D4n t\\u1EADp l\\u1EA1i c\\u00E1c c\\u1EA5u tr\\u00FAc c\\u00E2u \\u0111\\u01A1n v\\u00E0 c\\u00E2u gh\\u00E9p c\\u01A1 b\\u1EA3n.\",\"Issues\":[{\"OriginalText\":\"how long you have been blow\",\"Correction\":\"how long you have been close\",\"Explanation\":\"Sai c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p v\\u00E0 t\\u1EEB v\\u1EF1ng.\",\"Category\":\"Grammar\"}]},{\"CriterionCode\":\"PRONUNCIATION\",\"Score\":2.0,\"Feedback\":\"Ph\\u00E1t \\u00E2m r\\u1EA5t k\\u00E9m, nhi\\u1EC1u t\\u1EEB kh\\u00F4ng r\\u00F5 \\u00E2m ho\\u1EB7c ph\\u00E1t \\u00E2m sai ho\\u00E0n to\\u00E0n khi\\u1EBFn ng\\u01B0\\u1EDDi nghe kh\\u00F4ng hi\\u1EC3u.\",\"Strengths\":\"C\\u1ED1 g\\u1EAFng ph\\u00E1t \\u00E2m c\\u00E1c t\\u1EEB ti\\u1EBFng Anh.\",\"Weaknesses\":\"Nu\\u1ED1t \\u00E2m, ph\\u00E1t \\u00E2m sai tr\\u1ECDng \\u00E2m v\\u00E0 ng\\u1EEF \\u0111i\\u1EC7u \\u0111\\u01A1n \\u0111i\\u1EC7u.\",\"Suggestions\":\"Luy\\u1EC7n t\\u1EADp t\\u1EEBng \\u00E2m ti\\u1EBFt (phonemes) v\\u00E0 c\\u00E1c t\\u1EEB \\u0111\\u01A1n l\\u1EBB tr\\u01B0\\u1EDBc khi n\\u00F3i c\\u00E2u d\\u00E0i.\",\"Issues\":[{\"OriginalText\":\"sleep\",\"Correction\":\"describe\",\"Explanation\":\"Ph\\u00E1t \\u00E2m sai ho\\u00E0n to\\u00E0n t\\u1EEB \\u0027describe\\u0027.\",\"Category\":\"Pronunciation\"}]}],\"AnswerFeedback\":[{\"QuestionId\":6,\"Feedback\":\"B\\u1EA1n ch\\u01B0a ho\\u00E0n th\\u00E0nh c\\u00E2u tr\\u1EA3 l\\u1EDDi v\\u00E0 ph\\u00E1t \\u00E2m sai r\\u1EA5t nhi\\u1EC1u, khi\\u1EBFn n\\u1ED9i dung kh\\u00F4ng th\\u1EC3 hi\\u1EC3u \\u0111\\u01B0\\u1EE3c. H\\u00E3y luy\\u1EC7n t\\u1EADp l\\u1EA1i t\\u1EEB nh\\u1EEFng c\\u00E2u \\u0111\\u01A1n gi\\u1EA3n nh\\u1EA5t.\"}]}'),
(16, 1, 1, 'ABANDONED', NULL, '2026-10-31 17:11:35', '2026-10-31 10:11:35', NULL),
(17, 1, 1, 'ABANDONED', NULL, '2026-10-31 17:12:41', '2026-10-31 10:12:41', NULL),
(18, 1, 1, 'IN_PROGRESS', NULL, '2026-10-31 10:12:41', NULL, NULL),
(19, 1, 6, 'ABANDONED', NULL, '2026-10-31 17:15:23', '2026-10-31 10:15:23', NULL),
(20, 1, 6, 'GRADED', 1.0, '2026-10-31 17:16:28', '2026-10-31 10:15:57', '{\"OverallScore\":1.0,\"OverallFeedback\":\"Th\\u00ED sinh ch\\u01B0a tr\\u1EA3 l\\u1EDDi c\\u00E1c c\\u00E2u h\\u1ECFi trong b\\u00E0i thi, ph\\u1EA7n ghi \\u00E2m ch\\u1EC9 ch\\u1EE9a ti\\u1EBFng v\\u1ECDng c\\u1EE7a c\\u00E2u h\\u1ECFi t\\u1EEB \\u0111\\u1EC1 b\\u00E0i ho\\u1EB7c kh\\u00F4ng c\\u00F3 n\\u1ED9i dung n\\u00F3i th\\u1EF1c t\\u1EBF. Do \\u0111\\u00F3, kh\\u00F4ng th\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 ch\\u00EDnh x\\u00E1c c\\u00E1c ti\\u00EAu ch\\u00ED ng\\u00F4n ng\\u1EEF.\",\"Criteria\":[{\"CriterionCode\":\"FLUENCY_COHERENCE\",\"Score\":1.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 n\\u1ED9i dung n\\u00F3i \\u0111\\u1EC3 \\u0111\\u00E1nh gi\\u00E1 \\u0111\\u1ED9 tr\\u00F4i ch\\u1EA3y v\\u00E0 m\\u1EA1ch l\\u1EA1c.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng th\\u1EC3 n\\u00F3i ho\\u1EB7c kh\\u00F4ng ph\\u1EA3n h\\u1ED3i c\\u00E2u h\\u1ECFi.\",\"Suggestions\":\"C\\u1EA7n \\u0111\\u01B0a ra c\\u00E2u tr\\u1EA3 l\\u1EDDi \\u0111\\u1EA7y \\u0111\\u1EE7 cho m\\u1ED7i c\\u00E2u h\\u1ECFi.\",\"Issues\":[]},{\"CriterionCode\":\"LEXICAL_RESOURCE\",\"Score\":1.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 t\\u1EEB v\\u1EF1ng n\\u00E0o \\u0111\\u01B0\\u1EE3c s\\u1EED d\\u1EE5ng b\\u1EDFi th\\u00ED sinh.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng s\\u1EED d\\u1EE5ng t\\u1EEB v\\u1EF1ng.\",\"Suggestions\":\"S\\u1EED d\\u1EE5ng v\\u1ED1n t\\u1EEB v\\u1EF1ng phong ph\\u00FA h\\u01A1n khi tr\\u1EA3 l\\u1EDDi.\",\"Issues\":[]},{\"CriterionCode\":\"GRAMMAR_ACCURACY\",\"Score\":1.0,\"Feedback\":\"Kh\\u00F4ng c\\u00F3 c\\u1EA5u tr\\u00FAc ng\\u1EEF ph\\u00E1p n\\u00E0o \\u0111\\u01B0\\u1EE3c th\\u1EC3 hi\\u1EC7n.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 d\\u1EEF li\\u1EC7u ng\\u1EEF ph\\u00E1p.\",\"Suggestions\":\"Th\\u1EF1c h\\u00E0nh \\u0111\\u1EB7t c\\u00E2u ho\\u00E0n ch\\u1EC9nh.\",\"Issues\":[]},{\"CriterionCode\":\"PRONUNCIATION\",\"Score\":1.0,\"Feedback\":\"Kh\\u00F4ng ghi nh\\u1EADn \\u0111\\u01B0\\u1EE3c ph\\u00E1t \\u00E2m c\\u1EE7a th\\u00ED sinh.\",\"Strengths\":\"Kh\\u00F4ng c\\u00F3.\",\"Weaknesses\":\"Kh\\u00F4ng c\\u00F3 \\u00E2m thanh ti\\u1EBFng n\\u00F3i.\",\"Suggestions\":\"C\\u1EA7n n\\u00F3i r\\u00F5 r\\u00E0ng v\\u00E0 thu \\u00E2m l\\u1EA1i b\\u00E0i t\\u1EADp.\",\"Issues\":[]}],\"AnswerFeedback\":[{\"QuestionId\":7,\"Feedback\":\"B\\u1EA1n ch\\u01B0a \\u0111\\u01B0a ra c\\u00E2u tr\\u1EA3 l\\u1EDDi cho c\\u00E2u h\\u1ECFi n\\u00E0y. H\\u00E3y c\\u1ED1 g\\u1EAFng n\\u00F3i m\\u1ED9t v\\u00E0i c\\u00E2u v\\u1EC1 c\\u00E1ch c\\u00F4ng ngh\\u1EC7 thay \\u0111\\u1ED5i cu\\u1ED9c s\\u1ED1ng.\"},{\"QuestionId\":8,\"Feedback\":\"B\\u1EA1n ch\\u01B0a tr\\u1EA3 l\\u1EDDi c\\u00E2u h\\u1ECFi. H\\u00E3y b\\u00E0y t\\u1ECF quan \\u0111i\\u1EC3m c\\u1EE7a m\\u00ECnh v\\u1EC1 vi\\u1EC7c con ng\\u01B0\\u1EDDi c\\u00F3 qu\\u00E1 ph\\u1EE5 thu\\u1ED9c v\\u00E0o c\\u00F4ng ngh\\u1EC7 hay kh\\u00F4ng.\"},{\"QuestionId\":9,\"Feedback\":\"B\\u1EA1n ch\\u01B0a tr\\u1EA3 l\\u1EDDi c\\u00E2u h\\u1ECFi. H\\u00E3y n\\u00EAu \\u00EDt nh\\u1EA5t m\\u1ED9t \\u01B0u \\u0111i\\u1EC3m v\\u00E0 m\\u1ED9t nh\\u01B0\\u1EE3c \\u0111i\\u1EC3m c\\u1EE7a \\u0111i\\u1EC7n tho\\u1EA1i th\\u00F4ng minh.\"}]}');

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

--
-- Dumping data for table `user_writing_attempts`
--

INSERT INTO `user_writing_attempts` (`Id`, `user_id`, `exercise_id`, `user_response`, `overall_score`, `llm_raw_response`, `started_at`, `completed_at`) VALUES
(1, 1, 2, 'The given pie charts compare the proportion of people who did voluntary work in different organizations in 2008 and 2014.\n\nOverall, while the percentage of people volunteering for the environment, healthcare services and sports activities followed an upward trend, the reverse pattern was seen in the figure for the remaining groups. Besides, healthcare organizations were staffed with the least volunteers in both years. \n\nIn the year 2008, volunteers working in educational organizations accounted for the largest proportion, at 24%, in comparison with 21% and 18% of people volunteering in environmental and art projects respectively. Meanwhile, 15% of volunteers worked in sports organizations, which was the same as the figure for others. Voluntary work related to healthcare, however, was the least common choice among people, with a mere 7% participants.\n\nAfter 6 years, the percentage of volunteers in educational organizations decreased to 17%. Likewise, the figure for people working in art and other volunteering activities witnessed a fall of 6%. In contrast, there were much more volunteers working in environmental and sports organizations compared to other groups, with 29% and 25% respectively. Activities in the healthcare sector, despite a slight rise of 1% in its figure, remained the least preferred option among volunteers.', 7.5, '{\n  \"overallScore\": 7.5,\n  \"overallFeedback\": \"This is a well-structured and accurate response that covers all key features of the charts with good data comparisons and clear progression.\",\n  \"criteria\": [\n    {\n      \"criterionCode\": \"TASK_RESPONSE\",\n      \"score\": 7.5,\n      \"feedback\": \"The report effectively presents an accurate overview and covers all key trends across both years.\",\n      \"strengths\": \"Key trends are clearly identified in the overview and supported with accurate data in the body paragraphs.\",\n      \"weaknesses\": \"Some comparative observations between the two years could be synthesized more directly to highlight relative changes.\",\n      \"suggestions\": \"Emphasize major shifts, such as environmental volunteering overtaking educational volunteering to become the largest sector.\",\n      \"issues\": []\n    },\n    {\n      \"criterionCode\": \"COHERENCE_COHESION\",\n      \"score\": 7.5,\n      \"feedback\": \"Paragraphing is logical and transitions between ideas are generally smooth and natural.\",\n      \"strengths\": \"Information is divided cleanly between the two years, making the progression easy to follow.\",\n      \"weaknesses\": \"Linkers like \'Besides\' are slightly informal for an academic Task 1 overview.\",\n      \"suggestions\": \"Use more formal transitions such as \'In addition\' or \'Furthermore\' instead of \'Besides\'.\",\n      \"issues\": [\n        {\n          \"originalText\": \"Besides, healthcare organizations\",\n          \"correction\": \"In addition, healthcare organizations\",\n          \"explanation\": \"\'Besides\' sounds informal and conversational for an academic report.\",\n          \"category\": \"Cohesion\"\n        }\n      ]\n    },\n    {\n      \"criterionCode\": \"LEXICAL_RESOURCE\",\n      \"score\": 7.5,\n      \"feedback\": \"The response features varied vocabulary and appropriate paraphrasing with only minor unnatural collocations.\",\n      \"strengths\": \"Good range of sector-related vocabulary such as \'projects\', \'activities\', and \'upward trend\'.\",\n      \"weaknesses\": \"A few word choices like \'staffed with\' or \'7% participants\' are slightly unnatural in this context.\",\n      \"suggestions\": \"Use standard prepositions and phrases like \'attracted the lowest percentage of volunteers\'.\",\n      \"issues\": [\n        {\n          \"originalText\": \"staffed with the least volunteers\",\n          \"correction\": \"attracted the smallest proportion of volunteers\",\n          \"explanation\": \"Volunteers are typically not referred to as \'staff\' because voluntary work is unpaid.\",\n          \"category\": \"Collocation\"\n        },\n        {\n          \"originalText\": \"with a mere 7% participants\",\n          \"correction\": \"with a mere 7% of participants\",\n          \"explanation\": \"A preposition (\'of\') is needed before the noun phrase following a percentage.\",\n          \"category\": \"Word Choice\"\n        }\n      ]\n    },\n    {\n      \"criterionCode\": \"GRAMMAR\",\n      \"score\": 7.0,\n      \"feedback\": \"The writing demonstrates good sentence variety and control, with only a minor quantifier error.\",\n      \"strengths\": \"Complex structures and passive forms are used accurately throughout the response.\",\n      \"weaknesses\": \"An incorrect quantifier was used with a countable noun.\",\n      \"suggestions\": \"Ensure that quantifiers agree in countability with the nouns they modify (e.g., \'many more\' instead of \'much more\' for countable nouns).\",\n      \"issues\": [\n        {\n          \"originalText\": \"there were much more volunteers\",\n          \"correction\": \"there were many more volunteers\",\n          \"explanation\": \"\'Volunteers\' is a countable plural noun, so \'many\' should be used rather than \'much\'.\",\n          \"category\": \"Grammar\"\n        }\n      ]\n    }\n  ],\n  \"improvedVersion\": \"The given pie charts compare the proportion of people who did voluntary work across different organizations in 2008 and 2014. Overall, while the percentages of volunteers in the environment, healthcare, and sports sectors followed an upward trend, the reverse pattern was observed in the remaining categories. In addition, healthcare organizations consistently attracted the smallest share of volunteers in both years. In 2008, educational organizations accounted for the largest proportion at 24%, followed by environmental and art projects at 21% and 18% respectively. Meanwhile, sports organizations engaged 15% of volunteers, identical to the figure for other activities. Healthcare was the least common sector, involving a mere 7% of participants. By 2014, the share of volunteers in educational organizations had fallen to 17%. Likewise, the figures for art and other activities each dropped by six percentage points. In contrast, environmental and sports organizations saw significant growth to 29% and 25% respectively, with the former becoming the largest sector overall. Healthcare, despite a slight increase of 1%, remained the least popular choice.\"\n}', '2026-10-31 00:49:32', '2026-10-31 00:49:32');

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

--
-- Dumping data for table `user_writing_criterion_scores`
--

INSERT INTO `user_writing_criterion_scores` (`Id`, `attempt_id`, `criterion_code`, `Score`, `Feedback`, `Strengths`, `Weaknesses`, `Suggestions`, `Issues`) VALUES
(1, 1, 'TASK_RESPONSE', 7.5, 'The report effectively presents an accurate overview and covers all key trends across both years.', 'Key trends are clearly identified in the overview and supported with accurate data in the body paragraphs.', 'Some comparative observations between the two years could be synthesized more directly to highlight relative changes.', 'Emphasize major shifts, such as environmental volunteering overtaking educational volunteering to become the largest sector.', '[]'),
(2, 1, 'COHERENCE_COHESION', 7.5, 'Paragraphing is logical and transitions between ideas are generally smooth and natural.', 'Information is divided cleanly between the two years, making the progression easy to follow.', 'Linkers like \'Besides\' are slightly informal for an academic Task 1 overview.', 'Use more formal transitions such as \'In addition\' or \'Furthermore\' instead of \'Besides\'.', '[{\"OriginalText\":\"Besides, healthcare organizations\",\"Correction\":\"In addition, healthcare organizations\",\"Explanation\":\"\\u0027Besides\\u0027 sounds informal and conversational for an academic report.\",\"Category\":\"Cohesion\"}]'),
(3, 1, 'LEXICAL_RESOURCE', 7.5, 'The response features varied vocabulary and appropriate paraphrasing with only minor unnatural collocations.', 'Good range of sector-related vocabulary such as \'projects\', \'activities\', and \'upward trend\'.', 'A few word choices like \'staffed with\' or \'7% participants\' are slightly unnatural in this context.', 'Use standard prepositions and phrases like \'attracted the lowest percentage of volunteers\'.', '[{\"OriginalText\":\"staffed with the least volunteers\",\"Correction\":\"attracted the smallest proportion of volunteers\",\"Explanation\":\"Volunteers are typically not referred to as \\u0027staff\\u0027 because voluntary work is unpaid.\",\"Category\":\"Collocation\"},{\"OriginalText\":\"with a mere 7% participants\",\"Correction\":\"with a mere 7% of participants\",\"Explanation\":\"A preposition (\\u0027of\\u0027) is needed before the noun phrase following a percentage.\",\"Category\":\"Word Choice\"}]'),
(4, 1, 'GRAMMAR', 7.0, 'The writing demonstrates good sentence variety and control, with only a minor quantifier error.', 'Complex structures and passive forms are used accurately throughout the response.', 'An incorrect quantifier was used with a countable noun.', 'Ensure that quantifiers agree in countability with the nouns they modify (e.g., \'many more\' instead of \'much more\' for countable nouns).', '[{\"OriginalText\":\"there were much more volunteers\",\"Correction\":\"there were many more volunteers\",\"Explanation\":\"\\u0027Volunteers\\u0027 is a countable plural noun, so \\u0027many\\u0027 should be used rather than \\u0027much\\u0027.\",\"Category\":\"Grammar\"}]');

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
('20261021095510_UpdateSpeakingWritingConfig', '9.0.0'),
('20261024030952_AddSpeakingQuestionsRelationship', '9.0.0'),
('20261024035621_AddSpeakingQuestionsRelationship2', '9.0.0'),
('20261025121926_AddSpeakingQuestionCuesAndClosing', '9.0.0'),
('20261031152213_AddSpeakingAssessmentFields', '9.0.0'),
('20261031162254_SpeakingResultsOnAttempts', '9.0.0');

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
  ADD UNIQUE KEY `IX_speaking_criterion_scores_attempt_id_criterion_code` (`attempt_id`,`criterion_code`);

--
-- Indexes for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_speaking_exercises_topic_id` (`topic_id`);

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `speaking_questions`
--
ALTER TABLE `speaking_questions`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_speaking_attempts`
--
ALTER TABLE `user_speaking_attempts`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_writing_criterion_scores`
--
ALTER TABLE `user_writing_criterion_scores`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  ADD CONSTRAINT `FK_speaking_criterion_scores_user_speaking_attempts_attempt_id` FOREIGN KEY (`attempt_id`) REFERENCES `user_speaking_attempts` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `speaking_exercises`
--
ALTER TABLE `speaking_exercises`
  ADD CONSTRAINT `FK_speaking_exercises_topics_topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`Id`);

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
