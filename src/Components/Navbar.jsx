"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("\login");
        },
      },
    });
  };
  return (
    <div className="bg-[#0a0a0a] text-white">
      <div className=" flex items-center justify-between">
        <div>
          {/* <img className="w-20 h-5" src={logoImg} alt="" /> */}
          <Link href={"/"}>
            <p className="text-2xl font-bold">Programming Hero</p>
          </Link>
        </div>
        <div className="flex items-center gap-6 bg-gradient-to-r from-neutral-900/90 via-neutral-900/80 to-neutral-850/90 border border-neutral-800/60 rounded-full  px-8 pr-3 py-2 backdrop-blur-md shadow-2xl">
          <div className="navIcon flex items-center justify-center gap-5">
            <Link href={"/browse-jobs"}>Browse Jobs</Link>
            <Link href={"/company"}>Company</Link>
            <Link href={"/pricing"}>Pricing</Link>
          </div>
          <div className="ivider divider-horizontal divider-start"></div>
          <div>
            {user ? (
              <div className="auto-btn flex items-center justify-center gap-2">
                <h1>Hi,{user.name}</h1>
                <Button onClick={handleSignOut} variant="danger">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="auto-btn flex items-center justify-center gap-5">
                <Link className="text-purple-600" href={"/login"}>
                  Sign In
                </Link>
                <Link
                  className="bg-white px-8 py-3 rounded-2xl text-black"
                  href={"/signup"}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
