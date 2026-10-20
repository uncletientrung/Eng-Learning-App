import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const mascotRef = useRef(null);
    const faceGroupRef = useRef(null);
    const eyePathRef = useRef(null);

    useEffect(() => {
        const mascot = mascotRef.current;
        const faceGroup = faceGroupRef.current;
        const eyePath = eyePathRef.current;

        if (!mascot || !faceGroup || !eyePath) return;

        const normalEyeD = eyePath.getAttribute('d');
        const winkEyeD = 'M0 3 Q 2 5 4 3';

        let center = null;
        const updateCenter = () => {
            const rect = mascot.getBoundingClientRect();
            center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
        };

        let targetX = 0, targetY = 0, targetRot = 0;
        let currentX = 0, currentY = 0, currentRot = 0;
        let vx = 0, vy = 0, vRot = 0;

        const stiffness = 180;
        const damping = 20;
        const mass = 0.5;
        let animationFrameId;
        let lastTime = performance.now();

        const handleMouseMove = (e) => {
            if (!center) updateCenter();
            const dx = Math.max(-400, Math.min(400, e.clientX - center.x));
            const dy = Math.max(-400, Math.min(400, e.clientY - center.y));

            targetX = (dx / 400) * 3;
            targetY = (dy / 400) * 2;
            targetRot = (dx / 400) * 4;
        };

        const handleResize = () => { center = null; };
        const handleScroll = () => { center = null; };

        const handleMouseEnter = () => {
            eyePath.setAttribute('d', winkEyeD);
            eyePath.setAttribute('stroke', '#121212');
            eyePath.setAttribute('stroke-width', '0.8');
            eyePath.setAttribute('stroke-linecap', 'round');
            eyePath.setAttribute('fill', 'none');
            eyePath.setAttribute('transform', 'translate(1, 1)');
        };

        const handleMouseLeave = () => {
            if (normalEyeD) {
                eyePath.setAttribute('d', normalEyeD);
                eyePath.removeAttribute('stroke');
                eyePath.removeAttribute('stroke-width');
                eyePath.removeAttribute('stroke-linecap');
                eyePath.setAttribute('fill', '#121212');
                eyePath.removeAttribute('transform');
            }
        };

        const step = (now) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            const fx = -stiffness * (currentX - targetX) - damping * vx;
            vx += (fx / mass) * dt;
            currentX += vx * dt;

            const fy = -stiffness * (currentY - targetY) - damping * vy;
            vy += (fy / mass) * dt;
            currentY += vy * dt;

            const fRot = -stiffness * (currentRot - targetRot) - damping * vRot;
            vRot += (fRot / mass) * dt;
            currentRot += vRot * dt;

            if (faceGroup) {
                faceGroup.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
            }
            if (mascot) {
                mascot.style.transform = `rotate(${currentRot.toFixed(2)}deg)`;
                mascot.style.transformOrigin = '50% 100%';
            }

            animationFrameId = requestAnimationFrame(step);
        };

        animationFrameId = requestAnimationFrame(step);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, { passive: true });
        mascot.addEventListener('mouseenter', handleMouseEnter);
        mascot.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
            mascot.removeEventListener('mouseenter', handleMouseEnter);
            mascot.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLogin) {
            alert("Đăng ký thành công! Vui lòng đăng nhập lại.");
            setIsLogin(true);
        } else {
            alert("Đăng nhập thành công!");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#fafaf7] flex flex-col items-center justify-center relative overflow-hidden font-sans px-4 py-10">



            {/* Background Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            ></div>

            <div className="relative w-full max-w-[520px] flex flex-col items-center">

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[160px] bg-amber-300/40 rounded-full blur-[50px] pointer-events-none"></div>

                <div className="overflow-hidden flex justify-center" style={{ height: '130px', width: '220px' }}>
                    <div className="mt-auto">
                        <div
                            ref={mascotRef}
                            className="w-[220px] h-[220px] cursor-pointer"
                            style={{ transformOrigin: '50% 100%' }}
                        >
                            <svg viewBox="0 0 63 63" fill="none" className="w-full h-full drop-shadow-2xl overflow-visible">
                                <path transform="translate(0 3)" d="M59.6769 32.8159C59.678 32.8171 59.6799 32.8171 59.6811 32.816L61.8572 30.8637C62.089 30.6557 62.0742 30.2881 61.8264 30.0994L59.903 28.635C59.6806 28.4657 59.6418 28.1463 59.8172 27.9287L61.3339 26.0473C61.5293 25.8049 61.4557 25.4444 61.1809 25.2979L59.0489 24.1618C58.8023 24.0304 58.7127 23.7213 58.8509 23.4784L60.046 21.378C60.2 21.1073 60.0696 20.7634 59.7748 20.6629L57.4874 19.8829C57.2229 19.7927 57.085 19.502 57.1824 19.2401L58.0254 16.9754C58.134 16.6836 57.9501 16.3649 57.6431 16.313L55.2598 15.9099C54.9843 15.8633 54.8016 15.5985 54.8557 15.3244L55.324 12.9531C55.3843 12.6477 55.1517 12.3627 54.8403 12.3607L52.424 12.3451C52.1445 12.3433 51.9217 12.1113 51.9312 11.832L52.0134 9.41618C52.024 9.10493 51.7486 8.86096 51.4409 8.90897L49.0527 9.28161C48.7766 9.32469 48.5194 9.13143 48.484 8.85426L48.1772 6.45693C48.1377 6.14803 47.8267 5.95144 47.5307 6.04822L45.2343 6.79906C44.9687 6.88591 44.6838 6.73639 44.6043 6.46846L43.9171 4.15114C43.8286 3.8526 43.4902 3.7084 43.2135 3.85133L41.0662 4.96077C40.8179 5.08904 40.5128 4.98714 40.3914 4.73544L39.3415 2.55843C39.2062 2.27792 38.849 2.18988 38.5989 2.37539L36.6579 3.81485C36.4334 3.9813 36.1159 3.92971 35.9557 3.70078L34.5699 1.72062C34.3914 1.46552 34.0248 1.43592 33.8076 1.65908L32.1221 3.39132C31.9273 3.59157 31.6056 3.59157 31.4108 3.39132L29.7253 1.65908C29.5081 1.43592 29.1415 1.46552 28.963 1.72062L27.5772 3.70078C27.417 3.92971 27.0995 3.9813 26.875 3.81485L24.934 2.37539C24.6839 2.18988 24.3267 2.27792 24.1914 2.55843L23.1415 4.73544C23.0201 4.98714 22.715 5.08904 22.4667 4.96077L20.3194 3.85133C20.0427 3.7084 19.7043 3.8526 19.6158 4.15114L18.9286 6.46846C18.8491 6.73639 18.5642 6.88591 18.2986 6.79906L16.0022 6.04822C15.7062 5.95144 15.3952 6.14803 15.3557 6.45693L15.0489 8.85426C15.0135 9.13143 14.7563 9.32469 14.4802 9.28161L12.092 8.90897C11.7843 8.86096 11.509 9.10494 11.5195 9.41619L11.6017 11.831C11.6112 12.1102 11.3884 12.3423 11.1089 12.3441L8.69253 12.3597C8.38116 12.3617 8.14853 12.6466 8.20887 12.9521L8.67717 15.3232C8.73132 15.5974 8.5485 15.8622 8.27292 15.9087L5.88999 16.3111C5.58287 16.3629 5.39888 16.6816 5.5075 16.9735L6.35053 19.2391C6.44798 19.501 6.31007 19.7917 6.04557 19.8819L3.75809 20.6618C3.46334 20.7623 3.33291 21.1063 3.48691 21.377L4.68194 23.4773C4.82015 23.7202 4.7306 24.0293 4.48392 24.1607L2.35112 25.2969C2.07623 25.4433 2.00261 25.8039 2.19808 26.0464L3.71467 27.9278C3.89004 28.1453 3.85129 28.4647 3.62899 28.634L1.70633 30.0984C1.4586 30.287 1.44382 30.6546 1.6756 30.8626L3.4741 32.4762C3.68213 32.6628 3.69507 32.9844 3.50271 33.1871L1.83956 34.9403C1.62518 35.1662 1.66955 35.5315 1.93178 35.6996L3.96603 37.0036C4.20134 37.1544 4.26573 37.4698 4.10838 37.7008L2.74849 39.6974C2.57317 39.9548 2.67551 40.3082 2.96126 40.4321L5.17856 41.3934C5.43494 41.5045 5.54904 41.8053 5.43086 42.0586L4.40853 44.2492C4.27682 44.5314 4.43456 44.8637 4.73647 44.9401L7.07894 45.533C7.3499 45.6016 7.5108 45.8803 7.43469 46.1493L6.7766 48.4749C6.6918 48.7745 6.90078 49.0774 7.21106 49.1044L9.61794 49.3141C9.89635 49.3383 10.0998 49.5876 10.0679 49.8652L9.7916 52.2658C9.75599 52.5752 10.0108 52.8406 10.3214 52.8175L12.7313 52.6383C13.01 52.6175 13.2509 52.8309 13.2639 53.11L13.3765 55.5234C13.3911 55.8345 13.6851 56.0555 13.9879 55.9829L16.3377 55.4197C16.6094 55.3546 16.8813 55.5265 16.939 55.7999L17.4378 58.1656C17.502 58.4703 17.8278 58.6413 18.1151 58.521L20.3444 57.5873C20.6022 57.4793 20.8982 57.6054 20.999 57.8661L21.8703 60.1202C21.9826 60.4107 22.3315 60.5272 22.5958 60.3624L24.6466 59.0837C24.8838 58.9359 25.1962 59.0129 25.3374 59.2541L26.5587 61.3396C26.7161 61.6083 27.0792 61.6674 27.3137 61.4623L29.1328 59.8713C29.3431 59.6873 29.6638 59.7132 29.8419 59.9286L31.3819 61.7909C31.5804 62.0309 31.9484 62.0309 32.1468 61.7909L33.6867 59.9287C33.8648 59.7133 34.1856 59.6874 34.396 59.8714L36.2142 61.4622C36.4486 61.6673 36.8117 61.6083 36.9692 61.3396L38.1903 59.255C38.3315 59.0139 38.6439 58.9369 38.881 59.0847L40.932 60.3634C41.1962 60.5282 41.5451 60.4117 41.6574 60.1213L42.5287 57.8672C42.6295 57.6065 42.9255 57.4804 43.1833 57.5883L45.4127 58.522C45.7 58.6423 46.0257 58.4714 46.09 58.1666L46.5888 55.801C46.6464 55.5276 46.9183 55.3556 47.1901 55.4207L49.5398 55.9839C49.8426 56.0565 50.1367 55.5244 50.2638 53.1101C50.2769 52.8309 50.5177 52.6175 50.7964 52.6383L53.2063 52.8175C53.5169 52.8406 53.7717 52.5752 53.7361 52.2659L53.4599 49.8652C53.4279 49.5876 53.6314 49.3383 53.9098 49.3141L56.3168 49.1044C56.627 49.0773 56.836 48.7746 56.7513 48.475L56.0939 46.1492C56.0178 45.8803 56.1788 45.6016 56.4497 45.5331L58.7933 44.9401C59.0952 44.8637 59.2529 44.5313 59.1212 44.2491L58.099 42.0586C57.9808 41.8053 58.0949 41.5045 58.3513 41.3934L60.5686 40.432C60.8543 40.3082 60.9567 39.9548 60.7814 39.6974L59.4213 37.6997C59.264 37.4687 59.3284 37.1534 59.5637 37.0026L61.5981 35.6985C61.8603 35.5305 61.9047 35.1652 61.6904 34.9392L59.6769 32.8159Z" fill="#F3A20F"></path>
                                <path transform="translate(0 3)" d="M33.9219 58.4115C33.9213 58.4109 33.9205 58.4106 33.9196 58.4106H29.6499C29.6233 58.4106 29.5967 58.4084 29.5704 58.4042L25.3921 57.7254C25.3658 57.7211 25.3398 57.7147 25.3145 57.7063L21.2955 56.3649C21.2702 56.3565 21.2457 56.346 21.2221 56.3336L17.4802 54.3704C17.4566 54.358 17.434 54.3437 17.4126 54.3277L14.0207 51.7788C13.9993 51.7628 13.9793 51.7451 13.9609 51.7259L11.0307 48.6749C11.0122 48.6557 10.9953 48.635 10.9802 48.6131L8.57647 45.1308C8.56132 45.1089 8.54797 45.0858 8.53654 45.0617L6.72139 41.2365C6.70996 41.2124 6.70049 41.1875 6.69307 41.1618L5.51403 37.0921C5.50662 37.0665 5.50127 37.0403 5.49806 37.0139L4.98773 32.8143C4.98451 32.7879 4.98343 32.7612 4.9845 32.7345L5.15493 28.5014C5.156 28.4748 5.15922 28.4483 5.16456 28.4221L6.01073 24.2774C6.01606 24.2513 6.0235 24.2256 6.03296 24.2007L7.53566 20.2395C7.54511 20.2146 7.55656 20.1905 7.56989 20.1674L9.68539 16.5036C9.69872 16.4805 9.71389 16.4585 9.73076 16.4379L12.4084 13.1586C12.4252 13.1379 12.4438 13.1187 12.4637 13.101L15.6345 10.2924C15.6544 10.2748 15.6758 10.2587 15.6983 10.2445L19.2779 7.98083C19.3005 7.96657 19.3241 7.95415 19.3487 7.94369L23.2408 6.28583C23.2653 6.27538 23.2906 6.26693 23.3165 6.26055L27.4299 5.24691C27.4558 5.24053 27.4822 5.23625 27.5087 5.23411L31.7275 4.89318C31.7541 4.89103 31.7808 4.89103 31.8074 4.89318L36.0273 5.2341C36.0539 5.23625 36.0802 5.24054 36.1061 5.24693L40.2164 6.26054C40.2423 6.26692 40.2676 6.27538 40.2921 6.28583L44.1853 7.94475C44.2098 7.95519 44.2334 7.96759 44.2559 7.98182L47.8366 10.2455C47.8592 10.2598 47.8806 10.2758 47.9005 10.2935L51.0682 13.1C51.0881 13.1176 51.1066 13.1369 51.1234 13.1575L53.8042 16.4399C53.8211 16.4606 53.8363 16.4826 53.8496 16.5057L55.964 20.1684C55.9774 20.1915 55.9888 20.2157 55.9983 20.2406L57.4989 24.1987C57.5084 24.2236 57.5158 24.2493 57.5211 24.2754L58.3684 28.4263C58.3737 28.4524 58.3769 28.4789 58.378 28.5056L58.5484 32.7314C58.5495 32.7581 58.5484 32.7848 58.5452 32.8112L58.0348 37.0169C58.0316 37.0434 58.0263 37.0696 58.0189 37.0952L56.8409 41.1639C56.8335 41.1895 56.824 41.2145 56.8125 41.2386L54.9995 45.0586C54.988 45.0827 54.9747 45.1058 54.9595 45.1277L52.5517 48.6151C52.5366 48.6371 52.5197 48.6577 52.5013 48.6769L49.571 51.728C49.5525 51.7472 49.5325 51.7649 49.5112 51.7809L46.1243 54.3266C46.103 54.3427 46.0804 54.3569 46.0568 54.3693L42.3109 56.3357C42.2872 56.3481 42.2627 56.3585 42.2374 56.367L38.2225 57.7073C38.1972 57.7157 38.1713 57.7221 38.145 57.7264L33.9246 58.4124C33.9236 58.4126 33.9226 58.4122 33.9219 58.4115Z" fill="#F3ECD2" stroke="#1f2937" strokeWidth="0.2"></path>
                                <path transform="translate(0 3) translate(31.75 31.75) scale(1.08) translate(-31.75 -31.75)" d="M31.7666 7.90735C18.6034 7.90737 7.93262 18.5781 7.93262 31.7413C7.93264 44.9045 18.6034 55.5753 31.7666 55.5753C44.9298 55.5753 55.6006 44.9045 55.6006 31.7413C55.6006 18.5781 44.9298 7.90735 31.7666 7.90735Z" fill="#F3A20F" stroke="#1f2937" strokeWidth="0.2"></path>

                                <g ref={faceGroupRef} style={{ transformOrigin: '50% 50%', transformBox: 'fill-box' }}>
                                    <g transform="translate(27, 20) scale(0.6)">
                                        <path d="M11.7105 1.98509C11.7105 3.08142 12.5992 3.97018 13.6956 3.97018C14.7919 3.97018 15.6807 3.08142 15.6807 1.98509C15.6807 0.888755 14.7919 0 13.6956 0C12.5992 0 11.7105 0.888755 11.7105 1.98509Z" fill="#121212"></path>
                                        <path ref={eyePathRef} d="M3.48091e-05 2.97764C3.48091e-05 4.07398 0.88879 4.96273 1.98512 4.96273C3.08146 4.96273 3.97021 4.07398 3.97021 2.97764C3.97021 1.88131 3.08146 0.992554 1.98512 0.992554C0.88879 0.992554 3.48091e-05 1.88131 3.48091e-05 2.97764Z" fill="#121212"></path>
                                        <path d="M4.36526 10.0526C5.48807 11.3236 7.37792 12.4373 8.99134 12.3823C10.3455 12.3362 11.3858 12.1855 12.582 11.4026C13.4381 10.8424 13.9967 10.0329 14.7406 8.66282" stroke="#121212" strokeWidth="0.8" strokeLinecap="round"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="w-full bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden -mt-1">

                    {/* Header Tabs */}
                    <div className="bg-[#1e3006] px-6 py-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative w-[56px] h-[48px] rounded-xl overflow-hidden shadow-sm border border-slate-100">
                                <img
                                    alt="The IELTS Dictionary Logo"
                                    className="h-full w-full object-cover"
                                    src="/assets/logo-finall.png"
                                />
                            </div>
                            <div>
                                <p className="text-white font-black text-sm leading-none">The IELTS Dictionary</p>
                                <p className="text-amber-300 text-[10px] font-bold mt-0.5 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-amber-300 rounded-full inline-block animate-pulse"></span>Trực tuyến
                                </p>
                            </div>
                        </div>

                        {/* LOGIC CHUYỂN TAB */}
                        <div className="flex bg-black/20 rounded-full p-0.5 gap-0.5">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${isLogin ? 'bg-white text-[#1e3006]' : 'text-white/60 hover:text-white'}`}
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${!isLogin ? 'bg-white text-[#1e3006]' : 'text-white/60 hover:text-white'}`}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>

                    <div className="px-7 pt-6 pb-7">
                        <div className="mb-5">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight">
                                {isLogin ? 'Chào mừng trở lại 👋' : 'Tạo tài khoản mới 🚀'}
                            </h2>
                            <p className="text-slate-400 text-xs font-medium mt-1">
                                {isLogin ? 'Đăng nhập để tiếp tục lộ trình học tập của bạn.' : 'Bắt đầu hành trình chinh phục IELTS ngay hôm nay.'}
                            </p>
                        </div>

                        <div className="mb-5">
                            <button type="button" className="relative w-full h-[56px] flex items-center justify-center gap-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-black text-[15px] shadow-[0_3px_0_rgba(15,23,42,0.10)] hover:border-[#8b9b63] hover:bg-[#fffadd]/50 hover:shadow-[0_3px_0_rgba(106,128,66,0.30)] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-60 disabled:pointer-events-none">
                                <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-amber-400 text-[#1e3006] text-[9px] font-black uppercase tracking-widest shadow-sm">Khuyên dùng</span>
                                <svg className="w-[22px] h-[22px] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                </svg>
                                {isLogin ? 'Đăng nhập bằng Google' : 'Đăng ký bằng Google'}
                            </button>

                            <div className="relative mt-5">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-100"></span>
                                </div>
                                <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[3px] text-slate-300">
                                    <span className="bg-white px-4">Hoặc dùng email</span>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-3" onSubmit={handleSubmit}>

                            {/* Ô Họ tên chỉ hiện khi Đăng ký */}
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Họ và tên</label>
                                    <div className="relative group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5a6d38] transition-colors" aria-hidden="true">
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                        <input type="text" placeholder="Nguyễn Văn A" required={!isLogin} className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-[#6a8042] focus:bg-white outline-none transition-all text-sm font-semibold placeholder:text-slate-300 text-slate-800" name="fullname" />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Email</label>
                                <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5a6d38] transition-colors" aria-hidden="true">
                                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                    </svg>
                                    <input type="email" placeholder="email@example.com" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-[#6a8042] focus:bg-white outline-none transition-all text-sm font-semibold placeholder:text-slate-300 text-slate-800" name="email" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between pl-1 pr-1">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Mật khẩu</label>
                                    {isLogin && (
                                        <button type="button" className="text-[11px] font-bold text-[#5a6d38] hover:text-[#4a592e] cursor-pointer hover:underline transition-colors">Quên mật khẩu?</button>
                                    )}
                                </div>
                                <div className="relative group">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5a6d38] transition-colors" aria-hidden="true">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    <input type="password" placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-[#6a8042] focus:bg-white outline-none transition-all text-sm font-semibold placeholder:text-slate-400 text-slate-800" name="password" />
                                </div>
                            </div>

                            {/* Ô Xác nhận mật khẩu chỉ hiện khi Đăng ký */}
                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest pl-1">Xác nhận mật khẩu</label>
                                    <div className="relative group">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#5a6d38] transition-colors" aria-hidden="true">
                                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        <input type="password" placeholder="••••••••" required={!isLogin} className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:border-[#6a8042] focus:bg-white outline-none transition-all text-sm font-semibold placeholder:text-slate-400 text-slate-800" name="confirmPassword" />
                                    </div>
                                </div>
                            )}

                            <div className="pt-2">
                                <button type="submit" className="w-full bg-[#5a6d38] hover:bg-[#1e3006] text-white font-black py-4 rounded-2xl shadow-lg shadow-[#5a6d38]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 text-sm uppercase tracking-widest h-[52px]">
                                    {isLogin ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                </button>
                            </div>
                        </form>

                        {/* NÚT CHUYỂN ĐỔI DƯỚI FORM */}
                        <div className="mt-6 text-center text-[11px] font-bold text-slate-500">
                            {isLogin ? (
                                <>Chưa có tài khoản? <button onClick={() => setIsLogin(false)} className="text-[#5a6d38] hover:text-[#1e3006] hover:underline transition-colors ml-1">Đăng ký ngay</button></>
                            ) : (
                                <>Đã có tài khoản? <button onClick={() => setIsLogin(true)} className="text-[#5a6d38] hover:text-[#1e3006] hover:underline transition-colors ml-1">Đăng nhập ngay</button></>
                            )}
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-1.5 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check" aria-hidden="true">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            Thông tin được bảo mật tuyệt đối
                        </div>

                    </div>
                </div>

                <Link to="/" className="mt-6 text-slate-400 hover:text-slate-600 text-xs font-bold transition-colors tracking-wide">
                    ← Quay về trang chủ
                </Link>

            </div>
        </div>
    );
};

export default LoginPage;