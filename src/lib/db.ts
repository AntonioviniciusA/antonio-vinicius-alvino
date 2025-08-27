import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function seedAdminUserIfNeeded() {
  const maxRetries = 3;
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      console.log(`Tentativa ${retryCount + 1} de criar usuário admin...`);

      const name = process.env.DEFAULT_USER_NAME || "Admin";
      const email = process.env.DEFAULT_USER_EMAIL || "admin@site.com";
      const password = process.env.DEFAULT_USER_PASSWORD || "admin123";

      console.log(`Verificando se usuário ${email} já existe...`);
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      if (Array.isArray(rows) && rows.length > 0) {
        console.log(`Usuário ${email} já existe, pulando criação.`);
        return;
      }

      console.log(`Criando usuário admin: ${email}`);
      const hash = await bcrypt.hash(password, 10);
      const result = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hash]
      );

      console.log("✅ Usuário admin criado com sucesso!");
      console.log("📧 Email:", email);
      console.log("🔑 Senha:", password);
      console.log("🆔 ID:", (result[0] as ResultSetHeader)?.insertId);
      return;
    } catch (err) {
      retryCount++;
      console.error(`❌ Erro na tentativa ${retryCount}:`, err);

      if (retryCount >= maxRetries) {
        console.error(
          "❌ Falha ao criar usuário admin após",
          maxRetries,
          "tentativas"
        );
        return;
      }

      // Aguarda antes de tentar novamente
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}

// Executa seed após um pequeno delay para garantir que a conexão esteja pronta
setTimeout(() => {
  seedAdminUserIfNeeded();
}, 1000);
