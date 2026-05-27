"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const usedata = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signIn.email({
      name: usedata.name,
      email: usedata.email,
      password: usedata.password,
      rememberMe: true,
      callbackURL: "/",
    });
    setLoading(false);
    if (data) {
      Swal.fire({
        title: "Account Created  Successfull",
        icon: "success",
        draggable: true,
      }).then((result) => {
        // সাকসেস মেসেজের ওকে (OK) বাটনে ক্লিক করলে হোম পেজে রিডাইরেক্ট হবে
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-black text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-white text-sm mt-2 leading-relaxed">
          Sign in to manage your appointments and access your health dashboard.
        </p>
      </div>
      <div className=" border-2 border-gray-300 rounded-xl px-10 py-20">
        <Form
          className="flex flex-col items-center justify-center space-y-5"
          onSubmit={onSubmit}
        >
          <div className="input-email">
            <TextField isRequired name="email" type="email">
              <Label className="text-sm font-semibold text-white">
                Email Address
              </Label>
              <Input
                name="email"
                placeholder="demo@gmail.com"
                className={
                  "w-80 mt-1 h-11 rounded-xl border-2 border-gray-300 text-white"
                }
              ></Input>
            </TextField>
          </div>
          <div className="input-Password">
            <TextField
              isRequired
              minLength={8}
              name="password"
              type={showPassword ? "text" : "password"}
              // validate={(value) => {
              //   if (value.length < 8) {
              //     return "Password must be at least 8 characters";
              //   }
              //   if (!/[A-Z]/.test(value)) {
              //     return "Password must contain at least one uppercase letter";
              //   }
              //   if (!/[0-9]/.test(value)) {
              //     return "Password must contain at least one number";
              //   }
              //   return null;
              // }}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm font-semibold text-white">
                {/* <HiLockClosed className="text-blue-500 text-base" /> */}
                Password
              </Label>
              <div className="relative">
                <Input
                  name="password"
                  placeholder="Enter your password"
                  className="w-80 mt-1 h-11 rounded-xl border-2 border-gray-300 text-white pr-12"
                />

                {/* ✅ টগল বাটন */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    // চোখ বন্ধ আইকন — পাসওয়ার্ড দেখা যাচ্ছে
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    // চোখ খোলা আইকন — পাসওয়ার্ড লুকানো
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <Description className="text-xs text-slate-400 mt-0.5">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 font-medium mt-0.5" />
            </TextField>
          </div>
          <Button
            type="submit"
            isDisabled={loading}
            className="mt-2 w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            {loading ? (
              // ✅ লোডিং স্পিনার দেখাবে
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
