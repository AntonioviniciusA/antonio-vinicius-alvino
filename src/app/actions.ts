"use server"

import { z } from "zod" // Importar zod para validação

// Esquema de validação com Zod
const contactFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres."),
})

// Se você quiser usar Resend para enviar e-mails reais, descomente e configure:
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  prevState: { success: boolean; message: string; errors?: { name?: string[]; email?: string[]; message?: string[] } } | null,
  formData: FormData
) {
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  const validation = contactFormSchema.safeParse({ name, email, message })

  if (!validation.success) {
    return {
      success: false,
      message: "Erro de validação. Verifique seus dados.",
      errors: validation.error.flatten().fieldErrors,
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 1500))

  console.log("Dados do formulário recebidos:", { name, email, message })

  return {
    success: true,
    message: "Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.",
  }
}
