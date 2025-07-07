using LMS_SharedLib.DAL.Repositories.Auth;

using LMS_SharedLib.EntityLayer.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace AuthAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddControllers();
            builder.Services.AddDbContext<AuthDbContext>(options=>options.UseSqlServer(builder.Configuration.GetConnectionString("AuthCString")));
            builder.Services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

            })
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidAudience = builder.Configuration["Jwt:audience"],
                        ValidIssuer = builder.Configuration["Jwt:issuer"],
                         IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:secret"]!))

                    };
                });
       



            builder.Services.AddScoped<IAuthRepository, AuthRepository>();            


            //api cors
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:3000")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });
            var app = builder.Build();


            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();
            app.UseCors("AllowReactApp");

            app.Run();
        }
    }
}
