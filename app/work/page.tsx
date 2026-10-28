import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import ChromaGrid from "../components/ChromaGrid";
import { finishedProjects, conceptProjects } from "./projects";

export const metadata: Metadata = {
  title: "Selected Work | Structura",
  description:
    "Explore architectural projects, residential design and conceptual studies by Structura."
};

export default function WorkPage() {
  return (
    <main className="work-page">
      <SiteHeader />

      <section className="work-hero">
        <div className="work-hero-grid" aria-hidden="true" />

        <div className="work-hero-content">
          <p className="work-eyebrow">
            <span /> STRUCTURA / PORTFOLIO
          </p>

          <h1>
            Spaces shaped
            <br />
            by <em>intention.</em>
          </h1>

          <p className="work-intro">
            A selection of architectural work and ideas in progress.
            Each project begins with its context, its people and the
            way a space should feel.
          </p>

          <a className="work-scroll-link" href="#finished-work">
            EXPLORE THE WORK <span>↓</span>
          </a>
        </div>

        <div className="work-hero-index">
          <span>01</span> / SELECTED PROJECTS
        </div>
      </section>

      <section className="work-section" id="finished-work">
        <div className="work-section-heading">
          <div>
            <p className="work-eyebrow">01 / REALISED SPACES</p>
            <h2>
              Finished <em>Work</em>
            </h2>
          </div>

          <p className="work-section-note">
            Architecture made tangible.
            <br />
            Designed for life, built to last.
          </p>
        </div>

        <ChromaGrid items={finishedProjects} />
      </section>

      <section className="work-concepts" id="concept-ideas">
        <div className="work-section">
          <div className="work-section-heading">
            <div>
              <p className="work-eyebrow">02 / EXPLORATIONS</p>
              <h2>
                Concept <em>Ideas</em>
              </h2>
            </div>

            <p className="work-section-note">
              Early explorations and spatial studies.
              <br />
              Possibilities yet to be built.
            </p>
          </div>

          <ChromaGrid items={conceptProjects} />
        </div>
      </section>

      <section className="work-cta">
        <p className="work-eyebrow">HAVE A PROJECT IN MIND?</p>

        <h2>
          Let’s shape something
          <br />
          <em>meaningful.</em>
        </h2>

        <a href="/contact" className="work-cta-link">
          START A CONVERSATION <span>↗</span>
        </a>
      </section>
    </main>
  );
}
