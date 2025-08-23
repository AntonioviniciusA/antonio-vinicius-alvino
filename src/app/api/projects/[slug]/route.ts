import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { RowDataPacket } from "mysql2"

interface ProjetoDB extends RowDataPacket {
  id: number
  nome: string
  descricao: string
  image?: string
  imagem?: string
  link: string
  slug: string
  diretoriojson: string
  created_at: string
}

interface RouteContext {
  params: Promise<{
    slug: string
  }>
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { slug } = await context.params

    // Validate slug parameter
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, error: "Slug inválido" },
        { status: 400 }
      )
    }

    const [rows] = await db.query<ProjetoDB[]>(
      "SELECT * FROM projeto WHERE slug = ?",
      [slug]
    )

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Projeto não encontrado" },
        { status: 404 }
      )
    }

    const projeto = rows[0]
    
    // Get the image data (could be in either 'image' or 'imagem' field)
    const imageData = projeto.image || projeto.imagem
    
    // Check if the image is base64 and format accordingly
    let imageUrl = ""
    
    if (imageData) {
      if (imageData.startsWith('data:image/')) {
        // It's already a base64 data URL
        imageUrl = imageData
      } else if (imageData.startsWith('/') || imageData.startsWith('http')) {
        // It's a regular URL or path
        imageUrl = imageData
      } else {
        // Assume it's base64 data without the data URL prefix
        // You might need to adjust the MIME type based on your data
        imageUrl = `data:image/jpeg;base64,${imageData}`
      }
    }

    // Prepare response data
    const responseData = {
      id: projeto.id,
      title: projeto.nome,
      description: projeto.descricao,
      image: imageUrl,
      link: projeto.link,
      slug: projeto.slug,
      directoryJson: projeto.diretoriojson,
      created_at: projeto.created_at,
      // Include raw image data if needed for any processing
      rawImage: imageData
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Erro ao buscar projeto por slug:", error)
    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}