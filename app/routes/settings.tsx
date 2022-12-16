import { type ActionArgs, redirect } from "@remix-run/node";
import { ClassHeader } from "~/components";
import { oddsFormat } from "~/utils";

export async function action({ request }: ActionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await oddsFormat.parse(cookieHeader)) || {};
  const bodyParams = await request.formData();

  cookie.format =
    bodyParams.get("odds") === "decimal" ? "decimal" : "fractional";

  return redirect("/", {
    headers: {
      "Set-Cookie": await oddsFormat.serialize(cookie),
    },
  });
}

export default function Settings() {
  return (
    <>
      <ClassHeader name="Settings" />
      <form method="POST" className="flex flex-col p-4">
        <label htmlFor="odds">Choose odds Format:</label>

        <select id="odds" name="odds">
          <option value="fractional">Fractional</option>
          <option value="decimal">Decimal</option>
        </select>
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
}
