"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      
      <Link href="/" className="text-2xl font-bold text-blue-600">
        JobConnect
      </Link>
      
      <div className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
        <Link href="/companies" className="hover:text-blue-600">Companies</Link>
        <Link href="/home" className="hover:text-blue-600">About</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact</Link>
      </div>

    
      <div className="hidden md:flex items-center gap-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search jobs…"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300"
          />
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
        </div>

        <Button variant="outline" className="rounded-full">Login</Button>
        <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
      </div>

      <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>


      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-4 md:hidden z-50">
          <Link href="/jobs" className="hover:text-blue-600">Jobs</Link>
          <Link href="/companies" className="hover:text-blue-600">Companies</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>

          <div className="w-11/12">
            <div className="relative mb-2">
              <Input
                type="text"
                placeholder="Search jobs…"
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>

            <Button variant="outline" className="w-full mb-2">Login</Button>
            <Button className="w-full bg-black-600 hover:bg-black-700 text-white">Sign Up</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
