import { Outlet } from "@remix-run/react";
import NavList from "~/components/NavList";

export default function SportIndexRoute() {
  return (
    <>
      <NavList />
      <Outlet />
    </>
  );
}
