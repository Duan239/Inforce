using Backend.Domain.Exceptions;

namespace Backend.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            context.Response.StatusCode = ex switch
            {
                NotFoundException => 404,
                AlreadyExistsException => 409,
                UnauthorizedException => 401,
                ForbiddenException => 403,
                ArgumentException => 400,
                _ => 500
            };

            await context.Response.WriteAsJsonAsync(new
            {
                error = ex.Message
            });
        }
    }
}