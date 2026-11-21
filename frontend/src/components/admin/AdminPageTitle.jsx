export default function AdminPageTitle({ title }) {
  const text = String(title ?? "").trim();
  const splitAt = text.lastIndexOf(" ");
  const lead = splitAt > 0 ? text.slice(0, splitAt + 1) : "";
  const tail = splitAt > 0 ? text.slice(splitAt + 1) : text;

  return (
    <h3
      className="m-0 text-2xl leading-tight font-black tracking-tight text-[#1e3006] md:text-3xl"
      style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}
    >
      {lead}
      <span className="text-brand-dark">{tail}</span>
    </h3>
  );
}
