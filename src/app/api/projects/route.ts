import { NextResponse } from "next/server"
import { db } from "@/app/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image, link, slug, directoryJson } = body

    const [result] = await db.query(
      "INSERT INTO projects (title, description, image, link, slug, directoryJson) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, link, slug, directoryJson]
    )

    return NextResponse.json({ success: true, id: result.insertId })
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
