'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type IconProps = { size?: number; strokeWidth?: number }

function UploadIcon({ size = 28, strokeWidth = 1.8 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" /></svg>
}
function FileIcon({ size = 22 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h5" /></svg>
}
function SparkIcon({ size = 19 }: IconProps) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.2 4.8a4 4 0 0 1-2.8 2.8L3 12l5 1.4a4 4 0 0 1 2.8 2.8L12 21l1.2-4.8a4 4 0 0 1 2.8-2.8L21 12l-5-1.4a4 4 0 0 1-2.8-2.8L12 3Z" /></svg>
}
function ArrowIcon() { return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg> }
function SunIcon() { return <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></svg> }
function MoonIcon() { return <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.2 15.1A8.5 8.5 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" /></svg> }
function UserIcon() { return <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></svg> }
function LogoutIcon() { return <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg> }
function SettingsIcon() { return <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" /></svg> }
function MenuIcon() { return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg> }
function CloseIcon() { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg> }
function ChatIcon() { return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> }
function PlusIcon() { return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg> }
function TrashIcon() { return <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg> }
function DownloadIcon() { return <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg> }

export default function Page() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  
  const [user, setUser] = useState<{ username: string, role: string } | null>(null)
  const [chatHistory, setChatHistory] = useState<any[]>([])
  
  const [fileName, setFileName] = useState('')
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [fileSizeStr, setFileSizeStr] = useState('')
  
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progressLabel, setProgressLabel] = useState('')
  const [progressPercent, setProgressPercent] = useState('0%')
  
  const [standards, setStandards] = useState<any[]>([])
  const [query, setQuery] = useState('')
  const [chatResponse, setChatResponse] = useState('')
  const [chatError, setChatError] = useState('')
  const [querying, setQuerying] = useState(false)
  
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // Fetch initial data
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/dashboard')
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
        } else if (res.status === 401) {
          router.push('/login')
        }
      } catch (err) {
        console.error('Error fetching dashboard', err)
      }
    }
    
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history')
        if (res.ok) {
          const data = await res.json()
          setChatHistory(data.history || [])
        }
      } catch (err) {}
    }

    fetchDashboard()
    fetchHistory()

    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setScrollY(y)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [router])

  const heroBlur = Math.min(scrollY / 2.6, 100)
  const heroOpacity = Math.max(1 - scrollY / 260, 0)
  const heroShift = Math.min(scrollY / 6, 40)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  const handleFile = async (file?: File) => {
    if (!file || file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.')
      return
    }
    if (file.size > 25 * 1024 * 1024) {
      alert('File exceeds 25MB limit.')
      return
    }

    setFileName(file.name)
    setFileSizeStr((file.size / (1024 * 1024)).toFixed(2) + ' MB')
    
    setIsUploading(true)
    setProgressLabel('Uploading document...')
    setProgressPercent('20%')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) throw new Error(uploadData.error)
      
      const docId = uploadData.document.id
      setDocumentId(docId)
      
      setIsUploading(false)
      setIsAnalyzing(true)
      setProgressLabel('Extracting clauses, specifications, and standards...')
      setProgressPercent('60%')

      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: docId })
      })
      const analyzeData = await analyzeRes.json()
      
      if (!analyzeRes.ok) throw new Error(analyzeData.error)
      
      setProgressLabel('Analysis complete')
      setProgressPercent('100%')
      setIsAnalyzing(false)
      
      setStandards(analyzeData.analysis.relevantBISStandards || [])

      // Refresh history
      const histRes = await fetch('/api/history')
      if (histRes.ok) {
        const histData = await histRes.json()
        setChatHistory(histData.history || [])
      }

    } catch (error: any) {
      alert(error.message || 'An error occurred during upload/analysis')
      setIsUploading(false)
      setIsAnalyzing(false)
    }
  }

  const handleQuery = async () => {
    if (!query.trim()) {
      return
    }

    setQuerying(true)
    setChatResponse('')
    setChatError('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId: documentId || null, query })
      })
      
      let data;
      try {
        data = await res.json()
      } catch (e) {
        setChatError('Unexpected error reading response.')
        setQuerying(false)
        return
      }

      if (res.ok) {
        setChatResponse(data.answer)
      } else {
        setChatError(data.error || 'Failed to get answer')
      }
    } catch (err) {
      console.error(err)
      setChatError('A network error occurred.')
    } finally {
      setQuerying(false)
    }
  }

  const initials = user?.username ? user.username.substring(0, 2).toUpperCase() : 'U'

  return (
    <main className={`dashboard-shell ${isDarkMode ? 'dark-theme' : ''}`}>
      {menuOpen ? <div className="menu-overlay" onClick={() => setMenuOpen(false)} /> : null}
      <aside className={`history-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="history-head">
          <div><p className="section-kicker">MENU</p><h2>Chat History</h2></div>
          <button type="button" className="drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><CloseIcon /></button>
        </div>
        <button type="button" className="new-chat-button"><PlusIcon /> New Analysis</button>
        <div className="history-list">
          {chatHistory.map((item) => (
            <button type="button" className="history-item" key={item.id}>
              <span className="history-item-icon"><ChatIcon /></span>
              <span className="history-item-body">
                <strong>{item.filename}</strong>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </span>
            </button>
          ))}
          {chatHistory.length === 0 && <div style={{ padding: '1rem', color: '#666', fontSize: '0.875rem' }}>No history found.</div>}
        </div>
        <div className="history-options">
          <p className="section-kicker">OPTIONS</p>
          <button type="button" className="history-option"><DownloadIcon /> Export History</button>
          <button type="button" className="history-option"><SettingsIcon /> History Settings</button>
          <button type="button" className="history-option history-option-danger"><TrashIcon /> Clear All History</button>
        </div>
      </aside>
      <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <div className="brand-lockup">
          <button type="button" className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open chat history menu" aria-haspopup="dialog" aria-expanded={menuOpen}><MenuIcon /></button>
          <div className="brand-mark" aria-hidden="true"><span>स</span></div>
          <div><p className="brand-name">Sujhav <strong>AI</strong></p><p className="brand-subtitle">Smart Procurement Intelligence</p></div>
        </div>
        <div className="header-actions">
          <div className="header-status"><span className="status-dot" /> <span>System operational</span><span className="header-divider" /><span className="ministry-label">Government of India</span></div>
          <button type="button" className={`icon-toggle ${isDarkMode ? 'is-dark' : ''}`} onClick={() => setIsDarkMode((current) => !current)} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={isDarkMode}>{isDarkMode ? <MoonIcon /> : <SunIcon />}</button>
          <div className="profile-wrap">
            <button type="button" className="profile-button" onClick={() => setProfileOpen((current) => !current)} aria-label="Open profile menu" aria-haspopup="menu" aria-expanded={profileOpen}>
              <span className="profile-avatar">{initials}</span>
              <span className="profile-meta">
                <strong>{user?.username || 'User'}</strong>
                <span>{user?.role || 'Procurement Officer'}</span>
              </span>
            </button>
            {profileOpen ? (
              <div className="profile-menu" role="menu">
                <div className="profile-menu-head"><span className="profile-avatar profile-avatar-lg">{initials}</span><div><strong>{user?.username}</strong><span>Role: {user?.role}</span></div></div>
                <button type="button" role="menuitem" className="profile-menu-item"><UserIcon /> My Profile</button>
                <button type="button" role="menuitem" className="profile-menu-item"><SettingsIcon /> Settings</button>
                <button type="button" role="menuitem" className="profile-menu-item profile-menu-danger" onClick={handleLogout}><LogoutIcon /> Sign Out</button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section className="welcome-row" style={{ filter: `blur(${heroBlur}px)`, opacity: heroOpacity, transform: `translateY(-${heroShift}px)`, willChange: 'filter, opacity, transform' }}><div><p className="eyebrow">PROCUREMENT ASSISTANT</p><h1>Document Intelligence</h1><p className="welcome-copy">Upload a procurement document to discover relevant Indian Standards and simplify compliance.</p></div><div className="secure-label"><span className="lock-icon">⌁</span> Secure &amp; confidential</div></section>

      <section className="split-layout">
        <article className="panel upload-panel">
          <div className="panel-heading"><div><p className="section-kicker">01 / DOCUMENT INPUT</p><h2>Procurement Document</h2></div><span className="pdf-chip">PDF ONLY</span></div>
          <p className="panel-description">Upload your tender, RFP, or procurement specification for AI-powered analysis.</p>
          
          {!fileName ? (
            <button className={`drop-zone ${isDragging ? 'dragging' : ''}`} onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true) }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); handleFile(event.dataTransfer.files[0]) }} aria-label="Upload procurement PDF">
              <span className="upload-orb"><UploadIcon /></span><span className="drop-title">Drop your PDF here</span><span className="drop-caption">or click to browse from your computer</span>
            </button>
          ) : (
            <div className="file-preview"><span className="file-icon"><FileIcon /></span><div className="file-meta"><strong>{fileName}</strong><span>PDF document <i>•</i> {fileSizeStr}</span></div><span className="checkmark">✓</span></div>
          )}
          
          <input ref={inputRef} className="sr-only" type="file" accept="application/pdf" onChange={(event) => handleFile(event.target.files?.[0])} />
          
          {!fileName && (
            <div className="browse-row"><span className="file-limit">Maximum file size: 25 MB</span><button className="browse-button" onClick={() => inputRef.current?.click()}>Browse Files <ArrowIcon /></button></div>
          )}

          {(isUploading || isAnalyzing || progressPercent === '100%') && (
            <div className="analysis-status">
              <div className="analysis-label">
                <span><SparkIcon /> {(isUploading || isAnalyzing) ? 'Analyzing document...' : 'Analysis complete'}</span>
                <strong>{progressPercent}</strong>
              </div>
              <div className="progress-track"><div className={`progress-fill ${isUploading || isAnalyzing ? 'active' : ''}`} style={{ width: progressPercent }} /></div>
              <p>{progressLabel}</p>
            </div>
          )}

          <div className="quick-query" style={{ marginTop: '2rem' }}>
            <div className="quick-query-heading"><div><p className="section-kicker">CHAT</p><h3>Ask directly</h3></div><span className="query-chip">AI ASSISTED</span></div>
            <textarea value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask a question directly..." aria-label="Ask questions" style={{ resize: 'none', height: '100px', width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent' }} />
            <button className="query-button" type="button" onClick={handleQuery} disabled={querying} style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
              <SparkIcon size={16} /> {querying ? 'Thinking...' : 'Get Answer'} <ArrowIcon />
            </button>
            {chatError && (
              <div className="chat-error-toast" style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '6px', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>Warning:</span> {chatError}
              </div>
            )}
            {chatResponse && (
              <div style={{ marginTop: '1rem', padding: '1rem', background: isDarkMode ? '#1e293b' : '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.875rem', lineHeight: 1.6 }}>
                <strong>Answer:</strong>
                <p style={{ marginTop: '0.5rem' }}>{chatResponse}</p>
              </div>
            )}
          </div>
        </article>

        <article className="panel recommendations-panel">
          <div className="panel-heading"><div><p className="section-kicker">02 / AI OUTPUT</p><h2>AI Recommendations</h2></div><span className="live-chip"><span className="status-dot" /> LIVE</span></div>
          <p className="panel-description">{standards.length > 0 ? 'Relevant BIS standards identified from your document.' : 'Upload a document to view recommended standards.'}</p>
          
          <div className="recommendation-list">
            {standards.map((standard, i) => (
              <div className="standard-card" key={i}>
                <div className="standard-top">
                  <div className="standard-name">
                    <span className="bis-badge">BIS</span>
                    <div><strong>{standard.code}</strong><span>{standard.title}</span></div>
                  </div>
                  <span className="match-badge">{standard.match || 'High'} Match</span>
                </div>
                <div className="justification">
                  <span className="spark-small"><SparkIcon size={15} /></span>
                  <div><span className="justification-label">AI JUSTIFICATION</span><p>{standard.text}</p></div>
                </div>
                <button className="standard-link">View Full Standard <ArrowIcon /></button>
              </div>
            ))}
          </div>
          
          {standards.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b', fontSize: '0.875rem' }}>
              No recommendations yet. Upload a document to start.
            </div>
          )}

          <div className="disclaimer"><span>i</span> Recommendations are generated using AI and should be verified by an authorized officer.</div>
        </article>
      </section>
      <footer><span>SUJHAV AI <i>•</i> v1.0.0</span><span>Built for smarter governance</span></footer>
    </main>
  )
}
