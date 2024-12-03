"use client";

import type { z } from "zod";
import { format } from "date-fns";

import type {
  UseMutationOptions,
  UseQueryOptions,
} from "@wg-frontend/data-access";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@wg-frontend/data-access";

import type {
  addOrEditProviderFeeValidator,
  addOrEditProviderPaymentParameterValidator,
  addOrEditRoleValidator,
  addOrEditServiceProviderValidator,
  addOrEditUserValidator,
  addOrEditWalletValidator,
  changePasswordValidator,
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  paginationAndSearchValidator,
  resetPasswordIdValidator,
  resetPasswordValidator,
  sendOtpAuthenticationValidator,
  settingsValidator,
  toggleProviderPaymentParameterStatusValidator,
  toggleProviderStatusValidator,
  toggleRoleStatusValidator,
  toggleUserStatusValidator,
  toggleWalletLockValidator,
  toggleWalletStatusValidator,
  transactionsByProviderValidator,
  transactionsByUserValidator,
  twoFactorAuthenticationValidator,
  updateUserPhoneNumberValidator,
} from "../validators";
import { env } from "~/env";
import customFetch from "./custom-fetch";

interface UseGetAuthedUserInfoQueryOutput {
  privacyPolicy: boolean;
  mfaEnabled: boolean;
  createDate: unknown;
  phone: string;
  termsConditions: boolean;
  otp: string;
  sendSms: boolean;
  state: 0 | 1 | 2 | 3;
  type: "PLATFORM" | "WALLET" | "PROVIDER";
  email: string;
  mfaType: "TOTP" | "SMS";
  first: boolean;
  roleId: string;
  sendEmails: boolean;
  updateDate: unknown;
  picture: string;
  serviceProviderId: string;
  firstName: string;
  id: string;
  active: boolean;
  lastName: string;
  accessLevel: ApiSimpleAccessLevels;
}

export function useGetAuthedUserInfoQuery(
  _: undefined,
  options: UseQueryOptions<UseGetAuthedUserInfoQueryOutput> = {},
) {
  return useQuery({
    ...options,
    retry: 0, // Disable retries because endpoints returns error when not authed and we want that error to be taken as "no user authed"
    queryKey: ["get-authed-user-info"],
    queryFn: async () => {
      const userRefreshData = await customFetch<{ token: string }>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/refresh-token",
        {
          method: "POST",
          body: JSON.stringify({
            token: localStorage.getItem("refresh-token"),
            email: localStorage.getItem("email"),
          }),
        },
      );
      localStorage.setItem("access-token", userRefreshData.token);
      return customFetch<UseGetAuthedUserInfoQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user",
      );
    },
  });
}

const MODULES_MAP = {
  R949: "roles",
  W325: "wallets",
  U783: "users",
  SP95: "serviceProviders",
  SE37: "settings",
  TR91: "reports",
  TU16: "transactionsByUser",
  TP59: "transactionsByProvider",
  REV3: "revenue",
  CPWG: "clearPayments",
  PY38: "payments",
  WU47: "walletUsers",
  RF86: "reservedFunds",
  RFSP: "refunds",
  DWG2: "disputes",
  FEE8: "fees",
  PS52: "paymentSummary",
  HC01: "healthCheck",
} as const;
type ModuleDatabaseId = keyof typeof MODULES_MAP;
export type ModuleId = (typeof MODULES_MAP)[ModuleDatabaseId];
type ApiSimpleAccessLevels = {
  [key in ModuleDatabaseId]?: number;
};
type ApiComplexAccessLevels = {
  [K in ModuleDatabaseId]: { [P in K]: Record<string, number> };
}[ModuleDatabaseId][];
export const ACCESS_LEVELS_BINARY_ORDERED = [
  "view",
  "add",
  "edit",
  "inactive",
] as const;
export type AccessLevel = (typeof ACCESS_LEVELS_BINARY_ORDERED)[0 | 1 | 2 | 3];
type ModuleAccessLevels = {
  [key in ModuleId]: AccessLevel[];
};

// Same endpoint as useGetAuthedUserInfoQuery. We have it as different hooks to treat cache separately
export function useGetAuthedUserAccessLevelsQuery(
  _: undefined,
  options: UseQueryOptions<{
    general: ModuleAccessLevels;
    providers: Record<string, ModuleAccessLevels>;
  }> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-authed-user-access-levels"],
    queryFn: async () => {
      const data = await customFetch<{
        accessLevel: ApiSimpleAccessLevels;
        platformAccessLevel: Record<string, never> | ApiComplexAccessLevels;
      }>(env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user");

      const apiGeneralAccessLevels = data.accessLevel;
      const apiProvidersAccessLevels =
        typeof data.platformAccessLevel === "object" &&
        !Array.isArray(data.platformAccessLevel)
          ? []
          : data.platformAccessLevel;

      const generalAccessLevels = Object.keys(MODULES_MAP).reduce(
        (acc, moduleDatabaseId) => {
          const accessLevels = numberToAccessLevels(
            apiGeneralAccessLevels[moduleDatabaseId as ModuleDatabaseId] ?? 0,
          );
          acc[MODULES_MAP[moduleDatabaseId as ModuleDatabaseId]] = accessLevels;
          return acc;
        },
        {} as ModuleAccessLevels,
      );

      const providersAccessLevels = apiProvidersAccessLevels.reduce(
        (acc, moduleAccessLevels) => {
          const moduleDatabaseId = Object.keys(
            moduleAccessLevels,
          )[0] as ModuleDatabaseId;

          // @ts-expect-error because we know it's not an empty object and can be indexed by moduleDatabaseId
          const serviceProvidersNumericAccessLevel = moduleAccessLevels[
            moduleDatabaseId
          ] as Record<string, number>;

          Object.entries(serviceProvidersNumericAccessLevel).forEach(
            ([serviceProviderId, numericAccessLevel]) => {
              acc[serviceProviderId] = {
                roles: [],
                wallets: [],
                users: [],
                serviceProviders: [],
                settings: [],
                reports: [],
                transactionsByUser: [],
                transactionsByProvider: [],
                revenue: [],
                clearPayments: [],
                walletUsers: [],
                payments: [],
                disputes: [],
                refunds: [],
                reservedFunds: [],
                paymentSummary: [],
                fees: [],
                healthCheck: [],
                ...acc[serviceProviderId],
                [MODULES_MAP[moduleDatabaseId]]:
                  numberToAccessLevels(numericAccessLevel),
              };
            },
          );

          return acc;
        },
        {} as Record<string, ModuleAccessLevels>,
      );

      return {
        general: generalAccessLevels,
        providers: providersAccessLevels,
      };
    },
  });
}

function numberToAccessLevels(numericAccessLevel: number) {
  return ACCESS_LEVELS_BINARY_ORDERED.filter(
    (_, i) => (numericAccessLevel & (1 << i)) !== 0,
  );
}

export function accessLevelsToNumber(accessLevels: AccessLevel[]) {
  return accessLevels.reduce(
    (acc, v) => acc | (1 << ACCESS_LEVELS_BINARY_ORDERED.indexOf(v)),
    0,
  );
}

export function useLoginMutation(
  options: UseMutationOptions<z.infer<typeof loginValidator>, unknown> = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["login"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/signin",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useTwoFactorAuthenticationMutation(
  options: UseMutationOptions<
    z.infer<typeof twoFactorAuthenticationValidator>,
    {
      user: {
        privacyPolicy: boolean;
        mfaEnabled: boolean;
        createDate: unknown;
        termsConditions: boolean;
        otp: string;
        sendSms: boolean;
        state: 0 | 1 | 2 | 3;
        type: "PLATFORM" | "WALLET" | "PROVIDER";
        email: string;
        mfaType: "TOTP" | "SMS";
        first: boolean;
        roleId: string;
        sendEmails: boolean;
        updateDate: unknown;
        picture: "";
        serviceProviderId: string;
        firstName: string;
        id: string;
        active: boolean;
        lastName: string;
        accessLevel: ApiSimpleAccessLevels;
      };
      token: string;
      refresToken: string;
    }
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["two-factor-authentication"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/verify/otp/mfa",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useSendOtpAuthenticationMutation(
  options: UseMutationOptions<
    z.infer<typeof sendOtpAuthenticationValidator>,
    {
      user: {
        id: string;
        otp: string;
        email: string;
        accessLevel: ApiSimpleAccessLevels;
      };
      token: string;
      refresToken: string;
    }
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["send-otp"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/verify/otp/mfa",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-verify-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useLogoutMutation(
  options: UseMutationOptions<null, unknown> = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["logout"],
    mutationFn: () => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/logout",
        {
          method: "POST",
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useResendCodeMutation(
  options: UseMutationOptions<{ email: string }, unknown> = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["resend-code"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/send-otp",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
  });
}

export function useResetPasswordMutation(
  options: UseMutationOptions<
    z.infer<typeof resetPasswordValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["reset-password"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/change-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useForgotPasswordEmailStepMutation(
  options: UseMutationOptions<
    z.infer<typeof forgotPasswordEmailStepValidator>,
    unknown
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["forgot-password-email-step"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
  });
}

export function useForgotPasswordCodeStepMutation(
  options: UseMutationOptions<
    z.infer<typeof forgotPasswordCodeStepValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["forgot-password-code-step"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users/confirm-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useChangePasswordMutation(
  options: UseMutationOptions<
    z.infer<typeof changePasswordValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["change-password"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/change-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useUploadUserImageMutation(
  options: UseMutationOptions<
    {
      picture: File;
      userId: string;
    },
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["upload-user-image"],
    mutationFn: (input) => {
      const formData = new FormData();
      formData.append("file", input.picture);

      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users/upload-image/" +
          input.userId,
        {
          method: "PUT",
          body: formData,
          headers: {
            "x-no-content-type": "true",
          },
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useUpdateUserPhoneNumberMutation(
  options: UseMutationOptions<
    z.infer<typeof updateUserPhoneNumberValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["update-user-phone-number"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users/update-profile/" +
          input.userId,
        {
          method: "PUT",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export interface Role {
  createDate: string;
  updateDate: string;
  modules: unknown;
  description: string;
  id: string;
  providerId: string;
  active: boolean;
  name: string;
}

interface UseGetRolesQueryOutput {
  roles: Role[];
  total: number;
}

export function useGetRolesQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    providerId?: string;
  },
  options: UseQueryOptions<UseGetRolesQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-roles", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetRolesQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/roles?" +
          params.toString(),
      );
    },
  });
}

export function useAddOrEditRoleMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditRoleValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-role"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/roles/" +
          (input.roleId ?? ""),
        {
          method: input.roleId ? "PUT" : "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-roles"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useToggleRoleStatusMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleRoleStatusValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-role-status"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/roles/${input.roleId}/toggle`,
        {
          method: "PATCH",
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-roles"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export type UseGetRoleAccessLevelsQueryOutput = {
  module: ModuleId;
  accessLevels: AccessLevel[];
  description: string;
}[];

export function useGetRoleAccessLevelsQuery(
  input: {
    roleId: string;
    isProvider: boolean;
  },
  options: UseQueryOptions<UseGetRoleAccessLevelsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-role-access-levels", input],
    queryFn: async () => {
      const params = new URLSearchParams({
        isProvider: input.isProvider.toString(),
      });
      const modules = await customFetch<
        {
          id: ModuleDatabaseId;
          belongs: string;
          description: string;
          index: number;
          subIndex: number;
        }[]
      >(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/modules?" +
          params.toString(),
      );

      const accessLevels = await customFetch<ApiSimpleAccessLevels>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/roles/simple-access-level/" +
          input.roleId,
      );

      return modules.map((m) => ({
        module: MODULES_MAP[m.id],
        accessLevels: numberToAccessLevels(accessLevels[m.id] ?? 0),
        description: m.description,
      }));
    },
  });
}

interface UseGetRoleQueryOutput {
  CreateDate: number;
  UpdateDate: number;
  Modules: unknown;
  Description: string;
  Id: string;
  Active: boolean;
  ProviderId: string;
  Name: string;
}

export function useGetRoleQuery(
  input: {
    roleId: string;
  },
  options: UseQueryOptions<UseGetRoleQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-role", input],
    queryFn: () => {
      return customFetch<UseGetRoleQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/roles/" + input.roleId,
      );
    },
  });
}

export function useSaveRoleModuleAccessLevelMutation(
  options: UseMutationOptions<
    {
      accessLevel: number;
      roleId: string;
      module: ModuleId;
    },
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["save-role-module-access-level"],
    mutationFn: (input) => {
      const moduleDatabaseId = Object.keys(MODULES_MAP).find(
        (k) => MODULES_MAP[k as ModuleDatabaseId] === input.module,
      ) as ModuleDatabaseId;

      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/roles/access-level/${input.roleId}/${moduleDatabaseId}`,
        {
          method: "POST", // POST because backend things but it means an update aswell
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-role-access-levels"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export type UseGetRoleProvidersAccessLevelsQueryOutput = {
  serviceProvider: {
    id: string;
    name: string;
  };
  accessLevels: AccessLevel[];
  total: number;
  totalPages: number;
  currentPage: number;
}[];

export function useGetRoleProvidersAccessLevelsQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    roleId: string;
    module: ModuleId;
  },
  options: UseQueryOptions<UseGetRoleProvidersAccessLevelsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-role-providers-access-levels", input],
    queryFn: async () => {
      const serviceProvidersData = await fetchProviders({
        ...input,
        type: "PLATFORM",
      });

      let apiComplexAccessLevels = await customFetch<
        Record<string, never> | ApiComplexAccessLevels
      >(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/roles/access-level/${input.roleId}`,
      );
      apiComplexAccessLevels =
        typeof apiComplexAccessLevels === "object" &&
        !Array.isArray(apiComplexAccessLevels)
          ? []
          : apiComplexAccessLevels; // back responds with empty object if no access levels ??????? why

      const moduleDatabaseId = Object.keys(MODULES_MAP).find(
        (k) => MODULES_MAP[k as ModuleDatabaseId] === input.module,
      ) as ModuleDatabaseId;

      // @ts-expect-error because we know it's not an empty object and can be indexed by moduleDatabaseId
      const serviceProvidersNumericAccessLevel = apiComplexAccessLevels.find(
        (al) => Object.keys(al)[0] === moduleDatabaseId,
      )?.[moduleDatabaseId] as Record<string, number> | undefined;

      return serviceProvidersData.providers.map((sp) => {
        const accessLevels = numberToAccessLevels(
          serviceProvidersNumericAccessLevel?.[sp.id] ?? 0,
        );

        return {
          serviceProvider: {
            id: sp.id,
            name: sp.name,
          },
          accessLevels,
          total: serviceProvidersData.total,
          totalPages: serviceProvidersData.totalPages,
          currentPage: serviceProvidersData.currentPage,
        };
      });
    },
  });
}

export function useSaveRoleProviderModuleAccessLevelMutation(
  options: UseMutationOptions<
    {
      accessLevel: number;
      roleId: string;
      module: ModuleId;
      serviceProvider: string;
    },
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["save-role-provider-module-access-level"],
    mutationFn: (input) => {
      const moduleDatabaseId = Object.keys(MODULES_MAP).find(
        (k) => MODULES_MAP[k as ModuleDatabaseId] === input.module,
      ) as ModuleDatabaseId;

      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/roles/module-access-level/${input.roleId}/${moduleDatabaseId}`,
        {
          method: "POST", // POST because backend things but it means an update aswell
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-role-providers-access-levels"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export interface User {
  mfaEnabled: boolean;
  roleId: string;
  serviceProviderId: string;
  state: 0 | 1 | 2 | 3;
  firstName: string;
  id: string;
  type: "PLATFORM" | "WALLET" | "PROVIDER";
  active: boolean;
  lastName: string;
  email: string;
  first: boolean;
  mfaType: "TOTP" | "SMS";
  roleName: string;
  phone: string;
  contactUser?: boolean;
  name: string;
  wallet?: {
    rafikiId: string;
    pendingCredits: number;
    pendingDebits: number;
    postedCredits: number;
    postedDebits: number;
    keyId: string;
    id: string;
    active: string;
    walletAddress: string;
    name: string;
  };
  asset?: {
    code: string;
    scale: number;
  };
  socialSecurityNumber?: string;
  identificationType?: string;
  identificationNumber?: string;
  stateLocation?: string;
  country?: string;
  city?: string;
  zipCode?: string;
}

interface UseGetUsersQueryOutput {
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function useGetUsersQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    type: "PLATFORM" | "WALLET" | "PROVIDER";
    state?: string;
    serviceProviderId?: string;
    wallet?: string;
  },
  options: UseQueryOptions<UseGetUsersQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-users", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetUsersQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users?" +
          params.toString(),
      );
    },
  });
}

export function useGetDashboardUsersTitleQuery(
  _: undefined,
  options: UseQueryOptions<string> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-dashboard-users-title"],
    queryFn: async () => {
      const userInfo = await customFetch<UseGetAuthedUserInfoQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user",
      );

      if (userInfo.type === "PLATFORM") return "Wallet Guru";
      if (userInfo.type === "PROVIDER") {
        const providerInfo = await customFetch<{
          name: string;
        }>(
          env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
            "/api/v1/providers/" +
            userInfo.serviceProviderId,
        );
        return providerInfo.name;
      }

      return "";
    },
  });
}

export function useGetProviderKeysQuery(
  _: undefined,
  options: UseQueryOptions<{ secretKey: string; publicKey: string }> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-provider-keys"],
    queryFn: async () => {
      const userInfo = await customFetch<UseGetAuthedUserInfoQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user",
      );
      if (userInfo.type !== "PROVIDER") {
        return { secretKey: "", publicKey: "" };
      } else {
        const providerInfo = await customFetch<{
          socketKeys: {
            secretKey: string;
            publicKey: string;
          };
        }>(
          env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
            "/api/v1/providers/" +
            userInfo.serviceProviderId,
        );
        return {
          secretKey: providerInfo.socketKeys.secretKey,
          publicKey: providerInfo.socketKeys.publicKey,
        };
      }
    },
  });
}

export function useToggleContactInformationMutation(
  options: UseMutationOptions<
    {
      userId: string;
    },
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-contact-information"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users/" +
          input.userId +
          "/toggle-contact",
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-users"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useAddOrEditUserMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditUserValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-user"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/users/" +
          (input.userId ?? "register"),
        {
          method: input.userId ? "PUT" : "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-users"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useGetActiveRolesQuery(
  input: {
    providerId: string;
  },
  options: UseQueryOptions<Role[]> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-active-roles", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<Role[]>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/roles/active?" +
          params.toString(),
      );
    },
  });
}

export function useToggleUserStatusMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleUserStatusValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-user-status"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/users/update-status/${input.userId}`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-users"],
      });
      options.onSuccess?.(...input);
    },
  });
}

type UseGetCountryCodesQueryOutput = {
  name: string;
  code: string;
  dial_code: string;
}[];

export function useGetCountryCodesQuery(
  _: undefined,
  options: UseQueryOptions<UseGetCountryCodesQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-country-codes"],
    queryFn: () => {
      return customFetch<UseGetCountryCodesQueryOutput>(
        env.NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL +
          "/api/v0.1/countries/codes",
      );
    },
  });
}

export interface Wallet {
  id: string;
  name: string;
  walletType: string;
  walletAddress: string;
  active: boolean;
}

interface UseGetWalletsQueryOutput {
  wallet: Wallet[];
  total: number;
}

export function useGetWalletsQuery(
  input: z.infer<typeof paginationAndSearchValidator>,
  options: UseQueryOptions<UseGetWalletsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-wallets", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetWalletsQueryOutput>(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          "/api/v1/wallets?" +
          params.toString(),
      );
    },
  });
}

export interface Beats {
  id: string;
  msg: string;
  time: string;
  important: boolean;
  status: boolean;
  monitor_id: number;
  ping: number;
  duration: number;
  down_count: number;
}

export interface HealthCheck {
  id: string;
  name: string;
  beats: Beats[];
}

export interface HealthCheckMonitors {
  monitors: HealthCheck[];
}

interface UseGetHealthCheckQueryOutput {
  statusCode: number;
  customCode: string;
  data: HealthCheckMonitors;
  monitors?: HealthCheck[];
}

export function useGetHealthCheckQuery(
  input: z.infer<typeof paginationAndSearchValidator>,
  options: UseQueryOptions<UseGetHealthCheckQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-health-check", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetHealthCheckQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/health-check/uptime?" +
          params.toString(),
      );
    },
  });
}

export function useAddOrEditWalletMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditWalletValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-wallet"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          "/api/v1/wallets/" +
          (input.walletId ?? ""),
        {
          method: input.walletId ? "PUT" : "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-wallets"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useToggleWalletStatusMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleWalletStatusValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-wallet-status"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets/${input.walletId}/toggle`,
        {
          method: "PATCH",
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-wallets"],
      });
      options.onSuccess?.(...input);
    },
  });
}

interface UseGetProvidersQueryOutput {
  providers: {
    contactInformation: string;
    createDate: number;
    phone: string;
    city: string;
    country: string;
    zipCode: string;
    eINNumber: string;
    description: string;
    email: string;
    updateDate: number;
    imageUrl: string;
    companyAddress: string;
    id: string;
    active: boolean;
    walletAddress: string;
    name: string;
    asset: string;
  }[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export function useGetProvidersQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    type: "PLATFORM" | "WALLET" | "PROVIDER";
  },
  options: UseQueryOptions<UseGetProvidersQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-providers", input],
    queryFn: () => {
      return fetchProviders(input);
    },
  });
}

async function fetchProviders(
  input: Parameters<typeof useGetProvidersQuery>["0"],
) {
  const params = new URLSearchParams(input as Record<string, string>);
  return customFetch<UseGetProvidersQueryOutput>(
    env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
      "/api/v1/providers?" +
      params.toString(),
  );
}

export function useAddOrEditProviderMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditServiceProviderValidator>,
    { id: string }
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-provider"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers/" +
          input.providerId,
        {
          method: input.providerId ? "PUT" : "POST",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-providers"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useUploadProviderImageMutation(
  options: UseMutationOptions<{ id: string; file: File }, unknown> = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["upload-provider-image"],
    mutationFn: (input) => {
      const formData = new FormData();
      formData.append("file", input.file);

      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers/upload-image/" +
          input.id,
        {
          method: "PUT",
          body: formData,
          headers: {
            "x-no-content-type": "true",
          },
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-providers"],
      });
      options.onSuccess?.(...input);
    },
  });
}

type UseGetCountriesQueryOutput = {
  name: string;
  iso2: string;
  log: number;
  lat: number;
}[];

export function useGetCountriesQuery(
  _: undefined,
  options: UseQueryOptions<UseGetCountriesQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-countries"],
    queryFn: () => {
      return customFetch<UseGetCountriesQueryOutput>(
        env.NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL +
          "/api/v0.1/countries/positions",
      );
    },
  });
}

type UseGetStatesQueryOutput = {
  name: string;
  code: string;
  country: {
    iso3: string;
    name: string;
  };
}[];

export function useGetStatesQuery(
  input: { country: string },
  options: UseQueryOptions<UseGetStatesQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-states", input],
    queryFn: async () => {
      const res = await customFetch<{
        name: string;
        iso3: string;
        iso2: string;
        states: {
          name: string;
          state_code: string;
        }[];
      }>(
        env.NEXT_PUBLIC_COUNTRIES_MICROSERVICE_URL +
          "/api/v0.1/countries/states",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );

      return res.states.map((stateData) => ({
        name: stateData.name,
        code: stateData.state_code,
        country: {
          iso3: res.iso3,
          name: res.name,
        },
      }));
    },
  });
}

interface UseGetRafikiAssetsQueryOutput {
  rafikiAssets: {
    code: string;
    id: string;
  }[];
}

export function useGetRafikiAssetsQuery(
  _: undefined,
  options: UseQueryOptions<UseGetRafikiAssetsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-rafiki-assets"],
    queryFn: () => {
      return customFetch<UseGetRafikiAssetsQueryOutput>(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          "/api/v1/wallets-rafiki/assets",
      );
    },
  });
}

interface UseGetSettingQueryOutput {
  id: string;
  belongs: string;
  key: string;
  value: string;
  createDate: string;
  updateDate: string;
}

export function useGetSettingQuery(
  input: {
    key: string;
  },
  options: UseQueryOptions<UseGetSettingQueryOutput | undefined> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-setting", input],
    queryFn: async () => {
      const settings = await customFetch<UseGetSettingQueryOutput[]>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/settings",
      );

      return settings.find((s) => s.key === input.key);
    },
  });
}

export function useToggleProviderStatusMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleProviderStatusValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-provider-status"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/providers/${input.providerId}`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-providers"],
      });
      options.onSuccess?.(...input);
    },
  });
}

interface UseGetProviderQueryOutput {
  CreateDate: number;
  UpdateDate: number;
  phone: string;
  active: boolean;
  name: string;
  socketKeys: {
    publicKey: string;
    secretKey: string;
  };
}

export function useGetProviderQuery(
  input: {
    providerId: string;
  },
  options: UseQueryOptions<UseGetProviderQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-provider", input],
    queryFn: () => {
      return customFetch<UseGetProviderQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers/" +
          input.providerId,
      );
    },
  });
}

export interface ProviderPaymentParameter {
  id: string;
  name: string;
  active: boolean;
  frequency: number;
  timeIntervalId: string;
  cost: number;
  asset: string;
}

interface UseGetProviderPaymentParametersQueryOutput {
  paymentParameters: ProviderPaymentParameter[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function useGetProviderPaymentParametersQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    serviceProviderId: string;
  },
  options: UseQueryOptions<
    UseGetProviderPaymentParametersQueryOutput | undefined
  > = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-provider-payment-parameters", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetProviderPaymentParametersQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/payments/list/payment-parameters` +
          "?" +
          params.toString(),
      );
    },
  });
}

export function useToggleProviderPaymentParameterStatusMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleProviderPaymentParameterStatusValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["toggle-provider-status"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/payments/payment-parameters/${input.paymentParameterId}/toggle`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-provider-payment-parameters"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useAddProviderPaymentParameterMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditProviderPaymentParameterValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-provider-payment-parameter"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/payments/create/payment-parameters",
        {
          method: "POST",
          body: JSON.stringify({
            ...input,
            cost: Number(input.cost),
            frequency: Number(input.frequency),
          }),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-provider-payment-parameters"],
      });
      options.onSuccess?.(...input);
    },
  });
}

type UseGetTimeIntervalsQueryOutput = {
  id: string;
  seconds: number;
  name: string;
}[];

export function useGetTimeIntervalsQuery(
  _: undefined,
  options: UseQueryOptions<UseGetTimeIntervalsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-time-intervals"],
    queryFn: () => {
      return customFetch<UseGetTimeIntervalsQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/payments/list/time-intervals",
      );
    },
  });
}

interface UseGetProviderFeeQueryOutput {
  updatedDate: number;
  createdDate: number;
  percent: number;
  serviceProviderId: string;
  createdBy: string;
  id: string;
  updatedBy: string;
  comission: number;
  base: number;
}

export function useGetProviderFeeQuery(
  input: {
    providerId: string;
  },
  options: UseQueryOptions<UseGetProviderFeeQueryOutput | null> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-provider-fee", input],
    queryFn: async () => {
      const fee = await customFetch<UseGetProviderFeeQueryOutput | undefined>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/providers/fee-configurations/${input.providerId}`,
      );
      return fee ?? null; // bacause backend does not even include the "data" attribute if no fee is set
    },
  });
}

export function useAddOrEditProviderFeeMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditProviderFeeValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["add-or-edit-provider-fee"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers/create/fee-configurations/" +
          input.feeId,
        {
          method: "PATCH",
          body: JSON.stringify({
            comission: Number(input.comission),
            base: Number(input.base),
            percent: Number(input.percent),
            serviceProviderId: input.serviceProviderId,
          }),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-provider-fee"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export interface ExchangeRate {
  rate: number;
  currency: string;
  validUntil: string;
}

export function useGetExchangeRatesQuery(
  input: {
    base: string;
  },
  options: UseQueryOptions<ExchangeRate[]> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-exchange-rates", input],
    queryFn: async () => {
      const params = new URLSearchParams(input as Record<string, string>);

      const res = await fetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          "/api/v1/wallets-rafiki/exchange-rates" +
          "?" +
          params.toString(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const json = (await res.json()) as {
        statusCode: number;
        customCode: string;
        createDate: number;
        expirationTime: number;
        updateDate: number;
        rates: Record<string, number>;
        id: string;
        base: string;
      };

      if (!res.ok) throw new Error(json.customCode, { cause: json });

      const date = new Date(json.expirationTime);

      return Object.entries(json.rates).map(([currency, rate]) => ({
        rate,
        currency,
        validUntil:
          date.toLocaleDateString() + " - " + date.toLocaleTimeString(),
      }));
    },
  });
}

export function useErrorsQuery(
  input: {
    language: "en" | "us";
  },
  options: UseQueryOptions<Record<string, string>> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-errors", input],
    queryFn: async () => {
      const data = await customFetch<{
        translations: {
          id: string;
          description: string;
          language: string;
          text: string;
        }[];
      }>(
        env.NEXT_PUBLIC_CUSTOM_CODES_MICROSERVICE_URL +
          "/api/v1/codes/" +
          input.language,
      );

      return data.translations.reduce(
        (acc, { id, text }) => {
          acc[id] = text;
          return acc;
        },
        {} as Record<string, string>,
      );
    },
  });
}

export function useEditSettingMutation(
  settingId: string,
  settingKey: string,
  options: UseMutationOptions<z.infer<typeof settingsValidator>, unknown> = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["edit-setting", settingId],
    mutationFn: (input) => {
      return customFetch(
        `${env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL}/api/v1/settings/${settingId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            value: input.value,
          }),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-setting", { key: settingKey }],
      });
      options.onSuccess?.(...input);
    },
  });
}

interface ApiCommonTransaction {
  createdAt: number;
  description: string;
  walletAddressId: string;
  state: string;
  type: string;
  updatedAt: number;
  receiverUrl: string;
  receiver: string;
  metadata: {
    activityId?: string;
    description: string;
    type?: string;
    wgUser?: string;
    contentName?: string;
  };
  id: string;
  senderUrl: string;
  senderName: string;
  receiverName: string;
}

interface ApiAmount {
  assetScale: number;
  assetCode: string;
  value: string;
  typename: string;
}

interface ApiIncomingTransaction extends ApiCommonTransaction {
  incomingAmount: ApiAmount;
  incomingPaymentId: string;
  type: "IncomingPayment";
}

interface ApiOutgoingTransaction extends ApiCommonTransaction {
  type: "OutgoingPayment";
  outgoingPaymentId: string;
  receiveAmount: ApiAmount;
}

export interface Activity {
  activityId?: string;
  type: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  amount: string;
  user: string;
  transactions: Transaction[];
}

export interface Transaction {
  transactionId: string;
  type: string;
  description: string;
  date: string;
  status: string;
  amount: string;
}

interface UseGetTransactionsByUserQueryOutput {
  activities: Activity[];
  currentPage: number;
  total: number;
  user: string;
  totalPages: number;
}

export function useGetTransactionsByUserQuery(
  input: z.infer<typeof paginationAndSearchValidator> &
    z.infer<typeof transactionsByUserValidator>,
  options: UseQueryOptions<UseGetTransactionsByUserQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-transactions-by-user", input],
    queryFn: async () => {
      Object.keys(input).forEach((key) =>
        input[key as keyof typeof input] === undefined ||
        input[key as keyof typeof input] === ""
          ? delete input[key as keyof typeof input]
          : {},
      );
      if (input.startDate)
        input.startDate = format(
          input.startDate,
          "MM/dd/yyyy",
        ) as unknown as Date;
      if (input.endDate)
        input.endDate = format(input.endDate, "MM/dd/yyyy") as unknown as Date;
      const params = new URLSearchParams({
        ...input,
        items: "99",
        page: "1",
      } as unknown as Record<string, string>);

      const result = await customFetch<{
        transactions: (ApiIncomingTransaction | ApiOutgoingTransaction)[];
        currentPage: number;
        total: number;
        totalPages: number;
      }>(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets-rafiki/list-transactions` +
          "?" +
          params.toString(),
      );

      // Group by activity id
      const groupedActivities = result.transactions.reduce((acc, t, idx) => {
        const activityId = t.metadata.activityId;

        const isIncoming = t.type === "IncomingPayment";
        const amount = isIncoming ? t.incomingAmount : t.receiveAmount;

        const amountString = `${isIncoming ? "" : "-"}${convertAmountWithScale(
          Number(amount.value),
          amount.assetScale,
        )} ${amount.assetCode}`;

        if (!activityId) {
          acc.set(idx.toString(), {
            activityId: undefined,
            type: isIncoming ? "Transfer Received" : "Transfer Sent",
            description: isIncoming ? t.senderName : t.receiverName,
            startDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
            endDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
            status: t.state,
            amount: amountString,
            user: isIncoming ? t.receiverName : t.senderName,
            transactions: [],
          });
        } else {
          const isProvider = t.metadata.type === "PROVIDER";
          const type = isProvider
            ? "Service"
            : isIncoming
              ? "Transfer Received"
              : "Transfer Sent";
          const description = isProvider
            ? (t.metadata.contentName ?? "Unknown content")
            : isIncoming
              ? t.senderName
              : t.receiverName;

          if (!acc.has(activityId)) {
            acc.set(activityId, {
              activityId,
              type,
              description,
              startDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              endDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              status: t.state,
              amount: amountString,
              user: t.metadata.wgUser ?? "",
              transactions: [
                {
                  transactionId: t.id,
                  type,
                  description,
                  date: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
                  status: t.state,
                  amount: amountString,
                },
              ],
            });
          } else {
            const activity = acc.get(activityId);

            if (!activity) return acc;

            activity.transactions.push({
              transactionId: t.id,
              type,
              description,
              date: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              status: t.state,
              amount: amountString,
            });

            activity.endDate = format(t.createdAt, "yyyy-MM-dd HH:mm:ss");

            const accumulatedAmountNumber = Number(
              activity.amount.split(" ")[0],
            );
            const amountNumber = Number(amountString.split(" ")[0]);

            activity.amount = `${
              accumulatedAmountNumber + amountNumber
            } ${amount.assetCode}`;

            acc.set(activityId, activity);
          }
        }

        return acc;
      }, new Map<string, Activity>());

      const activities = Array.from(groupedActivities.values());

      return {
        activities: activities.slice(
          (+(input.page ?? 1) - 1) * +(input.items ?? 10),
          +(input.page ?? 1) * +(input.items ?? 10),
        ),
        currentPage: +(input.page ?? 1),
        total: activities.length,
        totalPages: Math.ceil(activities.length / +(input.items ?? 10)),
        user: activities[0]?.user ?? "No data",
      };
    },
  });
}

export function useDownloadTransactionsByUserMutation(
  options: UseMutationOptions<
    z.infer<typeof paginationAndSearchValidator> &
      z.infer<typeof transactionsByUserValidator>,
    unknown
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["download-transactions-by-user"],
    mutationFn: (input) => {
      Object.keys(input).forEach((key) =>
        input[key as keyof typeof input] === undefined ||
        input[key as keyof typeof input] === ""
          ? delete input[key as keyof typeof input]
          : {},
      );
      if (input.startDate)
        input.startDate = format(
          input.startDate,
          "MM/dd/yyyy",
        ) as unknown as Date;
      if (input.endDate)
        input.endDate = format(input.endDate, "MM/dd/yyyy") as unknown as Date;
      const params = new URLSearchParams(
        input as unknown as Record<string, string>,
      );

      return customFetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets-rafiki/download-transactions-user` +
          "?" +
          params.toString(),
      );
    },
  });
}

export interface ActivityProvider {
  user: string;
  activityId?: string;
  provider: string;
  grossSale: string;
  netSale: string;
  fee: string;
  startDate: string;
  endDate: string;
  transactions: TransactionProvider[];
}

export interface TransactionProvider {
  transactionId: string;
  user: string;
  provider: string;
  date: string;
  fee: string;
  grossSale: string;
  netSale: string;
}

interface UseGetTransactionsByProviderQueryOutput {
  activities: ActivityProvider[];
  currentPage: number;
  total: number;
  totalPages: number;
}

export function useGetTransactionsByProviderQuery(
  input: z.infer<typeof paginationAndSearchValidator> &
    z.infer<typeof transactionsByProviderValidator>,
  options: UseQueryOptions<UseGetTransactionsByProviderQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-transactions-by-provider", input],
    queryFn: async () => {
      Object.keys(input).forEach((key) =>
        input[key as keyof typeof input] === undefined ||
        input[key as keyof typeof input] === ""
          ? delete input[key as keyof typeof input]
          : {},
      );
      if (input.startDate)
        input.startDate = format(
          input.startDate,
          "MM/dd/yyyy",
        ) as unknown as Date;
      if (input.endDate)
        input.endDate = format(input.endDate, "MM/dd/yyyy") as unknown as Date;
      const params = new URLSearchParams({
        ...input,
        items: "99",
        page: "1",
      } as unknown as Record<string, string>);

      console.log("params", params.toString());

      const result = await customFetch<{
        transactions: (ApiIncomingTransaction | ApiOutgoingTransaction)[];
        currentPage: number;
        total: number;
        totalPages: number;
      }>(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets-rafiki/list-transactions` +
          "?" +
          params.toString(),
      );

      // Group by activity id
      const groupedActivities = result.transactions.reduce((acc, t, idx) => {
        const activityId = t.metadata.activityId;

        const isIncoming = t.type === "IncomingPayment";
        const amount = isIncoming ? t.incomingAmount : t.receiveAmount;

        const amountString = `${isIncoming ? "" : "-"}${convertAmountWithScale(
          Number(amount.value),
          amount.assetScale,
        )} ${amount.assetCode}`;

        if (!activityId) {
          acc.set(idx.toString(), {
            activityId: undefined,
            startDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
            endDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
            grossSale: amountString,
            netSale: amountString,
            provider: isIncoming ? t.senderName : t.receiverName,
            fee: "0",
            user:
              (t.metadata.wgUser ?? isIncoming) ? t.receiverName : t.senderName,
            transactions: [],
          });
        } else {
          if (!acc.has(activityId)) {
            acc.set(activityId, {
              activityId,
              startDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              endDate: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              grossSale: amountString,
              netSale: amountString,
              provider: isIncoming ? t.senderName : t.receiverName,
              fee: "0",
              user:
                (t.metadata.wgUser ?? isIncoming)
                  ? t.receiverName
                  : t.senderName,
              transactions: [
                {
                  transactionId: t.id,
                  date: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
                  grossSale: amountString,
                  netSale: amountString,
                  provider: isIncoming ? t.senderName : t.receiverName,
                  fee: "0",
                  user:
                    (t.metadata.wgUser ?? isIncoming)
                      ? t.receiverName
                      : t.senderName,
                },
              ],
            });
          } else {
            const activity = acc.get(activityId);

            if (!activity) return acc;

            activity.transactions.push({
              transactionId: t.id,
              date: format(t.createdAt, "yyyy-MM-dd HH:mm:ss"),
              grossSale: amountString,
              netSale: amountString,
              provider: isIncoming ? t.senderName : t.receiverName,
              fee: "0",
              user:
                (t.metadata.wgUser ?? isIncoming)
                  ? t.receiverName
                  : t.senderName,
            });

            activity.endDate = format(t.createdAt, "yyyy-MM-dd HH:mm:ss");

            const accumulatedAmountNumber = Number(
              activity.grossSale.split(" ")[0],
            );
            const amountNumber = Number(amountString.split(" ")[0]);

            activity.grossSale = `${
              accumulatedAmountNumber + amountNumber
            } ${amount.assetCode}`;

            acc.set(activityId, activity);
          }
        }

        return acc;
      }, new Map<string, ActivityProvider>());

      const activities = Array.from(groupedActivities.values());

      return {
        activities: activities.slice(
          (+(input.page ?? 1) - 1) * +(input.items ?? 10),
          +(input.page ?? 1) * +(input.items ?? 10),
        ),
        currentPage: +(input.page ?? 1),
        total: activities.length,
        totalPages: Math.ceil(activities.length / +(input.items ?? 10)),
      };
    },
  });
}

export function useDownloadTransactionsByProviderMutation(
  options: UseMutationOptions<
    z.infer<typeof paginationAndSearchValidator> &
      z.infer<typeof transactionsByProviderValidator>,
    unknown
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["download-transactions-by-provider"],
    mutationFn: (input) => {
      Object.keys(input).forEach((key) =>
        input[key as keyof typeof input] === undefined ||
        input[key as keyof typeof input] === ""
          ? delete input[key as keyof typeof input]
          : {},
      );
      if (input.startDate)
        input.startDate = format(
          input.startDate,
          "MM/dd/yyyy",
        ) as unknown as Date;
      if (input.endDate)
        input.endDate = format(input.endDate, "MM/dd/yyyy") as unknown as Date;
      const params = new URLSearchParams(
        input as unknown as Record<string, string>,
      );

      return customFetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets-rafiki/download-transactions-provider` +
          "?" +
          params.toString(),
      );
    },
  });
}

function convertAmountWithScale(amount: number, scale: number) {
  return amount / Math.pow(10, scale);
}

export type UseGetSidebarItemsQueryOutput = {
  id: ModuleId;
  description: string;
}[];

export function useGetSidebarItemsQuery(
  _: undefined,
  options: UseQueryOptions<UseGetSidebarItemsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-sidebar-items"],
    queryFn: async () => {
      const modules = await customFetch<
        {
          id: ModuleDatabaseId;
          belongs: string;
          index: number;
          subIndex: number;
          description: string;
        }[]
      >(env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/modules");

      return modules
        .filter((m) => m.subIndex === 0)
        .sort((a, b) => a.index - b.index)
        .map((m) => ({
          id: MODULES_MAP[m.id],
          description: m.description,
        }));
    },
  });
}

export interface WalletUser {
  id: string;
  name: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  socialSecurityNumber: string;
  identificationType: string;
  identificationNumber: string;
  stateLocation: string;
  country: string;
  city: string;
  zipCode: string;
  wallet?: {
    id: string;
    walletAddress: string;
    active: boolean;
  };
}

export function useGetWalletUserQuery(
  id: string,
  options: UseQueryOptions<WalletUser> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-wallet-user", id],
    queryFn: () => {
      return customFetch<WalletUser>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/" + id,
        {
          method: "GET",
        },
      );
    },
  });
}

export function useResetPasswordIdMutation(
  options: UseMutationOptions<
    z.infer<typeof resetPasswordIdValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["reset-password-id"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/users/reset-password/${input.userId}`,
        {
          method: "PATCH",
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["reset-password-id"],
      });
      options.onSuccess?.(...input);
    },
  });
}

export function useToogleWalletLockMutation(
  options: UseMutationOptions<
    z.infer<typeof toggleWalletLockValidator>,
    unknown
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["toggle-wallet-lock"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_WALLET_MICROSERVICE_URL +
          `/api/v1/wallets/${input.userId}/toggle`,
        {
          method: "PATCH",
          body: JSON.stringify(input),
        },
      );
    },
  });
}

export function useEditProviderPaymentParameterMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditProviderPaymentParameterValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["edit-provider-payment-parameter"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/payments/payment-parameters/${input.paymentParameterId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            ...input,
            cost: Number(input.cost),
            frequency: Number(input.frequency),
          }),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-provider-payment-parameters"],
      });
      options.onSuccess?.(...input);
    },
  });
}
