"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
type User = {
  id: string
  displayName: string
  email: string
  role: "ADMIN" | "USER"
  avatarUrl?: string
  bio?: string
  location?: string
  website?: string
}

type EditUserFormProps = {
  user: User
  onClose: () => void
  onUpdated: (updatedUser: User) => void
}

export function EditUserForm({ user, onClose, onUpdated }: EditUserFormProps) {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    email: user.email,
    avatarUrl: user.avatarUrl ?? "",
    bio: user.bio ?? "",
    location: user.location ?? "",
    website: user.website ?? "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`http://localhost:8080/api/admin/update/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      const updatedUser = await res.json()
      onUpdated(updatedUser)
      onClose()
    } else {
      alert("Erro ao atualizar usuário")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="displayName" value={formData.displayName} onChange={handleChange} placeholder="Nome" />
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <Input name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Avatar URL" />
          <Input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Localização" />
          <Input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
