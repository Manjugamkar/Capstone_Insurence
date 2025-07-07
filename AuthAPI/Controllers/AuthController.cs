using AuthAPI.DTO;
using LMS_SharedLib.DAL.Repositories.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;
        private readonly IConfiguration configuration;
        public AuthController(IAuthRepository authRepository,IConfiguration configuration)
        {
            this.authRepository = authRepository;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public  IActionResult DoLogin([FromBody] LoginDto loginDto)
        {
            var user= authRepository.DoLogin(loginDto.UserName, loginDto.Password);
            if(user == null) 
                return NotFound(" User/Password not valid");
                string name = user.Name;
                string role = user.Role;
                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, name),
                    new Claim(ClaimTypes.Role, role)

                };
                var token=GetToken(claims);
                var tokenhandler = new JwtSecurityTokenHandler();   
                var  tokenstring =tokenhandler.WriteToken(token);

                return Ok(tokenstring );
        }
        //helper method to generate claims in jwt
        private JwtSecurityToken GetToken(List<Claim> claims)
        {
            var authsignKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:secret"]!));
            var token = new JwtSecurityToken
                (
                issuer: configuration["Jwt:issuer"],
                audience: configuration["Jwt:audience"],
                expires: DateTime.Now.AddHours(1),
                claims: claims,
                signingCredentials:new SigningCredentials(authsignKey,SecurityAlgorithms.HmacSha256));


                return token;


        }
    }
}
