import type { z } from "zod";

import type {
  UseMutationOptions as _UseMutationOptions,
  UseQueryOptions as _UseQueryOptions,
} from "@wg-frontend/data-access";
import { useMutation, useQuery } from "@wg-frontend/data-access";

import type {
  forgotPasswordCodeStepValidator,
  forgotPasswordEmailStepValidator,
  loginValidator,
  resetPasswordValidator,
  twoFactorAuthenticationValidator,
} from "../validators";
import { env } from "~/env";
import customFetch from "./custom-fetch";

type UseQueryOptions<TOutput> = Omit<
  _UseQueryOptions<TOutput>,
  "queryFn" | "queryKey"
>;

type UseMutationOptions<TInput = unknown, TOutput = unknown> = Omit<
  _UseMutationOptions<TOutput, Error, TInput>,
  "mutationFn" | "mutationKey"
>;

export function useAuthedUserInfoQuery<
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
>(options: UseQueryOptions<TOutput> = {}) {
  return useQuery({
    retry: 0, // Disable retries because endpoints returns error when not authed and we want that error to be taken as "no user authed"
    queryKey: ["use-user-info"],
    queryFn: () => {
      return customFetch<TOutput>(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/get/info/access",
      );
    },
    ...options,
  });
}

export function useLoginMutation(
  options: UseMutationOptions<
    z.infer<typeof loginValidator>,
    {
      token: string;
      user: {
        id: string;
        userName: string;
        email: string;
        type: string;
        roleId: number;
        active: boolean;
        state: number;
        first: boolean;
        serviceProviderId: number;
        lastLogin: string;
        accessLevel: number;
      };
    }
  > = {},
) {
  return useMutation({
    mutationKey: ["use-login"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/signin",
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    ...options,
  });
}

export function useResetPasswordMutation(
  options: UseMutationOptions<
    z.infer<typeof resetPasswordValidator>,
    undefined
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["use-reset-password"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/user/change-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
  });
}

export function useTwoFactorAuthenticationMutation(
  options: UseMutationOptions<
    z.infer<typeof twoFactorAuthenticationValidator>,
    undefined
  > = {},
) {
  return useMutation({
    ...options,
    mutationKey: ["use-two-factor-authentication"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/user/verify/otp/mfa",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
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
    mutationKey: ["use-forgot-password-email-step"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/user/forgot-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    ...options,
  });
}

export function useForgotPasswordCodeStepMutation(
  options: UseMutationOptions<
    z.infer<typeof forgotPasswordCodeStepValidator>,
    undefined
  > = {},
) {
  return useMutation({
    mutationKey: ["use-forgot-password-code-step"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/user/confirm-password",
        {
          method: "POST",
          body: JSON.stringify(input),
        },
      );
    },
    ...options,
  });
}
