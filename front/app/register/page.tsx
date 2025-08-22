// RegisterPage.jsx
"use client"
import { useState } from "react"
import { registerUser } from "../../services/auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import '../globals.css' // Import global styles;

export default function RegisterPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation du mot de passe
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      setIsLoading(false)
      return
    }

    try {
      await registerUser({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
      
      // Success animation before redirect
      setTimeout(() => {
        router.push("/login")
      }, 1000)
      
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white font-inter relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100"></div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gray-200/30 rounded-full -top-48 -right-48 animate-float"></div>
        <div className="absolute w-64 h-64 bg-gray-300/40 rounded-full bottom-1/3 -left-32 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-32 h-32 bg-gray-100/50 rounded-full top-1/4 left-1/4 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-2xl blur opacity-25 animate-pulse"></div>
              </div>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">
              Rejoins-nous !
            </h2>
            <p className="text-gray-600 text-lg">
              Crée ton compte pour accéder aux meilleures opportunités
            </p>
          </div>

          {/* Form */}
          <div className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-200 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl animate-shake">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* Nom et prénom */}
              <div className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-gray-900 transition-colors">
                    Prénom
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-white transition-all duration-200"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-gray-900 transition-colors">
                    Nom
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-white transition-all duration-200"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-gray-900 transition-colors">
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="ton@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-white transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-gray-900 transition-colors">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-white transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Confirmer mot de passe */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-gray-900 transition-colors">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500 group-focus-within:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:bg-white transition-all duration-200"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded bg-white"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  J'accepte les{" "}
                  <a href="#" className="text-gray-900 hover:text-gray-700 font-semibold">
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="#" className="text-gray-900 hover:text-gray-700 font-semibold">
                    politique de confidentialité
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Création en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    Créer mon compte
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-gray-600">
                  Déjà un compte ?{" "}
                  <Link href="/login" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                    Se connecter
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center text-gray-500 text-sm animate-fade-in">
            <p>© 2024 JobPortal. Tous droits réservés.</p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  )
}