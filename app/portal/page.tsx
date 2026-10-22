"use client";

import { useState, type FormEvent } from "react";
import "./portal.css";

const demoEmail = "demo@structura.studio";
const demoPassword = "Structura2026!";

type SectionId = "summary" | "visuals" | "documents" | "updates";
type ViewType = "2D Drawings" | "3D Model" | "Elevations";

const documents = [
  { name: "Ground Floor Plan", type: "Architectural drawing", version: "V03", date: "18 Oct 2026", ext: "DWG" },
  { name: "First Floor Plan", type: "Architectural drawing", version: "V02", date: "16 Oct 2026", ext: "DWG" },
  { name: "Material & Finish Schedule", type: "Design document", version: "V01", date: "12 Oct 2026", ext: "PDF" },
];

export default function ClientPortal() {
  const [email, setEmail] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState<SectionId>("summary");
  const [viewType, setViewType] = useState<ViewType>("2D Drawings");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      email.trim().toLowerCase() === demoEmail &&
      password === demoPassword
    ) {
      setError("");
      setAuthenticated(true);
    } else {
      setError("Those demo credentials don't match. Please try again.");
    }
  }

  function signOut() {
    setAuthenticated(false);
    setOpenSection("summary");
    setPassword("");
    setError("");
  }

  function toggleSection(section: SectionId) {
    setOpenSection((current) => current === section ? "summary" === section ? "" as SectionId : section : section);
  }

  if (!authenticated) {
    return (
      <main className="portal-shell">
        <header className="portal-topbar">
          <a href="/" className="portal-wordmark">
            <span className="portal-symbol">S</span>
            <span>STRUCTURA<small>ARCHITECTURE & DESIGN</small></span>
          </a>
          <a className="portal-back-link" href="/">Back to studio ↗</a>
        </header>

        <section className="portal-login-layout">
          <div className="portal-welcome">
            <span className="portal-eyebrow">THE CLIENT PORTAL</span>
            <h1>Your project,<br /><em>in perspective.</em></h1>
            <p>A considered space to explore your project, review drawings and follow every important milestone.</p>
            <div className="portal-welcome-foot">
              <span className="portal-rule" />
              <span>THOUGHTFULLY DESIGNED. CAREFULLY BUILT.</span>
            </div>
          </div>

          <section className="portal-login-card">
            <span className="portal-eyebrow">CLIENT ACCESS</span>
            <div className="portal-login-emblem">S</div>
            <h2>Welcome back.</h2>
            <p className="portal-muted">Sign in to your private project space.</p>

            <form onSubmit={handleLogin} className="portal-form">
              <label htmlFor="portal-email">Email address</label>
              <input
                id="portal-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />

              <div className="portal-password-label">
                <label htmlFor="portal-password">Password</label>
                <button type="button" className="portal-text-button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="portal-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />

              {error && <p className="portal-error" role="alert">{error}</p>}

              <button className="portal-submit" type="submit">Sign in <span>↗</span></button>
            </form>

            <div className="portal-demo-box">
              <span className="portal-demo-label">DEMO ACCESS</span>
              <p>Explore the sample client workspace using the demo credentials.</p>
              <button
                type="button"
                className="portal-text-button"
                onClick={() => {
                  setEmail(demoEmail);
                  setPassword(demoPassword);
                  setError("");
                }}
              >
                Fill demo credentials
              </button>
            </div>
            <p className="portal-legal">Demonstration only. Do not enter personal or confidential information.</p>
          </section>
        </section>

        <footer className="portal-footer">
          <span>STRUCTURA © 2026</span>
          <span>YOUR SPACE. YOUR PROJECT.</span>
        </footer>
      </main>
    );
  }

  const sections: { id: SectionId; number: string; title: string; subtitle: string }[] = [
    { id: "summary", number: "01", title: "Project summary", subtitle: "The essentials at a glance" },
    { id: "visuals", number: "02", title: "Drawings & visualisations", subtitle: "Plans, elevations and 3D views" },
    { id: "documents", number: "03", title: "Documents", subtitle: "Project files and revisions" },
    { id: "updates", number: "04", title: "Progress & updates", subtitle: "Milestones and project notes" },
  ];

  return (
    <main className="portal-app">
      <header className="portal-app-header">
        <a href="/" className="portal-wordmark">
          <span className="portal-symbol">S</span>
          <span>STRUCTURA<small>CLIENT SPACE</small></span>
        </a>
        <div className="portal-header-right">
          <span className="portal-private-label"><span /> PRIVATE PROJECT</span>
          <span className="portal-avatar">D</span>
          <span className="portal-client-name">Demo Client</span>
          <button className="portal-signout" onClick={signOut}>Sign out ↗</button>
        </div>
      </header>

      <div className="portal-content">
        <div className="portal-intro">
          <div>
            <span className="portal-eyebrow">YOUR PROJECT WORKSPACE</span>
            <h1>Residence <em>01.</em></h1>
            <p>Everything about your project, thoughtfully organised in one place.</p>
          </div>
          <span className="portal-demo-pill">DEMO PROJECT</span>
        </div>

        <div className="portal-project-strip">
          <div><span>PROJECT REFERENCE</span><strong>ST-2026-001</strong></div>
          <div><span>PROJECT TYPE</span><strong>Residential · New build</strong></div>
          <div><span>CURRENT STAGE</span><strong><i className="portal-status-dot" /> Design development</strong></div>
        </div>

        <div className="portal-accordion">
          {sections.map((section) => {
            const expanded = openSection === section.id;
            return (
              <section className={`portal-accordion-section ${expanded ? "is-expanded" : ""}`} key={section.id}>
                <button
                  className="portal-accordion-trigger"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={expanded}
                  aria-controls={`portal-panel-${section.id}`}
                >
                  <span className="portal-section-number">{section.number}</span>
                  <span className="portal-section-title-wrap">
                    <strong>{section.title}</strong>
                    <small>{section.subtitle}</small>
                  </span>
                  <span className={`portal-chevron ${expanded ? "is-open" : ""}`} aria-hidden="true">+</span>
                </button>

                {expanded && (
                  <div className="portal-accordion-panel" id={`portal-panel-${section.id}`}>
                    {section.id === "summary" && (
                      <>
                        <p className="portal-panel-intro">A snapshot of the project and its key details.</p>
                        <div className="portal-summary-grid">
                          <div className="portal-summary-item portal-summary-wide">
                            <span>PROJECT NAME</span><strong>Residence 01</strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>LOCATION</span><strong>To be confirmed</strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>PLOT AREA</span><strong>2,400 sq ft <small>Demo value</small></strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>PROPOSED BUILT-UP AREA</span><strong>To be confirmed</strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>ESTIMATED BUDGET</span><strong>To be confirmed</strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>PROJECT STAGE</span><strong>Design development</strong>
                          </div>
                          <div className="portal-summary-item">
                            <span>LAST UPDATED</span><strong>18 October 2026 <small>Demo date</small></strong>
                          </div>
                        </div>
                        <p className="portal-demo-note">This is sample project information. Actual details can be added when the project data is ready.</p>
                      </>
                    )}

                    {section.id === "visuals" && (
                      <>
                        <p className="portal-panel-intro">Review your design material. Choose a view below.</p>
                        <div className="portal-view-tabs" role="group" aria-label="Drawing type">
                          {(["2D Drawings", "3D Model", "Elevations"] as ViewType[]).map((view) => (
                            <button
                              key={view}
                              className={viewType === view ? "is-selected" : ""}
                              onClick={() => setViewType(view)}
                              aria-pressed={viewType === view}
                            >
                              {view}
                            </button>
                          ))}
                        </div>
                        <div className="portal-viewer-empty">
                          <span className="portal-viewer-mark">{viewType === "2D Drawings" ? "⌗" : viewType === "3D Model" ? "◇" : "▤"}</span>
                          <h3>{viewType}</h3>
                          <p>{viewType === "2D Drawings"
                            ? "Floor plans and technical drawings will appear here when uploaded."
                            : viewType === "3D Model"
                            ? "An interactive 3D preview can be connected here when a model is available."
                            : "Exterior elevations and architectural views will appear here when available."}</p>
                          <span className="portal-viewer-status">NO FILES ADDED YET</span>
                        </div>
                      </>
                    )}

                    {section.id === "documents" && (
                      <>
                        <p className="portal-panel-intro">A single place for project documents and revision history.</p>
                        <div className="portal-document-list">
                          {documents.map((doc) => (
                            <article className="portal-document-row" key={doc.name}>
                              <span className="portal-file-type">{doc.ext}</span>
                              <div className="portal-document-info">
                                <strong>{doc.name}</strong>
                                <span>{doc.type} · {doc.version} · {doc.date}</span>
                              </div>
                              <span className="portal-document-demo">DEMO</span>
                            </article>
                          ))}
                        </div>
                        <p className="portal-demo-note">These are demonstration entries only; no downloadable files are attached.</p>
                      </>
                    )}

                    {section.id === "updates" && (
                      <>
                        <p className="portal-panel-intro">A record of milestones and communication as the project progresses.</p>
                        <div className="portal-timeline">
                          <article>
                            <span className="portal-timeline-dot" />
                            <div><span>18 OCTOBER 2026 · DEMO</span><strong>Design development</strong><p>Project design is shown at the design development stage in this sample workspace.</p></div>
                          </article>
                          <article>
                            <span className="portal-timeline-dot" />
                            <div><span>12 OCTOBER 2026 · DEMO</span><strong>Initial documents listed</strong><p>Sample document entries were added to demonstrate the document list.</p></div>
                          </article>
                          <article>
                            <span className="portal-timeline-dot" />
                            <div><span>PROJECT SETUP</span><strong>Client workspace created</strong><p>This private portal is a demonstration of the planned client experience.</p></div>
                          </article>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <footer className="portal-content-footer">
          <span>STRUCTURA <span className="portal-footer-separator">/</span> CLIENT SPACE</span>
          <span>YOUR PROJECT, IN PERSPECTIVE.</span>
        </footer>
      </div>
    </main>
  );
}
