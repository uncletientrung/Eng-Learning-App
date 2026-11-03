using System.Collections.Concurrent;
using System.Threading.Channels;

namespace EnglishLearning.API.Services;

public sealed class SpeakingGradingQueue
{
    private readonly Channel<int> _queue = Channel.CreateUnbounded<int>(
        new UnboundedChannelOptions
        {
            SingleReader = true,
            SingleWriter = false
        });
    private readonly ConcurrentDictionary<int, byte> _activeAttempts = new();

    public void Enqueue(int attemptId)
    {
        if (!_activeAttempts.TryAdd(attemptId, 0))
            return;
        if (!_queue.Writer.TryWrite(attemptId))
        {
            _activeAttempts.TryRemove(attemptId, out _);
            throw new InvalidOperationException(
                "Không thể đưa lượt Speaking vào hàng đợi chấm.");
        }
    }

    public void Complete(int attemptId)
    {
        _activeAttempts.TryRemove(attemptId, out _);
    }

    public IAsyncEnumerable<int> ReadAllAsync(
        CancellationToken cancellationToken)
    {
        return _queue.Reader.ReadAllAsync(cancellationToken);
    }
}
