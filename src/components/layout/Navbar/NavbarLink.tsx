import { Link } from "react-router-dom";

import type { AppRoute } from "@/config/app-routes";

type NavbarLinkProps = {
  item: AppRoute;
  onNavigate?: () => void;
};

export default function NavbarLink({ item, onNavigate }: NavbarLinkProps) {
  return (
    <Link
      to={item.path}
      onClick={onNavigate}
      className="inline-flex border-b-2 border-transparent px-2 py-2 font-mono text-xs uppercase hover:border-accent hover:text-accent"
    >
      {item.label}
    </Link>
  );
}
