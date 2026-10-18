using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_speaking_answers")]
    public class UserSpeakingAnswer
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("attempt_id")]
        public int AttemptId { get; set; }

        [Column("question_id")]
        public int QuestionId { get; set; }

        [Required, StringLength(500)]
        [Column("audio_url")]
        public string AudioUrl { get; set; } = string.Empty;

        [Required, Column("submitted_at", TypeName = "timestamp")]
        public DateTime SubmittedAt { get; set; }

        [ForeignKey(nameof(AttemptId))]
        public UserSpeakingAttempt Attempt { get; set; } = null!;

        [ForeignKey(nameof(QuestionId))]
        public SpeakingQuestion Question { get; set; } = null!;
    }
}
