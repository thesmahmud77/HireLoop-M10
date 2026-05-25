"use client";
import { useRouter } from "next/router";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Swal from "sweetalert2";

const signup = () => {
  const router = useRouter;
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const usedata = Object.fromEntries(formData.entries());
    const { data, error } = await authClient.signUp.email({
      name: usedata.name,
      email: usedata.email,
      password: usedata.password,
      rememberMe: true,
      callbackURL: "/",
    });
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
          <div className="input-name">
            <TextField isRequired name="name" type="text">
              <Label className="text-sm font-semibold text-white">Name</Label>
              <Input
                name="name"
                placeholder="Mr Nick John"
                className={
                  "w-80 mt-1 h-11 rounded-xl border-2 border-gray-300 text-white"
                }
              ></Input>
            </TextField>
          </div>
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
              type="password"
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
              <Input
                name="password"
                placeholder="Enter your password"
                className={
                  "w-80 mt-1 h-11 rounded-xl border-2 border-gray-300 text-white"
                }
              />
              <Description className="text-xs text-slate-400 mt-0.5">
                Must be at least 8 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-xs text-red-500 font-medium mt-0.5" />
            </TextField>
          </div>
          <Button
            type="submit"
            className="mt-2 w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default signup;
