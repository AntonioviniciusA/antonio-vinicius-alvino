"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface UserMe {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [changeMessage, setChangeMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) {
          router.replace("/login");
          return;
        }
        const data = await res.json();
        setUser(data);
      } catch (e: unknown) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const onChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangeMessage(null);
    setChanging(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Falha ao trocar senha");
      setChangeMessage("Senha alterada com sucesso");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erro inesperado";
      setChangeMessage(msg);
    } finally {
      setChanging(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.replace("/login");
  };

  if (loading) return <div className="p-6">Carregando...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!user) return <div className="p-6">Não autenticado</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <strong>Nome:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Criado em:</strong>{" "}
              {new Date(user.created_at).toLocaleString()}
            </div>
            <Button variant="outline" onClick={onLogout}>
              Sair
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trocar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onChangePassword} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Senha atual</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {changeMessage && <p className="text-sm">{changeMessage}</p>}
              <Button type="submit" disabled={changing}>
                {changing ? "Alterando..." : "Alterar Senha"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
