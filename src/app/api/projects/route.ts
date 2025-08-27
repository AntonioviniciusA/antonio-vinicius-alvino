import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { RowDataPacket } from "mysql2"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, image, link, slug, directoryJson } = body

    const [result] = await db.query(
      "INSERT INTO projeto (nome, descricao, image, link, slug, diretoriojson) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, link, slug, directoryJson]
    )

    const insertId =
      Array.isArray(result) && result.length > 0 && "insertId" in result[0]
        ? (result[0] as { insertId?: number }).insertId
        : (result as { insertId?: number }).insertId

    return NextResponse.json({ success: true, id: insertId })
  } catch (error) {
    console.error("Erro ao salvar projeto:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao salvar projeto" },
      { status: 500 }
    )
  }
}

interface ProjetoRow extends RowDataPacket {
  id: number
  nome: string
  descricao: string
  image?: string | Buffer | null
  imagem?: string | Buffer | null
  link: string
  slug: string
  diretoriojson: string
  created_at: string
}

export async function GET() {
  try {
    const [rows] = await db.query<ProjetoRow[]>("SELECT * FROM projeto")

    const projetos = rows.map((row: ProjetoRow) => {
      let imageUrl = "/placeholder.svg" // fallback padrão

      if (row.image) {
        if (typeof row.image === "string") {
          // Já vem em base64 com prefixo?
          if (row.image.startsWith("data:")) {
            imageUrl = row.image
          } else {
            imageUrl = `data:image/png;base64,${row.image}`
          }
        } else if (Buffer.isBuffer(row.image)) {
          // Buffer → converte para base64
          imageUrl = `data:image/png;base64,${row.image.toString("base64")}`
        }
      }

      return {
        id: row.id,
        title: row.nome,
        description: row.descricao,
        image: imageUrl, // Agora SEMPRE com prefixo válido
        link: row.link,
        slug: row.slug,
        directoryJson: row.diretoriojson,
        created_at: row.created_at,
      }
    })

    return NextResponse.json(projetos)
  } catch (error) {
    console.error("Erro ao buscar projetos:", error)
    return NextResponse.json(
      { success: false, error: "Erro ao buscar projetos" },
      { status: 500 }
    )
  }
}
