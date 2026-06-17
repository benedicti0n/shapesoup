"use client";

import React from "react";

export const wobblySm = "255px 15px 225px 15px / 15px 225px 15px 255px";
export const wobblyMd = "15px 225px 15px 255px / 255px 15px 225px 15px";
export const wobblyLg = "225px 15px 255px 15px / 15px 255px 15px 225px";

export function SketchButton({
  children,
  onClick,
  href,
  variant = "default",
  icon,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "accent" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const base = `
    inline-flex items-center justify-center gap-1.5 px-5 py-2.5
    border-[3px] border-pencil text-base font-body
    transition-all duration-100
    hover:shadow-[2px_2px_0px_0px_#2d2d2d] hover:-translate-y-px
    active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
  `;
  const styles = {
    default: "bg-white text-pencil shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent hover:text-white",
    accent: "bg-accent text-white shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-accent",
    secondary: "bg-muted text-pencil shadow-[4px_4px_0px_0px_#2d2d2d] hover:bg-blue-pen hover:text-white",
  };

  const classes = `${base} ${styles[variant]} ${className}`;
  const style = { borderRadius: wobblySm, fontFamily: "var(--font-body)" };

  if (href) {
    return (
      <a href={href} className={classes} style={style} aria-label={ariaLabel}>
        {icon}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} style={style} aria-label={ariaLabel}>
      {icon}
      <span>{children}</span>
    </button>
  );
}

export function SketchCard({
  children,
  className = "",
  decoration,
  rotation = 0,
}: {
  children: React.ReactNode;
  className?: string;
  decoration?: "tape" | "tack";
  rotation?: number;
}) {
  return (
    <div
      className={`relative bg-white border-[3px] border-pencil p-5 ${className}`}
      style={{
        borderRadius: wobblyMd,
        boxShadow: "4px 4px 0px 0px rgba(45,45,45,0.12)",
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        fontFamily: "var(--font-body)",
      }}
    >
      {decoration === "tape" && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-muted/70 border border-pencil/20"
          style={{ transform: "translate(-50%, 0) rotate(-2deg)", borderRadius: "2px" }}
        />
      )}
      {decoration === "tack" && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-accent border-2 border-pencil rounded-full"
          style={{ transform: "translate(-50%, 0) rotate(3deg)" }}
        />
      )}
      {children}
    </div>
  );
}

export function SketchInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`
        px-3 py-2 bg-white border-[3px] border-pencil text-pencil text-base font-body
        focus:outline-none focus:border-blue-pen focus:ring-2 focus:ring-blue-pen/20
        transition-all duration-100
        ${props.className || ""}
      `}
      style={{
        borderRadius: wobblyMd,
        boxShadow: "3px 3px 0px 0px #2d2d2d",
        fontFamily: "var(--font-body)",
        ...props.style,
      }}
    />
  );
}

export function SketchBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block px-3 py-1 bg-white border-[3px] border-pencil text-sm font-body text-pencil ${className}`}
      style={{
        borderRadius: wobblySm,
        boxShadow: "2px 2px 0px 0px #2d2d2d",
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </span>
  );
}

export function DashedLine({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-0.5 border-dashed border-t-2 border-pencil opacity-25 ${className}`} />
  );
}

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-3xl md:text-4xl font-bold font-heading text-pencil ${className}`}
      style={{ transform: "rotate(-0.5deg)" }}
    >
      {children}
    </h2>
  );
}

export function PostItCard({
  children,
  className = "",
  rotation = 0,
}: {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
}) {
  return (
    <div
      className={`bg-post-it border-[3px] border-pencil p-4 ${className}`}
      style={{
        borderRadius: wobblySm,
        boxShadow: "4px 4px 0px 0px rgba(45,45,45,0.15)",
        transform: rotation ? `rotate(${rotation}deg)` : undefined,
        fontFamily: "var(--font-body)",
      }}
    >
      {children}
    </div>
  );
}
