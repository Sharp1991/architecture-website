import "./about.css";
import ArchitectureNav from "../components/ArchitectureNav";

const principles = [
  {
    number: "01",
    title: "Design with purpose",
    description:
      "A good design starts with how you want to live. We consider your needs, routines, priorities and the character of the site before shaping the space.",
  },
  {
    number: "02",
    title: "Make space work",
    description:
      "Thoughtful layouts can make a home feel more comfortable and useful. Natural light, movement, privacy and practical storage all matter.",
  },
  {
    number: "03",
    title: "Plan before building",
    description:
      "Clearer decisions about requirements, materials, finishes and likely costs can help you understand the work ahead before construction begins.",
  },
  {
    number: "04",
    title: "Keep people involved",
    description:
      "Your project should reflect your priorities. Open conversations help bring design ideas and practical considerations into the same plan.",
  },
];

const process = [
  {
    number: "01",
    title: "Talk it through",
    description:
      "Share your ideas, budget, plot details and what you need from the space.",
  },
  {
    number: "02",
    title: "Explore the options",
    description:
      "Review the design direction and practical choices that best fit your requirements.",
  },
  {
    number: "03",
    title: "Plan the next step",
    description:
      "Build a clearer picture of scope, decisions and the work needed to move forward.",
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
        <p className="about-eyebrow about-reveal">
          A MORE THOUGHTFUL WAY TO BUILD
        </p>
        <h1 className="about-reveal about-reveal-delay">
          Make room for
          <br />
          <em>what matters.</em>
        </h1>
        <p className="about-lead">
          A home is more than a plan on paper. It is a place shaped by your
          everyday life, your priorities and the land it stands on. We bring
          these considerations into the conversation from the beginning.
        </p>
        <span className="about-location">
          Architecture · Planning · Construction
        </span>
      </section>

      <section className="about-story about-panel" id="our-approach">
        <div className="about-section-label">
          <span>OUR POINT OF VIEW</span>
          <span className="about-label-line" />
        </div>
        <div className="about-story-copy">
          <h2>
            Every project starts
            <br />
            with <em>listening.</em>
          </h2>
          <p>
            Structura is being developed around a straightforward belief: good
            building decisions begin with understanding the people, place and
            purpose behind a project.
          </p>
          <p>
            Across Meghalaya and the wider Northeast, a site can bring its own
            terrain, rainfall, climate and access considerations. These are
            not details to leave until later; they are part of making a plan
            that responds to its setting.
          </p>
          <p>
            Whether you are at the early idea stage or preparing for a build,
            our aim is to help you explore your options, understand the
            practical choices and approach the next decision with greater
            clarity.
          </p>
        </div>
      </section>

      <section className="about-services" id="services">
        <div className="about-section-heading">
          <p className="about-eyebrow">WHAT GUIDES OUR WORK</p>
          <h2>
            Good spaces begin
            <br />
            <em>with good questions.</em>
          </h2>
          <p>
            Four principles keep the focus on the people who will use the
            space and the realities of bringing an idea to life.
          </p>
        </div>

        <div className="about-service-grid">
          {principles.map((principle) => (
            <article
              className="about-service-card about-panel"
              key={principle.number}
            >
              <span className="about-card-number">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-process" id="process">
        <div className="about-section-heading">
          <p className="about-eyebrow">A CLEARER STARTING POINT</p>
          <h2>
            From first thought
            <br />
            <em>to next step.</em>
          </h2>
          <p>
            Every project is different, but a useful first conversation can
            help turn a broad idea into something easier to plan.
          </p>
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
        <p className="about-eyebrow">YOUR IDEA, YOUR NEXT STEP</p>
        <h2>
          Start with a conversation.
          <br />
          <em>Build with more clarity.</em>
        </h2>
        <p>
          Have a plot, a rough plan or simply an idea for a future home? Start
          by outlining what you have in mind and explore the likely
          construction costs.
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
