using LMS_SharedLib.DAL.Repositories.Sales;
using LMS_SharedLib.EntityLayer.Sales;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using SalesAPI.Data;

namespace SalesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadController : ControllerBase
    {
        private readonly ILeadRepository leadRepository;
        public LeadController(ILeadRepository leadRepository)
        {
            this.leadRepository = leadRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LeadDetails>>> GetLeads()
        {
            return Ok(await leadRepository.GetAllAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<LeadDetails>> GetLead(int id)
        {
            var lead = await leadRepository.GetByIdAsync(id);
            if (lead == null) return NotFound();
            return Ok(lead);
        }
        //[HttpPost]
        //[Route("Create")]
        //public async Task<ActionResult<LeadDetails>> CreateLead(LeadDetails lead)
        //{
        //    var created = await leadRepository.AddAsync(lead);
        //    return Ok(created);
        //   // return CreatedAtAction(nameof(GetLead), new { id = created.Id }, created);
        //}
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult<LeadDetails>> Post(LeadDetails lead)
        {
           
            await leadRepository.AddAsync(lead);
            return (Ok());

        }
        [HttpGet("byname/{name}")]
        public async Task<ActionResult<LeadDetails>> GetLeadByName(string name)
        {
            var lead = await leadRepository.GetByNameAsync(name);
            if (lead == null) return NotFound();
            return Ok(lead);
        }
        //update data
        [HttpPut(" update{id}")]
        public async Task<IActionResult> UpdateLead(int id, [FromBody] LeadDetails leadDetails)
        {
            if (id != leadDetails.Id)
                return BadRequest("ID mismatch");

            var existing = await leadRepository.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            await leadRepository.UpdateAsync(leadDetails);
            return Ok(leadDetails);
        }


    }
}
