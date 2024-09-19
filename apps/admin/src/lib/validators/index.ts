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
  serviceProviderId: z.string().optional(),
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

export const saveRoleModuleAccessLevelValidator = z.object({
  accessLevel: z.number(),
  roleId: z.string().min(1),
  moduleId: z.string().min(1),
});

export const addOrEditUserValidator = z.object({
  firstName: z.string().min(1, "dashboard.users.edit-dialog.first-name.error"),
  lastName: z.string().min(1, "dashboard.users.edit-dialog.last-name.error"),
  email: z.string().email("dashboard.users.edit-dialog.email.error"),
  phone: z
    .string()
    .min(1, "dashboard.users.edit-dialog.phone.error")
    .refine(
      (v) =>
        v.split("-")[0] !== "" &&
        !isNaN(Number(v.split("-")[0])) &&
        v.split("-")[1] !== "" &&
        !isNaN(Number(v.split("-")[1])),
      {
        message: "dashboard.users.edit-dialog.phone.error",
      },
    ),
  serviceProviderId: z.string().min(1),
  roleId: z.string().min(1, "dashboard.users.edit-dialog.role.error"),
  type: z.enum(["WALLET", "PROVIDER", "PLATFORM"]),
  userId: z.string().optional(),
});

export const toggleUserStatusValidator = z.object({
  userId: z.string().min(1),
  email: z.string().min(1),
  active: z.boolean(),
});

export const addOrEditWalletValidator = z.object({
  name: z.string().min(4, "dashboard.wallet-management.edit-dialog.name.error"),
  walletType: z
    .string()
    .min(1, "dashboard.wallet-management.edit-dialog.type.error"),
  walletAddress: z
    .string()
    .url("dashboard.wallet-management.edit-dialog.address.error")
    .min(1, "dashboard.wallet-management.edit-dialog.address.error"),
  walletId: z.string().optional(),
});

export const toggleWalletStatusValidator = z.object({
  walletId: z.string().min(1),
});

export const addOrEditServiceProviderValidator = z.object({
  providerId: z.string(),
  name: z.string().min(1, "service-providers.add-dialog.company-name.error"),
  einNumber: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "service-providers.add-dialog.ein.error"),
  country: z.string().min(1, "service-providers.add-dialog.country.error"),
  city: z.string().min(1, "service-providers.add-dialog.city.error"),
  zipCode: z.string().min(1, "service-providers.add-dialog.zip-code.error"),
  companyAddress: z
    .string()
    .min(1, "service-providers.add-dialog.company-address.error"),
  walletAddress: z
    .string()
    .min(1, "service-providers.add-dialog.wallet-address.error")
    .refine((v) => !/\s/.test(v), {
      message: "service-providers.add-dialog.wallet-address.error",
    }),
});

export const toggleProviderStatusValidator = z.object({
  providerId: z.string().min(1),
  active: z.boolean(),
});
