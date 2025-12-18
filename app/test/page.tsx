"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { BookOpen, FileText, Loader2, LogOut, Package, Settings, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { is } from "date-fns/locale"
import { ProfileModal } from "../ProfileModel"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
type Pedido = {
    id: number
    produto: string
    status: string
    posicaoFila: number
}

export default function PedidosPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([])
    const [position, setPosition] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const [produto, setProduto] = useState("")
    
    const [token, setToken] = useState<string | null>(null)
    const [loador, setLoador] = useState(true)

    // Pega token do localStorage apenas no client
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])

    
    useEffect(() => {
  async function fetchPedidos() {
    try {
      const res = await fetch("http://localhost:8080/api/peditos/meus", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (res.ok) {
        const data = await res.json()
        setPedidos(data)
      } else {
        setPedidos([])
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
      setPedidos([])
    } finally {
      setLoading(false)
      setLoador(false) // libera a tela principal
    }
  }

  if (token) {
    fetchPedidos()
  } else {
    setLoador(false)
    setLoading(false)
  }
}, [token])


    async function fetchPosition() {
        try {
            const res = await fetch("http://localhost:8080/api/peditos/position", { method: "GET" })
            if (res.ok) {
                const data = await res.json()
                setPosition(data)
            } else {
                setPosition(null)
            }
        } catch (error) {
            console.error("Erro ao buscar posição:", error)
            setPosition(null)
        }
    }


    async function handleNovoPedido(e: React.FormEvent) {
  e.preventDefault()
  try {
    const res = await fetch("http://localhost:8080/api/peditos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // token do localStorage
      },
      body: JSON.stringify({ produto }),
    })
    if (res.ok) {
      setProduto("")
      // Atualiza lista e posição
      await fetchPosition()
      // se quiser atualizar a lista também
    }
  } catch (error) {
    console.error("Erro ao criar pedido:", error)
  }
}

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
        !loador ? (
            <div className="min-h-screen flex flex-col">
                {/* Header */}
                <Navbar/>
                {/* Main */}
                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                    <div className="w-full max-w-2xl">
                        <h1 className="text-3xl font-mono font-bold mb-6 text-center">📦 Meus Pedidos</h1>
                        <p className="text-muted-foreground mb-8 text-center">
                            Faça um pedido e acompanhe sua posição na fila
                        </p>

                        {/* Formulário novo pedido */}
                        <form onSubmit={handleNovoPedido} className="mb-8 flex gap-2">
                            <input
                                type="text"
                                value={produto}
                                onChange={(e) => setProduto(e.target.value)}
                                placeholder="Nome do produto"
                                className="flex-1 border rounded-md px-3 py-2"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
                            >
                                Fazer Pedido
                            </button>
                        </form>

                        {/* Posição na fila */}
                        {position !== null && (
                            <div className="bg-card border rounded-lg p-6 shadow-sm text-center mb-8">
                                <p className="text-lg font-semibold">Sua posição atual na fila:</p>
                                <p className="text-4xl font-mono font-bold text-primary mt-2">{position}</p>
                            </div>
                        )}

                        {/* Lista de pedidos */}
                        {loading ? (
                            <div className="flex justify-center">
                                <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
                            </div>
                        ) : pedidos.length > 0 ? (
                            <ul className="space-y-4">
                                {pedidos.map((pedido) => (
                                    <li
                                        key={pedido.id}
                                        className="bg-card border rounded-lg p-6 shadow-sm flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Package className="w-6 h-6 text-primary" />
                                            <div>
                                                <p className="font-semibold">{pedido.produto}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Status: {pedido.status}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-mono text-muted-foreground">
                                            Fila #{pedido.posicaoFila}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="bg-card border rounded-lg p-6 shadow-sm text-center">
                                <p className="text-lg font-semibold">Você não possui pedidos ativos.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        ) :  (
    <div className="min-h-screen flex flex-col">
       <Navbar/>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-mono font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre para continuar gerenciando seu blog</p>
          </div>
        </div>
      </main>
    </div>
  )
)}
                

