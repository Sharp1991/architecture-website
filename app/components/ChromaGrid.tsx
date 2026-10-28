"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "../work/projects";

export default function ChromaGrid({ items }: { items: Project[] }) {
  return (
    <div className="chroma-grid">
      {items.map((project, index) => (
        <Link
          className="chroma-card"
          href={`/work/${project.slug}`}
          key={project.slug}
          style={{ "--card-index": index } as CSSProperties}
        >
          <div className="chroma-image-wrap">
            <img
              className="chroma-image"
              src={project.image}
              alt={`${project.title} architectural preview`}
              loading={index > 2 ? "lazy" : "eager"}
            />
            <span className="chroma-image-shade" />
            <span className="chroma-open" aria-hidden="true">↗</span>
            <span className="chroma-image-label">{project.status}</span>
          </div>
          <div className="chroma-card-info">
            <div>
              <p className="chroma-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p className="chroma-summary">{project.summary}</p>
            </div>
            <span className="chroma-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
