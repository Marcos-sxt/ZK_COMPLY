import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserAvatarMenu from "@/components/user-avatar-menu"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 py-3 sm:py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
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
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
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

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Bem-vindo ao ZK-<span className="text-green-400">Comply</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Gerencie suas provas zero-knowledge, simulações moleculares e dados de laboratório.
            </p>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Nova Prova ZK */}
            <Link href="/dashboard/provas-zk">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-green-400 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-green-400 sm:w-6 sm:h-6">
                      <path fill="currentColor" d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Nova Prova ZK</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Criar nova prova zero-knowledge</p>
                  </div>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-medium text-sm sm:text-base">
                  Começar
                </Button>
              </div>
            </Link>

            {/* Nova Simulação */}
            <Link href="/dashboard/simulacoes">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-purple-400 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-purple-400 sm:w-6 sm:h-6">
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                      <circle cx="6" cy="6" r="2" fill="currentColor" />
                      <circle cx="18" cy="6" r="2" fill="currentColor" />
                      <circle cx="6" cy="18" r="2" fill="currentColor" />
                      <circle cx="18" cy="18" r="2" fill="currentColor" />
                      <line x1="12" y1="9" x2="6" y2="8" stroke="currentColor" strokeWidth="1" />
                      <line x1="12" y1="9" x2="18" y2="8" stroke="currentColor" strokeWidth="1" />
                      <line x1="12" y1="15" x2="6" y2="16" stroke="currentColor" strokeWidth="1" />
                      <line x1="12" y1="15" x2="18" y2="16" stroke="currentColor" strokeWidth="1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Nova Simulação</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Simular propriedades moleculares</p>
                  </div>
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium text-sm sm:text-base">
                  Simular
                </Button>
              </div>
            </Link>

            {/* Importar Dados */}
            <Link href="/dashboard/dados">
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-blue-400 transition-colors cursor-pointer">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-400 sm:w-6 sm:h-6">
                      <path
                        fill="currentColor"
                        d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white">Importar Dados</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">Upload de SMILES e dados</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm sm:text-base">
                  Upload
                </Button>
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 sm:p-6 border-b border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-white">Atividade Recente</h2>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-center py-8 sm:py-12">
                <svg width="40" height="40" viewBox="0 0 48 48" className="mx-auto mb-4 text-gray-600 sm:w-12 sm:h-12">
                  <path
                    fill="currentColor"
                    d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
                  />
                  <path fill="currentColor" d="M22 22h4v8h-4zm0-6h4v2h-4z" />
                </svg>
                <p className="text-gray-400 mb-4 text-sm sm:text-base">Nenhuma atividade recente</p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Suas provas ZK, simulações e uploads aparecerão aqui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
