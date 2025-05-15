"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FlaskRoundIcon as Flask } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold">
              <Flask className="h-5 w-5" />
              <span>ZK-Comply</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-4 mr-4">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/dashboard"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/register"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/register"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Registrar
              </Link>
              <Link
                href="/verify"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/verify"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                Verificar
              </Link>
            </div>

            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  )
}
