import axios from "axios"
import { ProjectData } from  "@/types/project"

export async function createProject(data: ProjectData): Promise<ProjectData> {
  try {
    const response = await axios.post<ProjectData>("/api/projects", data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as { error?: string })?.error || "Erro desconhecido"
      )
    }
    throw new Error("Erro de conexão com servidor")
  }
}

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const response = await axios.get<ProjectData[]>("/api/projects")
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as { error?: string })?.error || "Erro desconhecido"
      )
    }
    throw new Error("Erro de conexão com servidor")
  }
}

export async function deleteProject(id: number): Promise<{ success: boolean }> {
  try {
    const response = await axios.delete<{ success: boolean }>(`/api/projects/${id}`)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as { error?: string })?.error || "Erro desconhecido"
      )
    }
    throw new Error("Erro de conexão com servidor")
  }
}

export async function updateProject(id: number, data: ProjectData): Promise<ProjectData> {
  try {
    const response = await axios.put<ProjectData>(`/api/projects/${id}`, data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        (error.response?.data as { error?: string })?.error || "Erro desconhecido"
      )
    }
    throw new Error("Erro de conexão com servidor")
  }
}
