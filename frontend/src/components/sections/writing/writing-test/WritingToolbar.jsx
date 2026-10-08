function WritingToolbar({
  fontSize,
  onFontSizeChange,
  fontFamily,
  onFontFamilyChange,
}) {
  return (
    <div className="
      flex items-center
      gap-2
      px-6 py-2.5
      border-b border-slate-100
      bg-slate-50/60
      shrink-0
      flex-wrap
    ">

      <span className="
        text-[10px]
        font-bold
        text-slate-500
        tracking-wider
        uppercase
      ">
        Font
      </span>

      <div className="flex gap-0.5">    
        <button
            type="button"
            onClick={() => onFontFamilyChange('Arial, sans-serif')}
            style={{ fontFamily: 'Arial, sans-serif'}}
            className={`
            px-2 py-1 text-[11px] rounded font-bold
            ${
                fontFamily === 'Arial, sans-serif'
                ? 'bg-slate-800 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }
            `}
        >
            Arial
        </button>

        <button
            type="button"
            onClick={() => onFontFamilyChange('Times New Roman, serif')}
            style={{ fontFamily: 'Times New Roman, serif' }}
            className={`
            px-2 py-1 text-[11px] rounded font-bold
            ${
                fontFamily === 'Times New Roman, serif'
                ? 'bg-slate-800 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }
            `}
        >
            Times New Roman
        </button>

        <button
            type="button"
            onClick={() => onFontFamilyChange('Georgia, serif')}
            style={{ fontFamily: 'Georgia, serif' }}
            className={`
            px-2 py-1 text-[11px] rounded font-bold
            ${
                fontFamily === 'Georgia, serif'
                ? 'bg-slate-800 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }
            `}
        >
            Georgia
        </button>

        <button
            type="button"
            onClick={() => onFontFamilyChange('Verdana, sans-serif')}
            style={{ fontFamily: 'Verdana, sans-serif' }}
            className={`
            px-2 py-1 text-[11px] rounded font-bold
            ${
                fontFamily === 'Verdana, sans-serif'
                ? 'bg-slate-800 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }
            `}
        >
            Verdana
        </button>

        <button
            type="button"
            onClick={() => onFontFamilyChange('Courier New, monospace')}
            style={{ fontFamily: 'Courier New, monospace' }}
            className={`
            px-2 py-1 text-[11px] rounded font-bold 
            ${
                fontFamily === 'Courier New, monospace'
                ? 'bg-slate-800 text-white'
                : 'text-slate-500 hover:bg-slate-100'
            }
            `}
        >
            Courier New
        </button>

        </div>

      <div className="w-px h-5 bg-slate-700 mx-1" />

      <span className="
        text-[10px]
        font-bold
        text-slate-500
        tracking-wider
        uppercase
      ">
        Cỡ chữ
      </span>

      <button
        onClick={() =>
          onFontSizeChange(
            Math.max(12, fontSize - 1)
          )
        }
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-300"
      >
        A−
      </button>

      <span className="text-[12px] min-w-[30px] text-center border-spacing-0.5">
        {fontSize}px
      </span>

      <button
        onClick={() =>
          onFontSizeChange(
            Math.min(32, fontSize + 1)
          )
        }
        className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-300"
      >
        A+
      </button>

    </div>
  )
}

export default WritingToolbar