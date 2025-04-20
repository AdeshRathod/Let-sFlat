"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: "owner" | "tenant" | "agent" | "admin"
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string, role: string) => Promise<void>
  signOut: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be an API call to verify the session
        // const response = await fetch('/api/auth/session');
        // const data = await response.json();

        // For demo purposes, check localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/auth/signin', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();

      // Mock successful login for demo
      const mockUser: User = {
        id: "user_123",
        name: "Demo User",
        email: email,
        image: null,
        role: "tenant",
      }

      // Store user in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string, role: string) => {
    setLoading(true)
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password, role }),
      // });
      // const data = await response.json();

      // Mock successful registration for demo
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        image: null,
        role: role as "owner" | "tenant" | "agent" | "admin",
      }

      // Store user in localStorage for demo purposes
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      router.push("/dashboard")
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    // In a real app, this would be an API call
    // fetch('/api/auth/signout', { method: 'POST' });

    // For demo purposes, just clear localStorage
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, signIn, signUp, signOut, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
