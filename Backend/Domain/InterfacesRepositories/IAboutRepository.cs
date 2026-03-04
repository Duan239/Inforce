using Backend.Domain.Entities;

namespace Backend.Domain.InterfacesRepositories;

public interface IAboutRepository
{
    Task<About?> GetAsync();
    Task UpdateAsync(About about);
    Task<int> AddAsync(About about);
}