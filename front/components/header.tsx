// Header.jsx
"use client"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Briefcase, User, Menu, X, Search, Bell } from "lucide-react"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

export function Header() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  
  // Simulé - à remplacer par votre logique d'auth
  const user = null // { firstname: "John", lastname: "Doe" }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo et titre */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl blur opacity-25"></div>
              </div>
              <Link href="/" className="group">
                <h1 className="text-2xl font-black text-gray-900 group-hover:text-gray-700 transition-colors">
                  Job<span className="text-gray-600">Connect</span>
                </h1>
              </Link>
            </div>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  Emplois
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  Entreprises
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  Dashboard
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-gray-900 transition-colors font-medium">
                  À propos
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Actions utilisateur */}
            <div className="flex items-center gap-3">
              {/* Barre de recherche sur desktop */}
              <div className="hidden md:flex relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:bg-white transition-all"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {user ? (
                /* User connecté */
                <div className="relative">
                  <button
                    onClick={toggleUserDropdown}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.firstname.charAt(0).toUpperCase()}
                      {user.lastname.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user.firstname}
                    </span>
                  </button>

                  {/* Dropdown utilisateur */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="h-4 w-4" />
                        Mon profil
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* User non connecté */
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400">
                      <User className="h-4 w-4 mr-2" />
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white">
                      S'inscrire
                    </Button>
                  </Link>
                </div>
              )}

              {/* Menu mobile toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {showMobileMenu && (
            <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
              <div className="container mx-auto px-4 py-4 space-y-4">
                {/* Recherche mobile */}
                <div className="md:hidden relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:border-gray-400 focus:bg-white transition-all"
                  />
                </div>

                {/* Navigation mobile */}
                <nav className="space-y-2">
                  <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium">
                    Emplois
                  </Link>
                  <Link href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium">
                    Entreprises
                  </Link>
                  <Link href="#" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium">
                    Dashboard
                  </Link>
                  <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium">
                    À propos
                  </Link>
                </nav>

                {/* Actions mobile pour utilisateur non connecté */}
                {!user && (
                  <div className="md:hidden space-y-2 pt-4 border-t border-gray-200">
                    <Link href="/login" className="block">
                      <Button variant="outline" className="w-full justify-center border-gray-300 text-gray-700 hover:bg-gray-100">
                        <User className="h-4 w-4 mr-2" />
                        Connexion
                      </Button>
                    </Link>
                    <Link href="/register" className="block">
                      <Button className="w-full justify-center bg-gray-900 hover:bg-gray-800 text-white">
                        S'inscrire
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer pour compenser la navbar fixe */}
      <div className="h-20"></div>

      {/* Overlay pour fermer les dropdowns */}
      {(showUserDropdown || showMobileMenu) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowUserDropdown(false)
            setShowMobileMenu(false)
          }}
        />
      )}
    </>
  )
}