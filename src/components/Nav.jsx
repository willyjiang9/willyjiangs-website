export default function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="monogram">Willy Jiang</a>
        <div className="nav-right">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href="#resume">resume</a>
          <a href="#hi">say hi</a>
          <span className="nav-status"><span className="live" /> open to roles</span>
        </div>
      </div>
    </nav>
  )
}
