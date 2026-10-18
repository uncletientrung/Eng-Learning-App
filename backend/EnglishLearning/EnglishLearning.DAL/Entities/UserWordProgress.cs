using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user_word_progress")]
    public class UserWordProgress
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [Column("word_id")]
        public int WordId { get; set; }

        [Column(TypeName = "tinyint")]
        public byte Status { get; set; }

        [Required, Column("next_review_at", TypeName = "date")]
        public DateTime NextReviewAt { get; set; }

        [Required, Column("last_reviewed_at", TypeName = "date")]
        public DateTime LastReviewedAt { get; set; }

        [Column(TypeName = "tinyint")]
        public byte Level { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; } = null!;

        [ForeignKey(nameof(WordId))]
        public Word Word { get; set; } = null!;
    }
}
