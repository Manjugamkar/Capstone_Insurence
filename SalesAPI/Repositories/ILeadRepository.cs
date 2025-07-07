using LMS_SharedLib.EntityLayer.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.DAL.Repositories.Sales
{
    public interface ILeadRepository
    {
        Task<IEnumerable<LeadDetails>> GetAllAsync();
        Task<LeadDetails?> GetByIdAsync(int id);
        Task<LeadDetails> AddAsync(LeadDetails leadDetails);
        
        Task UpdateAsync(LeadDetails leadDetails);
        Task DeleteAsync(int id);
        Task<LeadDetails?> GetByNameAsync(string name);
    }
}
