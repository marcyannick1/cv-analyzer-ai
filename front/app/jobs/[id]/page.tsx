// app/jobs/[id]/page.jsx
"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "../../../components/header"
import { ApplicationForm } from "../../../components/application-form"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"
import { 
  MapPin, 
  Clock, 
  Euro, 
  Briefcase, 
  Users, 
  ExternalLink,
  ArrowLeft,
  Calendar,
  Building2,
  Globe
} from "lucide-react"
import Link from "next/link"
import { apiFetch } from "../../../services/api"
import '../../globals.css'

interface JobDetail {
  id: number
  title: string
  company: string
  location: string
  contractType: string
  publishDate: string
  description: string
  experience: string
  url: string
  salary: {
    min: number
    max: number
    unit: string
  }
  skills: string[]
  companyInfo: {
    url: string
    size: string
    description: string
  }
  created_at: string
}

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState<JobDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const data: JobDetail = await apiFetch(`/api/jobs/${params.id}/`)
        setJob(data)
      } catch (error) {
        console.error('Erreur lors du chargement de l\'offre:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchJobDetail()
    }
  }, [params.id])

  const formatSalary = (salary: JobDetail["salary"]) => {
    if (!salary) return "Non spécifié"
    const min = salary.min.toLocaleString("fr-FR")
    const max = salary.max.toLocaleString("fr-FR")
    const unit = salary.unit === "YEAR" ? "€/an" : salary.unit
    return `${min} - ${max} ${unit}`
  }

  const getContractTypeColor = (contractType: string) => {
    switch (contractType.toUpperCase()) {
      case 'CDI':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'CDD':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'FREELANCE':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'STAGE':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loader mb-4"></div>
            <p className="text-gray-600 text-lg">Chargement de l'offre...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Offre non trouvée</h2>
            <p className="text-gray-600 mb-8">Cette offre d'emploi n'existe pas ou n'est plus disponible.</p>
            <Link href="/">
              <Button className="bg-gray-900 hover:bg-gray-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux offres
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gray-200/20 rounded-full -top-48 -right-48 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gray-300/30 rounded-full top-1/2 -left-32 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Navigation */}
        <div className="mb-6 animate-fade-in">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux offres
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête de l'offre */}
            <Card className="animate-slide-up border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                      {job.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="w-5 h-5 text-gray-600" />
                      <span className="text-xl font-semibold text-gray-800">{job.company}</span>
                    </div>
                  </div>
                  <Badge className={`${getContractTypeColor(job.contractType)} font-semibold border text-lg px-3 py-1`}>
                    {job.contractType}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Euro className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{new Date(job.publishDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Description */}
            <Card className="animate-slide-up border-gray-200" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Description du poste</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {job.description}
                </p>
              </CardContent>
            </Card>

            {/* Compétences */}
            <Card className="animate-slide-up border-gray-200" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Compétences requises</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {job.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="text-sm bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors px-3 py-2"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Informations entreprise */}
            <Card className="animate-slide-up border-gray-200" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">À propos de l'entreprise</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{job.companyInfo.size}</span>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  {job.companyInfo.description}
                </p>
                
                {job.companyInfo.url && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <a 
                      href={job.companyInfo.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-gray-700 font-medium underline"
                    >
                      Site web de l'entreprise
                      <ExternalLink className="w-4 h-4 inline ml-1" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="animate-slide-up border-gray-200 sticky top-24" style={{animationDelay: '0.1s'}}>
              <CardContent className="pt-6 space-y-4">
                <Button 
                  onClick={() => setShowApplicationForm(!showApplicationForm)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 text-lg"
                >
                  {showApplicationForm ? 'Masquer le formulaire' : 'Postuler maintenant'}
                </Button>
                
                <Separator className="bg-gray-200" />
                
                <a 
                  href={job.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Voir sur France Travail
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Formulaire de candidature */}
            {showApplicationForm && (
              <div className="animate-fade-in">
                <ApplicationForm jobId={job.id.toString()} jobTitle={job.title} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Styles CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        
        .loader {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: inline-block;
          border-top: 4px solid #374151;
          border-right: 3px solid transparent;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
        
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}