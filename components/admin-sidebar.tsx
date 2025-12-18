"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Plus, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

type PedidoChat = {
  id: number
  user: string
}

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Posts", href: "/admin/posts", icon: FileText },
  { title: "Novo Post", href: "/admin/posts/new", icon: Plus },
  { title: "Pedidos", href: "/admin/orders", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [chatsAtivos, setChatsAtivos] = useState<PedidoChat[]>([])

  // Função para buscar pedidos em atendimento
async function fetchChats() {
  try {
    const token = localStorage.getItem("token") // ou de onde você guarda o JWT
    const res = await fetch("http://localhost:8080/api/peditos/atendimento", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error("Erro ao buscar chats")
    const data: PedidoChat[] = await res.json()
    setChatsAtivos(data)
  } catch (err) {
    console.error(err)
  }
}

  // Atualiza chats a cada 10 segundos
  useEffect(() => {
    fetchChats()
    const interval = setInterval(fetchChats, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <aside className="w-full md:w-64 border-r border-border bg-card min-h-[calc(100vh-73px)] flex flex-col">
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 font-mono text-xs md:text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* CHATS ATIVOS */}
      {chatsAtivos.length > 0 && (
        <div className="mt-auto p-4 border-t border-border">
          <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> Chats
          </h3>
          <div className="flex flex-col gap-1">
            {chatsAtivos.map((chat) => (
              <Link
                key={chat.id}
                href={`/admin/chats/${chat.id}`}
                className="px-3 py-2 rounded hover:bg-accent hover:text-accent-foreground text-sm truncate"
              >
                {chat.user} - Pedido #{chat.id}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
