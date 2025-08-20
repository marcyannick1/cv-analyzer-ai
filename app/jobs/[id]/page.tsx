import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApplicationForm } from "@/components/application-form"
import { Header } from "@/components/header"
import { MapPin, Clock, Euro, Building, Users } from "lucide-react"
import { notFound } from "next/navigation"

// Mock data - in a real app, this would come from a database
const jobs = {
  "1": {
    id: "1",
    title: "Développeur Full Stack",
    company: "TechCorp",
    location: "Paris, France",
    type: "CDI",
    salary: "45k - 60k €",
    description:
      "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant les dernières technologies web.",
    requirements: [
      "3+ années d'expérience en développement web",
      "Maîtrise de React et Node.js",
      "Connaissance de TypeScript",
      "Expérience avec les bases de données SQL/NoSQL",
      "Bonnes compétences en communication",
    ],
    responsibilities: [
      "Développer et maintenir des applications web",
      "Collaborer avec l'équipe design et produit",
      "Participer aux revues de code",
      "Optimiser les performances des applications",
      "Mentorer les développeurs juniors",
    ],
    benefits: [
      "Télétravail hybride (2-3 jours/semaine)",
      "Formation continue et certifications",
      "Mutuelle premium",
      "Tickets restaurant",
      "Équipement de travail fourni",
    ],
    tags: ["React", "Node.js", "TypeScript"],
    postedDate: "2024-01-15",
    companySize: "50-200 employés",
    industry: "Technologie",
  },
}

interface JobDetailPageProps {
  params: { id: string }
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const job = jobs[params.id as keyof typeof jobs]

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                    <p className="text-xl text-primary font-semibold">{job.company}</p>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {job.type}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Publié le {new Date(job.postedDate).toLocaleDateString("fr-FR")}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description du poste</h2>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Responsabilités</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Exigences</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Avantages</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Compétences requises</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">À propos de l'entreprise</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Secteur:</span>
                  <span>{job.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Taille:</span>
                  <span>{job.companySize}</span>
                </div>
              </CardContent>
            </Card>

            {/* Application Form */}
            <ApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>
      </main>
    </div>
  )
}
