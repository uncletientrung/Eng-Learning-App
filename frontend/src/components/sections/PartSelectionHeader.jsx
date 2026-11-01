import { IconHeadphones } from './listening/icons.jsx';

const PartSelectionHeader = ({ testName }) => {
    return (
        <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-4">
                <IconHeadphones />
                Luyện tập
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">
                {testName}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
                Chọn phần muốn luyện nghe
            </p>
        </div>
    );
};

export default PartSelectionHeader;