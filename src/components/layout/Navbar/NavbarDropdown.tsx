import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import type { DashboardNavGroup } from "@/config/dashboard-navigation";

type NavbarDropdownProps = { group: DashboardNavGroup };

export default function NavbarDropdown({ group }: NavbarDropdownProps) {
  const [open, setOpen] = useState(false);
  const menuId = group.index;

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
        className="group inline-flex items-center gap-2 border-b-2 border-transparent px-2 py-2 font-mono text-xs uppercase hover:border-accent hover:text-accent aria-expanded:border-accent aria-expanded:text-accent"
      >
        {group.label}
        <ChevronDown
          className="size-3.5 group-aria-expanded:rotate-180"
          aria-hidden="true"
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-0 z-50 mt-2 w-52 border border-foreground bg-background p-1"
      >
        <p className="px-3 py-2 font-mono text-xs uppercase text-muted-foreground">
          {group.label}
        </p>
        {group.items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-secondary"
          >
            <item.icon className="size-4" aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
