import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, LinkIcon, Calendar } from "lucide-react"

export  function ProfileCard() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border shadow-sm bg-background p-6">
      {/* Header */}
      <ProfileHeader />

      {/* Bio */}
      <ProfileBio />

      {/* Info Pills */}
      <ProfileInfo />

      {/* Stats */}
      <div className="grid grid-cols-3 border-t border-border pt-6">
        <StatItem value="248" label="Posts" />
        <StatItem value="12.4k" label="Followers" />
        <StatItem value="892" label="Following" />
      </div>
    </div>
  )
}

function ProfileHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-6">
      <Avatar className="h-28 w-28 mb-4 border-2 border-border shadow-md">
        <AvatarImage src="/minimal-professional-portrait.png" alt="Foto de perfil" />
        <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">ML</AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold text-foreground tracking-tight">Marina Lima</h1>
      <p className="text-muted-foreground text-sm">@marinalima</p>
    </div>
  )
}

function ProfileBio() {
  return (
    <p className="text-center text-foreground/80 leading-relaxed mb-6 text-balance">
      Designer & Developer. Criando experiências digitais minimalistas. Apaixonada por tipografia e espaços em branco.
    </p>
  )
}

function ProfileInfo() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5" aria-label="Localização">
        <MapPin className="h-3.5 w-3.5" />
        São Paulo, BR
      </span>
      <a
        href="https://marinalima.design"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        aria-label="Website"
      >
        <LinkIcon className="h-3.5 w-3.5" />
        marinalima.design
      </a>
      <span className="flex items-center gap-1.5" aria-label="Data de entrada">
        <Calendar className="h-3.5 w-3.5" />
        Joined 2021
      </span>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-semibold text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{label}</span>
    </div>
  )
}
