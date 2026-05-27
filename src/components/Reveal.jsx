import useScrollReveal from '../hooks/useScrollReveal'

export default function Reveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useScrollReveal()
  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
