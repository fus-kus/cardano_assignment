import { Button } from "./ui/button";
import React from "react";
import { ButtonStateIcon, State } from "./buttonStateIcon";

export function MultiStateButton({
  children,
  state,
  className = "",
  disabled = false,
  onClick = () => {},
  submit = false,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  state: State;
  onClick: () => void;
  submit: boolean;
}) {
  console.log(state);
  return (
    <Button
      type={submit ? "submit" : undefined}
      disabled={state !== "inactive" || disabled}
      className={
        state === "resolved"
          ? "bg-green-600 " + className
          : state === "rejected"
          ? "bg-red-600 " + className
          : className
      }
      onClick={onClick}
    >
      <ButtonStateIcon state={state} />
      {children}
    </Button>
  );
}
