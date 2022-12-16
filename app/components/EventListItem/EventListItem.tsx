import { type ReactNode } from "react";

export default function EventListItem({ children }: { children: ReactNode }) {
  return (
    <li className="border border-gray-200 rounded overflow-hidden shadow-lg m-2">
      {children}
    </li>
  );
}
