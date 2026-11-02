export default function SpeakingAttemptActionFooter({
  status,
  allAnswersSaved,
  isSubmitting,
  isRestarting,
  onSubmit,
  onRestart,
}) {
  let action = null
  let secondaryAction = null
  let statusMessage = ''

  if (status === 'IN_PROGRESS' && allAnswersSaved) {
    action = {
      label: isSubmitting ? 'ĐANG NỘP...' : 'NỘP BÀI',
      onClick: onSubmit,
      disabled: isSubmitting,
    }
    secondaryAction = {
      label: isRestarting ? 'ĐANG TẠO LƯỢT MỚI...' : 'LÀM LẠI',
      onClick: onRestart,
      disabled: isRestarting,
    }
  } else if (status === 'GRADED') {
    action = {
      label: isRestarting ? 'ĐANG TẠO LƯỢT MỚI...' : 'LÀM LẠI',
      onClick: onRestart,
      disabled: isRestarting,
    }
  } else if (status === 'SUBMITTED' || status === 'GRADING') {
    statusMessage = 'ĐANG CHẤM BÀI...'
  } else if (status === 'GRADING_FAILED') {
    statusMessage = 'CHẤM BÀI CHƯA THÀNH CÔNG - hãy thử lại ở nhận xét cuối.'
  }

  if (!action && !statusMessage) return null

  return (
    <footer className="mt-2 flex-none rounded-2xl border-[4px] border-[#111] bg-white px-5 py-4 shadow-[4px_4px_0_rgba(0,0,0,0.15)]">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            disabled={action.disabled}
            className="min-w-52 rounded-xl border-[3px] border-[#111] bg-[#ffc926] px-8 py-3 text-sm font-black tracking-wide text-[#111] shadow-[4px_4px_0_#111] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {action.label}
          </button>
        ) : null}
        {secondaryAction ? (
          <button
            type="button"
            onClick={secondaryAction.onClick}
            disabled={secondaryAction.disabled}
            className="min-w-52 rounded-xl border-[3px] border-[#111] bg-white px-8 py-3 text-sm font-black tracking-wide text-[#111] shadow-[4px_4px_0_#111] transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {secondaryAction.label}
          </button>
        ) : null}
        {!action && !secondaryAction ? (
          <p className="flex items-center gap-3 text-center text-sm font-extrabold text-[#56673d]">
            {status === 'SUBMITTED' || status === 'GRADING' ? (
              <span className="h-4 w-4 animate-spin rounded-full border-[3px] border-[#e8f0c9] border-t-[#6f8f4b]" />
            ) : (
              <span aria-hidden="true" className="text-red-600">!</span>
            )}
            {statusMessage}
          </p>
        ) : null}
      </div>
    </footer>
  )
}
