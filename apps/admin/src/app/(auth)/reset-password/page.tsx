"use client";

import { Form, useForm } from "@wg-frontend/ui/form";

import { resetPasswordValidator } from "~/lib/validators";

export default function ResetPasswordPage() {
  const form = useForm({
    schema: resetPasswordValidator,
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => console.log(data))}></form>
    </Form>
  );
}
