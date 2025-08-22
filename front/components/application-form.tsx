// components/application-form.jsx
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Upload, FileText, CheckCircle, User, Mail, Phone, FileUp } from "lucide-react"

interface ApplicationFormProps {
  jobId: string
  jobTitle: string
}

export function ApplicationForm({ jobId, jobTitle }: ApplicationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
  })
  const [files, setFiles] = useState({
    cv: null as File | null,
    coverLetterFile: null as File | null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: "cv" | "coverLetterFile") => {
    const file = e.target.files?.[0] || null
    setFiles((prev) => ({ ...prev, [fileType]: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <Card className="border-gray-200 bg-white shadow-lg animate-fade-in">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="absolute -inset-2 bg-green-200/20 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">Candidature envoyée !</h3>
              <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                Votre candidature pour le poste de <span className="font-semibold text-gray-900">{jobTitle}</span> a été envoyée avec succès.
              </p>
              <p className="text-sm text-gray-500">
                Nous vous contacterons bientôt si votre profil correspond à nos attentes.
              </p>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => setIsSubmitted(false)}
                variant="outline" 
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Postuler à une autre offre
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-200 bg-white shadow-lg animate-slide-up">
      <CardHeader className="bg-gray-50/50 border-b border-gray-200">
        <CardTitle className="text-xl text-gray-900 flex items-center">
          <User className="w-5 h-5 mr-2" />
          Postuler à cette offre
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Remplissez le formulaire ci-dessous pour postuler au poste de <span className="font-semibold">{jobTitle}</span>
        </p>
      </CardHeader>
      
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations personnelles */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gray-800 rounded-full mr-3"></div>
              Informations personnelles
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium group-focus-within:text-gray-900">
                  Prénom *
                </Label>
                <div className="relative">
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange}
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-gray-500 focus:ring-gray-500 pl-4"
                    placeholder="Votre prénom"
                    required 
                  />
                </div>
              </div>
              
              <div className="group space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium group-focus-within:text-gray-900">
                  Nom *
                </Label>
                <Input 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-gray-500 focus:ring-gray-500"
                  placeholder="Votre nom"
                  required 
                />
              </div>
            </div>

            <div className="group space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium group-focus-within:text-gray-900">
                Email *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-gray-500 focus:ring-gray-500 pl-10"
                  placeholder="votre@email.com"
                  required 
                />
              </div>
            </div>

            <div className="group space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-medium group-focus-within:text-gray-900">
                Téléphone *
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  value={formData.phone} 
                  onChange={handleInputChange}
                  className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-gray-500 focus:ring-gray-500 pl-10"
                  placeholder="06 12 34 56 78"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gray-800 rounded-full mr-3"></div>
              Documents
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="cv" className="text-gray-700 font-medium">CV *</Label>
              <div className="relative">
                <Input
                  id="cv"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "cv")}
                  className="hidden"
                  required
                />
                <Label
                  htmlFor="cv"
                  className="flex items-center justify-center w-full h-12 px-4 py-3 text-sm border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 cursor-pointer rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-2">
                    {files.cv ? (
                      <>
                        <FileUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">{files.cv.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                        <span className="text-gray-600 group-hover:text-gray-900">Choisir votre CV</span>
                      </>
                    )}
                  </div>
                </Label>
              </div>
              <p className="text-xs text-gray-500">Formats acceptés: PDF, DOC, DOCX (max 5MB)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetterFile" className="text-gray-700 font-medium">
                Lettre de motivation (fichier)
              </Label>
              <div className="relative">
                <Input
                  id="coverLetterFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileChange(e, "coverLetterFile")}
                  className="hidden"
                />
                <Label
                  htmlFor="coverLetterFile"
                  className="flex items-center justify-center w-full h-12 px-4 py-3 text-sm border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 cursor-pointer rounded-lg transition-all group"
                >
                  <div className="flex items-center gap-2">
                    {files.coverLetterFile ? (
                      <>
                        <FileUp className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-gray-900">{files.coverLetterFile.name}</span>
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                        <span className="text-gray-600 group-hover:text-gray-900">Choisir un fichier (optionnel)</span>
                      </>
                    )}
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Message de motivation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-1 h-6 bg-gray-800 rounded-full mr-3"></div>
              Message de motivation
            </h4>
            
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-gray-700 font-medium">
                Lettre de motivation (texte)
              </Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Expliquez en quelques mots pourquoi vous êtes le candidat idéal pour ce poste..."
                rows={6}
                className="bg-gray-50 border-gray-300 text-gray-900 focus:bg-white focus:border-gray-500 focus:ring-gray-500 resize-none"
              />
              <p className="text-xs text-gray-500">Ce message sera ajouté à votre candidature</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Button 
              type="submit" 
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 text-lg rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <FileUp className="w-5 h-5 mr-2" />
                  Envoyer ma candidature
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}