const ReviewLayout = ({ children }) => (
    <div className="relative bg-[#6a8042] overflow-hidden">
        <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
                backgroundImage:
                    "linear-gradient(rgb(255,255,255) 1px,transparent 1px),linear-gradient(90deg,rgb(255,255,255) 1px,transparent 1px)",
                backgroundSize: "28px 28px",
            }}
        />
        <div className="relative z-10 px-6 pt-6 pb-8 md:px-10 max-w-5xl mx-auto">
            {children}
        </div>
    </div>
);

export default ReviewLayout;