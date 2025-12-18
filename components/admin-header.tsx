"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

type Props = {
  onMenuClick?: () => void
}

export function AdminHeader({ onMenuClick }: Props) {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* BOTÃO HAMBÚRGUER (somente mobile) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Link href="/admin" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-lg md:text-xl font-mono font-semibold">
              TeamBlog Admin
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          <Link href="/blog" target="_blank">
            <Button variant="outline" size="sm">
              Ver Blog
            </Button>
          </Link>

          <Button variant="ghost" size="sm" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  )
}
