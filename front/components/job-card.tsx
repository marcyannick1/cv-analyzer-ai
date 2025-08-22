// JobCard.jsx
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { MapPin, Clock, Euro, Briefcase } from "lucide-react"
import Link from "next/link"

interface Job {
  id: number
  title: string
  company: string
  location: string
  contractType: string
  publishDate: string
  description: string
  skills?: string[] // ✅ facultatif pour sécuriser le map
  salary?: {
    min: number
    max: number
    unit: string
  }
}

interface JobCardProps {
  job: Job
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (salary: Job["salary"]) => {
    if (!salary) return "N/A"
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

  return (
    <Card className="group bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 to-gray-100/0 group-hover:from-gray-50/30 group-hover:to-gray-100/20 transition-all duration-300"></div>
      
      <CardHeader className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {job.title}
          </h3>
          <Badge className={`${getContractTypeColor(job.contractType)} font-semibold border`}>
            {job.contractType}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-gray-600" />
          <p className="text-gray-800 font-semibold text-lg">{job.company}</p>
        </div>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{job.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Euro className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{formatSalary(job.salary)}</span>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {(job.skills || []).slice(0, 4).map((skill) => (
              <Badge 
                key={skill} 
                variant="outline" 
                className="text-xs bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
              >
                {skill}
              </Badge>
            ))}
            {(job.skills || []).length > 4 && (
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-500 border-gray-300">
                +{(job.skills || []).length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center bg-gray-50/50 relative z-10">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>{new Date(job.publishDate).toLocaleDateString("fr-FR")}</span>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button 
            size="sm" 
            className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Voir les détails
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}