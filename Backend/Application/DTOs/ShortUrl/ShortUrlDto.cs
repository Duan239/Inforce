namespace Backend.Application.DTOs.ShortUrl;


public class ShortUrlDto
{
    public int Id { get; set; }
    public string OriginalUrl { get; set; }
    public string ShortCode { get; set; }
    public DateTime CreatedDate { get; set; }
    public string CreatedByUsername { get; set; }
    public int CreatedByUserId { get; set; }
}