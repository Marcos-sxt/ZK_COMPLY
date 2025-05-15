import { NextResponse } from "next/server"

// Mock database
const substances: any[] = []

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate request
    if (!body.name || !Array.isArray(body.ingredients) || body.ingredients.length !== 30) {
      return NextResponse.json({ error: "Nome e 30 ingredientes são obrigatórios" }, { status: 400 })
    }

    // Create new substance with ID
    const newSubstance = {
      id: Date.now().toString(),
      name: body.name,
      ingredients: body.ingredients,
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    substances.push(newSubstance)

    return NextResponse.json(newSubstance, { status: 201 })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET() {
  // Return all substances (just the id and name)
  return NextResponse.json(
    substances.map((s) => ({ id: s.id, name: s.name })),
    { status: 200 },
  )
}

export { substances }
