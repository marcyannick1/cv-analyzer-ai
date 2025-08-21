import { Button } from "../components/ui/button"
import { Briefcase, User } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">JobConnect</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Emplois
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Entreprises
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              À propos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Button>
            <Button size="sm">S'inscrire</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
