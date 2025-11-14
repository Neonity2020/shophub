import { useState } from "react"
import { toast as sonnerToast } from "sonner"

interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface Toast {
  (props: ToastProps): void
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast: Toast = ({ title, description, variant = "default", duration = 4000 }) => {
    if (title) {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          duration,
        })
      } else {
        sonnerToast.success(title, {
          description,
          duration,
        })
      }
    } else if (description) {
      sonnerToast(description, {
        duration,
      })
    }
  }

  return {
    toast,
    toasts,
  }
}
