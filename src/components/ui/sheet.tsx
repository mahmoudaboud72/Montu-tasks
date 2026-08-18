import * as React from "react";
import { Dialog } from "radix-ui";

const Sheet = Dialog.Root;
const SheetTitle = Dialog.Title;
const SheetDescription = Dialog.Description;

function SheetContent({ children }: React.PropsWithChildren) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20 md:hidden" />
      <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-foreground bg-sidebar text-sidebar-foreground shadow-lg md:hidden">
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export { Sheet, SheetContent, SheetDescription, SheetTitle };
