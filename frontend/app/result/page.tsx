"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ResultCard } from "@/components/result-card"
import { Loader2 } from "lucide-react"

interface VerifyResult {
  passed: boolean
  substanceName: string
  ingredientIndex: number
  threshold: number
  value: number
}

export default function ResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<VerifyResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get result from localStorage
    const storedResult = localStorage.getItem("verifyResult")

    if (!storedResult) {
      router.push("/verify")
      return
    }

    try {
      setResult(JSON.parse(storedResult))
    } catch (error) {
      console.error("Erro ao processar resultado:", error)
      router.push("/verify")
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <main className="container mx-auto py-10 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="mt-4 text-gray-600">Carregando resultado...</p>
        </div>
      </main>
    )
  }

  if (!result) {
    return null
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-blue-700">Resultado da Verificação</h1>
        <ResultCard
          passed={result.passed}
          substanceName={result.substanceName}
          ingredientIndex={result.ingredientIndex}
          threshold={result.threshold}
          value={result.value}
        />
      </div>
    </main>
  )
}
