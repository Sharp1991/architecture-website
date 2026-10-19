import ArchitectureNav from "./components/ArchitectureNav";

export default function Home() {
  return (
    <main className="architecture-site">
      <section className="architecture-hero">
        <div className="architecture-overlay" />

        <header className="architecture-header">
          <a href="/" className="architecture-brand" aria-label="Structura home">
            <span className="brand-mark">S</span>
            <span>STRUCTURA</span>
          </a>

          <div className="architecture-nav">
            <ArchitectureNav />
          </div>

          <a href="#contact" className="header-contact">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
        </header>

        <div className="architecture-content" id="home">
          <p className="architecture-eyebrow">
            ARCHITECTURE · DESIGN · LIVING
          </p>

          <h1>
            <span className="headline-line headline-line-one">
              A dream home is no longer an illusion,
            </span>
            <span className="headline-line headline-line-two">
              but a place slowly unfolding into reality.
            </span>
          </h1>

          <p className="architecture-description">
            We create architecture that blends function, emotion, and
            timeless form. From residential retreats to commercial
            landmarks, every structure begins with a purpose.
          </p>

          <a href="#contact" className="architecture-cta">
            Start a conversation <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="architecture-bottom">
          <span>Thoughtfully designed. Carefully built.</span>
          <a href="#projects">
            Discover our work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="architecture-next" id="projects">
        <p>OUR APPROACH</p>
        <h2>Spaces shaped around the way you live.</h2>
        <span id="process" />
        <span id="about" />
        <span id="contact" />
      </section>
    </main>
  );
}
