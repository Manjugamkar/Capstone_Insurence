using LMS_SharedLib.EntityLayer.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.DAL.Repositories.Auth;

public class AuthRepository : IAuthRepository
{
    private readonly AuthDbContext authDbContext;
    public AuthRepository( AuthDbContext authDbContext)
    {
       this.authDbContext = authDbContext;
            
    }
    public UserLogin DoLogin(string uname, string Pass)
    {
        var user = authDbContext.UserLogins.Where(u => u.Email.ToLower() == uname.ToLower() && u.Password == Pass).SingleOrDefault();
        return user!;
    }
}
