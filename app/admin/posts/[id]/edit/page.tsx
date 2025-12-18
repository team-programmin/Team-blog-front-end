import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { PostForm } from "@/components/post-form"

// Dados de exemplo
const getPost = (id: string) => {
  const posts: Record<string, any> = {
    "1": {
      id: 1,
      title: "Introdução ao Next.js 15",
      category: "Tecnologia",
      excerpt: "Descubra as novidades e recursos incríveis da versão mais recente do Next.js.",
      content: "Conteúdo completo do post aqui...",
      status: "published",
    },
  }
  return posts[id] || null
}

export default function EditPostPage({ params }: { params: { id: string } }) {
  const post = getPost(params.id)

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-mono font-bold mb-2">Editar Post</h1>
              <p className="text-muted-foreground">Faça alterações no seu artigo</p>
            </div>

            <PostForm post={post} />
          </div>
        </main>
      </div>
    </div>
  )
}
