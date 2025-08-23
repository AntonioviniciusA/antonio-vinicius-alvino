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
      // Get the image data (could be in either 'image' or 'imagem' field)
      const imageData = row.image || row.imagem
      
      // Check if the image is base64 and format accordingly
      let imageUrl = ""
      
      if (imageData) {
        if (typeof imageData === 'string') {
          if (imageData.startsWith('data:image/')) {
            // It's already a base64 data URL
            imageUrl = imageData
          } else if (imageData.startsWith('/') || imageData.startsWith('http')) {
            // It's a regular URL or path
            imageUrl = imageData
          } else {
            // Assume it's base64 data without the data URL prefix
            imageUrl = `data:image/jpeg;base64,${imageData}`
          }
        } else if (Buffer.isBuffer(imageData)) {
          // É um Buffer - converter para base64
          imageUrl = `data:image/jpeg;base64,${imageData.toString('base64')}`
        }
        // imageData também pode ser null, mas já verificamos com if (imageData)
      }

      return {
        id: row.id,
        title: row.nome,
        description: row.descricao,
        image: imageUrl,
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