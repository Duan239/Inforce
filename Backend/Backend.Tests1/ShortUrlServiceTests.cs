using Backend.Application.DTOs.ShortUrl;
using Backend.Application.Services;
using Backend.Domain.Entities;
using Backend.Domain.Exceptions;
using Backend.Domain.InterfacesRepositories;
using FluentAssertions;
using Moq;

namespace Backend.Tests;

public class ShortUrlServiceTests
{
    private readonly Mock<IShortUrlRepository> _repositoryMock;
    private readonly ShortUrlService _service;

    public ShortUrlServiceTests()
    {
        _repositoryMock = new Mock<IShortUrlRepository>();
        _service = new ShortUrlService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetAllAsync_ReturnsAllUrls()
    {
        // Arrange
        var urls = new List<ShortUrl>
        {
            new ShortUrl { Id = 1, OriginalUrl = "https://google.com", ShortCode = "1", CreatedBy = new User { UserName = "admin" } },
            new ShortUrl { Id = 2, OriginalUrl = "https://youtube.com", ShortCode = "2", CreatedBy = new User { UserName = "user" } }
        };
        _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(urls);

        // Act
        var result = await _service.GetAllAsync();

        // Assert
        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetByIdAsync_WhenNotFound_ThrowsNotFoundException()
    {
        // Arrange
        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((ShortUrl?)null);

        // Act
        var act = async () => await _service.GetByIdAsync(1);

        // Assert
        await act.Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public async Task DeleteAsync_WhenUserIsNotOwnerAndNotAdmin_ThrowsForbiddenException()
    {
        // Arrange
        var url = new ShortUrl { Id = 1, CreatedByUserId = 2, CreatedBy = new User { UserName = "user" } };
        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(url);

        // Act
        var act = async () => await _service.DeleteAsync(1, userId: 3, isAdmin: false);

        // Assert
        await act.Should().ThrowAsync<ForbiddenException>();
    }

    [Fact]
    public async Task DeleteAsync_WhenUserIsAdmin_DeletesSuccessfully()
    {
        // Arrange
        var url = new ShortUrl { Id = 1, CreatedByUserId = 2, CreatedBy = new User { UserName = "user" } };
        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(url);

        // Act
        await _service.DeleteAsync(1, userId: 3, isAdmin: true);

        // Assert
        _repositoryMock.Verify(r => r.DeleteAsync(1), Times.Once);
    }

    [Fact]
    public async Task DeleteAsync_WhenUserIsOwner_DeletesSuccessfully()
    {
        // Arrange
        var url = new ShortUrl { Id = 1, CreatedByUserId = 2, CreatedBy = new User { UserName = "user" } };
        _repositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(url);

        // Act
        await _service.DeleteAsync(1, userId: 2, isAdmin: false);

        // Assert
        _repositoryMock.Verify(r => r.DeleteAsync(1), Times.Once);
    }
}