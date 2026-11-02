using System.Text.Json;
using EnglishLearning.DAL.ReadModels;
using Xunit;

namespace EnglishLearning.Tests;

public sealed class AdminReadModelSerializationTests
{
    [Fact]
    public void WritingSubmissionDtos_SerializeWithDistinctStudentNameFields()
    {
        var options = new JsonSerializerOptions(JsonSerializerDefaults.Web);
        var page = new AdminPageDto<AdminWritingSubmissionDto>
        {
            Items =
            [
                new AdminWritingSubmissionDto
                {
                    FullName = "Student Name",
                    Username = "student01"
                }
            ]
        };
        var detail = new AdminWritingSubmissionDetailDto
        {
            FullName = "Student Name",
            Username = "student01"
        };

        var pageJson = JsonSerializer.Serialize(page, options);
        var detailJson = JsonSerializer.Serialize(detail, options);

        Assert.Contains("\"fullName\":\"Student Name\"", pageJson);
        Assert.Contains("\"username\":\"student01\"", pageJson);
        Assert.Contains("\"fullName\":\"Student Name\"", detailJson);
        Assert.Contains("\"username\":\"student01\"", detailJson);
    }
}
