import { useState } from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";
import React from "react";
import { ifOrEmpty } from "@/lib/renderingUtils";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ButtonStateIcon, State } from "./buttonStateIcon";

export function SubmitButton<T>({
  children,
  className = "",
  promise,
  disabled = false,
  onSuccess = () => {},
  onError = () => {},
}: {
  children: React.ReactNode;
  promise: () => Promise<T>;
  disabled?: boolean;
  className?: string;
  onSuccess?: (res: T) => void;
  onError?: (err: any) => void;
}) {
  const [promiseState, setPromiseState] = useState<State>("inactive");
  const resetPromiseState = () => {
    setTimeout(() => {
      setPromiseState("inactive");
    }, 1000);
  };
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <React.Fragment>
      <Button
        disabled={promiseState !== "inactive" || disabled}
        className={
          promiseState === "resolved"
            ? "bg-green-600 " + className
            : promiseState === "rejected"
            ? "bg-red-600 " + className
            : className
        }
        onClick={() => {
          setErrorMessage("");

          setPromiseState("awaiting");
          promise()
            .then((res) => {
              setPromiseState("resolved");
              resetPromiseState();
              onSuccess(res);
            })
            .catch((err: any) => {
              setPromiseState("rejected");
              setErrorMessage(JSON.stringify(err));
              resetPromiseState();
              onError(err);
            });
        }}
      >
        <ButtonStateIcon state={promiseState} />
        {children}
      </Button>
      {ifOrEmpty(errorMessage !== "", () => (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      ))}
    </React.Fragment>
  );
}
