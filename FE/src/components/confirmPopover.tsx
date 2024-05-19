import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SubmitButton } from "./submitButton";
import { useState } from "react";

export function ConfirmPopover({
  message,
  children,
  promise,
}: {
  message: string;
  children: React.ReactNode;
  promise: () => Promise<any>;
}) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 ">
        <h4 className="text-xl font-semibold tracking-tight mb-2">Warning</h4>
        <div className="flex flex-col space-y-2">
          <span>{message}</span>
          <SubmitButton
            promise={promise}
            onSuccess={() => {
              setTimeout(() => {
                setOpen(false);
              }, 1500);
            }}
          >
            Confirm
          </SubmitButton>
        </div>
      </PopoverContent>
    </Popover>
  );
}
