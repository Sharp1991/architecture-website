import "./about.css";
import ArchitectureNav from "../components/ArchitectureNav";

const services = [
  {
    number: "01",
    title: "Architecture & design",
    description:
      "Thoughtful spaces shaped around your needs, lifestyle, site and the way you want to live.",
  },
  {
    number: "02",
    title: "Residential planning",
    description:
      "Practical home layouts that make the most of available space, natural light and everyday comfort.",
  },
  {
    number: "03",
    title: "Construction planning",
    description:
      "A clearer starting point for understanding building requirements, finishes and preliminary costs.",
  },
  {
    number: "04",
    title: "Building & construction",
    description:
      "A considered approach to turning a design into a real space, with attention to practical building needs.",
  },
];

const process = [
  {
    number: "01",
    title: "Understand",
    description:
      "We begin with your needs, ideas, site conditions and priorities.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "We explore layouts and design possibilities suited to your way of living.",
  },
  {
    number: "03",
    title: "Plan",
    description:
      "We consider materials, finishes, space requirements and preliminary costs.",
  },
  {
    number: "04",
    title: "Move forward",
    description:
      "With a clearer plan, you can make informed decisions about the next steps.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <header className="about-header">
        <a href="/" className="about-brand" aria-label="Structura home">
          <span className="about-brand-mark">S</span>
          STRUCTURA
        </a>
        <nav className="about-nav" aria-label="Main navigation">
          <ArchitectureNav />
        </nav>
      </header>

      <section className="about-intro">
        <p className="about-eyebrow about-reveal">GET TO KNOW STRUCTURA</p>
        <h1 className="about-reveal about-reveal-delay">
          Rooted in our region.
          <br />
          <em>Designed around you.</em>
        </h1>
        <p className="about-lead">
          We believe a well-designed home should feel right for the people who
          live in it—and make sense for the place it stands.
        </p>
        <span className="about-location">
          Architecture · Planning · Construction
        </span>
      </section>

      <section className="about-story about-panel" id="our-approach">
        <div className="about-section-label">
          <span>OUR APPROACH</span>
          <span className="about-label-line" />
        </div>
        <div className="about-story-copy">
          <h2>
            Good design begins with
            <br />
            <em>understanding.</em>
          </h2>
          <p>
            Structura is a new, locally focused architecture and construction
            firm being established with a simple idea: every project deserves
            careful thought, practical planning and a personal approach.
          </p>
          <p>
            Building in Meghalaya and the wider Northeast means paying
            attention to the site, terrain, rainfall, climate, materials and
            the needs of the people who will use the space. These practical
            considerations belong in the conversation from the beginning.
          </p>
          <p>
            Whether you are exploring an idea for a new home or preparing for
            construction, our aim is to help make the process easier to
            understand, one decision at a time.
          </p>
        </div>
      </section>

      <section className="about-services" id="services">
        <div className="about-section-heading">
          <p className="about-eyebrow">WHAT WE DO</p>
          <h2>
            From the first idea
            <br />
            <em>to a clearer plan.</em>
          </h2>
          <p>
            Design and planning should work together with the practical
            realities of building.
          </p>
        </div>

        <div className="about-service-grid">
          {services.map((service) => (
            <article className="about-service-card about-panel" key={service.number}>
              <span className="about-card-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
        <p className="about-disclaimer">
          The scope of each service will be discussed and confirmed for your
          individual project.
        </p>
      </section>

      <section className="about-process" id="process">
        <div className="about-section-heading">
          <p className="about-eyebrow">HOW WE APPROACH A PROJECT</p>
          <h2>
            A process built around
            <br />
            <em>clear decisions.</em>
          </h2>
        </div>

        <div className="about-process-list">
          {process.map((step) => (
            <article className="about-process-step" key={step.number}>
              <span className="about-card-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-contact about-panel" id="contact">
        <p className="about-eyebrow">START A CONVERSATION</p>
        <h2>
          Thinking about
          <br />
          <em>building something?</em>
        </h2>
        <p>
          Start with your ideas, your requirements and what matters most to
          you. A good first conversation can help clarify what comes next.
        </p>
        <a className="about-button" href="/estimate">
          Explore construction costs <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="about-footer">
        <a href="/" className="about-footer-brand">STRUCTURA</a>
        <span>Thoughtful spaces. Practical planning.</span>
        <a href="/estimate">Construction cost estimator ↗</a>
      </footer>
    </main>
  );
}
