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

export async function submitContactForm(prevState: any, formData: FormData) {
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

  // Simula um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Aqui você integraria com um serviço de e-mail (ex: Resend, Nodemailer, etc.)
  // Exemplo com Resend (descomente e configure sua chave API no .env.local):
  /*
  try {
    const { data, error } = await resend.emails.send({
      from: 'Seu Portfólio <onboarding@resend.dev>', // Substitua pelo seu domínio verificado no Resend
      to: ['seuemail@example.com'], // Seu e-mail para receber as mensagens
      subject: `Nova mensagem de contato de ${name}`,
      html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`,
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      return { success: false, message: "Falha ao enviar a mensagem. Tente novamente mais tarde." };
    }
  } catch (error) {
    console.error("Erro inesperado ao enviar e-mail:", error);
    return { success: false, message: "Ocorreu um erro inesperado. Tente novamente mais tarde." };
  }
  */

  console.log("Dados do formulário recebidos:", { name, email, message })

  return {
    success: true,
    message: "Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.",
  }
}
