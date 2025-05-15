"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useCustomToast } from "@/components/ui/custom-toast"

export default function Dashboard() {
  const { isConnected } = useWallet()
  const { ToastComponent } = useCustomToast()

  return (
    <main className="container mx-auto py-10 px-4">
      {ToastComponent}
      <h1 className="text-3xl font-bold mb-8 text-blue-600 text-center">Dashboard</h1>

      {!isConnected && (
        <Alert className="mb-8 max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Conecte sua carteira</AlertTitle>
          <AlertDescription>
            Para utilizar todas as funcionalidades do sistema, conecte sua carteira usando o botão no canto superior
            direito.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-5xl mx-auto mt-8">
        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col w-full md:w-96">
          <CardHeader>
            <CardTitle className="text-blue-700">Registrar Fórmula</CardTitle>
            <CardDescription>Cadastre uma nova fórmula química com até 30 ingredientes</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600">
              Registre os valores de cada componente da sua fórmula química em ppm ou escala de 0 a 100.000.
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Link href="/register" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Registrar Nova Fórmula</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow flex flex-col w-full md:w-96">
          <CardHeader>
            <CardTitle className="text-blue-700">Verificar Ingrediente</CardTitle>
            <CardDescription>Verifique se um ingrediente está dentro do limite permitido</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600">
              Selecione uma fórmula, escolha o índice do ingrediente e defina o limite para verificação.
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Link href="/verify" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Verificar Ingrediente</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
