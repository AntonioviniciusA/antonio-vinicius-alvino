import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "auth_token";

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token)
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const verified = jwt.verify(token, JWT_SECRET);
    const sub =
      typeof verified === "string" ? NaN : (verified as JwtPayload).sub;
    const userId = typeof sub === "string" ? Number(sub) : (sub as number);
    if (!userId || Number.isNaN(userId))
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

    const [rows] = await db.query<UserRow[]>(
      "SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (error) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }
}
