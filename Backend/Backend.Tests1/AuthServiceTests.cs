using Backend.Application.DTOs.User;
using Backend.Application.Services;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;
using FluentAssertions;
using Microsoft.Extensions.Configuration;
using Moq;

namespace Backend.Tests1;

public class AuthServiceTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IConfiguration> _configurationMock;
    private readonly AuthService _service;

    public AuthServiceTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _configurationMock = new Mock<IConfiguration>();
        _configurationMock.Setup(c => c["JwtSettings:Key"]).Returns("test-secret-key-at-least-32-characters!");
        _service = new AuthService(_userRepositoryMock.Object, _configurationMock.Object);
    }

    [Fact]
    public async Task LoginAsync_WhenUserNotFound_ThrowsNotFoundException()
    {
        // Arrange
        _userRepositoryMock.Setup(r => r.GetByUsernameAsync("test")).ReturnsAsync((User?)null);

        // Act
        var act = async () => await _service.LoginAsync(new LoginDto { Username = "test", Password = "pass" });

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public async Task LoginAsync_WhenPasswordInvalid_ThrowsUnauthorizedException()
    {
        // Arrange
        var user = new User { UserName = "test", PasswordHash = BCrypt.Net.BCrypt.HashPassword("correct") };
        _userRepositoryMock.Setup(r => r.GetByUsernameAsync("test")).ReturnsAsync(user);

        // Act
        var act = async () => await _service.LoginAsync(new LoginDto { Username = "test", Password = "wrong" });

        // Assert
        await act.Should().ThrowAsync<UnauthorizedException>();
    }

    [Fact]
    public async Task RegisterAsync_WhenUsernameExists_ThrowsAlreadyExistsException()
    {
        // Arrange
        var existing = new User { UserName = "test" };
        _userRepositoryMock.Setup(r => r.GetByUsernameAsync("test")).ReturnsAsync(existing);

        // Act
        var act = async () => await _service.RegisterAsync(new RegisterDto { Username = "test", Password = "pass" });

        // Assert
        await act.Should().ThrowAsync<AlreadyExistsException>();
    }
}