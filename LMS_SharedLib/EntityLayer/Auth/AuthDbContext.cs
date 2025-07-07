
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.EntityLayer.Auth;

public class AuthDbContext : DbContext
{
    public AuthDbContext(DbContextOptions options) : base(options)
    {

    }
    public DbSet<UserLogin> UserLogins { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var users = new List<UserLogin>
        {
            new UserLogin{Id=1,Name="Admin1",Email="Admin1@mail.com",Password="pass123",Role="Admin"},
            new UserLogin{ Id=2,Name="Customer1",Email="Cust1@mail.com",Password="pass123",Role="Customer"},
            new UserLogin{Id=3,Name="Sales1",Email="Sales@mail.com",Password="pass123",Role="Sales"}
        };
        modelBuilder.Entity<UserLogin>().HasData(users);
    }
   
}
