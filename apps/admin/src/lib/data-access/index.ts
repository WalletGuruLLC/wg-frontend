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
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  paginationAndSearchValidator,
  resetPasswordValidator,
  toggleRoleStatusValidator,
  twoFactorAuthenticationValidator,
} from "../validators";
import { env } from "~/env";
import customFetch from "./custom-fetch";

export function useGetAuthedUserInfoQuery<
  TInput = undefined,
  TOutput = {
    PrivacyPolicy: boolean;
    MfaEnabled: boolean;
    CreateDate: string;
    TermsConditions: boolean;
    Otp: string;
    SendSms: boolean;
    State: 1 | 2 | 3;
    Email: string;
    MfaType: "TOTP" | "SMS";
    First: boolean;
    RoleId: string;
    SendEmails: boolean;
    UpdateDate: string;
    Picture: string;
    ServiceProviderId: string;
    FirstName: string;
    Id: string;
    Active: boolean;
    LastName: string;
    type: "PLATFORM" | "PROVIDER" | "WALLET";
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

export function useLoginMutation(
  options: UseMutationOptions<z.infer<typeof loginValidator>, undefined> = {},
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
      token: string;
      user: {
        PrivacyPolicy: boolean;
        FirstName: string;
        LastName: string;
        Id: string;
        MfaEnabled: boolean;
        CreateDate: string;
        TermsConditions: boolean;
        Otp: string;
        SendSms: boolean;
        State: 0 | 2 | 3;
        Email: string;
        MfaType: "TOTP" | "SMS";
        First: boolean;
        SendEmails: boolean;
        UpdateDate: string;
        Picture: string;
        RoleId: string;
        ServiceProviderId: string;
        Active: boolean;
        type: "PLATFORM" | "PROVIDER" | "WALLET";
        AccessLevel: {
          R949: number;
          SP95: number;
          U783: number;
          W325: number;
        };
      };
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
  options: UseMutationOptions<{ email: string }, undefined> = {},
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
    undefined
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
    undefined
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
    undefined
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
    undefined
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
    undefined
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
