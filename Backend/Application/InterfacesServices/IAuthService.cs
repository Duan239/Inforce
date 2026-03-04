using Backend.Application.DTOs;
using Backend.Application.DTOs.User;
using Backend.Domain.Entities;

namespace Backend.Application.InterfacesServices;

public interface IAuthService
{
    public Task<string> LoginAsync(LoginDto loginDto);
    public Task<int> RegisterAsync(RegisterDto registerDto);
}