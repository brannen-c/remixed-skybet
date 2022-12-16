import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
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
      <h1>{className ? unslugify(className) : null}</h1>
      <ul>
        {events.map(({ eventId, name, eventType }) => (
          <li key={eventId}>
            <Link
              to={`/${className}/${slugify(eventType.name)}/event/${eventId}`}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
