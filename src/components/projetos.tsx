import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function ProjetosSection() {
  const Projetos = [
    {
      title: "Projeto 1",
      description: "Uma breve descrição do Projeto 1, destacando as tecnologias usadas e o objetivo.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
      slug: "projeto-1",
    },
    {
      title: "Projeto 2",
      description: "Uma breve descrição do Projeto 2, destacando as tecnologias usadas e o objetivo.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
      slug: "projeto-2",
    },
    {
      title: "Projeto 3",
      description: "Uma breve descrição do Projeto 3, destacando as tecnologias usadas e o objetivo.",
      image: "/placeholder.svg?height=200&width=300",
      link: "#",
      slug: "projeto-3",
    },
  ]

  return (
    <section id="Projetos" className="py-20 bg-white text-black px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
          <Briefcase className="w-8 h-8" />
          Meus Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Projetos.map((project, index) => (
            <Card key={index} className="bg-black text-white border-purple-500">
              <Image
                src={project.image}
                width={300}
                height={200}
                alt={`${project.title} screenshot`}
                className="w-full h-48 object-cover rounded-t-lg"
              />
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
                >
                  <Link href={project.link} target="_blank">
                    Ver Projeto
                  </Link>
                </Button>

                <Button
                  asChild
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Link href={`/projetos/${project.slug}`}>
                    Ver Detalhes
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
