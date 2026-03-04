using Backend.Application.DTOs;
using Backend.Application.DTOs.ShortUrl;
using Backend.Application.InterfacesServices;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;

namespace Backend.Application.Services;

public class ShortUrlService : IShortUrlService
{
    private readonly IShortUrlRepository _repository;

    public ShortUrlService(IShortUrlRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ShortUrlDto>> GetAllAsync()
    {
        var urls = await _repository.GetAllAsync();
        return urls.Select(u => new ShortUrlDto
        {
            Id = u.Id,
            OriginalUrl = u.OriginalUrl,
            ShortCode = u.ShortCode,
            CreatedDate = u.CreatedDate,
            CreatedByUsername = u.CreatedBy.UserName,
            CreatedByUserId = u.CreatedByUserId
        });
    }

    public async Task<ShortUrlDto> GetByIdAsync(int id)
    {
        var url = await _repository.GetByIdAsync(id);
        if (url == null) throw new NotFoundException("URL not found");

        return new ShortUrlDto
        {
            Id = url.Id,
            OriginalUrl = url.OriginalUrl,
            ShortCode = url.ShortCode,
            CreatedDate = url.CreatedDate,
            CreatedByUsername = url.CreatedBy.UserName,
            CreatedByUserId = url.CreatedByUserId
        };
    }

    public async Task<ShortUrlDto> CreateAsync(CreateShortUrlDto dto, int userId)
    {
        var shortUrl = new ShortUrl
        {
            OriginalUrl = dto.OriginalUrl,
            CreatedDate = DateTime.UtcNow,
            CreatedByUserId = userId,
            ShortCode = "temp",
        };

        await _repository.AddAsync(shortUrl);
        shortUrl.ShortCode = Encode(shortUrl.Id);
        await _repository.UpdateAsync(shortUrl);

        var created = await _repository.GetByIdAsync(shortUrl.Id); 

        return new ShortUrlDto
        {
            Id = created!.Id,
            OriginalUrl = created.OriginalUrl,
            ShortCode = created.ShortCode,
            CreatedDate = created.CreatedDate,
            CreatedByUserId = created.CreatedByUserId,
            CreatedByUsername = created.CreatedBy.UserName
        };
    }

    public async Task DeleteAsync(int id, int userId, bool isAdmin)
    {
        var url = await _repository.GetByIdAsync(id);
        if (url == null) throw new NotFoundException("URL not found");
        if (!isAdmin && url.CreatedByUserId != userId)
            throw new ForbiddenException("You can't delete this URL");

        await _repository.DeleteAsync(id);
    }

    private string Encode(int id)
    {
        const string chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var result = "";
        while (id > 0)
        {
            result = chars[id % 62] + result;
            id /= 62;
        }

        return result;
    }
}