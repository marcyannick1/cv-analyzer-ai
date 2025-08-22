// app/about/page.jsx
"use client"
import { Header } from "../../components/header"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Award, 
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
  Globe,
  CheckCircle,
  Star,
  Building2,
  UserCheck
} from "lucide-react"
import '../globals.css'

export default function AboutPage() {
  const stats = [
    { number: "10,000+", label: "Offres d'emploi", icon: <Building2 className="w-6 h-6" /> },
    { number: "5,000+", label: "Candidats actifs", icon: <UserCheck className="w-6 h-6" /> },
    { number: "98%", label: "Taux de satisfaction", icon: <Star className="w-6 h-6" /> },
    { number: "250+", label: "Entreprises partenaires", icon: <Award className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8 text-gray-700" />,
      title: "Excellence",
      description: "Nous nous engageons à fournir la meilleure expérience de recherche d'emploi en France."
    },
    {
      icon: <Heart className="w-8 h-8 text-gray-700" />,
      title: "Bienveillance",
      description: "Chaque candidat mérite d'être accompagné avec respect et professionnalisme."
    },
    {
      icon: <Zap className="w-8 h-8 text-gray-700" />,
      title: "Innovation",
      description: "Nous utilisons les dernières technologies pour simplifier votre recherche d'emploi."
    },
    {
      icon: <Users className="w-8 h-8 text-gray-700" />,
      title: "Communauté",
      description: "Nous créons des liens durables entre talents et entreprises innovantes."
    }
  ]

  const team = [
    {
      name: "Marie Dubois",
      role: "CEO & Fondatrice",
      description: "Experte en recrutement avec plus de 15 ans d'expérience.",
      avatar: "👩‍💼"
    },
    {
      name: "Thomas Martin",
      role: "CTO",
      description: "Développeur passionné spécialisé dans l'IA et les plateformes web.",
      avatar: "👨‍💻"
    },
    {
      name: "Sophie Laurent",
      role: "Directrice des Partenariats",
      description: "Responsable des relations avec nos entreprises partenaires.",
      avatar: "👩‍🎯"
    },
    {
      name: "Lucas Bernard",
      role: "Head of Product",
      description: "Designer UX/UI focalisé sur l'expérience utilisateur optimale.",
      avatar: "👨‍🎨"
    }
  ]

  const milestones = [
    {
      year: "2020",
      title: "Création de JobConnect",
      description: "Lancement de la plateforme avec 100 premières offres d'emploi."
    },
    {
      year: "2021",
      title: "Expansion nationale",
      description: "Déploiement sur tout le territoire français avec 1000+ offres."
    },
    {
      year: "2022",
      title: "Partenariats stratégiques",
      description: "Signature de partenariats avec les plus grandes entreprises françaises."
    },
    {
      year: "2023",
      title: "Intelligence Artificielle",
      description: "Intégration de l'IA pour un matching précis candidats/entreprises."
    },
    {
      year: "2024",
      title: "Leader du marché",
      description: "10,000+ offres actives et reconnaissance comme plateforme #1 en France."
    }
  ]

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gray-200/20 rounded-full -top-48 -right-48 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gray-300/30 rounded-full top-1/2 -left-32 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-32 h-32 bg-gray-100/50 rounded-full bottom-1/4 right-1/4 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Header />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-3xl flex items-center justify-center shadow-xl transform rotate-3">
                <span className="text-white font-bold text-3xl">JC</span>
              </div>
              <div className="absolute -inset-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl blur opacity-25 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-black text-gray-900 mb-6">
            À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">JobConnect</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nous sommes la plateforme française de référence qui connecte les talents 
            aux opportunités professionnelles. Notre mission : transformer la recherche 
            d'emploi en une expérience simple, moderne et efficace.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center animate-slide-up border-gray-200 hover:shadow-lg transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-gray-700">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="animate-slide-up border-gray-200" style={{animationDelay: '0.2s'}}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="max-w-4xl mx-auto">
                <div className="text-6xl mb-6">🎯</div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Chez JobConnect, nous croyons que chaque talent mérite de trouver sa place. 
                  Notre plateforme révolutionne la rencontre entre candidats et recruteurs 
                  grâce à une technologie de pointe et une approche humaine.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div className="text-center">
                    <div className="text-2xl mb-3">🚀</div>
                    <h3 className="font-bold text-gray-900 mb-2">Rapidité</h3>
                    <p className="text-gray-600 text-sm">Trouvez votre emploi en quelques clics</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-3">🎯</div>
                    <h3 className="font-bold text-gray-900 mb-2">Précision</h3>
                    <p className="text-gray-600 text-sm">Matching intelligent selon vos critères</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-3">💼</div>
                    <h3 className="font-bold text-gray-900 mb-2">Qualité</h3>
                    <p className="text-gray-600 text-sm">Offres vérifiées et entreprises de confiance</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 text-lg">Les principes qui guident chacune de nos actions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center animate-slide-up border-gray-200 hover:shadow-lg transition-all duration-300 group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
            <p className="text-gray-600 text-lg">Les étapes clés de notre développement</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-300"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex items-center mb-8 animate-slide-up ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} style={{animationDelay: `${index * 0.1}s`}}>
                <div className="w-1/2 px-8">
                  <Card className="border-gray-200 hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-gray-900 text-white font-bold px-3 py-1">
                          {milestone.year}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full border-4 border-white shadow-lg"></div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-gray-600 text-lg">Les talents qui font JobConnect</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center animate-slide-up border-gray-200 hover:shadow-lg transition-all duration-300 group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="pt-8">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                    {member.avatar}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3 text-gray-700 border-gray-300">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <Card className="animate-slide-up border-gray-200" style={{animationDelay: '0.3s'}}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Nous Contacter</CardTitle>
              <p className="text-gray-600">Une question ? Une suggestion ? N'hésitez pas à nous écrire !</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-gray-700 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Email</h4>
                  <p className="text-gray-600 text-sm">contact@jobconnect.fr</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-gray-700 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Téléphone</h4>
                  <p className="text-gray-600 text-sm">01 23 45 67 89</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-gray-700 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Adresse</h4>
                  <p className="text-gray-600 text-sm">Paris, France</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Globe className="w-8 h-8 text-gray-700 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Réseaux</h4>
                  <div className="flex gap-2">
                    <Linkedin className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    <Twitter className="w-5 h-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Custom CSS Animations */}
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
      `}</style>
    </div>
  )
}