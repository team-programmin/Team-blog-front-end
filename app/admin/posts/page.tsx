import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"

// Dados de exemplo
const posts = [
  {
    id: 1,
    title: "Introdução ao Next.js 15",
    status: "Publicado",
    category: "Tecnologia",
    views: 345,
    date: "15 Jan 2025",
  },
  {
    id: 2,
    title: "Design Minimalista: Menos é Mais",
    status: "Publicado",
    category: "Design",
    views: 289,
    date: "12 Jan 2025",
  },
  {
    id: 3,
    title: "O Futuro do Desenvolvimento Web",
    status: "Rascunho",
    category: "Tecnologia",
    views: 0,
    date: "10 Jan 2025",
  },
]

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-mono font-bold mb-2">Posts</h1>
              <p className="text-muted-foreground">Gerencie todos os seus artigos</p>
            </div>
            <Link href="/admin/posts/new">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Novo Post
              </Button>
            </Link>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 border-b border-border pb-4 last:border-0">
                  <div className="flex-1">
                    <h3 className="font-mono font-semibold mb-2">{post.title}</h3>
                    <div className="flex items-center gap-3">
                      <Badge variant={post.status === "Publicado" ? "default" : "secondary"}>{post.status}</Badge>
                      <span className="text-sm text-muted-foreground">{post.category}</span>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </span>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/posts/${post.id}/edit`}>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-destructive hover:text-destructive bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
