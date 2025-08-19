import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserAvatarMenu from "@/components/user-avatar-menu"

export default function DadosPage() {
  const metricas = [
    {
      label: "Economia Total",
      value: "US$ 150 K",
      description: "12 experimentos",
      additional: "1.5M por ano",
    },
    {
      label: "Tempo Médio por Prova",
      value: "37 min",
      description: "Redução contra testes físicos",
      additional: "89%",
    },
    {
      label: "Taxa de Sucesso de Provas",
      value: "98 %",
      description: "98% das provas foram validadas",
      additional: "",
    },
    {
      label: "Disponibilidade (SLA)",
      value: "99.95 %",
      description: "99.95% de uptime",
      additional: "",
    },
    {
      label: "Simulações Executadas",
      value: "12,300",
      description: "12,300 provas foram geradas no total",
      additional: "",
    },
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
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
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
          <h1 className="text-base sm:text-lg font-medium text-white">TELA DADOS</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="p-4 sm:p-6">
            <div className="bg-gray-700 rounded-lg p-4 sm:p-6 text-center">
              <h3 className="text-xs sm:text-sm font-medium text-gray-300 mb-4">
                ALGO QUE TRAGA INFORMAÇÕES DE MODO MAIS VISUAL
              </h3>
              <div className="space-y-3">
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-green-400 rounded-full w-3/4"></div>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-blue-400 rounded-full w-1/2"></div>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-2 bg-purple-400 rounded-full w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">Métricas Gerais</h2>

            {/* Metrics Table */}
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="divide-y divide-gray-700">
                {metricas.map((metrica, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 hover:bg-gray-750 transition-colors"
                  >
                    <div className="sm:col-span-1">
                      <h3 className="text-sm font-medium text-gray-300">{metrica.label}</h3>
                    </div>
                    <div className="sm:col-span-1">
                      <p className="text-lg sm:text-xl font-bold text-white">{metrica.value}</p>
                    </div>
                    <div className="sm:col-span-1">
                      <p className="text-xs sm:text-sm text-gray-400">{metrica.description}</p>
                    </div>
                    <div className="sm:col-span-1">
                      {metrica.additional && (
                        <p className="text-xs sm:text-sm font-medium text-green-400">{metrica.additional}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <div className="mt-6 sm:mt-8">
              <Button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-black font-semibold px-6 sm:px-8 py-3 text-sm sm:text-base">
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
