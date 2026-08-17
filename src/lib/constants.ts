export type DropdownItem = {
  title: string;
  description: string;
  href: string;
};

export type DropdownColumn = {
  heading: string;
  items: DropdownItem[];
};

export type NavItem = {
  label: string;
  href: string;
  columns?: DropdownColumn[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  {
    label: "Products",
    href: "#products",
    columns: [
      {
        heading: "Platform",
        items: [
          {
            title: "Analytics",
            description: "Track usage and surface trends across your workspace.",
            href: "#analytics",
          },
          {
            title: "Automation",
            description: "Chain actions together without writing glue code.",
            href: "#automation",
          },
          {
            title: "Integrations",
            description: "Connect the tools your team already runs on.",
            href: "#integrations",
          },
        ],
      },
      {
        heading: "Resources",
        items: [
          {
            title: "Documentation",
            description: "Guides and API reference for every endpoint.",
            href: "#docs",
          },
          {
            title: "Changelog",
            description: "What shipped, broke, or got faster this week.",
            href: "#changelog",
          },
          {
            title: "Support",
            description: "Talk to someone when something doesn't add up.",
            href: "#support",
          },
        ],
      },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
