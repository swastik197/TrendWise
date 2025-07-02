// /oauth-success/page.jsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OAuthSuccess() {
  const router = useRouter()

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    if (token) {
      localStorage.setItem('authToken', token)
      router.push('/')
    } else {
      router.push('/login')
    }
  }, [])

  return <p>Logging you in...</p>
}
