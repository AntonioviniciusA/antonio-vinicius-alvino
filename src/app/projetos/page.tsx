"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { ProjectData } from "@/types/project"
import { useState, useEffect, useRef } from "react"
import { getProjects } from "@/app/services/projects-services"

export default function ProjectsPage() {
  const [projeto, setProjeto] = useState<ProjectData[]>([])
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects()
        setProjeto(response)
        console.log("Projetos carregados:", response)
      } catch (error) {
        console.error("Erro ao carregar projetos:", error)
      }
    }
    fetchProjects()
  }, [])

  const handleImageError = (index: number) => {
    console.log("Erro na imagem do índice:", index)
    setImageErrors(prev => new Set(prev).add(index))
  }

  const getImageSrc = (projeto: ProjectData, index: number) => {
    console.log("Verificando imagem para o índice:", index)
    console.log("Imagem atual:", projeto.image)
    console.log("projectData:", projeto)

  
  // A API já trata todos os casos (Buffer, string base64, URL)
  return projeto.image
}

  return (
    <section className="py-20 bg-white text-black px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
          <Briefcase className="w-8 h-8" />
          Lista de Projetos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projeto.map((projeto, index) => (
            <ProjectCard 
              key={index} 
              projeto={projeto} 
              index={index} 
              onImageError={handleImageError}
              getImageSrc={getImageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface ProjectCardProps {
  projeto: ProjectData
  index: number
  onImageError: (index: number) => void
  getImageSrc: (projeto: ProjectData, index: number) => string
}

function ProjectCard({ projeto, index, onImageError, getImageSrc }: ProjectCardProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageSrc = getImageSrc(projeto, index)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return

    const container = imageContainerRef.current
    const containerRect = container.getBoundingClientRect()
    const mouseY = e.clientY - containerRect.top
    const containerHeight = containerRect.height
    
    // Calcula a porcentagem da posição do mouse (0 a 1)
    const mousePercent = Math.min(Math.max(mouseY / containerHeight, 0), 1)
    
    // Se a imagem for muito longa, aplica o efeito parallax
    if (container.scrollHeight > containerHeight) {
      const scrollAmount = (container.scrollHeight - containerHeight) * mousePercent
      container.scrollTo({ top: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleMouseLeave = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Card 
      className="bg-black text-white border-purple-500 overflow-hidden group hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container da imagem */}
      <div 
        ref={imageContainerRef}
        className="w-full h-48 overflow-hidden relative"
      >
        <Image
          src={imageSrc}
          fill
          alt={`Screenshot do projeto ${projeto.title}`}
          className="object-cover"
          onError={() => onImageError(index)}
          unoptimized={imageSrc.startsWith('data:')}
        />
        
        {/* Overlay para melhorar a legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardHeader>
        <CardTitle className="text-purple-500 text-lg">{projeto.title}</CardTitle>
        <CardDescription className="text-white/80 text-sm">
          {projeto.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex gap-2">
        <Button
          asChild
          variant="outline"
          className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white bg-transparent text-sm"
          size="sm"
        >
          <Link href={projeto.link} target="_blank" rel="noopener noreferrer">
            Ver Projeto
          </Link>
        </Button>
        <Button
          asChild
          className="bg-purple-500 hover:bg-purple-600 text-white text-sm"
          size="sm"
        >
          <Link href={`/projeto/${projeto.slug}`}>
            Detalhes
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}