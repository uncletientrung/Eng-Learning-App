using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("words")]
    public class Word
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("topic_id")]
        public int TopicId { get; set; }

        [Required, StringLength(255)]
        [Column("word")]
        public string WordText { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Meaning { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Phonetic { get; set; } = string.Empty;

        [Required, StringLength(255)]
        [Column("part_of_speech")]
        public string PartOfSpeech { get; set; } = string.Empty;

        [Required, Column(TypeName = "text")]
        public string Example { get; set; } = string.Empty;

        [ForeignKey(nameof(TopicId))]
        public Topic Topic { get; set; } = null!;
    }
}
