"use client";

import React from "react";
import { Form, Input, Button } from "@nextui-org/react";
import { login, LoginCredentials } from "@/api/auth.api";

export default function LoginForm() {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: LoginCredentials = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const token = await login(data);

    if (token) {
      localStorage.setItem("token", token.access_token);
      window.location.href = "/";
    } else {
        console.error("Login failed");
    }
  };

  return (
    <Form
    className="w-full max-w-sm flex justify-center gap-6"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Enter your password"
        type="password"
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button className="text-neutral-400" type="reset" variant="flat">
          Reset
        </Button>
      </div>
    </Form>
  );
}
