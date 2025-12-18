"use client"
import { ProfileModal } from "@/app/ProfileModel"
import { BookOpen, FileText,  LogOut, Settings, User } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"

import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"


export  function Navbar() {
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
    
    return (<>
     <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />

      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-xl font-mono font-semibold">TeamBlog</span>
          </Link>

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
    </>)
}