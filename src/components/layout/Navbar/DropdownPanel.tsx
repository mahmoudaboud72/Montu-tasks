import type { DropdownColumn } from "@/lib/constants";

type Props = {
  columns: DropdownColumn[];
  onNavigate: () => void;
};

export default function DropdownPanel({ columns, onNavigate }: Props) {
  return (
    <div className="absolute left-1/2 top-full mt-3 w-[520px] -translate-x-1/2 border border-foreground bg-surface p-6 shadow-[6px_6px_0_0_var(--color-foreground)]">
      <div className="grid grid-cols-2 gap-8">
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {column.heading}
            </p>
            <ul className="space-y-3">
              {column.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); onNavigate(); }}
                    className="group block"
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-accent">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
