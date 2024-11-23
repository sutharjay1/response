import { z } from "zod";

export const TUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  image: z.string(),
});

export type TUser = z.infer<typeof TUserSchema>;
