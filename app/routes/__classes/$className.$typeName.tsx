import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

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
  const { name, eventClass, events } = useLoaderData<typeof loader>();
  if (!events) {
    redirect("/");
  }

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {events
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((event) => (
            <li key={event.eventId}>
              <Link
                to={`/${slugify(eventClass.name)}/${slugify(name)}/event/${
                  event.eventId
                }`}
              >
                {event.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
