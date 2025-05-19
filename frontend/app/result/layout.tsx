"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showWallet={true} currentPath={pathname} />
      {children}
    </div>
  )
}
