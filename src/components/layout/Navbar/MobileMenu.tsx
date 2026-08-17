import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/constants";

type Props = {
  open: boolean;
  items: NavItem[];
  active: string;
  onSelect: (href: string) => void;
  onClose: () => void;
};

export default function MobileMenu({ open, items, active, onSelect, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const wrapperClasses = `md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
    open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
  }`;

  return (
    <div className={wrapperClasses}>
      <ul className="flex flex-col gap-1 border-t border-border px-4 pb-4 pt-3">
        {items.map((item, i) => {
          const isActive = active === item.href;
          const rowClasses = [
            "flex-1 rounded-none px-3 py-2.5 text-base",
            isActive ? "text-accent font-medium" : "text-foreground",
          ].join(" ");

          if (item.columns) {
            const isOpen = expanded === item.href;
            return (
              <li key={item.href}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect(item.href);
                      onClose();
                    }}
                    className={rowClasses}
                  >
                    {item.label}
                  </a>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-label={`Toggle ${item.label} submenu`}
                    onClick={() => setExpanded(isOpen ? null : item.href)}
                    className="p-2.5 text-muted-foreground"
                  >
                    <ChevronDown
                      size={16}
                      className={` ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="ml-3 mt-1 mb-2 space-y-3 border-l border-border pl-4">
                    {item.columns
                      .flatMap((col) => col.items)
                      .map((sub) => (
                        <a
                          key={sub.href}
                          href={sub.href}
                          onClick={(e) => {
                            e.preventDefault();
                            onSelect(item.href);
                            onClose();
                          }}
                          className="block text-sm text-muted-foreground hover:text-accent"
                        >
                          {sub.title}
                        </a>
                      ))}
                  </div>
                )}
              </li>
            );
          }

          return (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.href);
                  onClose();
                }}
                className={rowClasses}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
