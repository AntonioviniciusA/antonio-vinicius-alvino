import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image, link, slug, directoryJson } = body

    const [result, _] = await db.query(
      "INSERT INTO projects (title, description, image, link, slug, directoryJson) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, link, slug, directoryJson]
    )

    // If result is an array, get insertId from the first element
    const insertId =
      Array.isArray(result) && result.length > 0 && 'insertId' in result[0]
        ? (result[0] as { insertId?: number }).insertId
        : (result as { insertId?: number }).insertId

    return NextResponse.json({ success: true, id: insertId })
  } catch (error) {
    console.error("Erro ao salvar projeto:", error)
    return NextResponse.json({ success: false, error: "Erro ao salvar projeto" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM projects ORDER BY created_at DESC")
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return NextResponse.json({ success: false, error: "Erro ao buscar projetos" }, { status: 500 })
  }
}
