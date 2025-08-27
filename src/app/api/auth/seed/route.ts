import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

interface RowId extends RowDataPacket {
  id: number;
}

export async function POST() {
  try {
    const name = process.env.DEFAULT_USER_NAME || "Admin";
    const email = process.env.DEFAULT_USER_EMAIL || "admin@site.com";
    const password = process.env.DEFAULT_USER_PASSWORD || "admin123";

    const [rows] = await db.query<RowId[]>(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return NextResponse.json({ success: true, message: "Usuário já existe" });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    return NextResponse.json({ success: true, email, password });
  } catch (error) {
    console.error("Erro ao criar usuário padrão:", error);
    return NextResponse.json(
      { success: false, error: "Erro ao criar usuário padrão" },
      { status: 500 }
    );
  }
}
