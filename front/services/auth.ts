// services/auth.ts
export async function registerUser(userData: { username: string; email: string; password: string }) {
    const res = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
  
    if (!res.ok) {
      throw new Error("Erreur lors de l'inscription")
    }
  
    return res.json()
  }
  
  export async function loginUser(credentials: { email: string; password: string }) {
    const res = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
  
    if (!res.ok) {
      throw new Error("Identifiants incorrects")
    }
  
    const data = await res.json()
    // sauvegarde du token
    localStorage.setItem("token", data.access)
    return data
  }
  
  export function logoutUser() {
    localStorage.removeItem("token")
  }
  
  export function getToken() {
    return localStorage.getItem("token")
  }
  