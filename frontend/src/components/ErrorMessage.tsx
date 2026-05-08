import { AlertCircle, X } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onDismiss: () => void
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-destructive">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="text-destructive/60 hover:text-destructive transition-colors"
        aria-label="Dismiss error"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}
