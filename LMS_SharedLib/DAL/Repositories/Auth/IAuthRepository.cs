using LMS_SharedLib.EntityLayer.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.DAL.Repositories.Auth;

public interface IAuthRepository
{
    UserLogin DoLogin(string uname, string Pass);
}
