import { z } from "zod";

const validPassword = (err?: string) =>
  z
    .string()
    .min(8, err)
    .max(12, err)
    .refine((value) => value.match(/[a-z]/), err)
    .refine((value) => value.match(/[A-Z]/), err)
    .refine((value) => value.match(/\d/), err)
    .refine((value) => value.match(/[ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/), err); // https://owasp.org/www-community/password-special-characters

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

export const twoFactorAuthenticationValidator = z.object({
  email: z.string().email("auth.login.email.errors.invalid"),
  otp: z.string().min(1, "auth.2fa.code.errors.invalid"),
});

export const forgotPasswordEmailStepValidator = z.object({
  email: z.string().email("auth.login.email.errors.invalid"),
});

export const forgotPasswordCodeStepValidator = z
  .object({
    email: z.string().email("auth.login.email.errors.invalid"),
    confirmationCode: z.string().min(1, "auth.2fa.code.errors.invalid"),
    newPassword: validPassword("auth.login.password.errors.invalid"),
    confirmPassword: validPassword("auth.login.password.errors.invalid"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "auth.reset-password.confirm-password.errors.passwords-not-match",
    path: ["confirmPassword"],
  });

export const paginationAndSearchValidator = z.object({
  page: z.string().optional(),
  items: z.string().optional(),
  search: z.string().optional(),
});

export const addOrEditRoleValidator = z.object({
  name: z
    .string()
    .min(1)
    .max(20, "dashboard.roles.edit-dialog.name.error")
    .refine((v) => !/\d/.test(v), {
      message: "dashboard.roles.edit-dialog.name.error",
    }),
  description: z
    .string()
    .min(1)
    .max(50, "dashboard.roles.edit-dialog.description.error")
    .refine((v) => !/\d/.test(v), {
      message: "dashboard.roles.edit-dialog.description.error",
    }),
  providerId: z.string().min(1),
  roleId: z.string().optional(),
});

export const toggleRoleStatusValidator = z.object({
  roleId: z.string().min(1),
});
