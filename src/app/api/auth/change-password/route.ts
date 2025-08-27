import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "auth_token";

interface UserRow extends RowDataPacket {
  id: number;
  password: string;
}

export async function POST(req: Request) {
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

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const [rows] = await db.query<UserRow[]>(
      "SELECT id, password FROM users WHERE id = ? LIMIT 1",
      [userId]
    );
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!user)
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok)
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 401 }
      );

    const hash = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [
      hash,
      userId,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao trocar senha" },
      { status: 500 }
    );
  }
}
