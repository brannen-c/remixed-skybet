import { NavLink, useLocation } from "@remix-run/react";
import { unslugify } from "~/utils";
import Icon from "../Icon";

function NavList() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path !== "event");

  return (
    <nav className="inline-flex items-center space-x-1 md:space-x-3">
      <ul className="inline-flex items-center">
        <li>
          <NavLink className="flex flex-row" to="/">
            <Icon icon="home" />
            <Icon icon="arrow" />
          </NavLink>
        </li>

        {paths.length > 1
          ? paths.map((path, key) => {
              return isNaN(Number(paths[key])) ? (
                <li key={key} className="flex flex-row">
                  {key + 1 === paths.length ? (
                    <span> {`${unslugify(path)}`}</span>
                  ) : (
                    <NavLink
                      className="flex flex-row"
                      to={`${paths.slice(0, key + 1).join("/")}`}
                    >
                      {`${unslugify(path)}`}
                      {isNaN(Number(paths[key + 1])) ? (
                        <Icon icon="arrow" />
                      ) : null}
                    </NavLink>
                  )}
                </li>
              ) : null;
            })
          : null}
      </ul>
    </nav>
  );
}

export default NavList;
