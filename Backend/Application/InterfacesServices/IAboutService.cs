using Backend.Application.DTOs;

namespace Backend.Application.InterfacesServices;

public interface IAboutService
{
    Task<AboutDto> GetAsync();
    Task UpdateAsync(UpdateAboutDto dto);
    Task InitializeAsync(UpdateAboutDto dto);
}