import { Link } from "@remix-run/react";
import type { MenuItemGroup } from "~/types";

export default function ItemGroup({ itemGroup }: { itemGroup: MenuItemGroup }) {
  switch (itemGroup.type) {
    case "divider":
      return <hr className="my-2 h-px bg-gray-100 border-0 " />;
    case "links":
      return (
        <>
          {itemGroup.links.map(({ id, icon, link, title }) => (
            <li key={id} className="my-px">
              <Link
                to={link}
                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-300"
              >
                <span className="w-6 flex items-center justify-center text-lg text-gray-400">
                  {icon ? (
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  ) : null}
                </span>
                <span className="ml-3">{title}</span>
              </Link>
            </li>
          ))}
        </>
      );
    default:
      return null;
  }
}
