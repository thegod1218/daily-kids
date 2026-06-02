import { useState, useCallback } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)

  const show = useCallback((message, duration = 2400) => {
    setToast(message)
    setTimeout(() => setToast(null), duration)
  }, [])

  const ToastEl = toast ? (
    <div style={{
      position: 'fixed',
      bottom: 90,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#2C2926',
      color: 'white',
      padding: '12px 20px',
      borderRadius: 24,
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      zIndex: 999,
      pointerEvents: 'none',
      maxWidth: '90%'
    }}>
      {toast}
    </div>
  ) : null

  return { show, ToastEl }
}
