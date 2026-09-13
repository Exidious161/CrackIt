"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  translate = "translate-y-7",
  scale = false,
  children,
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scaleClasses = scale ? "scale-[0.96] data-[state=in]:scale-100" : "";

  return (
    <Tag
      ref={ref}
      data-state={inView ? "in" : "out"}
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 ${translate} ${scaleClasses} transition-all duration-700 ease-[cubic-bezier(0.16,0.8,0.3,1)] data-[state=in]:opacity-100 data-[state=in]:translate-y-0 ${className}`}
    >
      {children}
    </Tag>
  );
}
