import React, { createContext, useEffect, useState } from 'react'
import authService, { LoginPayload, User } from '../services/authService'

type AuthContextType = {
  user: User | null
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('sms_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    // keep user in sync if needed
  }, [])

  const login = async (payload: LoginPayload) => {
    const res = await authService.login(payload)
    localStorage.setItem('sms_token', res.token)
    localStorage.setItem('sms_user', JSON.stringify(res.user))
    setUser(res.user)
  }

  const logout = () => {
    localStorage.removeItem('sms_token')
    localStorage.removeItem('sms_user')
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
