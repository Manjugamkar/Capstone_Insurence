using LMS_SharedLib.EntityLayer.Sales;
using Microsoft.EntityFrameworkCore;

namespace SalesAPI.Data
{
    public class LeadDbContext:DbContext
    { 
     public LeadDbContext(DbContextOptions<LeadDbContext> options) : base(options) { 
        
        }
        public DbSet<LeadDetails> LeadDetails { get; set; }
    }
}
