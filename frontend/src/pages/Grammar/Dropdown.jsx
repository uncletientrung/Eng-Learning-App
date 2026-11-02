
import { useState, useEffect, useRef } from "react";
import { topics } from './Mock Data/Topics';
export default function Dropdown({
    parent_id,
    options = topics.filter((topic) => topic.parentId == parent_id), //Data mặc định, mốt đổi
    value,
    onChange,
}) {
    const [internalValue, setInternalValue] = useState(
        options[0]?.id ?? ""
    );
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedId = value ?? internalValue;
    const selected =
        options.find((item) => item.id === selectedId) ?? options[0];

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    function selectTopic(topic) {
        setInternalValue(topic.id);
        onChange?.(topic);
        setOpen(false);
    }

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Dropdown trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                className="tid-nav flex w-full cursor-pointer
          items-center justify-between rounded-[10px]
          bg-[#ffc926] px-2.5 py-3.5 text-left"
            >
                <div className="min-w-0">
                    <div className="font-[family-name:var(--font-quicksand)]
            text-[14px] font-bold text-[#111]">
                        {selected?.title}
                    </div>

                    <div className="mt-px text-[11px] font-semibold
            text-[#666]">
                        {selected?.subtitle}
                    </div>
                </div>

                <span
                    className={`ml-3 shrink-0 text-[12px] text-[#555]
            transition-transform duration-200 ${open ? "rotate-180" : ""
                        }`}
                    aria-hidden="true"
                >
                    ▾
                </span>
            </button>

            {/* Dropdown options */}
            {open && (
                <ul
                    role="listbox"
                    aria-label="Chọn chủ đề"
                    className="absolute left-0 top-full z-50 mt-2
            max-h-64 w-full overflow-y-auto rounded-[10px]
            border border-black/10 bg-white p-1.5 shadow-lg"
                >
                    {options.map((topic) => {
                        const isSelected = topic.id === selected?.id;

                        return (
                            <li key={topic.id} role="option"
                                aria-selected={isSelected}>
                                <button
                                    type="button"
                                    onClick={() => selectTopic(topic)}
                                    className={`flex w-full items-center
                    justify-between rounded-lg px-2.5 py-3
                    text-left transition-colors ${isSelected
                                            ? "bg-[#ffc926]"
                                            : "hover:bg-gray-100"
                                        }`}
                                >
                                    <div>
                                        <div className="font-[family-name:var(--font-quicksand)]
                      text-[14px] font-bold text-[#111]">
                                            {topic.title}
                                        </div>

                                        <div className="mt-px text-[11px]
                      font-semibold text-[#666]">
                                            {topic.subtitle}
                                        </div>
                                    </div>

                                    {isSelected && (
                                        <span className="ml-2 text-sm text-[#555]"
                                            aria-hidden="true">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
