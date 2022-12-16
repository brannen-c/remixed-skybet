import { type Outcome } from "~/types";

export default function OutcomeList({ outcomes }: { outcomes: Outcome[] }) {
  return (
    <ul>
      {outcomes.map(({ outcomeId, name, price }) => (
        <li
          key={outcomeId}
          className="w-full flex flex-row justify-between items-center border"
        >
          <h4 className="p-3">{name}</h4>
          <button className="w-20 text-red-500 border-l p-3">
            {price.decimal}
          </button>
        </li>
      ))}
    </ul>
  );
}
