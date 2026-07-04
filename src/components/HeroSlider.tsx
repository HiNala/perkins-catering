"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface HeroSlide {
  src: string;
  alt: string;
}

const slides: HeroSlide[] = [
  {
    src: "/images/hero/wedding-garden-table.jpg",
    alt: "Elegant outdoor wedding table set beneath trees with floral arrangements and fine tableware",
  },
  {
    src: "/images/hero/sunlit-elegant-table.jpg",
    alt: "Sunlit outdoor dining table with elegant place settings, glassware, and floral centerpieces",
  },
  {
    src: "/images/hero/outdoor-celebration-table.jpg",
    alt: "Beautifully decorated outdoor celebration table with elegant tableware and floral decor",
  },
];

const SLIDE_INTERVAL = 7000; // 7 seconds per slide
const FADE_DURATION = 1200; // 1.2s crossfade

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="absolute inset-0 z-0">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity ease-in-out"
          style={{
            opacity: idx === current ? 1 : 0,
            transitionDuration: `${FADE_DURATION}ms`,
            pointerEvents: idx === current ? "auto" : "none",
          }}
          aria-hidden={idx !== current}
        >
          <Image
            src={slide.src}
            alt={idx === current ? slide.alt : ""}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Subtle overlay — keeps image crisp while ensuring text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-white"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
