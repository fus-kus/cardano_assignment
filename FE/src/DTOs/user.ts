import { z } from "zod";

export const maritalStatuses = [
  "Single",
  "Married",
  "Divorced",
  "Other",
] as const;

export const UserSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email().min(5),
  age: z.number().min(0),
  maritalStatus: z.enum(maritalStatuses),
  address: z.string(),
});

export type User = z.infer<typeof UserSchema>;
