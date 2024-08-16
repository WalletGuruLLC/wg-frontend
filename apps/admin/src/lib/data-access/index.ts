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

// TODO
type UseQueryOptions<TInput = unknown, TOutput = unknown> = _UseQueryOptions<
  TInput,
  Error,
  TOutput
>;

type UseMutationOptions<TInput = unknown, TOutput = unknown> = Omit<
  _UseMutationOptions<TOutput, Error, TInput>,
  "mutationFn" | "mutationKey"
>;

export function useUserData(
  input: {
    id: string;
  },
  options: Omit<UseQueryOptions, "queryFn" | "queryKey"> = {},
) {
  return useQuery({
    ...options,
    queryKey: ["use-user-data"],
    queryFn: () => {
      return customFetch<{ name: string }>(
        "https://api.example.com/user-data/" + input.id,
      );
    },
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
    ...options,
    mutationKey: ["use-login"],
    mutationFn: (input) => {
      return customFetch(
        env.NEXT_PUBLIC_AUTH_MICROSERVICE_URL + "/api/v1/users/signin",
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
    ...options,
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
  });
}

export function useForgotPasswordCodeStepMutation(
  options: UseMutationOptions<
    z.infer<typeof forgotPasswordCodeStepValidator>,
    undefined
  > = {},
) {
  return useMutation({
    ...options,
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
  });
}
