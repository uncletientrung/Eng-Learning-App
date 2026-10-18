using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace EnglishLearning.DAL.Entities
{
    [Table("user")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Role { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Username { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Password { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [Required, StringLength(255)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [Column(TypeName = "tinyint")]
        public int Status { get; set; }
    }
}
