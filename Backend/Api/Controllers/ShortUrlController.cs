using System.Security.Claims;
using Backend.Application.DTOs.ShortUrl;
using Backend.Application.InterfacesServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShortUrlController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;

    public ShortUrlController(IShortUrlService shortUrlService)
    {
        _shortUrlService = shortUrlService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShortUrlDto>>> GetAll()
    {
        var res = await _shortUrlService.GetAllAsync();
        return Ok(res);
    }
    
    [Authorize]
    [HttpGet("{id}")]
    public async Task<ActionResult<ShortUrlDto>> GetShortUrlById(int id)
    {
        var res = await _shortUrlService.GetByIdAsync(id);
        return Ok(res);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<int>> CreateShortUrl([FromBody] CreateShortUrlDto shortUrl)
    {
        var userId = int.Parse(User.FindFirst("id")!.Value);

        var res = await _shortUrlService.CreateAsync(shortUrl, userId);
        return Ok(res);
    }


    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<int>> DeleteShortUrlById(int id)
    {
        var role = User.FindFirst("role")!.Value;
        var userId = int.Parse(User.FindFirst("id")!.Value);
        bool isAdmin = role == "Admin";
        await _shortUrlService.DeleteAsync(id, userId, isAdmin);
        return Ok(id);
    }
}