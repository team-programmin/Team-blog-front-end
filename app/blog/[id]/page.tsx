"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: postId } = use(params)
  type AuthorDTO = {
  id: number
  displayName: string
  avatarUrl?: string | null
}

type ComentarioDTO = {
  id: number
  texto: string
  autor: AuthorDTO
  dataCriacao: string
  modificado?: boolean
  respostas: ComentarioDTO[]
}

type PostDTO = {
  id: number
  title: string
  content: string
  author: AuthorDTO
  createdAt?: string | null
  comments: ComentarioDTO[]
}

  

  /* ===== STATES ===== */
  const [post, setPost] = useState<PostDTO | null>(null)
  const [comments, setComments] = useState<ComentarioDTO[]>([])
  const [posts, setPosts] = useState<PostDTO[]>([])

  const [newComment, setNewComment] = useState("")
  const [page, setPage] = useState(0)
 

  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null

  const headers = token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {}

  /* ===== ADD COMMENT ===== */
  async function addComment() {
    if (!newComment || !postId) return

    const res = await fetch(
      `http://localhost:8080/api/blog/${postId}/comment`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({ texto: newComment }),
      }
    )

    if (!res.ok) {
      console.error("Erro ao criar comentário")
      return
    }

    setNewComment("")
    const updated = await fetch(
      `http://localhost:8080/api/blog/comment/${postId}/all`
    )
    setComments(await updated.json())
  }

  /* ===== REPLY COMMENT ===== */
  async function replyComment(commentId: number) {
    if (!replyText.trim()) return
    if (!token) {
      console.error("Token não encontrado")
      return
    }

    const res = await fetch(
      `http://localhost:8080/api/blog/comment/${commentId}/reply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ texto: replyText }),
      }
    )

    if (!res.ok) {
      console.error("Erro ao responder comentário", res.status)
      return
    }

    setReplyText("")
    setReplyTo(null)

    const updated = await fetch(
      `http://localhost:8080/api/blog/comment/${postId}/all`
    )
    setComments(await updated.json())
  }

  /* ===== COMPONENTE RECURSIVO ===== */
  function CommentItem({ comment }: { comment: any }) {
    return (
      <div className="ml-4 mt-2 border-l pl-2">
        <div className="flex items-center gap-2">
          {comment.autor?.avatarUrl && (
            <img
              src={comment.autor.avatarUrl}
              alt={comment.autor.displayName}
              className="w-8 h-8 rounded-full"
            />
          )}
          <p className="font-semibold">{comment.autor?.displayName}</p>
        </div>
        <p>{comment.texto}</p>

        <div className="flex gap-2 mt-1">
          <Button size="sm" variant="outline" onClick={() => setReplyTo(comment.id)}>
            Responder
          </Button>
        </div>

        {replyTo === comment.id && (
          <div className="mt-2 space-y-2">
            <Textarea
              placeholder="Escreva sua resposta..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={() => replyComment(comment.id)}>Enviar resposta</Button>
              <Button size="sm" variant="ghost" onClick={() => setReplyTo(null)}>Cancelar</Button>
            </div>
          </div>
        )}

        {comment.respostas?.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {comment.respostas.map((r: any) => (
              <CommentItem key={r.id} comment={r} />
            ))}
          </div>
        )}
      </div>
    )
  }

  /* ===== FETCH DATA ===== */
  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`http://localhost:8080/api/blog/${postId}`)
      if (res.ok) setPost(await res.json())
    }
    fetchPost()
  }, [postId])

  useEffect(() => {
    async function fetchComments() {
      const res = await fetch(
        `http://localhost:8080/api/blog/comment/${postId}/all`
      )
      if (res.ok) setComments(await res.json())
    }
    fetchComments()
  }, [postId])

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        `http://localhost:8080/api/blog?page=${page}&size=10`
      )
      if (res.ok) setPosts(await res.json())
    }
    fetchPosts()
  }, [page])

  if (!post) return <div className="p-8">Post não encontrado</div>

  return (
  <div className="mx-auto max-w-6xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
    {/* CONTEÚDO PRINCIPAL */}
    <main>
      <Link href="/blog">
        <Button variant="ghost" className="mb-6">
          ← Voltar ao Blog
        </Button>
      </Link>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <h1>{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
          <span>{post.author?.displayName ?? "Autor"}</span>
          <span>•</span>
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        <div className="leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </article>

      {/* COMENTÁRIOS */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-4">Comentários</h2>

        <div className="space-y-6">
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} />
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Textarea
            placeholder="Escreva um comentário..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={addComment}>Enviar comentário</Button>
        </div>
      </section>
    </main>

    {/* SIDEBAR */}
    <aside className="sticky top-24 space-y-4 h-fit">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Mais posts
      </h3>

      {posts.map((p) => (
        <Link
          key={p.id}
          href={`/blog/${p.id}`}
          className="block rounded-lg p-3 hover:bg-muted transition"
        >
          <p className="font-medium text-sm leading-snug">
            {p.title}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {p.content}
          </p>
        </Link>
      ))}

      <div className="flex justify-between pt-4">
        <Button
          size="sm"
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
        >
          Anterior
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setPage((p) => p + 1)}
        >
          Próxima
        </Button>
      </div>
    </aside>
  </div>
)

}
