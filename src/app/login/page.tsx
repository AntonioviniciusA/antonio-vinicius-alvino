"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verifica se já está logado
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Verificando se já está logado...");
        const res = await fetch("/api/auth/me", { credentials: "include" });
        console.log("📡 Resposta /api/auth/me:", res.status, res.ok);
        if (res.ok) {
          const next = searchParams.get("next") || "/profile";
          console.log("✅ Já logado, redirecionando para:", next);
          // Tenta diferentes métodos de redirecionamento
          try {
            router.replace(next);
          } catch (e) {
            console.log("❌ Erro no router.replace, tentando router.push:", e);
            router.push(next);
          }
        } else {
          console.log("❌ Não logado, permanecendo na página de login");
        }
      } catch (err) {
        console.log("❌ Erro ao verificar auth:", err);
      }
    };
    checkAuth();
  }, [router, searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log("🚀 Iniciando login...");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Falha no login");
      }

      router.push("/profile");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro inesperado";
      console.error("❌ Erro no login:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
                required
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Carregando...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
