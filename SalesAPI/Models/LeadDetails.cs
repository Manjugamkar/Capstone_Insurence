using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.EntityLayer.Sales
{
    [Table("Lead")]
    public class LeadDetails
    {
        [Key]
        public int Id { get; set; }  // Primary key (optional if using GUID as key)

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DOB { get; set; }

        [Required]
        [RegularExpression("M|F", ErrorMessage = "Gender must be 'M' or 'F'")]
        public string Gender { get; set; }

        public string? MotherName { get; set; }

        [Required]
        public string? HasMedicalConditions { get; set; }

        [Required]
        [Range(1, 6)]
        public int HouseholdSize { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal EstimatedHouseholdIncome { get; set; }

        // Life Events stored as list of strings or JSON serialized if using EF Core
        public string LifeEvents { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [MaxLength(10)]
        public string ZipCode { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        [RegularExpression("Health|Medicare", ErrorMessage = "Insurance Type must be 'Health' or 'Medicare'")]
        public string InsuranceType { get; set; }

        [Required]
        [Range(10, 30)]
        public int TermOfInsurance { get; set; }  // e.g., 10, 15, 20, 25, 30

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal SumAssured { get; set; }

      //  [Required]
      //  [Column(TypeName = "decimal(18,2)")]
       // public decimal MaturityAmount { get; set; }

    //    [Required]
    //    public string RequestNumber { get; set; } = Guid.NewGuid().ToString("N").ToUpper(); // Auto-generated

      //  public string? LeadRequestStatus { get; set; }

      //  public string? AccountNumber { get; set; } // Set after purchase
    }
}
