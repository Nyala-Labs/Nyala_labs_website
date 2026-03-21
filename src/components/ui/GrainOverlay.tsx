"use client";

import { useEffect, useState } from "react";

export default function GrainOverlay() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  if (!isDesktop) return null;

  return <div className="grain-overlay" aria-hidden="true" />;
}
