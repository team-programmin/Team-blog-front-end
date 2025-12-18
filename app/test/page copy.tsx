
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Sparkles,LogOut, User, Settings, FileText} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"

import { useRef } from "react"
import { ProfileModal } from "./ProfileModel"
export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token")
      if (!token) return

      const res = await fetch("http://localhost:8080/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setUser(await res.json())
      }
    }
    fetchUser()
  }, [])
const [profileOpen, setProfileOpen] = useState(false)

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    
    <div className="min-h-screen bg-background">

<ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />

      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-xl font-mono font-semibold">TeamBlog</span>
          </div>

          <nav className="flex items-center gap-4 relative">
            <ThemeToggle />

            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link href="/register">
                  <Button>Começar</Button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <img
                  src={user.avatarUrl || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full cursor-pointer border"
                  onClick={() => setMenuOpen(!menuOpen)}
                />

                
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setProfileOpen(true)} // abre modal
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      Perfil
                    </button>

                    <Link href="/settings">
                      <div className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                        <Settings className="w-4 h-4 text-muted-foreground" />
                        Configurações
                      </div>
                    </Link>

                    <Link href="/blog">
                      <div className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Meus Posts
                      </div>
                    </Link>

                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 font-semibold"
                      onClick={() => {
                        localStorage.removeItem("token")
                        window.location.href = "/login"
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                                )}

              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-muted/50 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-mono">Team progamming blog</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 text-balance">
            Compartilhe suas ideias com o mundo
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Uma plataforma moderna e minimalista para criar, gerenciar e compartilhar seus artigos com facilidade.
          </p>

          <div className="flex items-center gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Criar Conta
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline">
                Ver Blog
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 grid md:grid-cols-3 gap-8">
          <div className="border border-border p-6">
            <h3 className="text-xl font-mono font-semibold mb-3">Editor Simples</h3>
            <p className="text-muted-foreground">
              Interface limpa e intuitiva para escrever seus artigos sem distrações.
            </p>
          </div>

          <div className="border border-border p-6">
            <h3 className="text-xl font-mono font-semibold mb-3">Painel Admin</h3>
            <p className="text-muted-foreground">
              Gerencie todos os seus posts em um único lugar com ferramentas poderosas.
            </p>
          </div>

          <div className="border border-border p-6">
            <h3 className="text-xl font-mono font-semibold mb-3">Design Moderno</h3>
            <p className="text-muted-foreground">Interface minimalista que destaca seu conteúdo de forma elegante.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
