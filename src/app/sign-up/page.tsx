"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Icon } from "@iconify/react";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Inputs = {
  firstName: string;
  lastName: string;
  nickName?: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const utils = api.useUtils();
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [trpcError, setTrpcError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const registerUser = api.registration.registerUser.useMutation({
    onSuccess: async () => {
      await utils.registration.invalidate();
      setIsError(false);
      router.push("/profile");
    },
    onError: async (e) => {
      await utils.registration.invalidate();
      setTrpcError(e.message);
      setIsError(true);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const nickName =
      data.nickName === undefined || data.nickName.length < 1
        ? undefined
        : data.nickName;
    registerUser.mutate({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      nickName: nickName,
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
          <div className="bg-gray-100 px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
            {isError && (
              <div className="flex items-center justify-center text-sm/6 font-medium text-red-600">
                <Icon icon="heroicons:exclamation-triangle" />
                {trpcError}
                <Icon icon="heroicons:exclamation-triangle" />
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.email.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("firstName", { required: true })}
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.firstName && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.firstName.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("lastName", { required: true })}
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.lastName && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.lastName.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="preferredName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nick Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("nickName")}
                    type="text"
                    id="preferredName"
                    name="preferredName"
                    autoComplete="username"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.nickName && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.nickName.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 8,
                        message: "Password must be between 8 and 20 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must be between 8 and 20 characters",
                      },
                    })}
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.password && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.password.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      validate: (val: string) => {
                        if (watch("password") != val) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.confirmPassword && (
                    <p className="flex items-center text-sm/6 font-medium text-red-600">
                      <Icon icon="heroicons:exclamation-triangle" />
                      {errors.confirmPassword.message}
                      <Icon icon="heroicons:exclamation-triangle" />
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="gradient-purple flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
