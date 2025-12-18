import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <BookOpen className="w-6 h-6" />
              <span className="text-xl font-mono font-semibold">TeamBlog</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-mono font-bold mb-2">Bem-vindo de volta</h1>
            <p className="text-muted-foreground">Entre para continuar gerenciando seu blog</p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem uma conta?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-foreground">
              Criar conta
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
