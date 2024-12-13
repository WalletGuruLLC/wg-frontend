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

export const sendOtpAuthenticationValidator = z.object({
  email: z.string().email(),
  otp: z.string().min(1, "wallet-users.otp.code.errors.invalid"),
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
  walletAddress: z
    .string()
    .min(
      1,
      "dashboard.reports.sections-transactions-by-user.search.wallet-address.error",
    ),
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  type: z.string().min(1).optional(),
  providerIds: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  userType: z.string().min(1).optional(),
  isRevenue: z.string().optional(),
  report: z.string().optional(),
});

export const clearPaymentsValidator = z.object({
  year: z.string().optional(),
  month: z.string().optional(),
  providerId: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
});

export const detailTransactionValidator = z.object({
  transacctionIds: z.array(z.string()).min(1),
});
/*
export const reservedFundsByUserValidator = z.object({
  walletAddress: z
    .string()
    .min(
      1,
      "dashboard.reports.sections-reserved-funds-by-user.search.wallet-address.error",
    ),
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-reserved-funds-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-reserved-funds-by-user.search.period.error",
    })
    .optional(),
  type: z.string().min(1).optional(),
  providerIds: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
});
*/
export const transactionsByProviderValidator = z.object({
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  providerIds: z.string().min(1).optional(),
  state: z.string().min(1).optional(),
  isRevenue: z.string().optional(),
  report: z.string().optional(),
  percent: z.number().optional(),
  commission: z.number().optional(),
  base: z.number().optional(),
});

export const walletusersValidator = z.object({
  state: z.string().optional(),
  wallet: z.string().optional(),
});

export const walletuserDetailValidator = z.object({
  id: z.string().min(1),
  name: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  socialSecurityNumber: z.string(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  stateLocation: z.string(),
  country: z.string(),
  city: z.string(),
  zipCode: z.string(),
});

export const resetPasswordIdValidator = z.object({
  userId: z.string().min(1),
});

export const toggleWalletLockValidator = z.object({
  userId: z.string().min(1),
});

export const disputeValidator = z.object({
  activityId: z.string().min(1),
  amount: z.string().min(0),
  description: z.string().optional(),
  serviceProviderId: z.string().optional(),
});

export const clearPaymentValidator = z.object({
  month: z.string().min(1),
  transaction: z.string().min(0),
  fees: z.string().optional(),
  amount: z.string().optional(),
  referenceNumber: z.string().optional(),
  observations: z.string().optional(),
  clearPaymentId: z.string().optional(),
});

export const revenueValidator = z.object({
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  type: z.string().min(1).optional(),
  providerIds: z.string().min(1).optional(),
  isRevenue: z.string(),
});

export const disputesValidator = z.object({
  walletAddress: z
    .string()
    .min(
      1,
      "dashboard.reports.sections-transactions-by-user.search.wallet-address.error",
    ),
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  serviceProviderId: z.string().min(1).optional(),
});

export const reservedFundsValidator = z.object({
  walletAddress: z
    .string()
    .min(
      1,
      "dashboard.reports.sections-transactions-by-user.search.wallet-address.error",
    ),
  startDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  endDate: z
    .date({
      required_error:
        "dashboard.reports.sections-transactions-by-user.search.period.error",
    })
    .optional(),
  serviceProviderId: z.string().min(1).optional(),
  status: z.string().optional(),
});
