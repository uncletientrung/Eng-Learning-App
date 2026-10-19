import "./PartOfSpeechBadge.css";

const types = new Set(["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection", "determiner", "exclamation", "article", "numeral"]);
const vietnameseTypes = { "danh từ": "noun", "động từ": "verb", "tính từ": "adjective", "trạng từ": "adverb", "phó từ": "adverb", "đại từ": "pronoun", "giới từ": "preposition", "liên từ": "conjunction", "thán từ": "interjection", "cảm thán từ": "interjection", "từ hạn định": "determiner", "mạo từ": "article", "số từ": "numeral" };

export default function PartOfSpeechBadge({ type }) {
  const value = type.trim().toLowerCase();
  const colorType = vietnameseTypes[value] || value;
  return <span className={`vd-pos-badge vd-pos-${types.has(colorType) ? colorType : "other"}`}>{type.trim()}</span>;
}
