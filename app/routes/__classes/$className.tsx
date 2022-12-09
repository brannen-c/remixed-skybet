import { LoaderArgs, redirect } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getClassEvents } from "~/lib/getClass";
import { unslugify } from "~/utils";

export async function loader({ params }: LoaderArgs) {
  try {
    const { className } = params;

    const data = await getClassEvents(unslugify(className));
    if (data) {
      return data;
    }
    throw new Error(`Null class data for ${className}`);
  } catch (e) {
    console.error(e);
    return redirect("/");
  }
}

export default function Index() {
  const { className } = useParams();
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return <div>{className ? unslugify(className) : null}</div>;
}
