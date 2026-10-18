import { useEffect, useRef } from "react";
import { ChevronsUpDown, GripVertical } from "lucide-react";

const bands = Array.from({ length: 11 }, (_, index) => 9 - index * 0.5);
const clampBand = (value) => Math.max(4, Math.min(9, value));

export default function BandWheel({ band, onChange }) {
  const wheelRef = useRef(null);
  const dragRef = useRef(null);
  useEffect(() => {
    const wheel = wheelRef.current;
    let delta = 0;
    const onWheel = (event) => {
      event.preventDefault();
      delta += event.deltaY;
      if (Math.abs(delta) >= 30) {
        onChange(clampBand(band - Math.sign(delta) * .5));
        delta = 0;
      }
    };
    wheel.addEventListener("wheel", onWheel, { passive: false });
    return () => wheel.removeEventListener("wheel", onWheel);
  }, [band, onChange]);
  return (
    <div ref={wheelRef} role="slider" tabIndex={0} aria-label="Chọn band" aria-valuemin={4} aria-valuemax={9} aria-valuenow={band} aria-valuetext={band.toFixed(1)}
      className="absolute left-9 right-[70px] top-7 bottom-2.5 cursor-grab select-none touch-none rounded-[24px] outline-none focus-visible:ring-4 focus-visible:ring-white/70 active:cursor-grabbing"
      onKeyDown={(event) => {
        const values = { ArrowUp: band + .5, ArrowRight: band + .5, ArrowDown: band - .5, ArrowLeft: band - .5, Home: 4, End: 9 };
        if (event.key in values) { event.preventDefault(); onChange(clampBand(values[event.key])); }
      }}
      onPointerDown={(event) => {
        dragRef.current = { y: event.clientY, band };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (dragRef.current) onChange(clampBand(dragRef.current.band + Math.round((event.clientY - dragRef.current.y) / 40) * .5));
      }}
      onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }}>
      <div className="absolute inset-x-0 top-1/2 -mt-[39px] flex h-[78px] items-center justify-between rounded-[24px] bg-white px-[18px] text-[#c3c6ce] shadow-[0_22px_38px_-16px_rgba(107,74,0,.5)]"><GripVertical size={22} /><ChevronsUpDown size={20} className="text-[#f0512d]" /></div>
      <div className="pointer-events-none absolute inset-0 [perspective:700px] [mask-image:linear-gradient(transparent,#000_28%,#000_72%,transparent)]">
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:translateZ(-120px)]">
          {bands.map((value) => {
            const angle = (value - band) * 48;
            return <div key={value} className="absolute inset-x-0 top-1/2 -mt-7 flex h-14 items-center justify-center [backface-visibility:hidden]" style={{ transform: `rotateX(${angle}deg) translateZ(120px)`, opacity: Math.max(0, 1 - Math.abs(angle) / 110), transition: "transform .5s cubic-bezier(.2,.9,.3,1.15), opacity .5s" }}><span className="font-bold leading-none tracking-[-0.03em]" style={{ fontSize: value === band ? 50 : 34, color: value === band ? "#1b1d22" : "#6b4a00" }}>{value.toFixed(1)}</span></div>;
          })}
        </div>
      </div>
    </div>
  );
}
