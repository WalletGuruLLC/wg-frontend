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

export const changePasswordValidator = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: validPassword(
      "dashboard.change-password.form.new-password.error",
    ),
    confirmPassword: validPassword(
      "dashboard.change-password.form.new-password.error",
    ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "dashboard.change-password.form.confirm-password.error",
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

export const updateUserPhoneNumberValidator = z.object({
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
  userId: z.string().min(1),
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
  asset: z.string().min(1, "service-providers.add-dialog.asset.error"),
});

export const addOrEditProviderFeeValidator = z.object({
  percent: z
    .string()
    .min(1, "service-providers.settings.fee.dialog.percent.error")
    .refine((v) => !isNaN(Number(v)), {
      message: "service-providers.settings.fee.dialog.percent.error",
    }),
  comission: z
    .string()
    .min(1, "service-providers.settings.fee.dialog.commission.error")
    .refine((v) => !isNaN(Number(v)), {
      message: "service-providers.settings.fee.dialog.commission.error",
    }),
  base: z
    .string()
    .min(1, "service-providers.settings.fee.dialog.base.error")
    .refine((v) => !isNaN(Number(v)), {
      message: "service-providers.settings.fee.dialog.base.error",
    }),
  feeId: z.string().optional(),
  serviceProviderId: z.string().min(1),
});

export const toggleProviderStatusValidator = z.object({
  providerId: z.string().min(1),
  active: z.boolean(),
});

export const toggleProviderPaymentParameterStatusValidator = z.object({
  serviceProviderId: z.string().min(1),
  paymentParameterId: z.string().min(1),
});

export const addOrEditProviderPaymentParameterValidator = z.object({
  name: z
    .string()
    .min(
      1,
      "service-providers.settings.payment-parameters.add-dialog.name.error",
    ),
  cost: z
    .string()
    .min(
      1,
      "service-providers.settings.payment-parameters.add-dialog.cost.error",
    )
    .refine((v) => !isNaN(Number(v)), {
      message:
        "service-providers.settings.payment-parameters.add-dialog.cost.error",
    }),
  frequency: z
    .string()
    .min(
      1,
      "service-providers.settings.payment-parameters.add-dialog.frequency.error",
    )
    .refine((v) => !isNaN(Number(v)), {
      message:
        "service-providers.settings.payment-parameters.add-dialog.frequency.error",
    }),
  timeIntervalId: z
    .string()
    .min(
      1,
      "service-providers.settings.payment-parameters.add-dialog.interval.error",
    ),
  serviceProviderId: z.string().min(1),
  paymentParameterId: z.string().optional(),
});

export const settingsValidator = z.object({
  value: z.string().url().min(1),
});

export const transactionsByUserValidator = z.object({
  id: z.string().min(1),
  walletAddress: z
    .string()
    .min(
      1,
      "dashboard.reports.sections-transactions-by-user.search.wallet-address.error",
    ),
  startDate: z
    .string()
    .refine(
      (date) =>
        !isNaN(new Date(date).getUTCDate()) && new Date(date) <= new Date(),
      {
        message:
          "dashboard.reports.sections-transactions-by-user.search.period.error",
      },
    ),
  endDate: z
    .string()
    .refine(
      (date) =>
        !isNaN(new Date(date).getUTCDate()) && new Date(date) <= new Date(),
      {
        message:
          "dashboard.reports.sections-transactions-by-user.search.period.error",
      },
    ),
  type: z.string().min(1),
  provider: z.string().min(1),
  state: z.string().min(1),
});
