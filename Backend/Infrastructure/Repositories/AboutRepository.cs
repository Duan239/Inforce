using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;
using Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class AboutRepository : IAboutRepository
{
    private readonly AppDbContext _context;
    public AboutRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<About?> GetAsync()
    {
        return await _context.Abouts.AsNoTracking().FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(About about)
    {
        var el = await _context.Abouts.FirstOrDefaultAsync(e => e.Id == about.Id);
        if (el == null)
        {
            throw new NotFoundException("No about found");
        }

        el.Description = about.Description;
        await _context.SaveChangesAsync();
    }

    public async Task<int> AddAsync(About about)
    {
        var result = await _context.Abouts.AddAsync(about);
        return result.Entity.Id;
    }
}