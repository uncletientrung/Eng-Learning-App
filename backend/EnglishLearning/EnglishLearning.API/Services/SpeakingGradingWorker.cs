using EnglishLearning.BLL.Interfaces;

namespace EnglishLearning.API.Services;

public sealed class SpeakingGradingWorker : BackgroundService
{
    private readonly SpeakingGradingQueue _queue;
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<SpeakingGradingWorker> _logger;

    public SpeakingGradingWorker(
        SpeakingGradingQueue queue,
        IServiceScopeFactory scopeFactory,
        ILogger<SpeakingGradingWorker> logger)
    {
        _queue = queue;
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        await RequeueUnfinishedAttemptsAsync(stoppingToken);

        await foreach (var attemptId in _queue.ReadAllAsync(stoppingToken))
        {
            try
            {
                await using var scope = _scopeFactory.CreateAsyncScope();
                var service = scope.ServiceProvider
                    .GetRequiredService<ISpeakingAssessmentService>();
                await service.ProcessGradingAsync(attemptId, stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
            {
                return;
            }
            catch (Exception exception)
            {
                _logger.LogError(
                    exception,
                    "Speaking grading failed for attempt {AttemptId}.",
                    attemptId);
            }
        }
    }

    private async Task RequeueUnfinishedAttemptsAsync(
        CancellationToken cancellationToken)
    {
        await using var scope = _scopeFactory.CreateAsyncScope();
        var service = scope.ServiceProvider
            .GetRequiredService<ISpeakingAssessmentService>();
        var attemptIds = await service.GetUnfinishedAttemptIdsAsync(
            cancellationToken);

        foreach (var attemptId in attemptIds)
            _queue.Enqueue(attemptId);
    }
}
