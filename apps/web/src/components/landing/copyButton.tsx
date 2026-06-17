"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle01Icon, Copy01Icon } from "@hugeicons/core-free-icons";
import { SketchButton } from "./sketchPrimitives";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <SketchButton
      onClick={handleCopy}
      variant={copied ? "accent" : "default"}
      icon={
        copied ? (
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} strokeWidth={2.5} />
        ) : (
          <HugeiconsIcon icon={Copy01Icon} size={16} strokeWidth={2.5} />
        )
      }
    >
      {copied ? "Copied!" : label}
    </SketchButton>
  );
}
