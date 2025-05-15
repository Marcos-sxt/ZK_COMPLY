import { NextResponse } from "next/server"

// Mock database (referencing the same array from the substance route)
import { substances } from "../substance/route"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request
    if (!body.substanceId || body.ingredientIndex === undefined || body.threshold === undefined) {
      return NextResponse.json(
        { error: "ID da substância, índice do ingrediente e threshold são obrigatórios" },
        { status: 400 },
      )
    }

    // Find substance
    const substance = substances.find((s) => s.id === body.substanceId)

    if (!substance) {
      return NextResponse.json({ error: "Substância não encontrada" }, { status: 404 })
    }

    // Validate index
    if (body.ingredientIndex < 0 || body.ingredientIndex >= 30) {
      return NextResponse.json({ error: "Índice do ingrediente deve estar entre 0 e 29" }, { status: 400 })
    }

    // Get ingredient value
    const value = substance.ingredients[body.ingredientIndex]

    // Check if below threshold
    const passed = value <= body.threshold

    return NextResponse.json({
      passed,
      substanceName: substance.name,
      ingredientIndex: body.ingredientIndex,
      threshold: body.threshold,
      value,
    })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
