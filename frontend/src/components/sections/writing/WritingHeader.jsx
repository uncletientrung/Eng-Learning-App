import { ArrowLeft } from 'lucide-react'
import LinkButton from '../../ui/LinkButton'

function WritingHeader({ practiceStatus, onPracticeStatusChange }) {
  return (
    <div className="mb-2">
      <LinkButton
        to="/"
        backgroundColor = "bg-white"
        textColor = 'text-black'
        className="px-10 py-2"
      >
        <ArrowLeft size={16} />
        Trở về
      </LinkButton>


      <div
        className="
          flex flex-col gap-6
          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className='mt-5'>
          <h1 className="text-3xl font-black tracking-tight text-[#111] sm:text-4xl">
            Thư viện{' '}
            <span className="underline decoration-[#ffc926] decoration-4 underline-offset-4">
              Writing-tests
            </span>
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Phát triển kỹ năng Writing-tests với bộ đề thi
            được mô phỏng bám sát định dạng thực tế.
          </p>
        </div>

        <label className="flex w-full flex-col gap-2 md:mb-1 md:w-auto md:min-w-56">
          <select
            value={practiceStatus}
            onChange={(event) => onPracticeStatusChange(event.target.value)}
            className="w-full cursor-pointer rounded-xl border-2 border-[#111] bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-[3px_3px_0_rgba(0,0,0,0.12)] outline-none transition focus-visible:ring-2 focus-visible:ring-[#ffc926] focus-visible:ring-offset-2"
          >
            <option className='text-sm font-semibold text-slate-700' value="ALL">Mọi trạng thái</option>
            <option className='text-sm font-semibold text-slate-700' value="NOT_STARTED">Chưa làm</option>
            <option className='text-sm font-semibold text-slate-700' value="PRACTICED">Đã luyện</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default WritingHeader