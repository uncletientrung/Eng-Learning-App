const ResultStyles = () => (
    <style>{`
    @keyframes tid-sun-rain-fall {
      0%   { transform: translateY(0);    opacity: 0; }
      15%  { opacity: 1; }
      100% { transform: translateY(53px); opacity: 0; }
    }
    .tid-sun-rain { animation: tid-sun-rain-fall 1.1s linear infinite; }
    @media (prefers-reduced-motion: reduce) {
      .tid-sun-rain { animation: none; opacity: 0.8; }
    }
  `}</style>
);

const ResultLayout = ({ children }) => (
    <>
        <ResultStyles />
        <div
            className="min-h-screen relative overflow-hidden font-sans selection:bg-[#6a8042] selection:text-white"
            style={{ backgroundColor: "#6a8042" }}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-6 pb-20">
                {children}
            </div>
        </div>
    </>
);

export default ResultLayout;