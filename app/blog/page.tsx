"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`http://localhost:8080/api/blog?page=${page}&size=10`)
      if (res.ok) {
        setPosts(await res.json())
      }
    }
    fetchPosts()
  }, [page])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-xl font-mono font-semibold">TeamBlog</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/blog">
              <Button variant="ghost">Blog</Button>
            </Link>
            <ThemeToggle />
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Artigos, tutoriais e insights sobre tecnologia e design.
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-border overflow-hidden hover:border-foreground/20 transition-colors"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-6">
                <div className="aspect-video md:aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary">{post.category || "Blog"}</Badge>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={post.author?.avatarUrl || "/placeholder.svg"}
                              alt={post.author?.displayName}
                            />
                            <AvatarFallback>
                              {post.author?.displayName
                                ?.split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {post.author?.displayName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date || "Data não informada"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime || "Tempo estimado"}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-mono font-bold mb-3 hover:underline">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>

                    <p className="text-muted-foreground mb-4">
                      {post.excerpt || post.content?.substring(0, 120) + "..."}
                    </p>
                  </div>

                  <div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="outline" className="gap-2 bg-transparent">
                        Ler mais
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
          >
            Página anterior
          </Button>
          <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
            Próxima página
          </Button>
        </div>
      </main>
    </div>
  )
}
