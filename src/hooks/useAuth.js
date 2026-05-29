import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuthStore } from '../store'

export function useAuth() {
  const { user, session, loading, setUser, setSession, setLoading, clear } = useAuthStore()

  useEffect(() => {
    // 현재 세션 가져오기
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 인증 상태 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signUpWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback'
      }
    })
    if (error) throw error
    return data
  }

  const sendOtp = async (email) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/auth/callback'
      }
    })
    if (error) throw error
  }

  const verifyOtp = async (email, token) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    clear()
  }

  return {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    signInWithEmail,
    signUpWithEmail,
    sendOtp,
    verifyOtp,
    signOut
  }
}
