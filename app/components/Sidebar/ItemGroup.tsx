import { Link } from "@remix-run/react";
import type { MenuItemGroup } from "~/types";
import Icon from "../Icon";

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
                  <Icon icon={icon} />
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
