using Backend.Application.DTOs;
using Backend.Domain.Entities;
using Backend.Domain.InterfacesRepositories;
using Backend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<User?> GetByUsernameAsync(string username)
    {
        var user = await _context.Users.AsNoTracking().FirstOrDefaultAsync(e => e.UserName == username);
        return user;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<int> AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        return user.Id;
    }
}