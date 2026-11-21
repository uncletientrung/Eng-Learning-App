export const TOPIC_MODULES = [
  { value: "WRITING", label: "Writing" },
  { value: "SPEAKING", label: "Speaking" },
  { value: "VOCABULARY", label: "Vocabulary" },
  { value: "IDIOM", label: "Idioms" },
];

export function moduleLabel(moduleType) {
  return TOPIC_MODULES.find((module) => module.value === moduleType)?.label || moduleType;
}

const usageLabels = [
  ["writing", "Đề Writing"],
  ["speaking", "Đề Speaking"],
  ["vocabulary", "Từ vựng"],
  ["idioms", "Thành ngữ"],
  ["reading", "Đề Reading"],
  ["listening", "Đề Listening"],
  ["translation", "Đề Translation"],
];

export function getUsageParts(usage) {
  return usageLabels
    .map(([key, label]) => ({ key, label, count: usage?.[key] ?? 0 }))
    .filter((part) => part.count > 0);
}

export function getUsageTotal(usage) {
  return usageLabels.reduce((total, [key]) => total + (usage?.[key] ?? 0), 0);
}

export const topicButtonClass = {
  primary: [
    "inline-flex min-h-9.75 shrink-0 cursor-pointer items-center justify-center",
    "gap-1.75 rounded-[10px] border border-[#4f7cf7] bg-[#4f7cf7] px-3 py-2",
    "text-[11px] font-extrabold text-white no-underline hover:border-[#3d68d8]",
    "hover:bg-[#3d68d8] focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55",
  ].join(" "),
  outline: [
    "inline-flex min-h-9.75 shrink-0 cursor-pointer items-center justify-center",
    "gap-1.75 rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2",
    "text-[11px] font-extrabold text-[#1b1d22] no-underline hover:bg-[#f1f3f7]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55",
  ].join(" "),
  danger: [
    "inline-flex min-h-9.75 shrink-0 cursor-pointer items-center justify-center",
    "gap-1.75 rounded-[10px] border border-[#f1c1c5] bg-white px-3 py-2",
    "text-[11px] font-extrabold text-[#a63240] hover:bg-[#fff4f5]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#4f7cf7] disabled:cursor-not-allowed disabled:opacity-55",
  ].join(" "),
};

export const topicFieldClass = [
  "min-h-10 w-full rounded-[10px] border border-[#e4e7ed] bg-white px-3 py-2",
  "text-xs text-[#1b1d22] placeholder:text-[#9aa0ad] focus-visible:outline-2",
  "focus-visible:outline-offset-2 focus-visible:outline-[#4f7cf7]",
  "disabled:cursor-not-allowed disabled:bg-[#f1f3f7] disabled:text-[#6b7080]",
].join(" ");
