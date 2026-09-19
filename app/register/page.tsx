'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError(data.error || 'Failed to register')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark" aria-hidden="true"><span>स</span></div>
          <div><p className="brand-name">Sujhav <strong>AI</strong></p><p className="brand-subtitle">Smart Procurement Intelligence</p></div>
        </div>
      </header>

      <section className="welcome-row" style={{ display: 'flex', justifyContent: 'center', marginTop: '10vh' }}>
        <article className="panel" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="panel-heading">
            <div>
              <p className="section-kicker">CREATE ACCOUNT</p>
              <h2>Register</h2>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {error && <div style={{ color: 'red', fontSize: '0.875rem' }}>{error}</div>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="username" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Username</label>
              <input 
                id="username"
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="password" style={{ fontWeight: 600, fontSize: '0.875rem' }}>Password (min 6 chars)</label>
              <input 
                id="password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="query-button"
              style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', marginTop: '1rem' }}>
              Already have an account? <a href="/login" style={{ color: '#0066cc', textDecoration: 'underline' }}>Sign In</a>
            </p>
          </form>
        </article>
      </section>
    </main>
  )
}
