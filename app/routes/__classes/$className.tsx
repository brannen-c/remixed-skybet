import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { ClassHeader, EventListItem } from "~/components";
import { getClassEvents } from "~/lib/getClass";
import { slugify, unslugify } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  try {
    const { className } = params;

    if (!className) {
      throw new Error("Empty className parameter");
    }

    const { events } = await getClassEvents(unslugify(className));
    if (events) {
      return json(events);
    }
    throw new Error(`Null class data for ${className}`);
  } catch (e) {
    console.error(e);
    return redirect("/");
  }
}

export default function Index() {
  const { className } = useParams();
  const events = useLoaderData<typeof loader>();

  return (
    <>
      {className ? <ClassHeader name={className} /> : null}
      <ul>
        {events
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map(({ eventId, name, eventType }) => (
            <EventListItem key={eventId}>
              <Link
                className="p-4 flex flex-col"
                to={`/${className}/${slugify(eventType.name)}/event/${eventId}`}
              >
                <span>{name}</span>
                <span className="text-sm">{eventType.name}</span>
              </Link>
            </EventListItem>
          ))}
      </ul>
    </>
  );
}
