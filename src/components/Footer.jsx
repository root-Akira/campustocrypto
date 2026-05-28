export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-logos">
          <img src="/Logo/c2c-logo/CampusToCrypto.png" alt="CampustoCrypto" className="footer-logo" />
          <span className="footer-divider"></span>
          <img src="/Logo/centurion-logo/Centurion University_Logo_Dark.png" alt="Centurion University" className="footer-logo" />
        </div>
        <div className="footer-info">
          <p className="footer-email"><a href="mailto:info@campustocrypto.com">info@campustocrypto.com</a></p>
          <p className="footer-contact">Centurion University Technology and Management, Bhubaneswar Campus Ramchandrapur, P.O. - Jatni, Bhubaneswar, Khurda, Odisha, India - 752050</p>
        </div>
      </div>
      <p className="footer-copy">&copy; 2026 CampustoCrypto. Built by students, for students.</p>
    </footer>
  )
}
