"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Card,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import {
  User,
  Shield,
  Bell,
  Palette,
  Link as LinkIcon,
  Trash2,
  Camera,
  
} from "lucide-react"
import { FaGoogle, FaGithub } from "react-icons/fa"
export default function UserSettings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Se tiver token, buscar dados do usuário
    const token = localStorage.getItem("token")
    if (token) {
      fetch("http://localhost:8080/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUser(data))
    }
  }, [])

  function redirectOAuth(provider: "google" | "github") {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-10">
      <Navbar />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-mono font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Controle seu perfil, privacidade e preferências
        </p>
      </div>

      {/* PERFIL */}
      <Card className="p-6 space-y-6">
        <SectionHeader icon={<User />} title="Perfil público" />

        <div className="relative rounded-lg h-40 bg-muted">
          <Button
            size="sm"
            variant="secondary"
            className="absolute top-3 right-3 gap-2"
          >
            <Camera className="w-4 h-4" />
            Alterar capa
          </Button>

          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <img
              src={user?.avatarUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-background bg-muted object-cover"
            />
            <Button variant="outline">Alterar foto</Button>
          </div>
        </div>

        <div className="pt-12 grid md:grid-cols-2 gap-4">
          <Input value={user?.displayName || ""} placeholder="Nome de exibição" />
          <Input value={user?.username || ""} placeholder="Nome de usuário (@username)" />
        </div>

        <Textarea value={user?.bio || ""} placeholder="Bio" />

        <div className="grid md:grid-cols-3 gap-4">
          <Input value={user?.location || ""} placeholder="Localização" />
          <Input value={user?.website || ""} placeholder="Site pessoal" />
          <Input value={user?.birthdate || ""} placeholder="Data de nascimento" />
        </div>

        <div className="flex justify-end">
          <Button>Salvar alterações</Button>
        </div>
      </Card>

      {/* CONTA E SEGURANÇA */}
      <Card className="p-6 space-y-6">
        <SectionHeader icon={<Shield />} title="Conta e segurança" />

        <div className="grid md:grid-cols-2 gap-4">
          <Input type="email" value={user?.email || ""} placeholder="Email" />
          <Input type="password" placeholder="Senha atual" />
          <Input type="password" placeholder="Nova senha" />
          <Input type="password" placeholder="Confirmar nova senha" />
        </div>

        <Separator />

        <SettingToggle
          title="Autenticação em dois fatores"
          description="Adicione uma camada extra de segurança"
        />

        <SettingToggle
          title="Sessões ativas"
          description="Encerrar sessões em outros dispositivos"
        />

        <div className="flex justify-end">
          <Button>Atualizar segurança</Button>
        </div>
      </Card>

      {/* PRIVACIDADE */}
      <Card className="p-6 space-y-6">
        <SectionHeader icon={<Bell />} title="Privacidade e notificações" />

        <SettingToggle
          title="Perfil privado"
          description="Somente seguidores aprovados podem ver seu conteúdo"
        />

        <SettingToggle
          title="Notificações por email"
          description="Receber emails sobre atividades importantes"
        />

        <SettingToggle
          title="Notificações push"
          description="Receber alertas no navegador"
        />
      </Card>

      {/* APARÊNCIA */}
      <Card className="p-6 space-y-6">
        <SectionHeader icon={<Palette />} title="Aparência" />

        <SettingToggle
          title="Modo escuro"
          description="Ativar tema escuro"
        />

        <div>
          <p className="text-sm font-medium mb-2">Idioma</p>
          <Input placeholder="Português (Brasil)" />
        </div>
      </Card>

      {/* CONEXÕES (LOGIN SOCIAL) */}
      <Card className="p-6 space-y-6">
        <SectionHeader icon={<LinkIcon />} title="Contas conectadas" />

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => redirectOAuth("google")}
            className="flex items-center gap-2"
          >
            <FaGoogle className="w-4 h-4" /> Conectar com Google
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => redirectOAuth("github")}
            className="flex items-center gap-2"
          >
            <FaGithub className="w-4 h-4" /> Conectar com GitHub
          </Button>
        </div>
      </Card>

      {/* ZONA DE PERIGO */}
      <Card className="p-6 space-y-4 border-destructive/40">
        <div className="flex items-center gap-2 text-destructive">
          <Trash2 className="w-5 h-5" />
          <h2 className="text-lg font-mono font-semibold">
            Zona de perigo
          </h2>
        </div>

        <p className="text-sm text-muted-foreground">
          Ações irreversíveis relacionadas à sua conta
        </p>

        <Button variant="destructive">
          Excluir conta permanentemente
        </Button>
      </Card>
    </div>
  )
}

/* ----------- SUBCOMPONENTES ----------- */

function SectionHeader({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground">{icon}</span>
      <h2 className="text-xl font-mono font-semibold">{title}</h2>
    </div>
  )
}

function SettingToggle({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch />
    </div>
  )
}
