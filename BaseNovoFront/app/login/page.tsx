"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="relative">
            <svg width="64" height="64" viewBox="0 0 80 80" className="mx-auto sm:w-20 sm:h-20">
              <defs>
                <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="30%" stopColor="#8B5CF6" />
                  <stop offset="70%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Abstract curved shapes */}
              <path
                d="M20 25 Q40 10 60 25 Q50 40 40 35 Q30 40 20 25 Z"
                fill="url(#loginLogoGradient)"
                filter="url(#logoGlow)"
                opacity="0.9"
              />

              <path
                d="M25 45 Q45 30 65 45 Q55 60 45 55 Q35 60 25 45 Z"
                fill="url(#loginLogoGradient)"
                filter="url(#logoGlow)"
                opacity="0.7"
              />

              {/* Central circle */}
              <circle cx="40" cy="40" r="8" fill="#8B5CF6" opacity="0.8" />

              {/* Decorative dots */}
              <circle cx="25" cy="65" r="4" fill="#10B981" />
              <circle cx="55" cy="15" r="3" fill="#A855F7" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Usuario Field */}
          <div className="space-y-2">
            <Label htmlFor="usuario" className="text-white text-sm font-medium">
              Usuario
            </Label>
            <Input
              id="usuario"
              type="text"
              required
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 h-10 sm:h-12"
              placeholder=""
            />
          </div>

          {/* Senha Field */}
          <div className="space-y-2">
            <Label htmlFor="senha" className="text-white text-sm font-medium">
              Senha
            </Label>
            <Input
              id="senha"
              type="password"
              required
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400 h-10 sm:h-12"
              placeholder=""
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
            <Label htmlFor="remember" className="text-gray-300 text-sm font-medium cursor-pointer">
              Lembrar de mim
            </Label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold h-10 sm:h-12 text-sm sm:text-base rounded-lg disabled:opacity-50"
          >
            {isLoading ? "Entrando..." : "Login"}
          </Button>

          {/* Back to Home Link */}
          <div className="text-center pt-4">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
              Voltar para o início
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
