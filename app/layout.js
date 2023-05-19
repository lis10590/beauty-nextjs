"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./_components/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <NavbarComp />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
