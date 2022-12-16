import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { Sidebar } from "./components";
import { getClasses } from "./lib";

import styles from "./styles/app.css";
import type { MenuItemGroup } from "./types";
import { slugify } from "./utils";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remixed Skybet",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader() {
  const { eventClasses } = await getClasses();

  const menuItemGroups: MenuItemGroup[] = [
    {
      id: "main",
      type: "links",
      links: [
        { id: "home", title: "Home", icon: "home", link: "/" },
        { id: "search", title: "Search", link: "/search" },
        { id: "Promotions", title: "Promotions", link: "/promotions" },
        { id: "Sky Bet Club", title: "Sky Bet Club", link: "/sky-bet-club" },
        { id: "My Bets", title: "My Bets", link: "/my-bets" },
        { id: "In-Play", title: "In-Play", link: "/in-play" },
        { id: "Group Bets", title: "Group Bets", link: "/group-bets" },
        {
          id: "Safer Gambling",
          title: "Safer Gambling",
          link: "/safer-gambling",
        },
        { id: "Help", title: "Help", link: "/help" },
        { id: "What's On", title: "What's On", link: "/whats-on" },
      ],
    },
    { id: "div-1", type: "divider" },
    {
      id: "fav",
      type: "links",
      links: eventClasses
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((i) => ({
          id: i.classId.toString(),
          title: i.name,
          link: `${slugify(i.name)}`,
        })),
    },
  ];

  return menuItemGroups;
}

export default function App() {
  const menuItemGroups = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
          <Sidebar menuItemGroups={menuItemGroups} />
          <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
            <header className="header bg-white shadow py-4 px-4">
              <div className="header-content flex items-center flex-row">
                <form action="#">
                  <div className="hidden md:flex relative">
                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <input
                      id="search"
                      type="text"
                      name="search"
                      className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="flex md:hidden">
                    <a
                      href="/search"
                      className="flex items-center justify-center h-10 w-10 border-transparent"
                    >
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </a>
                  </div>
                </form>
                <div className="flex ml-auto">
                  <a href="/login" className="flex flex-row items-center">
                    <span className="flex flex-col ml-2">Login</span>
                  </a>
                </div>
              </div>
            </header>
            <div className="main-content flex flex-col flex-grow p-4">
              <Outlet />
            </div>
            <footer className="footer px-4 py-6">
              <div className="footer-content">
                <p className="text-sm text-gray-600 text-center">
                  © Bonne Terre Limited or its affiliated companies. The Sky
                  trademarks are owned by Sky UK Limited and are used under
                  licence. All rights reserved.
                </p>
              </div>
            </footer>
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
