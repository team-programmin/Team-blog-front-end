"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Shield, 
  User, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Mail,
  UserCog,
  Ban
} from "lucide-react";
import { cn } from "@/lib/utils";

type UserRole = "ADMIN" | "USER";

type User = {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  avatar?: string;
};

interface UserCardProps {
  user: User;
  index: number;
  onRoleChange?: (userId: string, newRole: UserRole) => void;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

const rowAccentColors = [
  "bg-row-accent-1",
  "bg-row-accent-2", 
  "bg-row-accent-3",
  "bg-row-accent-4",
  "bg-row-accent-5",
  "bg-row-accent-6",
];

export function UserCard({
  user,
  index,
  onRoleChange,
  onEdit,
  onDelete,
}: UserCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const accentColor = rowAccentColors[index % rowAccentColors.length]

  const handleRoleChange = (newRole: UserRole) => {
    onRoleChange?.(user.id, newRole)
  }

  return (
    <div
      className={cn(
        "relative bg-card transition-all",
        "hover:bg-accent/50 animate-fade-in",
        "px-4 py-3 md:py-4"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Accent bar (desktop) */}
      <div
        className={cn(
          "hidden md:block absolute left-0 top-0 bottom-0 w-1 rounded-r-full",
          accentColor
        )}
      />

      {/* CONTAINER */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Index (desktop only) */}
          <span className="hidden md:block text-sm text-muted-foreground w-5 text-center">
            {index + 1}
          </span>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center ring-2 ring-border shrink-0">
            {user.avatar ? (
              <img src={user.avatar} className="w-full h-full rounded-full" />
            ) : (
              <span className="font-semibold">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0">
            <p className="font-semibold truncate">{user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          {/* Role */}
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium",
              user.role === "ADMIN"
                ? "bg-user-admin-bg text-user-admin"
                : "bg-user-member-bg text-user-member"
            )}
          >
            {user.role === "ADMIN" ? (
              <Shield className="w-3.5 h-3.5" />
            ) : (
              <User className="w-3.5 h-3.5" />
            )}
            <span>{user.role === "ADMIN" ? "Admin" : "Usuário"}</span>
          </div>

          {/* Menu */}
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "p-2 rounded-lg",
                  "hover:bg-secondary focus:bg-secondary",
                  isOpen && "bg-secondary"
                )}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-popover border shadow-lg"
            >
              <DropdownMenuItem onClick={() => onEdit?.(user.id)}>
                <Edit className="w-4 h-4 mr-2" />
                Editar usuário
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="w-4 h-4 mr-2" />
                Enviar email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  handleRoleChange(
                    user.role === "ADMIN" ? "USER" : "ADMIN"
                  )
                }
              >
                <UserCog className="w-4 h-4 mr-2" />
                {user.role === "ADMIN"
                  ? "Remover admin"
                  : "Tornar admin"}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-user-warning">
                <Ban className="w-4 h-4 mr-2" />
                Suspender
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(user.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir usuário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

