export default function TopicStatusBadge({ isActive }) {
  return (
    <span
      className={`
        inline-flex min-h-5.75 items-center whitespace-nowrap
        rounded-full px-2 py-0.75 text-[9px] font-black
        ${isActive ? "bg-[#e7f7ee] text-[#188452]" : "bg-[#fce9eb] text-[#b63a48]"}
      `}
    >
      {isActive ? "Đang dùng" : "Đã ẩn"}
    </span>
  );
}
