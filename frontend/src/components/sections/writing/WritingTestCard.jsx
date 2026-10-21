import {getImageUrl} from '../../../utils/imageUtils.js'
import { getTopicColors } from '../../../constant/writingConstant.js';


function WritingTestCard({ test, onClick }) {
  const imageSrc = getImageUrl(test.imageUrl);
  const colors = getTopicColors(test.topic.name);
  
  return (
    <button
      type="button"
      onClick={() => onClick(test)}
      className="
        group flex w-full cursor-pointer
        flex-row overflow-hidden
        border-2 border-[#111]
        bg-white text-left
        shadow-[3px_3px_0_rgba(0,0,0,0.15)]
        transition-all duration-150
        hover:-translate-y-px
        hover:bg-[#fffdf5]
        hover:shadow-[4px_4px_0_rgba(0,0,0,0.18)]
        active:translate-y-0
        active:shadow-none
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#ffc926]
        focus-visible:ring-offset-2
        h-[270px]
      "
    >
      {/* Thumbnail */}
      <div
        className="
          relative flex w-[35%] shrink-0
          items-center justify-center
          overflow-hidden border-r-2 border-slate-200
          bg-[#f8f9fa] p-3
        "
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={test.title}
            className="
              h-full w-full object-contain
              opacity-90 mix-blend-multiply
              transition-opacity group-hover:opacity-100
            "
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <span className="text-3xl font-black">W</span>
            <span className="text-xs font-bold">
              Writing Practice
            </span>
          </div>
        )}

        {/* Category */}
        {test.topic.name && (
          // <div
          //   className={`
          //     absolute left-0 top-0 max-w-[90%]
          //     truncate border-b-2 border-r-2 border-[#111]
          //     px-3 py-1 text-[11px] font-black
          //     ${colors.badge}
          //   `}
          // >
          <div
            className={`
              absolute left-0 top-0 max-w-[90%]
              truncate rounded-br-lg border-b-2 border-r-2 border-[#111]
              px-3 py-1 text-[11px] font-bold
              shadow-sm
              ${colors.badge}
            `}
          >
            {test.topic.name}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex w-[65%] flex-col justify-start p-4 sm:p-5">
        <h3
          className="
            mb-2 line-clamp-2
            text-sm font-bold leading-snug
            text-blue-600
            transition-colors
            group-hover:text-blue-700
          "
        >
          {test.title}
        </h3>

        {test.questionText && (
          <p className="line-clamp-3 text-[13px] leading-relaxed text-slate-600">
            {test.questionText}
          </p>
        )}


      </div>
    </button>
  );
}

export default WritingTestCard;
