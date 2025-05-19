import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FlaskRoundIcon as Flask } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"

interface HeaderProps {
  showWallet?: boolean
  currentPath?: string
}

export function Header({ showWallet = false, currentPath = "" }: HeaderProps) {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-blue-600 font-semibold">
              <Flask className="h-6 w-6" />
              <span className="text-xl font-bold text-blue-700">ZK-Comply</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {showWallet && (
              <div className="flex space-x-4 mr-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPath === "/dashboard"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPath === "/register"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Registrar
                </Link>
                <Link
                  href="/verify"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentPath === "/verify"
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Verificar
                </Link>
              </div>
            )}

            {showWallet ? (
              <WalletConnect />
            ) : (
              <Link href="/dashboard">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Acessar Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
