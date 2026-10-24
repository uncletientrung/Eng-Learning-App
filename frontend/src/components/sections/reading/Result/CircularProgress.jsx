const CircularProgress = ({ correct, wrong, skipped, total, size = 176 }) => {
    const C = 2 * Math.PI * 52;
    const correctLen = (correct / total) * C;
    const wrongLen = (wrong / total) * C;
    const skippedLen = (skipped / total) * C;

    return (
        <div className="relative shrink-0" style={{ width: size, height: size }}>
            <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90" aria-hidden="true">
                <circle cx="64" cy="64" r="52" fill="none" stroke="#ece8dc" strokeWidth="13" />
                {correct > 0 && (
                    <circle cx="64" cy="64" r="52" fill="none" stroke="rgb(63,145,66)" strokeWidth="13"
                            strokeDasharray={`${correctLen} ${C}`} strokeDashoffset={0} />
                )}
                {wrong > 0 && (
                    <circle cx="64" cy="64" r="52" fill="none" stroke="rgb(214,69,69)" strokeWidth="13"
                            strokeDasharray={`${wrongLen} ${C}`} strokeDashoffset={-correctLen} />
                )}
                {skipped > 0 && (
                    <circle cx="64" cy="64" r="52" fill="none" stroke="rgb(224,165,38)" strokeWidth="13"
                            strokeDasharray={`${skippedLen} ${C}`} strokeDashoffset={-(correctLen + wrongLen)} />
                )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-black leading-none tabular-nums" style={{ fontSize: 37, color: "#1e3006" }}>
          {correct}
            <span className="text-slate-400" style={{ fontSize: 21 }}>/{total}</span>
        </span>
                <span className="mt-1.5 font-bold uppercase tracking-widest text-slate-500" style={{ fontSize: 12 }}>
          câu đúng
        </span>
            </div>
        </div>
    );
};

export default CircularProgress;