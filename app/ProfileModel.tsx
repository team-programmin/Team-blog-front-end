import { ProfileCard } from "./profile/ProfileCard"

interface ProfileModalProps {
  open: boolean
  onClose: () => void
}

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A modal component that displays a profile card when open is true.
 *

/*******  becae478-3c6e-4f9c-81b5-5486b74148da  *******/
export function ProfileModal({ open, onClose }: ProfileModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl bg-background p-6 shadow-2xl border border-border animate-in fade-in zoom-in">
        
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full 
                     bg-muted text-muted-foreground transition 
                     hover:bg-primary hover:text-primary-foreground"
        >
          ✕
        </button>

        <ProfileCard />
      </div>
    </div>
  )
}
