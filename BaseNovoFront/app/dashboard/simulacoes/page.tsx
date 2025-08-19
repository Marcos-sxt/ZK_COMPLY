"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import UserAvatarMenu from "@/components/user-avatar-menu"

export default function SimulacoesPage() {
  const [smilesValue, setSmilesValue] = useState("C1CCCCC1")
  const [testeValue, setTesteValue] = useState("")

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
                className="text-white bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg"
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
          <h1 className="text-base sm:text-lg font-medium text-white">TELA SIMULAÇÕES</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-gray-800 border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Simular Prova ZK</h2>

            {/* SMILES Input */}
            <div className="mb-4 sm:mb-6">
              <Label htmlFor="smiles" className="text-sm font-medium text-gray-300 mb-2 block">
                SMILES
              </Label>
              <Input
                id="smiles"
                type="text"
                value={smilesValue}
                onChange={(e) => setSmilesValue(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 h-10 sm:h-12"
                placeholder="Digite a notação SMILES"
              />
            </div>

            {/* Teste Input Field */}
            <div className="mb-4 sm:mb-6">
              <Label htmlFor="teste" className="text-sm font-medium text-gray-300 mb-2 block">
                Teste
              </Label>
              <Input
                id="teste"
                type="text"
                value={testeValue}
                onChange={(e) => setTesteValue(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 h-10 sm:h-12"
                placeholder="Digite o tipo de teste"
              />
            </div>

            {/* Environment */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Ambiente</h3>
              <div className="bg-gray-700 rounded-lg p-3">
                <span className="text-gray-300 text-sm">Buffer fosfato 0.1 M</span>
              </div>
            </div>

            {/* Simulate Button */}
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 text-sm sm:text-base rounded-lg flex items-center justify-center">
              Simular
              <svg width="14" height="14" viewBox="0 0 16 16" className="ml-2 sm:w-4 sm:h-4" fill="currentColor">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038L11 7.055a.5.5 0 0 1 0 .89L6.791 9.907a.5.5 0 0 1-.791-.389V5.482a.5.5 0 0 1 .271-.427z" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Section */}
            <div className="mb-6 sm:mb-8">
              {/* Top Row - Combined Chart and Graph */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  {/* Left side - Pie Chart with Labels */}
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {/* Pie Chart */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                      <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#374151"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="3"
                          strokeDasharray="71, 100"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#A855F7"
                          strokeWidth="3"
                          strokeDasharray="29, 100"
                          strokeDashoffset="-71"
                        />
                      </svg>
                    </div>

                    {/* Percentage Labels */}
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-white font-medium text-sm sm:text-base">71% Benzeno</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-white font-medium text-sm sm:text-base">29% Impurezas</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Graph Title */}
                  <div className="text-center sm:text-right">
                    <h3 className="text-base sm:text-lg font-semibold text-white">
                      Gráfico de picos -<br />
                      número de onda
                    </h3>
                  </div>
                </div>
              </div>

              {/* Analysis Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 sm:mb-4">Impurezas</h4>
                  <div className="h-20 sm:h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Dados de impurezas</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 sm:mb-4">Contagem de átomos</h4>
                  <div className="h-20 sm:h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Contagem atômica</span>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
                  <h4 className="text-sm font-medium text-gray-300 mb-3 sm:mb-4">Desvio padrão</h4>
                  <div className="h-20 sm:h-24 bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Análise estatística</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-3 flex items-center justify-center text-sm sm:text-base">
                  Passou ✓
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-3 flex items-center justify-center text-sm sm:text-base">
                  Refazer ↻
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold py-3 text-sm sm:text-base">
                  Salvar Prova
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
