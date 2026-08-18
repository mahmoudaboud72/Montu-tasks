import { DASHBOARD_NAVIGATION } from "@/config/dashboard-navigation";
import NavbarLink from "./NavbarLink";

type MobileNavigationProps = {
  open: boolean;
  onNavigate: () => void;
};

export default function MobileNavigation({
  open,
  onNavigate,
}: MobileNavigationProps) {
  return (
    <div
      id="mobile-navigation"
      hidden={!open}
      className="border-t border-foreground p-4 lg:hidden"
    >
      <div className="grid gap-4">
        {DASHBOARD_NAVIGATION.map((group) => (
          <section key={group.label}>
            <p className="mb-1 font-mono text-xs uppercase text-muted-foreground">
              <span className="mr-2 text-accent">{group.index}</span>
              {group.label}
            </p>
            <div className="grid gap-1">
              {group.items.map((item) => (
                <NavbarLink
                  key={item.path}
                  item={item}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
