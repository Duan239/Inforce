using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    public DbSet<User> Users { get; set; }
    public DbSet<ShortUrl> ShortUrls { get; set; }
    public DbSet<About> Abouts { get; set; }
}