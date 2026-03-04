using Backend.Application.DTOs;
using Backend.Application.DTOs.ShortUrl;

namespace Backend.Application.InterfacesServices;

public interface IShortUrlService
{
    Task<IEnumerable<ShortUrlDto>> GetAllAsync();
    Task<ShortUrlDto> GetByIdAsync(int id);
    Task<ShortUrlDto> CreateAsync(CreateShortUrlDto dto, int userId);
    Task DeleteAsync(int id, int userId, bool isAdmin);
}