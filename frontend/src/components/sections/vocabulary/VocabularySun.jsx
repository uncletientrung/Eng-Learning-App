import { useEffect, useRef } from "react";
import gsap from "gsap";
import sunImage from "../../../assets/vocabulary/sun.svg";

export default function VocabularySun() {
  const sunRef = useRef(null);
  useEffect(() => {
    const sun = sunRef.current;
    const scene = sun.parentElement;
    const face = sun.querySelector(".vocabulary-sun-face");
    const moveX = gsap.quickTo(sun, "x", { duration: .7, ease: "power3.out" });
    const moveY = gsap.quickTo(sun, "y", { duration: .7, ease: "power3.out" });
    const rotate = gsap.quickTo(sun, "rotation", { duration: .8, ease: "power3.out" });
    const faceX = gsap.quickTo(face, "x", { duration: .4, ease: "power3.out" });
    const faceY = gsap.quickTo(face, "y", { duration: .4, ease: "power3.out" });
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp = (value) => Math.max(-1, Math.min(1, value));
    const follow = (event) => {
      if (event.pointerType === "touch") return;
      // Measure the stationary scene so the mascot never chases its own bounds.
      const bounds = scene.getBoundingClientRect();
      const nx = clamp((event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2 || 1));
      const ny = clamp((event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2 || 1));
      if (!reducedMotion.matches) {
        moveX(nx * 50);
        moveY(ny * 50);
        rotate(nx * 15);
        faceX(nx * 2);
        faceY(ny * 1.5);
      }
      // Hold the wink throughout the lower region, including while stationary.
      // Only returning to the upper region opens the eye again.
      if (ny > .15) sun.classList.add("is-winking");
      else if (ny < -.15) sun.classList.remove("is-winking");
    };
    const reset = () => {
      moveX(0);
      moveY(0);
      rotate(0);
      faceX(0);
      faceY(0);
    };
    window.addEventListener("pointermove", follow, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", follow);
      document.documentElement.removeEventListener("pointerleave", reset);
      [moveX, moveY, rotate, faceX, faceY].forEach((move) => move.tween.kill());
      gsap.killTweensOf([sun, face]);
    };
  }, []);
  return (
    <div ref={sunRef} className="vocabulary-sun" aria-hidden="true">
      <img src={sunImage} alt="" className="h-full w-full" />
      <svg viewBox="0 0 63 63" fill="none" className="absolute inset-0 h-full w-full">
        <g className="vocabulary-sun-face"><g transform="translate(26 18) scale(.8)">
          <circle cx="13.6956" cy="1.98509" r="1.98509" fill="#121212" />
          <circle className="vocabulary-sun-eye-open" cx="1.98512" cy="2.97764" r="1.98509" fill="#121212" />
          <path className="vocabulary-sun-eye-closed" d="M0 3 Q1.985 5 3.97 3" stroke="#121212" strokeWidth="1" strokeLinecap="round" />
          <path d="M4.36526 10.0526C5.48807 11.3236 7.37792 12.4373 8.99134 12.3823C10.3455 12.3362 11.3858 12.1855 12.582 11.4026C13.4381 10.8424 13.9967 10.0329 14.7406 8.66282" stroke="#121212" strokeWidth="1" strokeLinecap="round" />
        </g></g>
      </svg>
    </div>
  );
}

