using Backend.Application.DTOs;
using Backend.Application.InterfacesServices;
using Backend.Domain.Entities;
using Backend.Domain.InterfacesRepositories;

namespace Backend.Application.Services;

public class AboutService : IAboutService
{
    private readonly IAboutRepository _aboutRepository;

    public AboutService(IAboutRepository aboutRepository)
    {
        _aboutRepository = aboutRepository;
    }
    
    public async Task<AboutDto> GetAsync()
    {
        var about = await _aboutRepository.GetAsync();

        return new AboutDto()
        {
            About = about.Description,
        };
    }

    public async Task UpdateAsync(UpdateAboutDto dto)
    {
        var about = await _aboutRepository.GetAsync();
        about.Description = dto.About;
        await _aboutRepository.UpdateAsync(about);
    }

    public async Task InitializeAsync(UpdateAboutDto dto)
    {
        await _aboutRepository.AddAsync(new About { Description = dto.About });
    }
}