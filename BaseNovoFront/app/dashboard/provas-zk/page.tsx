import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserAvatarMenu from "@/components/user-avatar-menu"

export default function ProvasZKPage() {
  const provas = [
    { id: "X", name: "Prova X", active: true },
    { id: "Y", name: "Prova Y", active: false },
    { id: "Z", name: "Prova Z", active: false },
    { id: "A", name: "Prova A", active: false },
    { id: "B", name: "Prova B", active: false },
    { id: "C", name: "Prova C", active: false },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="relative">
              <svg width="28" height="28" viewBox="0 0 32 32" className="text-white sm:w-8 sm:h-8">
                <defs>
                  <linearGradient id="dashboardLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 2L6 8v8c0 6.2 4.2 12 10 13.4C21.8 28 26 22.2 26 16V8L16 2z"
                  fill="url(#dashboardLogoGradient)"
                />
                <path
                  d="M12 16l3 3 6-6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold">
              ZK-<span className="text-green-400">Comply</span>
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden sm:flex items-center space-x-1">
            <Link href="/dashboard/provas-zk">
              <Button
                variant="ghost"
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
              >
                Provas ZK
              </Button>
            </Link>
            <Link href="/dashboard/simulacoes">
              <Button
                variant="ghost"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
              >
                Simulações
              </Button>
            </Link>
            <Link href="/dashboard/dados">
              <Button
                variant="ghost"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
              >
                Dados
              </Button>
            </Link>
          </nav>

          {/* User Avatar Menu */}
          <UserAvatarMenu />
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-gray-800 border-b border-gray-700 py-2 sm:py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-base sm:text-lg font-medium text-white">TELA PROVAS ZK</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="p-4">
            <h2 className="text-sm font-medium text-gray-300 mb-4">Minhas provas ZK</h2>
            <div className="space-y-1">
              {provas.map((prova) => (
                <button
                  key={prova.id}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                    prova.active ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {prova.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Prova X</h2>

            <div className="space-y-4 sm:space-y-6">
              {/* ID da Transação */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">ID da Transação</label>
                <div className="bg-gray-700 rounded-md p-3 text-gray-400 text-xs sm:text-sm font-mono break-all">
                  0x1a2b3c4d5e6f7890abcdef1234567890abcdef12
                </div>
              </div>

              {/* Data da Transação */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">Data da Transação</label>
                <div className="bg-gray-700 rounded-md p-3 text-gray-400 text-xs sm:text-sm">
                  2024-01-15 14:30:25 UTC
                </div>
              </div>

              {/* Endereço da prova on-chain */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">Endereço da prova on-chain</label>
                <div className="bg-gray-700 rounded-md p-3 text-gray-400 text-xs sm:text-sm font-mono break-all">
                  0xabcdef1234567890abcdef1234567890abcdef12
                </div>
              </div>

              {/* Status da prova */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">Status da prova</label>
                <div className="bg-gray-700 rounded-md p-3 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-green-400 text-xs sm:text-sm font-medium">Verificada</span>
                </div>
              </div>

              {/* Textos executados */}
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">Textos executados</label>
                <div className="bg-gray-700 rounded-md p-3 text-gray-400 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <div>• Validação de estrutura molecular SMILES</div>
                    <div>• Cálculo de propriedades físico-químicas</div>
                    <div>• Geração de prova zero-knowledge</div>
                    <div>• Verificação on-chain da prova</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-medium px-6 py-2 text-sm sm:text-base">
                  Baixar Prova
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 bg-transparent text-sm sm:text-base"
                >
                  Compartilhar
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 bg-transparent text-sm sm:text-base"
                >
                  Verificar On-chain
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
