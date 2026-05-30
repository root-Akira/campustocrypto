import { useState, useEffect } from 'react'

function calcTimeLeft(target) {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function Countdown({ targetDate, targetTime }) {
  const target = new Date(`${targetDate}T${targetTime || '00:00'}`).getTime()
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(target))

  useEffect(() => {
    if (!timeLeft) return
    const id = setInterval(() => {
      const t = calcTimeLeft(target)
      if (t) setTimeLeft(t)
      else setTimeLeft(null)
    }, 1000)
    return () => clearInterval(id)
  }, [target, timeLeft])

  if (!timeLeft) return null

  return (
    <div style={{
      display: 'flex', gap: 12, justifyContent: 'center',
      fontFamily: 'var(--font-main)', fontWeight: 700,
    }}>
      {Object.entries(timeLeft).map(([k, v]) => (
        <div key={k} style={{ textAlign: 'center', minWidth: 50 }}>
          <div style={{
            fontSize: '1.8rem', lineHeight: 1, color: 'var(--accent-color)',
            background: 'var(--glass-bg)', backdropFilter: 'blur(8px)',
            padding: '8px 12px', borderRadius: 10,
            border: '1px solid var(--glass-border)',
          }}>
            {String(v).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.55rem', textTransform: 'uppercase', opacity: 0.6, marginTop: 4 }}>
            {k}
          </div>
        </div>
      ))}
    </div>
  )
}
