"use client";

import { useState } from "react";
import { AIChatLauncher } from "./AIChatLauncher";
import { AIChatWindow } from "./AIChatWindow";

export function AIChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <AIChatWindow onClose={() => setOpen(false)} />}
      <AIChatLauncher open={open} onClick={() => setOpen((v) => !v)} />
    </>
  );
}
