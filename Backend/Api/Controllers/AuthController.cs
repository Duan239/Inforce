using Backend.Application.DTOs;
using Backend.Application.DTOs.User;
using Backend.Application.InterfacesServices;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost]
    [Route("login")]
    public Task<string> Login([FromBody] LoginDto login)
    {
        return  _authService.LoginAsync(login);
    }

    [HttpPost]
    [Route("register")]
    public Task<int> Register([FromBody] RegisterDto register)
    {
        return _authService.RegisterAsync(register);
    }
}