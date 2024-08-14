import { z } from "zod";

const validPassword = (err?: string) =>
  z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/,
      err,
    );

export const loginValidator = z.object({
  email: z.string().email("auth.login.email.errors.invalid"),
  password: validPassword("auth.login.password.errors.invalid"),
  rememberMe: z.boolean().default(false).optional(),
});

export const resetPasswordValidator = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: validPassword("auth.login.password.errors.invalid"),
    confirmPassword: validPassword("auth.login.password.errors.invalid"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "auth.reset-password.confirm-password.errors.passwords-not-match",
    path: ["confirmPassword"],
  });
