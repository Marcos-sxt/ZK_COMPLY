import { CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ResultCardProps {
  passed: boolean
  substanceName: string
  ingredientIndex: number
  threshold: number
  value: number
}

export function ResultCard({ passed, substanceName, ingredientIndex, threshold, value }: ResultCardProps) {
  return (
    <Card className={`shadow-lg border-l-4 ${passed ? "border-l-green-500" : "border-l-red-500"}`}>
      <CardHeader className={passed ? "bg-green-50" : "bg-red-50"}>
        <CardTitle className="flex items-center gap-2">
          {passed ? (
            <>
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-green-700">Aprovado</span>
            </>
          ) : (
            <>
              <XCircle className="h-6 w-6 text-red-600" />
              <span className="text-red-700">Reprovado</span>
            </>
          )}
        </CardTitle>
        <CardDescription>Resultado da verificação da fórmula</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Substância</p>
          <p className="font-medium">{substanceName}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">Ingrediente</p>
          <p className="font-medium">Ingrediente {ingredientIndex + 1}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Valor</p>
            <p className="font-medium">{value} ppm</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Limite</p>
            <p className="font-medium">{threshold} ppm</p>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm font-medium text-gray-500">Resultado</p>
          <p className={`font-medium ${passed ? "text-green-600" : "text-red-600"}`}>
            {passed ? "O valor está abaixo do limite permitido" : "O valor está acima do limite permitido"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Link href="/verify">
          <Button variant="outline">Nova Verificação</Button>
        </Link>
        <Link href="/dashboard">
          <Button>Voltar ao Dashboard</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
