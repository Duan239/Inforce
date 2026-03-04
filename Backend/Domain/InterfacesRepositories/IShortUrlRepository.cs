using Backend.Domain.Entities;

namespace Backend.Domain.InterfacesRepositories;

public interface IShortUrlRepository
{
    Task<IEnumerable<ShortUrl>> GetAllAsync();
    Task<ShortUrl?> GetByIdAsync(int id);
    Task<ShortUrl?> GetByShortCodeAsync(string shortCode);
    Task<bool> ExistsAsync(string originalUrl);
    Task AddAsync(ShortUrl shortUrl);
    
    Task UpdateAsync(ShortUrl shortUrl);
    Task DeleteAsync(int id);
}
