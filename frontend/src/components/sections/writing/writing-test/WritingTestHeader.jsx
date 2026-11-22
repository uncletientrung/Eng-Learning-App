function WritingTestHeader({ writingType, isHistoryReview = false, submittedAt }) {
  const submittedDate = submittedAt ? new Date(submittedAt) : null
  const hasSubmittedDate = submittedDate && !Number.isNaN(submittedDate.getTime())

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-2 mt-3">
      <div className="flex items-center gap-3 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{
                fontFamily: 'Playfair Display',
                }}>
          {isHistoryReview ? 'Writing History Review' : 'Writing test'}
        </h1>
      </div>
      
      <div className="flex flex-wrap items-center gap-4">
        {isHistoryReview && (
          <span className="text-sm font-bold text-white">
            Đã nộp: {hasSubmittedDate ? (
              <time dateTime={submittedDate.toISOString()}>
                {new Intl.DateTimeFormat('vi-VN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(submittedDate)}
              </time>
            ) : 'Chưa rõ thời gian'}
          </span>
        )}
        <div className="flex bg-white/25 p-1 rounded-lg backdrop-blur-sm">
          <span className="px-4 py-1.5 rounded-md text-sm font-bold bg-white text-brand shadow-sm">
            {writingType}
          </span>
        </div>
      </div>
    </div>
  )
}

export default WritingTestHeader