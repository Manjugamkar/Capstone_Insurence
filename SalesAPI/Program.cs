using LMS_SharedLib.DAL.Repositories.Sales;
using LMS_SharedLib.EntityLayer.Auth;
using Microsoft.EntityFrameworkCore;
using SalesAPI.Data;


namespace SalesAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
           builder.Services.AddControllers();
            builder.Services.AddDbContext<LeadDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SalesCString")));
            builder.Services.AddScoped<ILeadRepository, LeadRepository>();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            //api cors
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:3000")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.MapControllers();
            app.UseCors("AllowReactApp");
            app.Run();
        }
    }
}
