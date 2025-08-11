"use client" // Este componente precisa ser um Client Component para usar useActionState

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input" // Importar Input
import { Textarea } from "@/components/ui/textarea" // Importar Textarea
import { Label } from "@/components/ui/label" // Importar Label
import { Mail, Github, Linkedin, Code, Briefcase, User } from "lucide-react"
import { useActionState } from "react" // Importar useActionState
import { submitContactForm } from "./actions" // Importar o Server Action

export default function Home() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null)

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center bg-black text-center px-4">
          <div className="z-10 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Olá, eu sou <span className="text-purple-500">Seu Nome</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              Desenvolvedor Full-stack apaixonado por criar experiências digitais incríveis.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-lg rounded-full">
                <Link href="#projects">Ver Projetos</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="#contact">Fale Comigo</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white hover:bg-purple-500 px-8 py-6 text-lg rounded-full bg-transparent"
              >
                <Link href="https://github.com/seurepositorio/seus-arquivos" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  Ver Arquivos
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white text-black px-4 md:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-purple-500 flex items-center gap-2">
                <User className="w-8 h-8" />
                Sobre Mim
              </h2>
              <p className="text-lg leading-relaxed">
                Sou um desenvolvedor com X anos de experiência, especializado em construir aplicações web robustas e
                escaláveis. Minha paixão reside em transformar ideias complexas em soluções elegantes e funcionais.
              </p>
              <p className="text-lg leading-relaxed">
                Ao longo da minha carreira, trabalhei com diversas tecnologias, sempre buscando aprender e me adaptar às
                novas tendências do mercado. Acredito que um bom código é aquele que é limpo, eficiente e fácil de
                manter.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Profile Picture"
                className="rounded-full object-cover border-4 border-purple-500 shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-purple-500 text-white px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 flex items-center justify-center gap-2">
              <Code className="w-8 h-8" />
              Minhas Habilidades
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
      width={64}
      height={64}
      alt="React logo"
    />
    <span className="text-lg font-semibold">React</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
      width={64}
      height={64}
      alt="Next.js logo"
    />
    <span className="text-lg font-semibold">Next.js</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
      width={64}
      height={64}
      alt="Node.js logo"
    />
    <span className="text-lg font-semibold">Node.js</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
      width={64}
      height={64}
      alt="Tailwind CSS logo"
    />
    <span className="text-lg font-semibold">Tailwind CSS</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      width={64}
      height={64}
      alt="TypeScript logo"
    />
    <span className="text-lg font-semibold">TypeScript</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
      width={64}
      height={64}
      alt="PostgreSQL logo"
    />
    <span className="text-lg font-semibold">PostgreSQL</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
      width={64}
      height={64}
      alt="Docker logo"
    />
    <span className="text-lg font-semibold">Docker</span>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <Image
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg"
      width={64}
      height={64}
      alt="Git logo"
    />
    <span className="text-lg font-semibold">Git</span>
  </div>
</div>

          </div>
        </section>

        {/* Projects Section */}
       

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-black text-white px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold flex items-center justify-center gap-2">
              <Mail className="w-8 h-8" />
              Entre em Contato
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Tenho interesse em novas oportunidades e projetos. Sinta-se à vontade para me enviar uma mensagem!
            </p>

            <Card className="bg-white text-black p-6 rounded-lg shadow-lg border-purple-500">
              <CardContent className="p-0">
                <form action={formAction} className="space-y-6 text-left">
                  <div>
                    <Label htmlFor="name" className="text-lg font-semibold text-purple-700">
                      Nome
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500 text-black"
                    />
                    {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-lg font-semibold text-purple-700">
                      E-mail
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seuemail@example.com"
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500 text-black"
                    />
                    {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-lg font-semibold text-purple-700">
                      Mensagem
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Sua mensagem..."
                      rows={5}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:ring-purple-500 focus:border-purple-500 text-black"
                    />
                    {state?.errors?.message && <p className="text-red-500 text-sm mt-1">{state.errors.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg rounded-md transition-colors"
                  >
                    {isPending ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                  {state?.message && (
                    <p className={`mt-4 text-center text-lg ${state.success ? "text-green-600" : "text-red-600"}`}>
                      {state.message}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-6 mt-8">
              <Link
                href="mailto:seuemail@example.com"
                className="text-purple-500 hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <Mail className="w-8 h-8" />
                <span className="text-xl">seuemail@example.com</span>
              </Link>
              <Link
                href="https://github.com/seugithub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <Github className="w-8 h-8" />
                <span className="text-xl">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/seulinkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:text-purple-400 transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-8 h-8" />
                <span className="text-xl">LinkedIn</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-purple-500 text-white text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Seu Nome. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}
