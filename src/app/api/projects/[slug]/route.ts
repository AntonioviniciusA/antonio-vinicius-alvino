import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface ProjetoDB extends RowDataPacket {
  id: number;
  nome: string;
  descricao: string;
  image?: string;
  imagem?: string;
  link: string;
  slug: string;
  diretoriojson: string;
  created_at: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await the params promise
    const { slug } = await params;

    console.log("🔍 Fetching project with slug:", slug);

    if (!slug || typeof slug !== "string" || slug.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Slug inválido" },
        { status: 400 }
      );
    }

    const trimmedSlug = slug.trim();

    // Test database connection first
    try {
      await db.getConnection();
      console.log("✅ Database connection successful");
    } catch (connError) {
      console.error("❌ Database connection error:", connError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Database connection failed",
          details: process.env.NODE_ENV === 'development' ? String(connError) : undefined
        },
        { status: 500 }
      );
    }

    let rows;
    try {
      [rows] = await db.query<ProjetoDB[]>(
        "SELECT * FROM projeto WHERE slug = ? LIMIT 1",
        [trimmedSlug]
      );
      console.log("📊 Database query result:", rows);
    } catch (dbError) {
      console.error("❌ Database query error:", dbError);
      return NextResponse.json(
        { 
          success: false, 
          error: "Database query failed",
          details: process.env.NODE_ENV === 'development' ? String(dbError) : undefined
        },
        { status: 500 }
      );
    }

    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("❌ Project not found with slug:", trimmedSlug);
      return NextResponse.json(
        { success: false, error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    const projeto = rows[0];
    console.log("✅ Project found:", projeto.nome);

const imageData = projeto.image || projeto.imagem;

let imageUrl = "";
if (imageData) {
  let img: string;

  if (Buffer.isBuffer(imageData)) {
    // Converte Buffer para base64
    img = imageData.toString("base64");
    imageUrl = `data:image/jpeg;base64,${img}`;
  } else if (typeof imageData === "string") {
    if (imageData.startsWith("data:image/")) {
      imageUrl = imageData;
    } else if (imageData.startsWith("/") || imageData.startsWith("http")) {
      imageUrl = imageData;
    } else {
      imageUrl = `data:image/jpeg;base64,${imageData}`;
    }
  }
}


    const responseData = {
      id: projeto.id,
      title: projeto.nome,
      description: projeto.descricao,
      image: imageUrl,
      link: projeto.link,
      slug: projeto.slug,
      directoryJson: projeto.diretoriojson,
      created_at: projeto.created_at,
      rawImage: imageData,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("💥 Unhandled error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}