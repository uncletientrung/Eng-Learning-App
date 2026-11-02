-- Run once against an existing database before deploying Speaking assessment.
ALTER TABLE `user_speaking_answers`
  ADD COLUMN `transcript` text DEFAULT NULL;
