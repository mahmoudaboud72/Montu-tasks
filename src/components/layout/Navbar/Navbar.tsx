import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { DASHBOARD_NAVIGATION } from "@/config/dashboard-navigation";
import MobileNavigation from "./MobileNavigation";
import NavbarDropdown from "./NavbarDropdown";
import NavbarLink from "./NavbarLink";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const entryGroup = DASHBOARD_NAVIGATION.find(
    (group) => group.navbar === "entry",
  );
  const dropdownGroups = DASHBOARD_NAVIGATION.filter(
    (group) => group.navbar === "dropdown",
  );
  const linkGroups = DASHBOARD_NAVIGATION.filter(
    (group) => group.navbar === "link",
  );

  return (
    <header className="sticky top-0 z-30 border-b border-foreground bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Montu home"
        >
          <span className="grid size-7 place-items-center border border-foreground bg-accent text-xs font-bold text-accent-foreground">
            M
          </span>
          <span className="font-mono text-sm font-medium uppercase">Montu</span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary navigation"
        >
          {entryGroup?.items.map((item) => (
            <NavbarLink key={item.path} item={item} />
          ))}
          {dropdownGroups.map((group) => (
            <NavbarDropdown key={group.label} group={group} />
          ))}
          {linkGroups.map((group) =>
            group.items.map((item) => (
              <NavbarLink key={item.path} item={item} />
            )),
          )}
        </nav>

        <button
          type="button"
          aria-label={
            mobileOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((current) => !current)}
          className="grid size-9 place-items-center border border-foreground lg:hidden"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <MobileNavigation
        open={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
    </header>
  );
}
