"use client";

import type { z } from "zod";

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
  addOrEditRoleValidator,
  addOrEditServiceProviderValidator,
  addOrEditUserValidator,
  addOrEditWalletValidator,
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  paginationAndSearchValidator,
  resetPasswordValidator,
  toggleProviderPaymentParameterStatusValidator,
  toggleProviderStatusValidator,
  toggleRoleStatusValidator,
  toggleUserStatusValidator,
  toggleWalletStatusValidator,
  twoFactorAuthenticationValidator,
} from "../validators";
import { env } from "~/env";
import customFetch from "./custom-fetch";

interface UseGetAuthedUserInfoQueryOutput {
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
    queryFn: () => {
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
  TR91: "transactions",
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
                transactions: [],
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
    serviceProviderId?: string;
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
  interval: string;
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
    providerId: string;
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
          `/api/v1/providers/${input.providerId}/payment-parameters` +
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
          `/api/v1/providers/${input.providerId}/payment-parameters/${input.paymentParameterId}/toggle`,
        {
          method: "PATCH",
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
