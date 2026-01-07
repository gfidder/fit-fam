"use client";

import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { signInAction } from "../actions/auth";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-120">
          <div className="bg-gray-100 px-6 py-12 shadow-lg sm:rounded-lg sm:px-12">
            <form action={signInAction} className="space-y-6">
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
                <button
                  type="submit"
                  className="gradient-purple flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
