"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  isConnecting: boolean
  walletAddress: string
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Verificar se há uma carteira salva no localStorage ao carregar
  useEffect(() => {
    // Verificar se estamos no navegador antes de acessar localStorage
    if (typeof window !== "undefined") {
      const savedWallet = localStorage.getItem("walletAddress")
      if (savedWallet) {
        setWalletAddress(savedWallet)
        setIsConnected(true)
      }
    }
  }, [])

  const connectWallet = async () => {
    setIsConnecting(true)

    try {
      // Simulando conexão de carteira
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Gerar um endereço de carteira aleatório
      const randomAddress =
        "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

      setWalletAddress(randomAddress)
      setIsConnected(true)

      // Salvar no localStorage para persistir entre recarregamentos
      if (typeof window !== "undefined") {
        localStorage.setItem("walletAddress", randomAddress)
      }
    } catch (error) {
      console.error("Erro ao conectar carteira:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
    if (typeof window !== "undefined") {
      localStorage.removeItem("walletAddress")
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        isConnecting,
        walletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
