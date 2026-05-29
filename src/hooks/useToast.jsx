import { useState, useCallback } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  const show = useCallback((message, duration = 2400) => {
    setToast(message)
    setTimeout(() => setToast(null), duration)
  }, [])

  const ToastEl = toast ? (
    <div className="toast">{toast}</div>
  ) : null

  return { show, ToastEl }
}
