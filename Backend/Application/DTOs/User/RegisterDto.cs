using System.ComponentModel.DataAnnotations;

namespace Backend.Application.DTOs.User;

public class RegisterDto
{
    [MaxLength(30)]
    [MinLength(6)] 
    public string Username { get; set; }
    
    [MinLength(6)] 
    [MaxLength(30)]
    public string Password {  get; set; }
}