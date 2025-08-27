import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, image, link, slug, directoryJson } = body;

    const [result] = await db.query(
      "INSERT INTO projeto (nome, descricao, image, link, slug, diretoriojson) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, image, link, slug, directoryJson]
    );

    const insertId =
      Array.isArray(result) && result.length > 0 && "insertId" in result[0]
        ? (result[0] as { insertId?: number }).insertId
        : (result as { insertId?: number }).insertId;

    return NextResponse.json({ success: true, id: insertId });
  } catch (error) {
    console.error("Erro ao salvar projeto:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao salvar projeto" },
      { status: 500 }
    );
  }
}

interface ProjetoRow extends RowDataPacket {
  id: number;
  nome: string;
  descricao: string;
  image?: string | Buffer | null;
  imagem?: string | Buffer | null;
  link: string;
  slug: string;
  diretoriojson: string;
  created_at: string;
}

function unwrapDoubleDataUrlIfNeeded(src: string): string {
  const prefix = "data:image";
  const base64Marker = ",";
  if (src.startsWith(prefix)) {
    const commaIndex = src.indexOf(base64Marker);
    if (commaIndex !== -1) {
      const payload = src.slice(commaIndex + 1);
      try {
        const decoded = Buffer.from(payload, "base64").toString("utf8").trim();
        if (decoded.startsWith("data:image")) {
          return decoded;
        }
      } catch {
        // ignora erros de decodificação
      }
    }
  }
  return src;
}

export async function GET() {
  try {
    const [rows] = await db.query<ProjetoRow[]>("SELECT * FROM projeto");

    const projetos = rows.map((row: ProjetoRow) => {
      let imageUrl = "/window.svg"; // fallback existente em public/

      const imageData = row.image ?? row.imagem;

      if (imageData) {
        if (typeof imageData === "string") {
          let src = imageData.trim();

          // Já é data URL
          if (src.startsWith("data:")) {
            src = unwrapDoubleDataUrlIfNeeded(src);
            imageUrl = src;
            // URL absoluta/relativa
          } else if (src.startsWith("http") || src.startsWith("/")) {
            imageUrl = src;
          } else {
            // Base64 cru: inferir MIME
            const normalized = src.replace(/\s+/g, "");
            const base64Regex = /^[A-Za-z0-9+/=]+$/;
            if (base64Regex.test(normalized)) {
              let mime = "image/jpeg";
              if (normalized.startsWith("iVBORw0")) mime = "image/png";
              else if (normalized.startsWith("UklGR")) mime = "image/webp";
              else if (normalized.startsWith("R0lGOD")) mime = "image/gif";
              else if (normalized.startsWith("/9j/")) mime = "image/jpeg";
              imageUrl = `data:${mime};base64,${normalized}`;
            }
          }
        } else if (Buffer.isBuffer(imageData)) {
          // Tenta interpretar como texto UTF-8 primeiro (pode ser data URL/URL armazenada em BLOB)
          let utf8 = imageData.toString("utf8").trim();
          if (utf8.startsWith("data:")) {
            utf8 = unwrapDoubleDataUrlIfNeeded(utf8);
            imageUrl = utf8;
          } else if (utf8.startsWith("http") || utf8.startsWith("/")) {
            imageUrl = utf8;
          } else {
            // Binário cru → converte para base64, assume PNG como padrão
            imageUrl = `data:image/png;base64,${imageData.toString("base64")}`;
          }
        }
      }

      return {
        id: row.id,
        title: row.nome,
        description: row.descricao,
        image: imageUrl, // Sempre algo válido para <img>
        link: row.link,
        slug: row.slug,
        directoryJson: row.diretoriojson,
        created_at: row.created_at,
      };
    });

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao buscar projetos" },
      { status: 500 }
    );
  }
}
