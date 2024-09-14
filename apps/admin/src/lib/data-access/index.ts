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
  addOrEditProviderValidator,
  addOrEditRoleValidator,
  addOrEditUserValidator,
  addOrEditWalletValidator,
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  paginationAndSearchValidator,
  resetPasswordValidator,
  saveRoleModuleAccessLevelValidator,
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
  accessLevel: APIAccessLevels;
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

export const ACCESS_LEVELS_MAP = {
  R949: "roles",
  W325: "wallets",
  U783: "users",
  SP95: "serviceProviders",
  SE37: "settings",
  TR91: "transactions",
} as const;
export type APIAccessLevels = {
  [key in keyof typeof ACCESS_LEVELS_MAP]?: number;
};
export type AccessLevelModule =
  (typeof ACCESS_LEVELS_MAP)[keyof typeof ACCESS_LEVELS_MAP];
export const ACCESS_LEVELS_ACTIONS_BINARY_ORDERED = [
  "view",
  "add",
  "edit",
  "inactive",
] as const;
export type AccessLevelAction = (typeof ACCESS_LEVELS_ACTIONS_BINARY_ORDERED)[
  | 0
  | 1
  | 2
  | 3];
export type AccessLevels = {
  [key in AccessLevelModule]: AccessLevelAction[];
};
// Same endpoint as useGetAuthedUserInfoQuery. We have it as different hooks to treat cache separately
export function useGetAuthedUserAccessLevelsQuery(
  _: undefined,
  options: UseQueryOptions<AccessLevels> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-authed-user-access-levels"],
    queryFn: async () => {
      const data = await customFetch<{
        accessLevel: APIAccessLevels;
      }>(env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user");

      return parseAccessLevels(data.accessLevel);
    },
  });
}
function parseAccessLevels(accessLevels: APIAccessLevels) {
  const accessLevelsMap: AccessLevels = {
    roles: [],
    wallets: [],
    users: [],
    serviceProviders: [],
    settings: [],
    transactions: [],
  };

  for (const [key, value] of Object.entries(accessLevels)) {
    if (!Object.keys(ACCESS_LEVELS_MAP).includes(key)) continue;

    const bin = value.toString(2).padStart(4, "0").split("");
    if (bin.length !== ACCESS_LEVELS_ACTIONS_BINARY_ORDERED.length) continue;

    const accessLevelKey =
      ACCESS_LEVELS_MAP[key as keyof typeof ACCESS_LEVELS_MAP];

    for (let i = 0; i < bin.length; i++) {
      if (bin[i] === "1") {
        accessLevelsMap[accessLevelKey].push(
          ACCESS_LEVELS_ACTIONS_BINARY_ORDERED[i as 0 | 1 | 2 | 3],
        );
      }
    }
  }

  return accessLevelsMap;
}
export function convertAccessLevel(accessLevel: AccessLevelAction[]) {
  return parseInt(
    ACCESS_LEVELS_ACTIONS_BINARY_ORDERED.map((v) =>
      accessLevel.includes(v) ? "1" : "0",
    ).join(""),
    2,
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
        accessLevel: APIAccessLevels;
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
  input: z.infer<typeof paginationAndSearchValidator>,
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
  module: AccessLevelModule;
  accessLevels: AccessLevels[AccessLevelModule];
}[];
export function useGetRoleAccessLevelsQuery(
  input: {
    roleId: string;
  },
  options: UseQueryOptions<UseGetRoleAccessLevelsQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-role-access-levels", input],
    queryFn: async () => {
      const apiAccessLevels = await customFetch<APIAccessLevels>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/roles/access-level/" +
          input.roleId,
      );

      return Object.entries(parseAccessLevels(apiAccessLevels)).map(
        ([k, v]) => {
          return {
            module: k as AccessLevelModule,
            accessLevels: v,
          };
        },
      );
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
    z.infer<typeof saveRoleModuleAccessLevelValidator>,
    unknown
  > = {},
) {
  const cq = useQueryClient();
  return useMutation({
    ...options,
    mutationKey: ["save-role-module-access-level"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          `/api/v1/roles/access-level/${input.roleId}/${input.moduleId}`,
        {
          method: "POST", // POST because backend things but it means an update aswell
          body: JSON.stringify(input),
        },
      );
    },
    onSuccess: async (...input) => {
      await cq.invalidateQueries({
        queryKey: ["get-role"],
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
}
interface UseGetUsersQueryOutput {
  users: User[];
  total: number;
  totalPages: number;
  currentPage: number;
}
//Todo
export function useGetUsersQuery(
  input: z.infer<typeof paginationAndSearchValidator> & {
    type: "PLATFORM" | "WALLET" | "PROVIDER";
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
    id: string;
    name: string;
    description: string;
    email: string;
    phone: string;
    einNumber: string;
    country: string;
    city: string;
    zipCode: string;
    companyAddress: string;
    walletAddress: string;
    imageUrl: string;
    contactinformation: string;
    active: boolean;
  }[];
  total: number;
  totalPages: number;
  currentPage: number;
}
export function useGetProvidersQuery(
  input: {
    search: string;
    type: "PLATFORM" | "WALLET" | "PROVIDER";
  },
  options: UseQueryOptions<UseGetProvidersQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-providers", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<UseGetProvidersQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers?" +
          params.toString(),
      );
    },
  });
}

export function useAddOrEditProviderMutation(
  options: UseMutationOptions<
    z.infer<typeof addOrEditProviderValidator>,
    unknown
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
interface UseGetProviderByIdQueryOutput {
  CreateDate: number;
  UpdateDate: number;
  phone: string;
  active: boolean;
  name: string;
}

export function useGetProviderByIdQuery(
  input: {
    providerId: string;
  },
  options: UseQueryOptions<UseGetProviderByIdQueryOutput> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["get-provider", input],
    queryFn: () => {
      return customFetch<UseGetProviderByIdQueryOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL +
          "/api/v1/providers/" +
          input.providerId,
      );
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
