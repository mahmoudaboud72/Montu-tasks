import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/constants";
import DropdownPanel from "./DropdownPanel";

type Props = {
  items: NavItem[];
  active: string;
  onSelect: (href: string) => void;
};

export default function NavLinks({ items, active, onSelect }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  useLayoutEffect(() => {
    const container = listRef.current;
    const node = itemRefs.current[active];
    if (!container || !node) return;

    const containerBox = container.getBoundingClientRect();
    const nodeBox = node.getBoundingClientRect();

    setIndicator({
      left: nodeBox.left - containerBox.left,
      width: nodeBox.width,
    });
  }, [active, items]);

  return (
    <>
      {openDropdown && (
        <div
          aria-hidden
          className="fixed inset-0 z-10"
          onClick={() => setOpenDropdown(null)}
        />
      )}

      <ul
        ref={listRef}
        className="relative hidden md:flex items-center gap-1"
        onKeyDown={(e) => e.key === "Escape" && setOpenDropdown(null)}
      >
      {items.map((item, i) => {
        const isActive = active === item.href;
        const hasDropdown = Boolean(item.columns);
        const index = String(i + 1).padStart(2, "0");
        const linkClass = `flex items-center gap-1 px-3 py-2 text-sm ${
          isActive ? "text-accent font-medium" : "text-foreground hover:text-accent"
        }`;

        return (
          <li
            key={item.href}
            ref={(el) => { itemRefs.current[item.href] = el; }}
            className="relative"
          >
            {hasDropdown ? (
              <button
                type="button"
                aria-expanded={openDropdown === item.href}
                aria-haspopup="true"
                onClick={() => {
                  onSelect(item.href);
                  setOpenDropdown((v) => (v === item.href ? null : item.href));
                }}
                className={linkClass}
              >
                <span className="font-mono text-[10px] text-muted-foreground">{index}</span>
                {item.label}
                <ChevronDown
                  size={14}
                  className={`${openDropdown === item.href ? "rotate-180" : ""}`}
                />
              </button>
            ) : (
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(item.href);
                }}
                className={linkClass}
              >
                <span className="font-mono text-[10px] text-muted-foreground">{index}</span>
                {item.label}
              </a>
            )}

            {hasDropdown && openDropdown === item.href && (
              <div className="relative z-20">
                <DropdownPanel
                  columns={item.columns!}
                  onNavigate={() => setOpenDropdown(null)}
                />
              </div>
            )}
          </li>
        );
      })}

      <span
        aria-hidden
        className="absolute -bottom-1 h-[2px] bg-accent transition-[left,width] duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
      </ul>
    </>
  );
}
