"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UserAvatarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-400 hover:bg-green-500 p-0 flex items-center justify-center transition-colors"
        title="Menu do usuário"
      >
        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-400 flex items-center justify-center">
          {/* User icon when closed, hamburger when open */}
          {isOpen ? (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-black sm:w-4 sm:h-4">
              <path fillRule="evenodd" d="M2 3h12v1H2V3zm0 4h12v1H2V7zm0 4h12v1H2v-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" className="text-black sm:w-4 sm:h-4">
              <path fillRule="evenodd" d="M8 7a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-10 sm:top-12 w-44 sm:w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 animate-in fade-in-0 zoom-in-95">
          <div className="py-2">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-white font-medium truncate">Usuário Logado</p>
              <p className="text-xs text-gray-400 truncate">usuario@exemplo.com</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Meu Perfil
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Configurações
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Notificações
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              Ajuda & Suporte
            </button>
            <div className="border-t border-gray-700 mt-2 pt-2">
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sair da Conta
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
