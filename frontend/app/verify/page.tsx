"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { useCustomToast } from "@/components/ui/custom-toast"

interface Substance {
  id: string
  name: string
}

export default function VerifyPage() {
  const router = useRouter()
  const { isConnected } = useWallet()
  const { showToast, ToastComponent } = useCustomToast()
  const [substances, setSubstances] = useState<Substance[]>([])
  const [selectedSubstance, setSelectedSubstance] = useState("")
  const [ingredientIndex, setIngredientIndex] = useState<number>(0)
  const [threshold, setThreshold] = useState<number>(9500)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSubstances, setIsLoadingSubstances] = useState(true)

  useEffect(() => {
    const fetchSubstances = async () => {
      try {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulating API response
        const mockSubstances = [
          { id: "1", name: "Composto A-123" },
          { id: "2", name: "Solução B-456" },
          { id: "3", name: "Mistura C-789" },
          { id: "4", name: "Fórmula D-012" },
        ]

        setSubstances(mockSubstances)
      } catch (error) {
        console.error("Erro ao buscar substâncias:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar a lista de substâncias",
          variant: "destructive",
        })
      } finally {
        setIsLoadingSubstances(false)
      }
    }

    fetchSubstances()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedSubstance) {
      toast({
        title: "Erro",
        description: "Selecione uma substância",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulating API call and storing result in localStorage
      const verifyResult = {
        passed: Math.random() > 0.5, // Random result for demo
        substanceName: substances.find((s) => s.id === selectedSubstance)?.name || "",
        ingredientIndex,
        threshold,
        value: Math.floor(Math.random() * 15000), // Random value between 0 and 15000
      }

      localStorage.setItem("verifyResult", JSON.stringify(verifyResult))

      // Mostrar toast personalizado com tempo aumentado (6 segundos)
      showToast({
        title: "Verificação Concluída",
        description: "A verificação foi realizada com sucesso!",
        variant: "success",
        duration: 6000, // Aumentado para 6 segundos
      })

      // Redirecionar para a página de resultado após um breve delay
      setTimeout(() => {
        router.push("/result")
      }, 500)
    } catch (error) {
      console.error("Erro ao verificar ingrediente:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao verificar o ingrediente. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-10 px-4">
      {ToastComponent}
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Verificar Ingrediente</h1>

        {!isConnected && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Conecte sua carteira</AlertTitle>
            <AlertDescription>Para verificar um ingrediente, você precisa conectar sua carteira.</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="substance">Substância</Label>
                {isLoadingSubstances ? (
                  <div className="flex items-center justify-center p-2">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    <span className="ml-2 text-sm text-gray-500">Carregando substâncias...</span>
                  </div>
                ) : (
                  <Select value={selectedSubstance} onValueChange={setSelectedSubstance}>
                    <SelectTrigger id="substance">
                      <SelectValue placeholder="Selecione uma substância" />
                    </SelectTrigger>
                    <SelectContent>
                      {substances.map((substance) => (
                        <SelectItem key={substance.id} value={substance.id}>
                          {substance.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredientIndex">Índice do Ingrediente (0-29)</Label>
                <Input
                  id="ingredientIndex"
                  type="number"
                  min="0"
                  max="29"
                  value={ingredientIndex}
                  onChange={(e) => setIngredientIndex(Math.min(29, Math.max(0, Number.parseInt(e.target.value) || 0)))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold">Limite (threshold)</Label>
                <Input
                  id="threshold"
                  type="number"
                  min="0"
                  max="100000"
                  value={threshold}
                  onChange={(e) => setThreshold(Number.parseInt(e.target.value) || 0)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading || isLoadingSubstances}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  "Verificar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
