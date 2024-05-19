"use client";

import { User } from "@/DTOs/user";
import { DataTable, columns } from "@/components/usersTable";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ProfileDialog } from "./profileForm";
import { fetchUsers } from "@/lib/api/users";
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ifElse } from "@/lib/renderingUtils";

function renderDataTable(users: User[]) {
  return (
    <React.Fragment>
      <DataTable columns={columns} data={users} />
      <div className="flex flex-row justify-end">
        <div className="space-x-2">
          <ProfileDialog>
            <Button> Add</Button>
          </ProfileDialog>
        </div>
      </div>
    </React.Fragment>
  );
}

function renderErrorMessage(error: any) {
  return (
    <React.Fragment>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </React.Fragment>
  );
}

export function InnerPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getUsers = () => {
      fetchUsers()
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => {
          setErrorMessage(JSON.stringify(error));
        });
    };
    getUsers();
  }, []);

  console.log(errorMessage === "");
  return (
    <div className="container mx-auto py-10 space-y-2">
      {ifElse(
        errorMessage !== "",
        () => renderErrorMessage(errorMessage),
        () => renderDataTable(users)
      )}
    </div>
  );
}
