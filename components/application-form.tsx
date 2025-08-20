"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, FileText, CheckCircle } from "lucide-react"

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
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-primary mx-auto" />
            <h3 className="text-lg font-semibold">Candidature envoyée !</h3>
            <p className="text-sm text-muted-foreground">
              Votre candidature pour le poste de {jobTitle} a été envoyée avec succès. Nous vous contacterons bientôt.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Postuler à cette offre</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv">CV *</Label>
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
                className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md"
              >
                <Upload className="h-4 w-4 mr-2" />
                {files.cv ? files.cv.name : "Choisir un fichier"}
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">Formats acceptés: PDF, DOC, DOCX (max 5MB)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetterFile">Lettre de motivation (fichier)</Label>
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
                className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                {files.coverLetterFile ? files.coverLetterFile.name : "Choisir un fichier (optionnel)"}
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverLetter">Lettre de motivation (texte)</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer ma candidature"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
