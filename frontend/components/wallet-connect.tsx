"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useWallet } from "@/components/wallet-provider"

export function WalletConnect() {
  const { isConnected, isConnecting, walletAddress, connectWallet, disconnectWallet } = useWallet()

  const handleConnect = async () => {
    try {
      await connectWallet()
      toast({
        title: "Carteira conectada",
        description: `Conectado com sucesso à carteira ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`,
      })
    } catch (error) {
      toast({
        title: "Erro de conexão",
        description: "Não foi possível conectar à carteira. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada com sucesso.",
    })
  }

  return (
    <div>
      {isConnected ? (
        <Button variant="outline" className="flex items-center gap-2" onClick={handleDisconnect}>
          <Wallet className="h-4 w-4 text-green-500" />
          <span className="hidden sm:inline">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
          </span>
          <span className="sm:hidden">Conectado</span>
        </Button>
      ) : (
        <Button variant="outline" className="flex items-center gap-2" onClick={handleConnect} disabled={isConnecting}>
          {isConnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Conectando...</span>
            </>
          ) : (
            <>
              <Wallet className="h-4 w-4" />
              <span>Conectar Carteira</span>
            </>
          )}
        </Button>
      )}
    </div>
  )
}
