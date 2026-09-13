"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setPct(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    }
    onScroll();
    document.addEventListener("scroll", onScroll, { passive: true });
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="progressBar" style={{ width: `${pct}%` }} />;
}
