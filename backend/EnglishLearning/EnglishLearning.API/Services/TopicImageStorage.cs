namespace EnglishLearning.API.Services;

public abstract class PublicImageStorage
{
    public const long MaxFileSize = 5 * 1024 * 1024;
    private readonly string _directory;
    private readonly string _folder;

    protected PublicImageStorage(IWebHostEnvironment environment, IConfiguration configuration, string folder, string configKey)
    {
        _folder = folder;
        _directory = Path.GetFullPath(
            configuration[configKey] ??
            Path.Combine(environment.ContentRootPath, "..", "..", "..", "frontend", "public", "assets", folder),
            environment.ContentRootPath);
    }

    public async Task<string> SaveAsync(IFormFile image, CancellationToken cancellationToken)
    {
        if (image.Length <= 0 || image.Length > MaxFileSize)
            throw new ArgumentException("Ảnh phải có dung lượng lớn hơn 0 và không quá 5 MB.");

        await using var input = image.OpenReadStream();
        var header = new byte[12];
        var bytesRead = await input.ReadAtLeastAsync(header, header.Length, throwOnEndOfStream: false, cancellationToken);
        var extension = GetExtension(header.AsSpan(0, bytesRead));
        if (extension is null)
            throw new ArgumentException("Chỉ chấp nhận ảnh JPEG, PNG, GIF hoặc WebP hợp lệ.");

        if (!Directory.Exists(_directory))
            throw new DirectoryNotFoundException($"Không tìm thấy thư mục lưu ảnh: {_directory}");

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var path = Path.Combine(_directory, fileName);
        await using var output = new FileStream(path, FileMode.CreateNew, FileAccess.Write, FileShare.None);
        try
        {
            await output.WriteAsync(header.AsMemory(0, bytesRead), cancellationToken);
            await input.CopyToAsync(output, cancellationToken);
        }
        catch
        {
            await output.DisposeAsync();
            File.Delete(path);
            throw;
        }

        return $"/assets/{_folder}/{fileName}";
    }

    private static string? GetExtension(ReadOnlySpan<byte> header)
    {
        if (header.StartsWith((ReadOnlySpan<byte>)[0xff, 0xd8, 0xff])) return ".jpg";
        if (header.StartsWith((ReadOnlySpan<byte>)[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return ".png";
        if (header.StartsWith("GIF87a"u8) || header.StartsWith("GIF89a"u8)) return ".gif";
        if (header.Length >= 12 && header[..4].SequenceEqual("RIFF"u8) && header[8..12].SequenceEqual("WEBP"u8))
            return ".webp";
        return null;
    }
}

public sealed class TopicImageStorage(IWebHostEnvironment environment, IConfiguration configuration)
    : PublicImageStorage(environment, configuration, "topics", "TopicImages:Directory");

public sealed class WritingImageStorage(IWebHostEnvironment environment, IConfiguration configuration)
    : PublicImageStorage(environment, configuration, "writing", "WritingImages:Directory");
