"use client";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
export function SiteHeader(){ const [open,setOpen]=useState(false); return <header className="site-header"><Link className="wordmark" href="/" onClick={()=>setOpen(false)}>M<span>O</span>BILITY<span className="wordmark-dot">.</span></Link><nav className={open?"nav-links nav-open":"nav-links"}><Link href="/rent" onClick={()=>setOpen(false)}>Explore cars</Link><Link href="/list-your-vehicle" onClick={()=>setOpen(false)}>Become a host</Link><Link href="/rent/bookings" onClick={()=>setOpen(false)}>My trips</Link><Link className="nav-cta" href="/host/dashboard" onClick={()=>setOpen(false)}>Host dashboard <ArrowUpRight size={15}/></Link></nav><button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header> }
