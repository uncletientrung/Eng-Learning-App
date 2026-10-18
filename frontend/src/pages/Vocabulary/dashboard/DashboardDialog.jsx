import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function DashboardDialog({ notice, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return <dialog ref={ref} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="vd-dialog-title" aria-describedby="vd-dialog-description" className="vd-dialog">
    <div className="flex items-center justify-between gap-4"><h2 id="vd-dialog-title" className="text-xl font-bold">{notice.title}</h2><button type="button" onClick={onClose} aria-label="Đóng" className="vd-icon-button"><X size={20} /></button></div>
    <p id="vd-dialog-description" className="mt-4 leading-relaxed text-d-mute">{notice.description}</p>
    <button type="button" onClick={onClose} className="mt-6 rounded-xl bg-d-accent px-5 py-2 font-bold text-white">Đóng</button>
  </dialog>;
}
