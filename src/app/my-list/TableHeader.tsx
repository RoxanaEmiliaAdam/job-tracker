"use client";

import { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
};

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <span className="font-bold text-gray-800 text-sm uppercase">
      {children}
    </span>
  );
}
