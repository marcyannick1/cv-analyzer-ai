import { JobCard } from "@/components/job-card"
import { SearchBar } from "@/components/search-bar"
import { Header } from "@/components/header"

// Mock data for job listings
const jobs = [
  {
    id: "1",
    title: "Développeur Full Stack",
    company: "TechCorp",
    location: "Paris, France",
    type: "CDI",
    salary: "45k - 60k €",
    description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe dynamique.",
    tags: ["React", "Node.js", "TypeScript"],
    postedDate: "2024-01-15",
  },
  {
    id: "2",
    title: "Designer UX/UI",
    company: "CreativeStudio",
    location: "Lyon, France",
    type: "CDI",
    salary: "40k - 50k €",
    description: "Créez des expériences utilisateur exceptionnelles pour nos clients prestigieux.",
    tags: ["Figma", "Adobe XD", "Prototyping"],
    postedDate: "2024-01-14",
  },
  {
    id: "3",
    title: "Chef de Projet Digital",
    company: "DigitalAgency",
    location: "Marseille, France",
    type: "CDI",
    salary: "50k - 65k €",
    description: "Pilotez des projets digitaux innovants de A à Z avec une équipe multidisciplinaire.",
    tags: ["Gestion de projet", "Agile", "Digital"],
    postedDate: "2024-01-13",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "DataTech",
    location: "Toulouse, France",
    type: "CDI",
    salary: "55k - 70k €",
    description: "Analysez et exploitez les données pour créer de la valeur business.",
    tags: ["Python", "Machine Learning", "SQL"],
    postedDate: "2024-01-12",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Trouvez votre emploi idéal</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Découvrez des milliers d'opportunités qui correspondent à vos compétences
          </p>
          <SearchBar />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Offres récentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
