import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { PostForm } from "@/components/post-form"

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-mono font-bold mb-2">Novo Post</h1>
              <p className="text-muted-foreground">Crie um novo artigo para o seu blog</p>
            </div>

            <PostForm />
          </div>
        </main>
      </div>
    </div>
  )
}
