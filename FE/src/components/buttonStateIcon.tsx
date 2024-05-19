import { Check, Loader2, X } from "lucide-react";
import React from "react";
import { NeverError } from "@/lib/errors";
const states = ["inactive", "awaiting", "resolved", "rejected"] as const;
export type State = (typeof states)[number];

export function ButtonStateIcon({ state }: { state: State }) {
  switch (state) {
    case "inactive":
      return <React.Fragment></React.Fragment>;
    case "awaiting":
      return <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    case "resolved":
      return <Check className="mr-2 h-4 w-4" />;
    case "rejected":
      return <X className="mr-2 h-4 w-4" />;
    default:
      throw new NeverError(state);
  }
}
