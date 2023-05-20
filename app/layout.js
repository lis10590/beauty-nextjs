"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./_components/navbar";
import { AppProvider } from "./_utils/AppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <SessionProvider>
            <NavbarComp />
            {children}
          </SessionProvider>
        </AppProvider>
      </body>
    </html>
  );
}
