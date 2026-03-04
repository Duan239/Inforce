using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;
using Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class ShortUrlRepository : IShortUrlRepository
{
    private readonly AppDbContext _context;
    public ShortUrlRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ShortUrl>> GetAllAsync()
    {
        return await _context.ShortUrls.AsNoTracking().Include(u => u.CreatedBy).ToListAsync();
    }

    public async Task<ShortUrl?> GetByIdAsync(int id)
    {
        return await _context.ShortUrls.AsNoTracking().Include(s => s.CreatedBy).FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<ShortUrl?> GetByShortCodeAsync(string shortCode)
    {
        return await _context.ShortUrls.FirstOrDefaultAsync(s => s.ShortCode == shortCode);
    }

    public async Task<bool> ExistsAsync(string originalUrl)
    {
        return await _context.ShortUrls.AnyAsync(s => s.OriginalUrl == originalUrl); 
    }

    public async Task AddAsync(ShortUrl shortUrl)
    {
        if (await ExistsAsync(shortUrl.OriginalUrl))
        {
            throw new AlreadyExistsException("ShortUrl already exists");
        }
        await _context.ShortUrls.AddAsync(shortUrl);
        await _context.SaveChangesAsync(); 
    }
    
    public async Task UpdateAsync(ShortUrl shortUrl)
    {
        var existing = await _context.ShortUrls
            .FirstOrDefaultAsync(e => e.Id == shortUrl.Id);

        if (existing == null)
            throw new NotFoundException("ShortUrl not found");

        existing.OriginalUrl = shortUrl.OriginalUrl;
        existing.ShortCode = shortUrl.ShortCode;

        await _context.SaveChangesAsync();
    }
    

    public async Task DeleteAsync(int id)
    {
        var shortUrl = await _context.ShortUrls.FirstOrDefaultAsync(s => s.Id == id);
        if (shortUrl == null) throw new NotFoundException("ShortUrl not found");
        
        _context.ShortUrls.Remove(shortUrl);
        await _context.SaveChangesAsync(); 
    }
}