"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

import Link from "next/link";
const MobileMenu = () => {
  const { data } = useSession();

  const links = [
    { href: "/home", label: "Home" },
    { href: "/myAccount", label: "My Account" },
    { href: "/clients", label: "Clients" },
    { href: "/products", label: "Products" },
    { href: "/treatments", label: "Treatments" },
    { href: "/analytics", label: "Analytics" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <div>
        <button
          id="menu-btn"
          className="md:hidden focus:outline-none pl-4"
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden fixed top-10 left-0 h-full w-40 bg-gray-800 py-4 text-white z-50 overflow-auto transition duration-300 ease-in-out transform ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {data?.user ? (
          <div>
            <ul className="space-y-2 pl-4">
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <Link className="hover:text-gray-400" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="space-y-2 pl-4">
              <li>
                <Link
                  href="#"
                  onClick={onLogout}
                  className="hover:text-gray-400"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="space-y-2 pl-4">
            <li>
              <Link href="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
