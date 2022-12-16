import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getEvent } from "~/lib";

export async function loader({ params }: LoaderArgs) {
  if (!params.eventId) {
    throw new Error("Event not found");
  }
  return getEvent(params.eventId);
}

export default function Event() {
  const {
    event: { name, markets },
  } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {markets
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((market) => (
            <li key={market.marketId}>
              <h2>{market.name}</h2>
              <ul>
                {market.outcomes.map((outcome) => (
                  <li key={outcome.outcomeId}>
                    <h3>{outcome.name}</h3>
                    <div>{outcome.price.decimal}</div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
}
