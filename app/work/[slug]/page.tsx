import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import { projects } from "../projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.status === project.status)
    .slice(0, 2);

  return (
    <main className="project-page">
      <SiteHeader />

      <div className="project-topline">
        <Link href="/work">← Back to Work</Link>
        <span>{project.status}</span>
      </div>

      <section
        className="project-hero"
        style={{ backgroundImage: `url("${project.image}")` }}
      >
        <div className="project-hero-shade" />
        <div className="project-hero-title">
          <p className="project-eyebrow">
            {project.category} / {project.location}
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
        <span className="project-hero-number">PROJECT / 0{projects.indexOf(project) + 1}</span>
      </section>

      <section className="project-overview">
        <div>
          <p className="project-eyebrow">THE APPROACH</p>
          <h2 className="project-overview-title">
            Architecture shaped around <em>everyday life.</em>
          </h2>
        </div>
        <div className="project-overview-copy">
          <p className="project-lead">{project.description}</p>
          <div className="project-facts">
            <div>
              <span>LOCATION</span>
              <strong>{project.location}</strong>
            </div>
            <div>
              <span>YEAR</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>BUILT-UP AREA</span>
              <strong>{project.area}</strong>
            </div>
            <div>
              <span>PROJECT TYPE</span>
              <strong>{project.category}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="project-gallery-section">
        <div className="project-section-heading">
          <div>
            <p className="project-eyebrow">DESIGN DETAILS</p>
            <h2>Space, light <em>& material.</em></h2>
          </div>
          <span>SELECTED VIEWS</span>
        </div>

        <div className="project-gallery">
          {[project.image, ...project.gallery].map((image, index) => (
            <figure key={`${image}-${index}`}>
              <img src={image} alt={`${project.title} — view ${index + 1}`} />
              <figcaption>VIEW / 0{index + 1}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="project-principles">
        <div>
          <p className="project-eyebrow">DESIGN PRINCIPLES</p>
          <h2>Considered down to <em>the detail.</em></h2>
        </div>
        <ul className="project-feature-list">
          {project.features.map((feature, index) => (
            <li key={feature}>
              <span>0{index + 1}</span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {relatedProjects.length > 0 && (
        <section className="project-related">
          <div className="project-section-heading">
            <div>
              <p className="project-eyebrow">CONTINUE EXPLORING</p>
              <h2>Related <em>projects.</em></h2>
            </div>
            <Link href="/work">All work ↗</Link>
          </div>
          <div className="project-related-grid">
            {relatedProjects.map((item) => (
              <Link
                href={`/work/${item.slug}`}
                className="project-related-card"
                key={item.slug}
              >
                <img src={item.image} alt="" />
                <span>{item.category}</span>
                <h3>{item.title} ↗</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="project-bottom-cta">
        <p className="project-eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>Let's shape something <em>meaningful.</em></h2>
        <Link href="/contact">Start a conversation ↗</Link>
      </section>
    </main>
  );
}
