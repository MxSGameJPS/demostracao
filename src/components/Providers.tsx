"use client";

import { ModalProvider } from "@/context/ModalContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}
