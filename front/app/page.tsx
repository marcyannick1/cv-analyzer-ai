// HomePage.jsx
"use client"
import { useEffect, useState } from "react"
import { JobCard } from "../components/job-card"
import { SearchBar } from "../components/search-bar"
import { Header } from "../components/header"
import { apiFetch } from "../services/api"
import './globals.css' // Import global styles;

interface Job {
  id: number
  title: string
  company: string
  location: string
  contractType: string
  publishDate: string
  description: string
  skills: string[]
  salary: {
    min: number
    max: number
    unit: string
  }
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data: Job[] = await apiFetch("/api/jobs/")
        setJobs(data ?? []) // fallback au cas où data serait undefined
      } catch (error) {
        console.error(error)
        setJobs([]) // fallback pour éviter undefined
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      
      {/* Floating shapes pour l'animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gray-200/20 rounded-full -top-48 -right-48 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gray-300/30 rounded-full top-1/2 -left-32 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-32 h-32 bg-gray-100/40 rounded-full bottom-20 right-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Trouvez votre emploi idéal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez des milliers d'opportunités qui correspondent à vos compétences et construisez votre avenir professionnel
          </p>
          <div className="animate-slide-up">
            <SearchBar />
          </div>
        </div>

        <div className="mb-8 animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-gray-800 to-gray-600 rounded-full mr-4"></div>
              Offres récentes
            </h2>
            <div className="hidden sm:flex items-center text-sm text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-pulse"></div>
              Mise à jour en temps réel
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="loader mb-4"></div>
              <p className="text-center text-gray-600 text-lg">Chargement des meilleures offres...</p>
            </div>
          ) : jobs?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <div key={job.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM16 10h.01M8 10h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune offre disponible</h3>
              <p className="text-gray-600">Revenez plus tard pour découvrir de nouvelles opportunités</p>
            </div>
          )}
        </div>
      </main>

      {/* Custom CSS for animations */}
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
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        
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