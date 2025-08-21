import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { MapPin, Clock, Euro } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  tags: string[]
  postedDate: string
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2">{job.title}</h3>
          <Badge variant="secondary">{job.type}</Badge>
        </div>
        <p className="text-primary font-medium">{job.company}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {job.location}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Euro className="h-4 w-4" />
            {job.salary}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {new Date(job.postedDate).toLocaleDateString("fr-FR")}
        </div>

        <Link href={`/jobs/${job.id}`}>
          <Button size="sm">Voir l'offre</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
