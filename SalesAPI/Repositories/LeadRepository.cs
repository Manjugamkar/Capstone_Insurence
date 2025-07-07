using LMS_SharedLib.EntityLayer.Auth;
using LMS_SharedLib.EntityLayer.Sales;
using Microsoft.EntityFrameworkCore;
using SalesAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LMS_SharedLib.DAL.Repositories.Sales
{
    public class LeadRepository : ILeadRepository
    {
        private readonly LeadDbContext leadDbContext;
        public LeadRepository(LeadDbContext leadDbContext)
        {
           this.leadDbContext = leadDbContext;
        }

        public async Task<IEnumerable<LeadDetails>> GetAllAsync()
        {
            return await leadDbContext.LeadDetails.ToListAsync();
        }
        public async Task<LeadDetails?> GetByIdAsync(int id)
        {
            return await leadDbContext.LeadDetails.FindAsync(id);
        }
        public async Task<LeadDetails> AddAsync(LeadDetails leadDetails)
        {

            leadDbContext.LeadDetails.Add(leadDetails);
            await leadDbContext.SaveChangesAsync();
            return leadDetails;
        }
        public async Task UpdateAsync(LeadDetails leadDetails)
        {
            leadDbContext.Entry(leadDetails).State = EntityState.Modified;
            await leadDbContext.SaveChangesAsync();

        }
      
        public async Task DeleteAsync(int id)
        {

            var lead = await leadDbContext.LeadDetails.FindAsync(id);
            if (lead != null) {

                leadDbContext.LeadDetails.Remove(lead);
                await leadDbContext.SaveChangesAsync();
            }

        }
        public async Task<LeadDetails?> GetByNameAsync(string name)
        {
            return await leadDbContext.LeadDetails
                .FirstOrDefaultAsync(l => l.FirstName == name);
        }



    }
    }

       
    

