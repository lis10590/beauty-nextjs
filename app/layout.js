"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import NavbarComp from "./_components/navbar";
import store from "./_utils/store";
import "react-loading-skeleton/dist/skeleton.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SessionProvider>
            <NavbarComp />
            <ToastContainer />
            {children}
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
