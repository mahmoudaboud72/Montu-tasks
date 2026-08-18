import * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

type SidebarContextValue = {
  open: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider.");
  }

  return context;
}

function SidebarProvider({ children }: React.PropsWithChildren) {
  const [open, setOpen] = React.useState(true);
  const [openMobile, setOpenMobile] = React.useState(false);

  const value = React.useMemo(
    () => ({
      open,
      openMobile,
      setOpenMobile,
      toggleSidebar: () => setOpen((current) => !current),
      toggleMobileSidebar: () => setOpenMobile((current) => !current),
    }),
    [open, openMobile],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div className="flex min-h-svh">{children}</div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ children }: React.PropsWithChildren) {
  const { open, openMobile, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();

  React.useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <>
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent>
          <div className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Dashboard navigation</SheetDescription>
          </div>
          {children}
        </SheetContent>
      </Sheet>

      <div className="group hidden md:block" data-collapsed={!open}>
        <div className="w-64 transition-[width] group-data-[collapsed=true]:w-14" />
        <div
          aria-label="Dashboard navigation"
          className="fixed inset-y-0 left-0 z-10 flex w-64 flex-col overflow-hidden border-r border-foreground bg-sidebar text-sidebar-foreground transition-[width] group-data-[collapsed=true]:w-14"
        >
          {children}
        </div>
      </div>
    </>
  );
}

function SidebarTrigger() {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="hidden size-9 items-center justify-center border border-foreground bg-background hover:bg-secondary md:inline-flex"
      >
        <PanelLeftIcon className="size-4" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>
      <button
        type="button"
        onClick={toggleMobileSidebar}
        className="inline-flex size-9 items-center justify-center border border-foreground bg-background hover:bg-secondary md:hidden"
      >
        <PanelLeftIcon className="size-4" />
        <span className="sr-only">Open Sidebar</span>
      </button>
    </>
  );
}

function SidebarInset({ children }: React.PropsWithChildren) {
  return <main className="flex min-w-0 flex-1 flex-col">{children}</main>;
}

export { Sidebar, SidebarInset, SidebarProvider, SidebarTrigger };
