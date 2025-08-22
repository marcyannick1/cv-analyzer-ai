// services/api.ts

export async function apiFetch(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token") // récupère ton token
  
    const headers = {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // ajoute le token si dispo
    }
  
    const res = await fetch(`http://localhost:8000${url}`, {
      ...options,
      headers,
    })
  
    if (!res.ok) {
      throw new Error(`Erreur API: ${res.status}`)
    }
  
    return res.json()
  }
  