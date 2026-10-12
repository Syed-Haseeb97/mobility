import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
export const metadata: Metadata = { title: "MOBILITY — Find your kind of drive", description: "Exceptional cars for the way you want to move. Discover considered vehicles from independent hosts.", applicationName: "MOBILITY" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteHeader />{children}<footer className="site-footer"><a className="wordmark" href="/">M<span>O</span>BILITY<span className="wordmark-dot">.</span></a><p>Move differently. Arrive as yourself.</p><span>© 2026 MOBILITY · MADE FOR THE OPEN ROAD</span></footer></body></html>; }
