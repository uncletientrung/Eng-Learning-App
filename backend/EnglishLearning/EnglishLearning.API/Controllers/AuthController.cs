using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EnglishLearning.DAL.Data;
using EnglishLearning.DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EnglishLearning.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _configuration;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthController(
        AppDbContext db,
        IConfiguration configuration,
        IPasswordHasher<User> passwordHasher)
    {
        _db = db;
        _configuration = configuration;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] LoginRequest request,
        CancellationToken cancellationToken)
    {
        var email = request.Email.Trim();
        var user = await _db.Users
            .FirstOrDefaultAsync(
                candidate => candidate.Email == email,
                cancellationToken);

        if (user is null || user.Status == 0 ||
            !await VerifyPasswordAsync(user, request.Password, cancellationToken))
        {
            return Unauthorized(new
            {
                message = "Email hoặc mật khẩu không chính xác."
            });
        }

        var expiresAt = DateTime.UtcNow.AddMinutes(
            _configuration.GetValue<int>("Jwt:ExpirationMinutes", 60));
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Role, user.Role)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:SigningKey"]!));
        var credentials = new SigningCredentials(
            key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: credentials);

        return Ok(new
        {
            accessToken = new JwtSecurityTokenHandler().WriteToken(token),
            tokenType = "Bearer",
            expiresAt,
            user = new
            {
                id = user.Id,
                name = user.Name,
                email = user.Email,
                role = user.Role
            }
        });
    }

    private async Task<bool> VerifyPasswordAsync(
        User user,
        string password,
        CancellationToken cancellationToken)
    {
        if (user.Password.StartsWith("AQAAAA", StringComparison.Ordinal))
        {
            var result = _passwordHasher.VerifyHashedPassword(
                user, user.Password, password);
            return result is PasswordVerificationResult.Success
                or PasswordVerificationResult.SuccessRehashNeeded;
        }

        var storedPassword = Encoding.UTF8.GetBytes(user.Password);
        var providedPassword = Encoding.UTF8.GetBytes(password);
        if (!CryptographicOperations.FixedTimeEquals(
                storedPassword, providedPassword))
        {
            return false;
        }

        user.Password = _passwordHasher.HashPassword(user, password);
        _db.Users.Update(user);
        await _db.SaveChangesAsync(cancellationToken);
        return true;
    }

    public sealed class LoginRequest
    {
        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.EmailAddress]
        [System.ComponentModel.DataAnnotations.StringLength(255)]
        public string Email { get; set; } = string.Empty;

        [System.ComponentModel.DataAnnotations.Required]
        [System.ComponentModel.DataAnnotations.StringLength(255)]
        public string Password { get; set; } = string.Empty;
    }
}
