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

    public void Enqueue(int attemptId)
    {
        if (!_queue.Writer.TryWrite(attemptId))
            throw new InvalidOperationException(
                "Không thể đưa lượt Speaking vào hàng đợi chấm.");
    }

    public IAsyncEnumerable<int> ReadAllAsync(
        CancellationToken cancellationToken)
    {
        return _queue.Reader.ReadAllAsync(cancellationToken);
    }
}
