using System.ComponentModel.DataAnnotations;

namespace Backend.Domain.Entities;

public class User
{
    public int Id { get; set; }
    
    [MaxLength(30)]
    public string UserName { get; set; }
    public string PasswordHash { get; set; }
    public string Role  { get; set; }
}