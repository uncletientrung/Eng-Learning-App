import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import PartOfSpeechBadge from "./PartOfSpeechBadge";
import "./DefinitionCombobox.css";

export default function DefinitionCombobox({ options, value, onChange, disabled, labelId, descriptionId, placeholder, buttonId, className = "", renderOption, required, invalid }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const id = useId();
  const selectedIndex = options.findIndex((option) => option.id === value?.id);
  const expand = () => { if (disabled || !options.length) return; setActiveIndex(Math.max(0, selectedIndex)); setOpen(true); };
  const select = (index) => { if (!disabled && options[index]) onChange(options[index]); setOpen(false); };

  useEffect(() => {
    if (!open) return;
    const outside = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  useEffect(() => {
    if (open) listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  return (
    <div className={`vd-definition-combo ${className}`} ref={rootRef} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <button id={buttonId} type="button" role="combobox" aria-labelledby={labelId} aria-describedby={descriptionId} aria-required={required || undefined} aria-invalid={invalid || undefined} aria-haspopup="listbox" aria-expanded={open && !disabled} aria-controls={`${id}-list`} aria-activedescendant={open && !disabled ? `${id}-option-${activeIndex}` : undefined} disabled={disabled}
        className={`vd-definition-trigger ${open ? "is-open" : ""}`} onClick={() => open ? setOpen(false) : expand()}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!options.length) return;
            if (!open) expand();
            else setActiveIndex((index) => (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
          } else if (event.key === "Home" && open) { event.preventDefault(); setActiveIndex(0); }
          else if (event.key === "End" && open) { event.preventDefault(); setActiveIndex(options.length - 1); }
          else if (event.key === "Enter" || event.key === " ") { event.preventDefault(); if (open) select(activeIndex); else expand(); }
          else if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
        }}>
        {value ? <span className="vd-definition-value">{renderOption ? renderOption(value) : <><PartOfSpeechBadge type={value.type} /><span>{value.meaning}</span></>}</span> : <span className="vd-definition-placeholder">{placeholder || "Chọn loại từ và định nghĩa"}</span>}
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && !disabled && <ul ref={listRef} id={`${id}-list`} role="listbox" aria-labelledby={labelId} className="vd-definition-options">
        {options.map((option, index) => <li key={option.id} id={`${id}-option-${index}`} role="option" aria-selected={value?.id === option.id} data-active={activeIndex === index} onPointerDown={(event) => event.preventDefault()} onPointerMove={() => setActiveIndex(index)} onClick={() => select(index)}>
          {renderOption ? renderOption(option) : <><PartOfSpeechBadge type={option.type} /><span className="vd-definition-option-text">{option.meaning}</span></>}{value?.id === option.id && <Check size={17} aria-hidden="true" />}
        </li>)}
      </ul>}
    </div>
  );
}
