import { useEffect, useRef } from "react";

export default function VocabularyResourceDialog({ resource, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog ref={dialogRef} onClose={onClose} onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }} aria-labelledby="vocabulary-resource-title" aria-describedby="vocabulary-resource-description" className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border-0 bg-white p-0 text-slate-800 shadow-xl backdrop:bg-black/40">
      <div className="p-6">
        <h2 id="vocabulary-resource-title" className="text-2xl font-bold">{resource.title}</h2>
        <p id="vocabulary-resource-description" className="mt-4 leading-relaxed text-slate-600">{resource.description}</p>
        <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-green-800 px-5 py-2 font-semibold text-white hover:bg-green-900">Đóng</button>
      </div>
    </dialog>
  );
}
