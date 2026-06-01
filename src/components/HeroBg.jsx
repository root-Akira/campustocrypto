export default function HeroBg() {
  return (
    <div className="illustration-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
