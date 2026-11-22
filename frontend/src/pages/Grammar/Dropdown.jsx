import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';

function normalizeSearch(text) {
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
}

export default function Dropdown({ options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const rootRef = useRef(null);
    const buttonRef = useRef(null);
    const listRef = useRef(null);
    const searchRef = useRef(null);
    const selected = options.find((option) => option.id === value);
    const showSearch = options.length > 7;
    const filteredOptions = options.filter((option) => normalizeSearch(option.name).includes(normalizeSearch(search.trim())));
    const focusableOptionId = filteredOptions.find((option) => option.id === value)?.id ?? filteredOptions[0]?.id;

    function close() {
        setOpen(false);
        setSearch('');
    }

    useEffect(() => {
        if (!open) return undefined;

        if (searchRef.current) searchRef.current.focus();
        else listRef.current?.querySelector('[aria-selected="true"]')?.focus();
        function handlePointerDown(event) {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
                setSearch('');
            }
        }
        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [open]);

    function handleKeyDown(event) {
        if (event.key === 'Escape' && open) {
            event.preventDefault();
            close();
            buttonRef.current?.focus();
            return;
        }

        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        if (event.target === searchRef.current && ['Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (!open) {
            setOpen(true);
            return;
        }

        const items = [...listRef.current.querySelectorAll('[role="option"]')];
        if (items.length === 0) return;
        const index = items.indexOf(document.activeElement);
        let nextIndex;
        if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = items.length - 1;
        else if (event.key === 'ArrowDown') nextIndex = (index + 1) % items.length;
        else nextIndex = index <= 0 ? items.length - 1 : index - 1;
        items[nextIndex]?.focus();
    }

    function selectOption(option) {
        onChange(option);
        close();
        buttonRef.current?.focus();
    }

    return (
        <div
            ref={rootRef}
            className="relative mt-2"
            onKeyDown={handleKeyDown}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) close();
            }}
        >
            <button
                ref={buttonRef}
                id="grammar-topic"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={open ? 'grammar-topic-options' : undefined}
                onClick={() => open ? close() : setOpen(true)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-[#344b22] bg-white px-4 py-3 text-left text-sm font-bold text-[#344b22] shadow-[3px_3px_0_#344b2233] transition-colors hover:bg-[#fff1c2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#557539]"
            >
                <span className="min-w-0 break-words">{selected?.name}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ">
                    <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </span>
            </button>

            {open && (
                <div
                    className="absolute left-0 right-0 top-full z-30 mt-2 rounded-xl border-2 border-[#344b22] bg-white p-1.5 shadow-[0_8px_24px_#344b2233]"
                >
                    {showSearch && (
                        <div className="mb-1.5 flex items-center gap-2 rounded-lg border border-[#d6d8cc] px-3 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#557539]">
                            <Search size={16} className="shrink-0 text-[#74786a]" aria-hidden="true" />
                            <input
                                ref={searchRef}
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                aria-label="Tìm chủ đề"
                                placeholder="Tìm chủ đề..."
                                className="min-w-0 w-full bg-transparent py-2.5 text-sm text-[#222] outline-none"
                            />
                        </div>
                    )}
                    <div
                        ref={listRef}
                        id="grammar-topic-options"
                        role="listbox"
                        aria-label="Danh sách chủ đề"
                        className="max-h-60 overflow-y-auto"
                    >
                        {filteredOptions.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                role="option"
                                aria-selected={option.id === value}
                                tabIndex={option.id === focusableOptionId ? 0 : -1}
                                onClick={() => selectOption(option)}
                                className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#557539] ${option.id === value ? 'bg-[#fff1c2] text-[#5b491c]' : 'text-[#444] hover:bg-[#f8f6ed]'}`}
                            >
                                <span className="min-w-0 break-words">{option.name}</span>
                                {option.id === value && <Check size={16} className="shrink-0" aria-hidden="true" />}
                            </button>
                        ))}
                    </div>
                    {filteredOptions.length === 0 && <p role="status" className="px-3 py-3 text-sm text-[#74786a]">Không tìm thấy chủ đề.</p>}
                </div>
            )}
        </div>
    );
}
