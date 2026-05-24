import React from "react";
import Link from "next/link";
import { Divider } from "@heroui/react";

const Footer = () => {
  return (
    <div className="grid grid-cols-12 text-white bg-[#0a0a0a] px-10 py-10">
      <div className="Footer-logo-part col-span-4">
        <h1 className="text-2xl font-bold">programming Hero</h1>
        <p>
          The AI-native career platform. Built for people who take their work
          seriously.
        </p>
        <div className="mt-10"></div>
      </div>
      <div className="flex items-start justify-center gap-15 col-span-8">
        <div>
          <p className="text-purple-500">Product</p>
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
            <Link href={"/"}>Job discovery</Link>
            <Link href={"/"}>Worker AI</Link>
            <Link href={"/"}>Companies</Link>
            <Link href={"/"}>Salary data</Link>
          </div>
        </div>
        <div>
          <p className="text-purple-500">Product</p>
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
            <Link href={"/"}>Job discovery</Link>
            <Link href={"/"}>Worker AI</Link>
            <Link href={"/"}>Companies</Link>
            <Link href={"/"}>Salary data</Link>
          </div>
        </div>
        <div>
          <p className="text-purple-500">Navigations</p>
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
            <Link href={"/"}>Help center</Link>
            <Link href={"/"}>Career library</Link>
            <Link href={"/"}>Contact</Link>
          </div>
        </div>
        <div>
          <p className="text-purple-500">Resources</p>
          <div className="flex flex-col items-center justify-center mt-10 gap-2">
            <Link href={"/"}>Newsroom</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
