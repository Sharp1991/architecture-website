import ArchitectureNav from "./ArchitectureNav";

export default function SiteHeader() {
  return (
    <header className="architecture-header">
      <a href="/" className="architecture-brand" aria-label="Structura home">
        <span className="brand-mark">S</span>
        <span>STRUCTURA</span>
      </a>

      <div className="architecture-nav">
        <ArchitectureNav />
      </div>

      <a href="/#contact" className="header-contact">
        Get in touch <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
