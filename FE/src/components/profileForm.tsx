"use client";

import { User, maritalStatuses, UserSchema } from "@/DTOs/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { SelectItem } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { ifOrEmpty } from "@/lib/renderingUtils";
import { Trash2 } from "lucide-react";
import { ConfirmPopover } from "./confirmPopover";
import { Button } from "./ui/button";
import { MultiStateButton } from "./multiState";
import { State } from "./buttonStateIcon";
import { createUser, deleteUser, updateUser } from "@/lib/api/users";

export function ProfileDialog({
  values,
  children,
  onUpdate = () => {},
  editMode = false,
}: {
  values?: User;
  children: React.ReactNode;
  onUpdate?: () => void;
  editMode?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit profile" : "Add Profile"}</DialogTitle>
          <DialogDescription>
            {ifOrEmpty(editMode, () => "Make changes to your profile here. ")}
            Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          values={values}
          onUpdate={() => {
            onUpdate();
            setOpen(false);
          }}
        />
        {ifOrEmpty(editMode, () => (
          <ConfirmPopover
            onUpdate={() => {
              onUpdate();
              setOpen(false);
            }}
            promise={() => {
              if (values != null) {
                return deleteUser(values.id);
              }
              return Promise.resolve();
            }}
            message="This action is irreversible, are you sure you want to continue?"
          >
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Profile
            </Button>
          </ConfirmPopover>
        ))}
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({
  values,
  onUpdate,
}: {
  values: User | undefined;
  onUpdate: () => void;
}): React.ReactNode {
  // 1. Define your form.
  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: values ?? { id: "" },
  });

  const [promiseState, setPromiseState] = useState<State>("inactive");
  const resetPromiseState = () => {
    setTimeout(() => {
      setPromiseState("inactive");
    }, 1000);
  };

  // 2. Define a submit handler.
  async function onSubmit(values: User) {
    setPromiseState("awaiting");
    const { id, ...data } = values;
    if (id === "") {
      return createUser(data);
    }
    return updateUser(id, data);
  }

  return (
    <Form {...form}>
      <form>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>e-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified marital status">
                        {field.value}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {maritalStatuses.map((mt) => (
                      <SelectItem key={mt} value={mt}>
                        {mt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <MultiStateButton
          state={promiseState}
          submit
          onClick={form.handleSubmit(
            (val) =>
              onSubmit(val).then(() => {
                onUpdate();
                resetPromiseState();
              }),
            () => {
              setPromiseState("rejected");
              resetPromiseState();
            }
          )}
          className="w-full mt-8"
        >
          Submit
        </MultiStateButton>
      </form>
    </Form>
  );
}
