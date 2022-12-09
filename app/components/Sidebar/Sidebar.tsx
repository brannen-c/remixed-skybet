import type { MenuItemGroup } from "~/types";
import ItemGroup from "./ItemGroup";

export default function Sidebar({
  menuItemGroups,
}: {
  menuItemGroups: MenuItemGroup[];
}) {
  return (
    <aside className="sidebar w-[480px] md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-blue-900">
      <div className="sidebar-content px-4 py-6">
        <ul className="flex flex-col w-full">
          {menuItemGroups.map((itemGroup) => (
            <ItemGroup key={itemGroup.id} itemGroup={itemGroup} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
