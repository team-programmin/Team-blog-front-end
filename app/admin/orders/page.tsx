"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface Pedido {
  id: number
  status: string
  posicaoFila?: number
  tempoQuePediu?: string
  userQuePediu?: {
    displayName: string
  }
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 👉 CONTROLE DO MENU MOBILE
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""

  async function fetchPedidos() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("http://localhost:8080/api/peditos/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Falha ao buscar pedidos")
      setPedidos(await res.json())
    } catch (err: any) {
      setError(err.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  async function finalizarPedido(pedidoId: number) {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8080/api/peditos/finnality", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: pedidoId }),
      })
      if (!res.ok) throw new Error("Falha ao finalizar pedido")
      fetchPedidos()
    } catch (err: any) {
      setError(err.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPedidos()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER COM HAMBÚRGUER */}
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* SIDEBAR DESKTOP */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* SIDEBAR MOBILE */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative w-64 h-full bg-card">
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* CONTEÚDO */}
        <main className="flex-1 p-4 md:p-8">
          <h1 className="text-2xl md:text-3xl font-mono font-bold mb-1">
            Painel de Pedidos
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Gerencie todos os pedidos
          </p>

          {loading && (
            <p className="text-sm text-muted-foreground">Carregando...</p>
          )}
          {error && (
            <p className="text-sm text-destructive mb-4">{error}</p>
          )}

          {pedidos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {pedidos.map((pedido) => (
                <Card
                  key={pedido.id}
                  className="p-4 md:p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h2 className="text-lg md:text-xl font-mono font-bold mb-2">
                    Pedido #{pedido.id}
                  </h2>

                  <div className="space-y-1 text-sm md:text-base text-muted-foreground">
                    <p>
                      <span className="font-semibold">Cliente:</span>{" "}
                      {pedido.userQuePediu?.displayName || "Desconhecido"}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {pedido.status || "Desconhecido"}
                    </p>
                    <p>
                      <span className="font-semibold">Fila:</span>{" "}
                      {pedido.posicaoFila ?? "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Tempo:</span>{" "}
                      {pedido.tempoQuePediu ?? "N/A"}
                    </p>
                  </div>

                  {pedido.status === "NA_FILA" && (
                    <button
                      onClick={() => finalizarPedido(pedido.id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded hover:bg-accent/90 transition"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Finalizar
                    </button>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            !loading && (
              <p className="text-muted-foreground">
                Nenhum pedido encontrado.
              </p>
            )
          )}
        </main>
      </div>
    </div>
  )
}
