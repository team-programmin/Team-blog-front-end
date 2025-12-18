// ————————————————————————————————
// CLIENT-SIDE COMPONENT
// ————————————————————————————————
"use client"

import { useEffect, useState } from "react"
import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card } from "@/components/ui/card"
import { Eye, FileText } from "lucide-react"
import { UserCard } from "@/components/user-card"
import { EditUserForm } from "@/components/Dialo" // importa o form

type User = {
  id: string
  displayName: string
  email: string
  role: "ADMIN" | "USER"
  avatarUrl?: string
  bio?: string
  location?: string
  website?: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [requisitions, setRequisitions] = useState<number>(0)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token")
      const headers = { Authorization: `Bearer ${token}` }

      const usersRes = await fetch("http://localhost:8080/api/admin/users", { headers })
      setUsers(await usersRes.json())

      const reqRes = await fetch("http://localhost:8080/api/admin/info/requisitions", { headers })
      setRequisitions(await reqRes.json())
    }

    fetchData()
  }, [])

  return (
     <div className="min-h-screen bg-background">
      <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex">
        {/* SIDEBAR DESKTOP */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* SIDEBAR MOBILE (DRAWER) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />

            {/* menu */}
            <div className="relative w-64 h-full bg-card border-r border-border">
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* CONTEÚDO */}
        <main className="flex-1 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-mono font-bold mb-2">Dashboard</h1>
      <p className="text-sm md:text-base text-muted-foreground">Visão geral do seu blog</p>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-4 md:p-6">
          <FileText className="w-5 h-5 text-muted-foreground" />
          <div className="text-2xl md:text-3xl font-mono font-bold">{users.length}</div>
          <div className="text-xs md:text-sm text-muted-foreground">Total de Usuários</div>
        </Card>

        <Card className="p-4 md:p-6">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <div className="text-2xl md:text-3xl font-mono font-bold">{requisitions}</div>
          <div className="text-xs md:text-sm text-muted-foreground">Requisições Hoje</div>
        </Card>
      </div>

      {/* Lista de usuários */}
      <Card className="p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-mono font-bold mb-6 flex items-center gap-2">
          Usuários
          <span className="text-xs md:text-sm font-normal text-muted-foreground">
            ({users.length})
          </span>
        </h2>
            {users.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center mt-6">
                Nenhum usuário encontrado
              </p>
            ) : (
              <div className="flex flex-col">
                {users.map((user, index) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    index={index}
                    onEdit={(userId) => {
                      const u = users.find(u => u.id === userId)
                      if (u) setEditingUser(u)
                    }}
                    onDelete={(userId) => {
                      setUsers(users.filter(u => u.id !== userId))
                    }}
                    onRoleChange={(userId, newRole) => {
                      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
                    }}
                  />
                ))}

                {editingUser && (
                  <EditUserForm
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onUpdated={(updatedUser) => {
                      setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
                    }}
                  />
                )}
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  )
}
