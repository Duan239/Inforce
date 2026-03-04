using Backend.Application.DTOs;
using Backend.Application.InterfacesServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AboutController : ControllerBase
{
    private readonly IAboutService _aboutService;

    public AboutController(IAboutService aboutService)
    {
        _aboutService = aboutService;
    }

    [HttpGet]
    public async Task<ActionResult<AboutDto>> GetAsync()
    {
        var res = await _aboutService.GetAsync();
        return Ok(res);
    }


    // [Authorize(Roles = "Admin")]
    [HttpPatch]
    public async Task<ActionResult> UpdateAbout([FromBody] UpdateAboutDto dto)
    {
        var role = User.FindFirst("role")?.Value;
        Console.WriteLine($"Role: {role}");
        await _aboutService.UpdateAsync(dto);
        return Ok();
    }

    // [Authorize(Roles = "Admin")]
    // [HttpPost]
    // public async Task<ActionResult> CreateAbout([FromBody] UpdateAboutDto dto)
    // {
    //     var role = User.FindFirst("role")?.Value;
    //     Console.WriteLine($"Role: {role}");
    //     await _aboutService.InitializeAsync(dto);
    //     return Ok();
    // }
}