import { RegisterForm } from "@/components/register-form"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <BookOpen className="w-6 h-6" />
              <span className="text-xl font-mono font-semibold">ModernBlog</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-mono font-bold mb-2">Criar conta</h1>
            <p className="text-muted-foreground">Comece a compartilhar suas ideias hoje</p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem uma conta?{" "}
            <Link href="/login" className="underline underline-offset-4 hover:text-foreground">
              Fazer login
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
