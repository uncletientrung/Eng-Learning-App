import { ArrowLeft } from 'lucide-react';
import LinkButton from '../../ui/LinkButton';

function SpeakingHeader({ practiceStatus, onPracticeStatusChange }) {
  return (
    <header className="mb-8">
      <LinkButton
        to="/"
        backgroundColor = "bg-white"
        textColor = 'text-black'
        className="px-10 py-2"
      >
        <ArrowLeft size={16} />
        Trở về
      </LinkButton>

      <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Left: Page title */}
        <div className="min-w-0 flex-1">
          <h1 
            className="text-4xl md:text-5xl font-black text-[#1e3006] mb-4 tracking-tight leading-tight" 
            style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}>
                IELTS {' '}
                <span className="text-brand-dark">
                  Speaking
                </span>
            </h1>

          <p className="mt-3 text-slate-500 text-md font-medium" style={{ fontFamily: '"Segoe UI Semibold", "Segoe UI", sans-serif' }}>
            Luyện nói tiếng Anh với bộ câu hỏi theo chủ đề,
            rèn luyện phản xạ và phát triển khả năng diễn đạt.
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
    </header>
  );
}

export default SpeakingHeader;