import "./globals.css";
// import { SessionProvider } from "next-auth/react";
// import { ToastContainer } from "react-toastify";
// import "bootstrap/dist/css/bootstrap.min.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
// import "react-toastify/dist/ReactToastify.css";

import "react-loading-skeleton/dist/skeleton.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
