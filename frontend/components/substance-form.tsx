"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import axios from "axios"
import { useCustomToast } from "@/components/ui/custom-toast"

interface SubstanceFormProps {
  onSubmit?: (data: SubstanceData) => Promise<void>
}

export interface SubstanceData {
  name: string
  ingredients: number[]
}

export function SubstanceForm({ onSubmit }: SubstanceFormProps) {
  const router = useRouter()
  const { showToast, ToastComponent } = useCustomToast()
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState<number[]>(Array(30).fill(0))
  const [isLoading, setIsLoading] = useState(false)

  const handleIngredientChange = (index: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseInt(value, 10)
    const newIngredients = [...ingredients]
    newIngredients[index] = isNaN(newValue) ? 0 : Math.min(100000, Math.max(0, newValue))
    setIngredients(newIngredients)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast({
        title: "Erro",
        description: "O nome da substância é obrigatório",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (onSubmit) {
        await onSubmit({ name, ingredients })
      } else {
        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulating API call
        await axios.post("/api/substance", { name, ingredients })

        // Mostrar toast personalizado com tempo aumentado (6 segundos)
        showToast({
          title: "Fórmula Registrada",
          description: "Sua fórmula foi registrada com sucesso!",
          variant: "success",
          duration: 6000, // Aumentado para 6 segundos
        })

        // Redirecionar para o dashboard após um breve delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 500)
      }
    } catch (error) {
      console.error("Erro ao registrar fórmula:", error)
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao registrar a fórmula. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {ToastComponent}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Substância</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Composto XYZ-123"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Ingredientes (valores em ppm ou escala 0-100.000)</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`ingredient-${index}`}>Ingrediente {index + 1}</Label>
                    <Input
                      id={`ingredient-${index}`}
                      type="number"
                      min="0"
                      max="100000"
                      value={value || ""}
                      onChange={(e) => handleIngredientChange(index, e.target.value)}
                      placeholder="0-100000"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Registrando...
            </>
          ) : (
            "Registrar Fórmula"
          )}
        </Button>
      </form>
    </>
  )
}
