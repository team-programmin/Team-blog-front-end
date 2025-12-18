"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface RoleSelectProps {
  userId: number
  currentRole: "ADMIN" | "USER"
  onChange: (userId: number, role: "ADMIN" | "USER") => void
}

export function RoleSelect({ userId, currentRole, onChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false)

  const roles: ("ADMIN" | "USER")[] = ["USER", "ADMIN"]

  return (
    <div className="relative">
      {/* Botão */}
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1 text-xs font-mono border rounded-md bg-background hover:bg-muted transition flex items-center gap-2"
      >
        {currentRole}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover shadow-md z-50">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => {
                onChange(userId, role)
                setOpen(false)
              }}
              className="w-full px-3 py-2 text-sm flex items-center justify-between hover:bg-muted transition"
            >
              <span>{role}</span>
              {currentRole === role && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
