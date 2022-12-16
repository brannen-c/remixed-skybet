import { useState, type ReactNode } from "react";
import { type Outcome } from "~/types";
import Icon from "../Icon";
import OutcomeList from "../OutcomeList";

export default function Market({
  name,
  outcomes,
  defaultOpen,
}: {
  name: ReactNode;
  outcomes: Outcome[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="p-1">
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-4 font-medium text-left  border border-gray-200 rounded-t ${
            open ? "bg-blue-900 text-white" : "bg-gray-400 text-black"
          }`}
          onClick={() => setOpen((prev) => !prev)}
        >
          {name}
          <Icon
            icon="arrow"
            className={`w-6 h-6 transform ${
              open ? "rotate-90" : "-rotate-90"
            } shrink-0`}
          />
        </button>
      </h2>
      {open ? (
        <div
          id="accordion-collapse-body-1"
          aria-labelledby="accordion-collapse-heading-1"
        >
          <OutcomeList outcomes={outcomes} />
        </div>
      ) : null}
    </div>
  );
}
