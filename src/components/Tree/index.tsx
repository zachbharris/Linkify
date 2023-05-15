"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

type TreeProps = {
  children: React.ReactNode;
};

export default function Tree({ children }: TreeProps) {
  function handleDragEnd({ over }: DragEndEvent) {}

  return <DndContext>{children}</DndContext>;
}
