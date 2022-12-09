type MenuItemType = "links" | "divider";

type BaseMenuItemGroup = {
  id: string;
  type: MenuItemType;
};

export interface LinksMenuItemGroup extends BaseMenuItemGroup {
  type: "links";
  links: LinksMenuItem[];
}

export interface DividerMenuItemGroup extends BaseMenuItemGroup {
  type: "divider";
}

export type MenuItemGroup = LinksMenuItemGroup | DividerMenuItemGroup;
type LinksMenuItem = { id: string; icon?: string; link: string; title: string };
