"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { seedVehicles } from "@/lib/data";

const SLIDES = [
  { vehicleId: "v1", bg: "#293a30", accent: "#b6d35c", mood: "OPEN ROAD" },
  { vehicleId: "v2", bg: "#684638", accent: "#f0b18d", mood: "PURE DRIVING" },
  { vehicleId: "v3", bg: "#725044", accent: "#f1c8a5", mood: "CITY ENERGY" },
  { vehicleId: "v4", bg: "#344d60", accent: "#a9d4f6", mood: "NEW PERSPECTIVE" },
] as const;

type Direction = "next" | "prev";
type Role = "center" | "left" | "right" | "back";

export function DriveHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const preload = seedVehicles.slice(0, 4);
    preload.forEach((vehicle) => {
      const image = new window.Image();
      image.src = vehicle.image;
    });
  }, []);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 640);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    const timeout = window.setTimeout(() => setIsAnimating(false), 650);
    return () => window.clearTimeout(timeout);
  }, [isAnimating]);

  const navigate = useCallback((direction: Direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((current) =>
      direction === "next"
        ? (current + 1) % SLIDES.length
        : (current + SLIDES.length - 1) % SLIDES.length,
    );
  }, [isAnimating]);

  const activeSlide = SLIDES[activeIndex];
  const activeVehicle = seedVehicles.find((vehicle) => vehicle.id === activeSlide.vehicleId) ?? seedVehicles[0];

  const getRole = (index: number): Role => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex + 3) % SLIDES.length) return "left";
    if (index === (activeIndex + 1) % SLIDES.length) return "right";
    return "back";
  };

  return (
    <section
      className="drive-hero"
      aria-label="Featured vehicles"
      style={{ backgroundColor: activeSlide.bg, ["--drive-accent" as string]: activeSlide.accent } as CSSProperties}
    >
      <div className="drive-grain" aria-hidden="true" />
      <div className="drive-ghost" aria-hidden="true">DRIVE DIFFERENT</div>

      <div className="drive-brand">
        <span className="drive-brand-mark">M.</span>
        <span>MOBILITY <i /> FIND YOUR KIND OF DRIVE</span>
      </div>

      <div className="drive-slide-stage" aria-live="polite">
        {SLIDES.map((slide, index) => {
          const vehicle = seedVehicles.find((item) => item.id === slide.vehicleId) ?? seedVehicles[0];
          const role = getRole(index);
          return (
            <div
              className={`drive-slide drive-slide--${role}`}
              key={slide.vehicleId}
              aria-hidden={role !== "center"}
            >
              <Image
                src={vehicle.image}
                alt={role === "center" ? `${vehicle.make} ${vehicle.name}` : ""}
                fill
                priority={index === 0}
                sizes="(max-width: 640px) 88vw, 70vw"
                draggable={false}
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              <div className="drive-slide-shade" />
              {role === "center" && (
                <div className="drive-image-caption">
                  <span>{slide.mood}</span>
                  <span>{String(index + 1).padStart(2, "0")} / 04</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="drive-copy">
        <div className="drive-kicker"><span /> THE ROAD IS YOURS</div>
        <h1>{activeVehicle.make}<br /><em>{activeVehicle.name}</em></h1>
        <p className="drive-description">
          Exceptional cars. Independent hosts. Find a drive that makes the journey part of the story.
        </p>
        <div className="drive-controls">
          <button type="button" onClick={() => navigate("prev")} disabled={isAnimating} aria-label="Previous vehicle">
            <ArrowLeft size={24} strokeWidth={2.1} />
          </button>
          <button type="button" onClick={() => navigate("next")} disabled={isAnimating} aria-label="Next vehicle">
            <ArrowRight size={24} strokeWidth={2.1} />
          </button>
          <span className="drive-count">{String(activeIndex + 1).padStart(2, "0")} <i /> {String(SLIDES.length).padStart(2, "0")}</span>
        </div>
      </div>

      <Link className="drive-discover" href="/rent">
        <span>EXPLORE THE FLEET</span>
        <ArrowUpRight size={30} strokeWidth={2.1} />
      </Link>

      <div className="drive-bottom-note">
        <span>CURATED CARS. REAL PEOPLE.</span>
        <span>MADE FOR THE OPEN ROAD&nbsp; ↗</span>
      </div>
    </section>
  );
}
