import "./PartOfSpeechBadge.css";

const types = new Set(["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection", "determiner", "exclamation", "article", "numeral"]);

export default function PartOfSpeechBadge({ type }) {
  const value = type.trim().toLowerCase();
  return <span className={`vd-pos-badge vd-pos-${types.has(value) ? value : "other"}`}>{value}</span>;
}
