import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Search, MapPin } from "lucide-react"

export function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-6 bg-card rounded-lg border border-border shadow-sm">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Titre du poste, compétences..." className="pl-10" />
          </div>
        </div>

        <div className="flex-1">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Ville, région..." className="pl-10" />
          </div>
        </div>

        <Button className="md:w-auto w-full">Rechercher</Button>
      </div>
    </div>
  )
}
