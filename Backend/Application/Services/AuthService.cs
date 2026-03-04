using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Application.DTOs;
using Backend.Application.DTOs.User;
using Backend.Application.InterfacesServices;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _configuration = configuration;
    }

    public async Task<string> LoginAsync(LoginDto dto)
    {
        var user = await _userRepository.GetByUsernameAsync(dto.Username);
        if (user == null) throw new NotFoundException("User not found");
        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedException("Invalid password");

        return GenerateJwt(user);
    }

    public async Task<int> RegisterAsync(RegisterDto dto)
    {
        var existing = await _userRepository.GetByUsernameAsync(dto.Username);
        if (existing != null) throw new AlreadyExistsException("Username already taken");

        var user = new User
        {
            UserName = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "User"
        };
        return await _userRepository.AddAsync(user);
    }

    private string GenerateJwt(User user)
    {
        var claims = new[]
        {
            new Claim("id", user.Id.ToString()),
            new Claim("username", user.UserName),
            new Claim("role", user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}