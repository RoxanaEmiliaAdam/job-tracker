"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

type ConfirmDialogProps = {
  children?: ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ConfirmDialogBox({
  children,
  title = "Confirm Action",
  description = "Are you sure you want to continue?",
  confirmLabel = "Yes",
  cancelLabel = "Cancel",
  onConfirm,
  isOpen,
  onOpenChange,
}: ConfirmDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {/* button pressed in */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="hover:bg-blue-50 border-blue-800"
            >
              {cancelLabel}
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              variant="outline"
              className="text-red-600  border-red-600 hover:bg-red-50 bg-red-40"
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
