const COMPOUND_TAILS = [
  "bộ từ vựng",
  "từ vựng",
  "bộ từ",
  "người dùng",
];

function splitTitle(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return { lead: "", tail: "" };

  const lower = trimmed.toLowerCase();
  for (const compound of COMPOUND_TAILS) {
    if (lower.endsWith(compound) && trimmed.length > compound.length) {
      const splitIndex = trimmed.length - compound.length;
      return {
        lead: trimmed.slice(0, splitIndex),
        tail: trimmed.slice(splitIndex),
      };
    }
  }

  const splitAt = trimmed.lastIndexOf(" ");
  if (splitAt > 0) {
    return {
      lead: trimmed.slice(0, splitAt + 1),
      tail: trimmed.slice(splitAt + 1),
    };
  }

  return { lead: "", tail: trimmed };
}

export default function AdminPageTitle({ title, highlight = true }) {
  const text = String(title ?? "").trim();
  if (!text) return null;

  if (highlight === false) {
    return (
      <h3
        className="m-0 text-2xl leading-tight font-black tracking-tight text-[#1e3006] md:text-3xl"
        style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}
      >
        {text}
      </h3>
    );
  }

  const { lead, tail } = splitTitle(text);

  return (
    <h3
      className="m-0 text-2xl leading-tight font-black tracking-tight text-[#1e3006] md:text-3xl"
      style={{ fontFamily: '"Segoe UI Black", "Segoe UI", sans-serif' }}
    >
      {lead}
      {tail && <span className="text-brand-dark">{tail}</span>}
    </h3>
  );
}
