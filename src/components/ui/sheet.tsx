"use client";

import * as React from "react";
import { Drawer } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";

export const Sheet = Drawer.Root;
export const SheetTrigger = Drawer.Trigger;
export const SheetClose = Drawer.Close;
export const SheetTitle = Drawer.Title;

export function SheetContent({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Drawer.Popup>, "className"> & { className?: string }) {
  return (
    <Drawer.Portal>
      <Drawer.Backdrop className="fixed inset-0 z-50 min-h-dvh bg-primary/40 opacity-[calc(1-var(--drawer-swipe-progress,0))] backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0" />
      <Drawer.Viewport className="fixed inset-0 z-50 flex justify-end">
        <Drawer.Popup
          className={cn(
            "flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto overscroll-contain bg-surface p-6 shadow-2xl outline-none transform-[translateX(var(--drawer-swipe-movement-x,0px))] transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:transform-[translateX(100%)] data-starting-style:transform-[translateX(100%)] data-swiping:select-none data-swiping:duration-0",
            className,
          )}
          {...props}
        >
          <Drawer.Content className="flex h-full flex-col">{children}</Drawer.Content>
        </Drawer.Popup>
      </Drawer.Viewport>
    </Drawer.Portal>
  );
}
