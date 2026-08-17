import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const handleNav = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActive(href);
  };

  return (
    <header>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a href="#home" onClick={handleNav("#home")} className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center border border-foreground bg-accent text-xs font-bold text-background">
            M
          </span>
          <span className="font-mono text-sm font-medium uppercase tracking-[0.15em]">
            Montu
          </span>
        </a>

        <NavLinks items={NAV_ITEMS} active={active} onSelect={setActive} />

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={handleNav("#contact")}
            className="hidden md:inline-flex items-center border border-foreground bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-[3px_3px_0_0_var(--color-foreground)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-foreground)]"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden grid h-9 w-9 place-items-center border border-foreground text-foreground"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div id="mobile-nav">
        <MobileMenu
          open={menuOpen}
          items={NAV_ITEMS}
          active={active}
          onSelect={setActive}
          onClose={() => setMenuOpen(false)}
        />
      </div>
    </header>
  );
}
