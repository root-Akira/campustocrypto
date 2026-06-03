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
        <source src="/video/mobilevideo.mp4" media="(max-width: 768px)" type="video/mp4" />
        <source src="/video/hero-bg.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
