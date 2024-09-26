"use client"

import localFont from "next/font/local"
import "./globals.css"
import Header from "@/components/header"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Sidebar from "@/components/sidebar"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showBar, setShowBar] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // const allowedPaths = ["/dashboard", "/dashboard/master-gerbang", "/dashboard/harian", "/profile"]
    // const isAllowedPath = allowedPaths.includes(pathname)
    const isAllowedPath = pathname.startsWith('/dashboard')

    if (isAllowedPath) {
      setShowBar(true)
    } else {
      setShowBar(false)
    }
  }, [pathname])
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white flex flex-col h-screen`}
      >
        {showBar && <Header />}
        <div className="flex-1 flex">
          {showBar && <Sidebar />}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
