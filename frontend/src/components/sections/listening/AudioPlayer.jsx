import { useState, useRef } from "react";
import { IconHeadphones, IconPlay, IconPause } from "./icons";

const AudioPlayer = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const audioRef = useRef(null);

    const formatTime = (secs) => {
        if (!secs || isNaN(secs)) return "00:00";
        const m = Math.floor(secs / 60);
        const s = Math.floor(secs % 60);
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.pause();
            else audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    const changeSpeed = () => {
        const speeds = [1, 1.25, 1.5, 2];
        const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
        setPlaybackSpeed(nextSpeed);
        if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="flex items-center gap-2.5 md:gap-3.5 px-3 md:px-4 pt-1.5 pb-2 overflow-x-auto border-t-2 border-[rgba(26,26,18,0.12)]">
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
                onEnded={() => setIsPlaying(false)}
            />

            <span className="w-[30px] h-[30px] shrink-0 hidden sm:flex items-center justify-center rounded-[9px] bg-white border-[2.5px] border-[#1a1a12]">
        <IconHeadphones />
      </span>

            <button
                onClick={togglePlay}
                className="w-[36px] h-[36px] shrink-0 rounded-full flex items-center justify-center transition-transform hover:-translate-y-[1px] bg-[#e8b13a] border-[2.5px] border-[#1a1a12]"
            >
                {isPlaying ? <IconPause /> : <IconPlay />}
            </button>

            <span className="shrink-0 font-bold text-[12px] tabular-nums w-[44px] text-right">
        {formatTime(currentTime)}
      </span>

            <div className="flex-1 min-w-[90px] h-[13px] rounded-full relative overflow-hidden border-[2.5px] border-[#1a1a12] bg-white">
                <div
                    className="absolute inset-y-0 left-0 bg-[#e8b13a] transition-all"
                    style={{ width: `${progressPercent}%` }}
                />
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Tua audio"
                />
            </div>

            <span className="shrink-0 font-bold text-[12px] tabular-nums w-[44px]">
        {formatTime(duration)}
      </span>

            <button
                onClick={changeSpeed}
                className="shrink-0 rounded-[9px] bg-white px-3 py-[4px] font-bold text-[12px] transition-colors hover:bg-[#e8b13a] border-[2.5px] border-[#1a1a12]"
            >
                {playbackSpeed}x
            </button>
        </div>
    );
};

export default AudioPlayer;