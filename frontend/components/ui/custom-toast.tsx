"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react"
import { cva } from "class-variance-authority"

interface CustomToastProps {
  title: string
  description?: string
  variant?: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

const toastVariants = cva(
  "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center p-6 rounded-lg shadow-lg text-center max-w-sm w-full animate-in fade-in duration-300",
  {
    variants: {
      variant: {
        success: "bg-white border-2 border-green-500",
        error: "bg-white border-2 border-red-500",
        warning: "bg-white border-2 border-yellow-500",
        info: "bg-white border-2 border-blue-500",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  },
)

const iconVariants = cva("mb-3", {
  variants: {
    variant: {
      success: "text-green-500",
      error: "text-red-500",
      warning: "text-yellow-500",
      info: "text-blue-500",
    },
  },
  defaultVariants: {
    variant: "success",
  },
})

export function CustomToast({ title, description, variant = "success", duration = 3000, onClose }: CustomToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (variant) {
      case "success":
        return <CheckCircle2 className={`${iconVariants({ variant })} h-12 w-12`} />
      case "error":
        return <XCircle className={`${iconVariants({ variant })} h-12 w-12`} />
      case "warning":
      case "info":
        return <AlertCircle className={`${iconVariants({ variant })} h-12 w-12`} />
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsVisible(false)} />
      <div className={toastVariants({ variant })}>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
        {getIcon()}
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </>
  )
}

export function useCustomToast() {
  const [toast, setToast] = useState<CustomToastProps | null>(null)

  const showToast = (props: CustomToastProps) => {
    setToast(props)
  }

  const closeToast = () => {
    setToast(null)
  }

  const ToastComponent = toast ? <CustomToast {...toast} onClose={closeToast} /> : null

  return {
    showToast,
    closeToast,
    ToastComponent,
  }
}
