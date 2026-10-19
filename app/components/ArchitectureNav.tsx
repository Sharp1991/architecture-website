"use client";

import { useState } from "react";
import GooeyNav from "./GooeyNav";

export default function ArchitectureNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GooeyNav
      items={[
        { label: "Home", href: "/#home" },
        { label: "Work", href: "/#projects" },
        { label: "About", href: "/#about" },
        { label: "Contact", href: "/#contact" },
      ]}
      initialActiveIndex={0}
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
