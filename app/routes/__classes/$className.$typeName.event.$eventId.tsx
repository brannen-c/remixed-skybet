import { type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EventHeader, Market, NavList } from "~/components";
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
      <NavList />
      <EventHeader name={name} />
      <ul>
        {markets
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(({ name, marketId, outcomes }, index) => (
            <li key={marketId}>
              <Market name={name} outcomes={outcomes} defaultOpen={index < 3} />
            </li>
          ))}
      </ul>
    </div>
  );
}
