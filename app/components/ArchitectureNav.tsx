"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GooeyNav from "./GooeyNav";

export default function ArchitectureNav() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const hash = window.location.hash;

    if (pathname === "/about") {
      setActiveIndex(2);
    } else if (pathname === "/contact") {
      setActiveIndex(3);
    } else if (hash === "#contact") {
      setActiveIndex(3);
    } else if (hash === "#projects") {
      setActiveIndex(1);
    } else {
      setActiveIndex(0);
    }
  }, [pathname]);

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash;
      if (window.location.pathname === "/about") setActiveIndex(2);
      else if (window.location.pathname === "/contact") setActiveIndex(3);
      else if (hash === "#contact") setActiveIndex(3);
      else if (hash === "#projects") setActiveIndex(1);
      else setActiveIndex(0);
    };

    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  return (
    <GooeyNav
      items={[
        { label: "Home", href: "/#home" },
        { label: "Work", href: "/#projects" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Client Login", href: "/portal" },
      ]}
      initialActiveIndex={activeIndex}
      activeIndex={activeIndex}
      onChange={(index) => setActiveIndex(index)}
      theme="dark"
      color="#ffffff"
      activeTextColor="#1f241f"
      style={{}}
      size="md"
      frame={false}
      particleCount={15}
      spread={56}
      animationTime={600}
      timeVariance={300}
      gooeyness={0.5}
      wobble={0.5}
      hoverEffect={true}
    />
  );
}
