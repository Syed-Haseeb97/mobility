"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Gauge, Fuel, MapPin, Users, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const bikes = [
  {
    number: "01", name: "Splendor Plus", maker: "HERO", kind: "THE EVERYDAY LEGEND",
    price: 499, city: "Chennai", specs: [{ label: "Engine", value: "97.2 cc", icon: Zap }, { label: "Mileage", value: "Up to 60 km/l", icon: Gauge }, { label: "Gearbox", value: "4-speed", icon: Fuel }],
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1400&q=85",
    description: "Light, dependable, and ready for every little trip across town."
  },
  {
    number: "02", name: "Pulsar 150", maker: "BAJAJ", kind: "CITY WITH AN EDGE",
    price: 799, city: "Bengaluru", specs: [{ label: "Engine", value: "149.5 cc", icon: Zap }, { label: "Mileage", value: "Up to 45 km/l", icon: Gauge }, { label: "Gearbox", value: "5-speed", icon: Fuel }],
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1400&q=85",
    description: "A little more punch for longer commutes and open roads."
  },
  {
    number: "03", name: "Classic 350", maker: "ROYAL ENFIELD", kind: "TAKE THE SCENIC ROUTE",
    price: 1_299, city: "Chennai", specs: [{ label: "Engine", value: "349 cc", icon: Zap }, { label: "Mileage", value: "Up to 35 km/l", icon: Gauge }, { label: "Gearbox", value: "5-speed", icon: Fuel }],
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1400&q=85",
    description: "Unhurried rides, familiar roads, and weekends worth stretching."
  },
];

const cars = [
  {
    number: "01", name: "Swift", maker: "MARUTI SUZUKI", kind: "SMALL CAR, BIG DAY",
    price: 1_799, city: "Chennai", specs: [{ label: "Seats", value: "5 people", icon: Users }, { label: "Fuel", value: "Petrol", icon: Fuel }, { label: "Gearbox", value: "Manual / Auto", icon: Gauge }],
    image: "https://images.unsplash.com/photo-1503376780353-7e669276c9d9?auto=format&fit=crop&w=1400&q=85",
    description: "Easy to park, easy to live with, and just right for a city escape."
  },
  {
    number: "02", name: "Tata Tiago", maker: "TATA MOTORS", kind: "THE PRACTICAL PICK",
    price: 1_599, city: "Hyderabad", specs: [{ label: "Seats", value: "5 people", icon: Users }, { label: "Fuel", value: "Petrol", icon: Fuel }, { label: "Gearbox", value: "Manual / AMT", icon: Gauge }],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85",
    description: "Compact, comfortable, and sensible on everyday rental budgets."
  },
  {
    number: "03", name: "WagonR", maker: "MARUTI SUZUKI", kind: "ROOM FOR EVERYONE",
    price: 1_699, city: "Bengaluru", specs: [{ label: "Seats", value: "5 people", icon: Users }, { label: "Fuel", value: "Petrol / CNG", icon: Fuel }, { label: "Gearbox", value: "Manual / Auto", icon: Gauge }],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=85",
    description: "Tall, roomy, and made for errands, friends, and family plans."
  },
];

type Ride = (typeof bikes)[number];

function ScrollShowcase({ title, eyebrow, intro, items, type }: {
  title: string; eyebrow: string; intro: string; items: Ride[]; type: "bike" | "car";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const ride = items[active];

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const value = Math.min(1, Math.max(0, -rect.top / travel));
      setProgress(value);
      setActive(Math.min(items.length - 1, Math.floor(value * items.length)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  return (
    <section ref={sectionRef} className={`india-showcase ${type}-showcase`} style={{ minHeight: "300vh" }}>
      <div className="showcase-sticky">
        <div className="showcase-topline">
          <div><span className="showcase-eyebrow">{eyebrow}</span><h2>{title}</h2></div>
          <p>{intro}</p>
        </div>
        <div className="showcase-stage">
          <aside className="showcase-side showcase-side-left">
            <span className="showcase-index">{ride.number} / 0{items.length}</span>
            <span className="showcase-maker">{ride.maker}</span>
            <h3>{ride.name}</h3>
            <p className="showcase-kind">{ride.kind}</p>
            <p className="showcase-description">{ride.description}</p>
            <div className="showcase-city"><MapPin size={14} /> Available in {ride.city}</div>
          </aside>
          <div className="showcase-vehicle" key={ride.name}>
            <div className="vehicle-orbit orbit-one" /><div className="vehicle-orbit orbit-two" />
            <div className="vehicle-glow" />
            <div className="vehicle-image-3d">
              <Image src={ride.image} alt={`${ride.maker} ${ride.name}`} fill sizes="(max-width: 700px) 100vw, 55vw" priority={active === 0} unoptimized style={{ objectFit: "contain" }} />
            </div>
            <div className="showcase-floor" />
            <span className="showcase-scroll-hint"><ArrowDown size={13} /> KEEP SCROLLING</span>
          </div>
          <aside className="showcase-side showcase-side-right">
            <span className="showcase-price-label">FROM / DAY</span>
            <div className="showcase-price">₹{ride.price.toLocaleString("en-IN")}<small> / day</small></div>
            <span className="showcase-spec-label">THE DETAILS</span>
            <div className="showcase-specs">{ride.specs.map((spec) => {
              const Icon = spec.icon;
              return <div className="showcase-spec" key={spec.label}><span className="showcase-spec-icon"><Icon size={15} /></span><span><small>{spec.label}</small><strong>{spec.value}</strong></span></div>;
            })}</div>
            <Link className="showcase-rent" href={`/rent?category=${type === "bike" ? "Two-wheeler" : "Four-wheeler"}`}>Explore rentals <ArrowUpRight size={16} /></Link>
          </aside>
        </div>
        <div className="showcase-progress"><span style={{ width: `${Math.max(4, progress * 100)}%` }} /></div>
        <div className="showcase-foot"><span>MADE FOR REAL LIFE IN INDIA</span><span>0{active + 1} — 0{items.length}</span></div>
      </div>
    </section>
  );
}

export function IndiaScrollShowroom() {
  return (
    <>
      <ScrollShowcase type="bike" eyebrow="The everyday fleet / 01" title="Two wheels. Your whole city." intro="From quick errands to the long way home. Meet the bikes India knows, with a little more freedom built in." items={bikes} />
      <ScrollShowcase type="car" eyebrow="The everyday fleet / 02" title="Small cars. Big plans." intro="Easy-to-drive favourites for workdays, weekend plans, airport runs, and everything in between." items={cars} />
    </>
  );
}
