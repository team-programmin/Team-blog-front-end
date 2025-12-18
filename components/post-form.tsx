"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save, Eye } from "lucide-react"

interface PostFormProps {
  post?: {
    title: string
    category: string
    excerpt: string
    content: string
    status: string
  }
}

export function PostForm({ post }: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "")
  const [category, setCategory] = useState(post?.category || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent, status: string) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulação de salvamento - em produção, conecte com sua API
    setTimeout(() => {
      toast({
        title: status === "published" ? "Post publicado!" : "Rascunho salvo!",
        description: "Seu post foi salvo com sucesso.",
      })
      setIsLoading(false)
      router.push("/admin/posts")
    }, 1000)
  }

  return (
    <form className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Post</Label>
          <Input
            id="title"
            placeholder="Digite o título do seu post..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              placeholder="Ex: Tecnologia, Design..."
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Resumo</Label>
          <Textarea
            id="excerpt"
            placeholder="Breve descrição do post..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            placeholder="Escreva o conteúdo completo do seu post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            required
          />
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={(e) => handleSubmit(e, "published")} disabled={isLoading} className="gap-2">
          <Eye className="w-4 h-4" />
          {isLoading ? "Publicando..." : "Publicar"}
        </Button>
        <Button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          variant="outline"
          disabled={isLoading}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Salvar Rascunho
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/posts")}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
