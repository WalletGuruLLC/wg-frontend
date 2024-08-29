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
  addOrEditRoleValidator,
  addOrEditUserValidator,
  addOrEditWalletValidator,
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  paginationAndSearchValidator,
  resetPasswordValidator,
  toggleRoleStatusValidator,
  toggleUserStatusValidator,
  toggleWalletStatusValidator,
  twoFactorAuthenticationValidator,
} from "../validators";
import { env } from "~/env";
import customFetch from "./custom-fetch";

export function useGetAuthedUserInfoQuery<
  TInput = undefined,
  TOutput = {
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
    accessLevel: {
      R949: number;
      SP95: number;
      U783: number;
      W325: number;
    };
  },
>(_: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    retry: 0, // Disable retries because endpoints returns error when not authed and we want that error to be taken as "no user authed"
    queryKey: ["get-authed-user-info"],
    queryFn: () => {
      return customFetch<TOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user",
      );
    },
  });
}

const ACCESS_LEVELS_MAP = {
  R949: "roles",
  W325: "wallets",
  U783: "users",
  SP95: "serviceProviders",
  SE37: "settings",
  TR91: "transactions",
} as const;
export type AccessLevelModule =
  (typeof ACCESS_LEVELS_MAP)[keyof typeof ACCESS_LEVELS_MAP];
const ACCESS_LEVELS_ACTIONS_BINARY_ORDERED = [
  "view",
  "add",
  "edit",
  "inactive",
] as const;
type AccessLevels = {
  [key in AccessLevelModule]: (typeof ACCESS_LEVELS_ACTIONS_BINARY_ORDERED)[number][];
};
// Same endpoint as useGetAuthedUserInfoQuery. We have it as different hooks to treat cache separately
export function useGetAuthedUserAccessLevelsQuery<
  TInput = undefined,
  TOutput = AccessLevels,
>(_: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    queryKey: ["get-authed-user-access-levels"],
    queryFn: async () => {
      const data = await customFetch<{
        accessLevel: {
          R949: number;
          SP95: number;
          U783: number;
          W325: number;
        };
      }>(env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/current-user");

      const accessLevels: AccessLevels = {
        roles: [],
        wallets: [],
        users: [],
        serviceProviders: [],
        settings: [],
        transactions: [],
      };

      for (const [key, value] of Object.entries(data.accessLevel)) {
        if (!Object.keys(ACCESS_LEVELS_MAP).includes(key)) continue;

        const bin = value.toString(2).padStart(4, "0").split("");
        for (let i = 0; i < ACCESS_LEVELS_ACTIONS_BINARY_ORDERED.length; i++) {
          if (bin[i] === "1") {
            accessLevels[
              ACCESS_LEVELS_MAP[key as keyof typeof ACCESS_LEVELS_MAP]
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ].push(ACCESS_LEVELS_ACTIONS_BINARY_ORDERED[i]!);
          }
        }
      }

      return accessLevels as TOutput; // We know it's TOutput but TS does not
    },
  });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
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
        accessLevel: {
          R949: number;
          SP95: number;
          U783: number;
          W325: number;
        };
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-authed-user-info"],
      });
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
export function useGetRolesQuery<
  TInput = z.infer<typeof paginationAndSearchValidator>,
  TOutput = {
    roles: Role[];
    total: number;
  },
>(input: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    queryKey: ["get-roles", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<TOutput>(
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-roles"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-roles"],
      });
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
export function useGetUsersQuery<
  TInput = z.infer<typeof paginationAndSearchValidator> & {
    type: "PLATFORM" | "WALLET" | "PROVIDER";
  },
  TOutput = {
    users: User[];
    total: number;
    totalPages: number;
    currentPage: number;
  },
>(input: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    queryKey: ["get-users", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<TOutput>(
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-users"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-users"],
      });
    },
  });
}

export function useGetCountryCodesQuery<
  TInput = undefined,
  TOutput = {
    name: string;
    code: string;
    dial_code: string;
  }[],
>(_: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    queryKey: ["get-country-codes"],
    queryFn: () => {
      return customFetch<TOutput>(
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
export function useGetWalletsQuery<
  TInput = z.infer<typeof paginationAndSearchValidator>,
  TOutput = {
    wallet: Wallet[];
  },
>(input: TInput, options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    ...options,
    queryKey: ["get-wallets", input],
    queryFn: () => {
      const params = new URLSearchParams(input as Record<string, string>);
      return customFetch<TOutput>(
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-wallets"],
      });
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
    onSuccess: (...input) => {
      options.onSuccess?.(...input);
      void cq.invalidateQueries({
        queryKey: ["get-wallets"],
      });
    },
  });
}
