"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Save, Eye } from "lucide-react"
import  {createProject}  from "@/app/services/projects-services"
interface ProjectData {
  title: string
  description: string
  image: string
  link: string
  slug: string
  directoryJson: string
}

export default function AddProjectForm() {
  const [formData, setFormData] = useState<ProjectData>({
    title: "",
    description: "",
    image: "",
    link: "",
    slug: "",
    directoryJson: "",
  })

  const [previewMode, setPreviewMode] = useState(false)

  const handleInputChange = (field: keyof ProjectData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleSubmit  = async (e: React.FormEvent, ) => {
    try {
      const response = await createProject(formData)

      if (!response) {
        throw new Error("Erro ao salvar o projeto")
      }

      alert("Projeto salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar o projeto:", error)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Preview do Projeto</h2>
          <Button onClick={() => setPreviewMode(false)} variant="outline">
            Voltar para Edição
          </Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {formData.image && (
                  <img
                    src={formData.image || "/placeholder.svg?height=200&width=300"}
                    alt={formData.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-2">{formData.title || "Título do Projeto"}</h3>
                <p className="text-muted-foreground mb-4">{formData.description || "Descrição do projeto..."}</p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Link:</strong> {formData.link || "#"}
                  </p>
                  <p>
                    <strong>Slug:</strong> {formData.slug || "projeto-slug"}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">JSON do Diretório:</h4>
                <pre className="bg-muted p-4 rounded-lg text-xs overflow-auto max-h-96">
                  {formData.directoryJson || '{\n  "estrutura": "vazia"\n}'}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coluna Esquerda - Dados Básicos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Informações Básicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título do Projeto *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ex: Projeto Incrível"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Uma breve descrição do projeto, destacando as tecnologias usadas e o objetivo..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="link">Link do Projeto</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => handleInputChange("link", e.target.value)}
                placeholder="https://meu-projeto.com"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug (gerado automaticamente)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="projeto-slug"
              />
            </div>
          </CardContent>
        </Card>

        {/* Coluna Direita - Imagem e JSON */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Recursos do Projeto
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image">Imagem do Projeto</Label>
              <div className="space-y-2">
                <Input
                  id="image-url"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="/placeholder.svg?height=200&width=300"
                />
                <div className="text-center text-sm text-muted-foreground">ou</div>
                <Input
                  id="image-file"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded border"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="directoryJson">JSON do Diretório *</Label>
              <Textarea
                id="directoryJson"
                value={formData.directoryJson}
                onChange={(e) => handleInputChange("directoryJson", e.target.value)}
                placeholder='{"src": {"components": ["Header.tsx", "Footer.tsx"], "pages": ["index.tsx", "about.tsx"]}, "public": {"images": ["logo.png"]}}'
                rows={8}
                className="font-mono text-sm"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cole aqui a estrutura JSON completa do diretório do seu projeto
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-4 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => setPreviewMode(true)}
          className="flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Visualizar Preview
        </Button>
        <Button type="submit" className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Salvar Projeto
        </Button>
      </div>
    </form>
  )
}
