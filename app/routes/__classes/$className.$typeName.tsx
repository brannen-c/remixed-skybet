import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { EventListItem, NavList, TypeHeader } from "~/components";

import { getType } from "~/lib";
import { slugify, unslugify } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  try {
    const { typeName } = params;
    if (!typeName) {
      throw new Error("Type not found");
    }
    const data = await getType(unslugify(typeName));
    console.log(data);
    return json({ ...data });
  } catch (e) {
    console.error(e);
    return redirect("/");
  }
}

export default function ClassesTypeNameRoute() {
  const { typeName } = useParams();
  const { name, eventClass, events } = useLoaderData<typeof loader>();
  if (!events) {
    redirect("/");
  }

  return (
    <>
      <NavList />
      {typeName ? <TypeHeader name={typeName} /> : null}
      <ul>
        {events
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((event) => (
            <EventListItem key={event.eventId}>
              <Link
                className="p-4 flex"
                to={`/${slugify(eventClass.name)}/${slugify(name)}/event/${
                  event.eventId
                }`}
              >
                {event.name}
              </Link>
            </EventListItem>
          ))}
      </ul>
    </>
  );
}
