"use client"

import { SubstanceForm } from "@/components/substance-form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"

export default function RegisterPage() {
  const { isConnected } = useWallet()

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Registrar Nova Fórmula</h1>

        {!isConnected && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Conecte sua carteira</AlertTitle>
            <AlertDescription>Para registrar uma fórmula, você precisa conectar sua carteira.</AlertDescription>
          </Alert>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <SubstanceForm />
        </div>
      </div>
    </main>
  )
}
