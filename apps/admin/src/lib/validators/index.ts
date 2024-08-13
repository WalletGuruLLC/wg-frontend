import { z } from "zod";

export const loginValidator = z.object({
  email: z.string().email("auth.login.email.errors.invalid"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      "auth.login.password.errors.invalid",
    ),
  rememberMe: z.boolean().default(false).optional(),
});
