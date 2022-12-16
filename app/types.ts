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

export type Outcome = {
  outcomeId: number;
  name: string;
  status: {
    displayable: boolean;
  };
  price: {
    num: number;
    den: number;
    decimal: number;
  };
};
