import "../estimate/estimate.css";
import "./contact.css";
import ArchitectureNav from "../components/ArchitectureNav";

export default function ContactPage() {
  return (
    <main className="estimate-page contact-page">
      <div className="estimate-building-art" aria-hidden="true">
        <svg viewBox="0 0 720 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="estimate-building-lines">
            <path d="M86 442H650M126 442V226L360 104L594 226V442M126 226H594" />
            <path d="M170 226V178L360 78L550 178V226" />
            <path d="M160 250H560V420H160Z" />
            <path d="M185 272H280V348H185ZM300 272H395V348H300ZM415 272H510V348H415Z" />
            <path d="M185 365H280V420H185ZM300 365H395V420H300ZM415 365H510V420H415Z" />
            <path d="M320 420V370H375V420M112 442V456M126 450H594M594 442V456" />
            <path d="M126 226L360 104L594 226M360 104V78" />
          </g>
          <g className="estimate-building-highlight">
            <path d="M86 442H650L594 226L360 104L126 226V442M170 226V178L360 78L550 178V226M160 250H560V420H160Z" />
            <path d="M185 272H280V348H185ZM300 272H395V348H300ZM415 272H510V348H415Z" />
          </g>
        </svg>
        <span className="estimate-drawing-label">STRUCTURA / CONTACT</span>
      </div>

      <header className="estimate-header">
        <a href="/" className="estimate-brand">
          <span className="estimate-brand-mark">S</span> STRUCTURA
        </a>
        <nav className="estimate-nav" aria-label="Main navigation">
          <ArchitectureNav />
        </nav>
      </header>

      <section className="estimate-intro contact-intro">
        <p className="estimate-eyebrow">GET IN TOUCH</p>
        <h1>Let&apos;s talk about your project.</h1>
        <p>
          From the first idea to the final details, we would be happy to hear
          about the space you have in mind.
        </p>
        <span className="estimate-location">Architecture · Interiors · Planning</span>
      </section>

      <section className="contact-info-grid" aria-label="Contact information">
        <article className="contact-info-card">
          <span className="contact-card-number">01 / EMAIL</span>
          <h2>Start a conversation</h2>
          <p>For project enquiries and general questions.</p>
          <a href="mailto:hello@example.com">hello@example.com</a>
        </article>

        <article className="contact-info-card">
          <span className="contact-card-number">02 / PHONE</span>
          <h2>Speak with us</h2>
          <p>For a direct conversation about your plans.</p>
          <a href="tel:+919876543210">+91 98765 43210</a>
        </article>

        <article className="contact-info-card">
          <span className="contact-card-number">03 / LOCATION</span>
          <h2>Find our studio</h2>
          <p>Based in the beautiful hills of Northeast India.</p>
          <span className="contact-detail">Shillong, Meghalaya, India</span>
        </article>
      </section>

      <p className="contact-demo-note">
        DEMO CONTACT DETAILS — REPLACE BEFORE LAUNCH
      </p>
    </main>
  );
}
