"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { ProjectData } from "@/types/project"

export default function ProjetosSection() {
  const [projetos, setProjetos] = React.useState<ProjectData[]>([])
  const [imageErrors, setImageErrors] = React.useState<Set<number>>(new Set())

  React.useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await fetch("/api/projects")
        const data = await response.json()
        setProjetos(data)
        console.log("Projetos carregados:", data)
      } catch (error) {
        console.error("Erro ao carregar projetos:", error)
      }
    }

    fetchProjetos()
  }, [])

  const handleImageError = (index: number) => {
    console.log("Erro na imagem do índice:", index)
    setImageErrors(prev => new Set(prev).add(index))
  }

  const getImageSrc = (project: ProjectData, index: number) => {
    if (imageErrors.has(index) || !project.image) {
      return ""
    }

    if (project.image.startsWith('http') || 
        project.image.startsWith('/') ||
        project.image.startsWith('data:image')) {
      return project.image
    }

    return `data:image/jpeg;base64,${project.image}`
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const container = e.currentTarget
    const image = container.querySelector('img')
    if (!image) return

    const containerRect = container.getBoundingClientRect()
    const mouseY = e.clientY - containerRect.top
    const containerHeight = containerRect.height
    
    const mousePercent = Math.min(Math.max(mouseY / containerHeight, 0), 1)
    
    // Efeito parallax suave
    if (image.naturalHeight > containerHeight) {
      const scrollY = (image.naturalHeight - containerHeight) * mousePercent
      image.style.transform = `translateY(-${scrollY}px)`
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget.querySelector('img')
    if (image) {
      image.style.transform = 'translateY(0)'
      image.style.transition = 'transform 0.5s ease'
    }
  }

  return (
    <section id="projetos" className="py-20 bg-white text-black px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
          <Briefcase className="w-8 h-8" />
          Meus Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((project, index) => {
            const imageSrc = getImageSrc(project, index)
            
            return (
              <Card key={index} className="bg-black text-white border-purple-500 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                {/* Container da imagem com efeito parallax */}
                <div 
                  className="w-full h-48 overflow-hidden relative"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={imageSrc}
                    fill
                    alt={`${project.title} screenshot`}
                    className="object-cover transition-transform duration-300 ease-out"
                    onError={() => handleImageError(index)}
            
                    priority={index < 3}
                  />
                  
                  {/* Overlay para melhor contraste */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-purple-500">{project.title}</CardTitle>
                  <CardDescription className="text-white/80">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex gap-2">
                  <Button
                    asChild
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white bg-transparent"
                    size="sm"
                  >
                    <Link href={project.link} target="_blank" rel="noopener noreferrer">
                      Ver Projeto
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="bg-purple-500 hover:bg-purple-600 text-white"
                    size="sm"
                  >
                    <Link href={`/projetos/${project.slug}`}>
                      Ver Detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}