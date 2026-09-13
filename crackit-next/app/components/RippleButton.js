"use client";

import { useRef } from "react";

export default function RippleButton({
  as: Tag = "a",
  href,
  className = "",
  onClick,
  children,
  ...rest
}) {
  const ref = useRef(null);

  function handleClick(e) {
    const el = ref.current;
    if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";
      el.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    }
    onClick?.(e);
  }

  return (
    <Tag
      ref={ref}
      href={Tag === "a" ? href : undefined}
      className={`btn ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
