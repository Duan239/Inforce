using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domain.Entities;

public class ShortUrl
{
    public int Id { get; set; }
    public string OriginalUrl { get; set; }
    public string ShortCode { get; set; }
    public DateTime CreatedDate { get; set; }
    [ForeignKey("CreatedBy")]
    public int CreatedByUserId { get; set; }
    public User CreatedBy { get; set; }

}