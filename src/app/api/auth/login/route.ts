import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "auth_token";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 dias

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password || !JWT_SECRET) {
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 400 }
      );
    }

    const [rows] = await db.query<UserRow[]>(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    const user = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;

    if (!user) {
      return NextResponse.json({ error: "Usuário inválido" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "senha inválida" }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: COOKIE_MAX_AGE,
      }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
