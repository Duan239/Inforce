using Backend.Application.DTOs;
using Backend.Domain.Entities;

namespace Backend.Domain.InterfacesRepositories;


public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task<User?> GetByIdAsync(int id);
    Task<int> AddAsync(User user);
}