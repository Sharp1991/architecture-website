import SiteHeader from "../components/SiteHeader";
import "./about.css";

const process = [
  {
    number: "01",
    title: "Understanding",
    description:
      "We begin with your ideas, priorities, budget and the way you want the space to work.",
  },
  {
    number: "02",
    title: "Site & context",
    description:
      "We consider the plot, its setting, access, terrain and the conditions that may shape the design.",
  },
  {
    number: "03",
    title: "Concept design",
    description:
      "We explore layouts and architectural directions to establish an approach suited to your needs.",
  },
  {
    number: "04",
    title: "Design refinement",
    description:
      "The preferred direction is developed through considered layouts, materials and practical decisions.",
  },
  {
    number: "05",
    title: "Planning the build",
    description:
      "The scope, key requirements and likely costs are clarified to help you prepare for the next stage.",
  },
  {
    number: "06",
    title: "Moving forward",
    description:
      "With a clearer direction, you can make informed decisions about the next steps for your project.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <SiteHeader />

      <section className="about-intro">
        <p className="about-eyebrow">ABOUT STRUCTURA</p>
        <h1>
          Good architecture
          <br />
          begins with <em>understanding.</em>
        </h1>
        <p className="about-lead">
          Every site is different. Every way of living is different.
          We bring these details together to help shape spaces
          that are considered, practical and personal.
        </p>
        <a className="about-text-link" href="#our-process">
          Discover our approach <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="about-layout" id="our-process">
        <div className="about-process">
          <div className="about-section-heading">
            <p className="about-eyebrow">OUR APPROACH</p>
            <h2>A clear process.<br /><em>Thoughtful decisions.</em></h2>
            <p>
              From the first conversation to a clearer plan for building,
              each stage helps bring the idea into focus.
            </p>
          </div>

          <div className="about-process-grid">
            {process.map((step) => (
              <article className="about-step" key={step.number}>
                <span className="about-step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="about-visual">
          <div
            className="about-photo"
            role="img"
            aria-label="Architectural photography of a contemporary building"
          />
          <div className="about-visual-caption">
            <span>DESIGN / CONTEXT / PURPOSE</span>
            <span>STRUCTURA</span>
          </div>
        </aside>
      </section>

      <section className="about-principle">
        <p className="about-eyebrow">WHAT MATTERS</p>
        <h2>
          Design for the way
          <br />
          <em>people actually live.</em>
        </h2>
        <p>
          Good spaces balance the ambition of an idea with the realities
          of its setting. Climate, terrain, natural light, movement and
          everyday needs all deserve a place in the conversation.
        </p>
      </section>

      <footer className="about-footer">
        <a href="/" className="about-footer-brand">STRUCTURA</a>
        <span>Thoughtful spaces. Practical planning.</span>
        <a href="/estimate">Explore construction costs ↗</a>
      </footer>
    </main>
  );
}
