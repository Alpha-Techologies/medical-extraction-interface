import type { Metadata } from "next";
import localFont from "next/font/local";
import ReduxProvider from "@/redux/providers";
import { ToastContainer } from "react-toastify";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dossie",
  description: "Medical Record App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
