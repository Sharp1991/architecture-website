"use client";

import SiteHeader from "../components/SiteHeader";

import "./estimate.css";
import { useRef, useState } from "react";
import { calculateEstimate } from "../lib/estimate-engine";
import type { EstimateResult } from "../lib/estimate-engine";

type FinishLevel = "basic" | "standard" | "premium" | "luxury";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const finishes = [
  ["basic", "Basic", "Essential materials and fittings"],
  ["standard", "Standard", "Practical everyday finishes"],
  ["premium", "Premium", "Higher-grade materials"],
  ["luxury", "Luxury", "High-end finishes and fittings"],
] as const;

export default function EstimatePage() {
  const [plotArea, setPlotArea] = useState("2400");
  const [areaPerFloor, setAreaPerFloor] = useState("1200");
  const [floors, setFloors] = useState("2");
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("standard");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [calculating, setCalculating] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const [pixelPhase, setPixelPhase] = useState<"cover" | "reveal" | null>(null);
  const [pixelRect, setPixelRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const cardRef = useRef<HTMLFormElement | null>(null);
  const transitionLock = useRef(false);

  function transitionTo(nextStep: number) {
    if (transitionLock.current || nextStep === step) return;
    transitionLock.current = true;
    const activeCard = cardRef.current;
    if (activeCard) {
      const rect = activeCard.getBoundingClientRect();
      setPixelRect({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
    setPixelPhase("cover");

    window.setTimeout(() => {
      setStep(nextStep);
      setPixelPhase("reveal");
    }, 650);

    window.setTimeout(() => {
      setPixelPhase(null);
      transitionLock.current = false;
    }, 1500);
  }

  async function handleShareEstimate() {
    if (!result) return;

    const shareText = [
      "My Preliminary Construction Estimate",
      `Estimated total: ${money(result.totalCost)}`,
      `Built-up area: ${result.totalBuiltUpArea.toLocaleString("en-IN")} sq ft`,
      `Selected finish: ${result.finishName}`,
      `Includes ${result.contingencyPercentage}% contingency allowance.`,
      "",
      "This is an indicative estimate, not a final contractor quotation.",
      typeof window !== "undefined" ? window.location.href : "",
    ].filter(Boolean).join("\\n");

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({
          title: "My Construction Estimate",
          text: shareText,
        });
        setShareMessage("");
      } else {
        await navigator.clipboard.writeText(shareText);
        setShareMessage("Estimate copied. You can now share it.");
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;

      try {
        await navigator.clipboard.writeText(shareText);
        setShareMessage("Estimate copied. You can now share it.");
      } catch {
        setShareMessage("Sharing is unavailable in this browser.");
      }
    }
  }

  function handleCalculate() {
    setError("");
    setResult(null);
    setCalculating(true);
    setStep(3);

    window.setTimeout(() => {
      try {
        const estimate = calculateEstimate({
          plotArea: Number(plotArea),
          areaPerFloor: Number(areaPerFloor),
          floors: Number(floors),
          finishLevel,
        });
        setResult(estimate);
        setStep(4);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to calculate the estimate."
        );
        setStep(2);
      } finally {
        setCalculating(false);
      }
    }, 1100);
  }

  return (
    <main className="estimate-page">
      <div className="estimate-building-art" aria-hidden="true">
        <svg viewBox="0 0 720 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="estimate-building-glow" x1="80" y1="420" x2="620" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F0B72F" stopOpacity="0.65" />
              <stop offset="0.5" stopColor="#FFF4C4" stopOpacity="1" />
              <stop offset="1" stopColor="#F0B72F" stopOpacity="0.65" />
            </linearGradient>
            <mask id="estimate-building-reveal">
              <rect x="-720" y="0" width="720" height="520" fill="black">
                <animate attributeName="x" values="-720;720" dur="26s" repeatCount="indefinite" />
              </rect>
            </mask>
          </defs>
          <g className="estimate-building-lines">
            <path d="M86 442H650M126 442V226L360 104L594 226V442M126 226H594" />
            <path d="M170 226V178L360 78L550 178V226" />
            <path d="M160 250H560V420H160Z" />
            <path d="M185 272H280V348H185ZM300 272H395V348H300ZM415 272H510V348H415Z" />
            <path d="M185 365H280V420H185ZM300 365H395V420H300ZM415 365H510V420H415Z" />
            <path d="M320 420V370H375V420M112 442V456M126 450H594M594 442V456" />
            <path d="M95 226H112M103 226V442M95 442H112M610 226H627M619 226V442M610 442H627" />
            <path d="M126 226L360 104L594 226M360 104V78M352 90H368" />
            <path d="M170 250V420M530 250V420M145 236H575" strokeDasharray="3 8" />
          </g>
          <g className="estimate-building-highlight">
            <path d="M86 442H650L594 226L360 104L126 226V442M170 226V178L360 78L550 178V226M160 250H560V420H160Z" />
            <path d="M185 272H280V348H185ZM300 272H395V348H300ZM415 272H510V348H415Z" />
            <path d="M185 365H280V420H185ZM300 365H395V420H300ZM415 365H510V420H415Z" />
          </g>
        </svg>
        <span className="estimate-drawing-label">RESIDENTIAL / ELEVATION 01</span>
      </div>
      {pixelPhase && (
        <div className={`estimate-pixel-overlay is-${pixelPhase}`} style={{ left: pixelRect?.left ?? 0, top: pixelRect?.top ?? 0, width: pixelRect?.width ?? 0, height: pixelRect?.height ?? 0 }} aria-hidden="true">
          {Array.from({ length: 144 }, (_, i) => (
            <span key={i} style={{
              "--pixel-delay": `${((i * 37) % 144) * 1.2}ms`,
            } as React.CSSProperties} />
          ))}
        </div>
      )}
      <SiteHeader />

      <section className="estimate-intro">
        <p className="estimate-eyebrow estimate-blur-reveal">PLAN YOUR HOME</p>
        <h1 className="estimate-blur-reveal estimate-blur-reveal-delay">
          Construction cost estimator
        </h1>
        <p>
          Shape your project step by step and explore a preliminary construction
          budget based on your building size and preferred finish.
        </p>
        <span className="estimate-location">
          Estimate basis: Shillong, Meghalaya
        </span>
      </section>

      <section className="estimate-layout estimate-step-layout">
        <div className="estimate-step-indicator" aria-label={`Step ${step} of 4`}>
          {[1, 2, 3, 4].map((number) => (
            <div
              key={number}
              className={`estimate-step-dot ${step >= number ? "active" : ""}`}
            >
              <span>{number}</span>
              <small>
                {number === 1
                  ? "Building"
                  : number === 2
                    ? "Finish"
                    : number === 3
                      ? "Calculate"
                      : "Summary"}
              </small>
            </div>
          ))}
        </div>

        {step === 1 && (
          <form
            className="estimate-form" ref={cardRef}
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              transitionTo(2);
            }}
          >
            <div className="estimate-section-heading">
              <span>01</span>
              <div>
                <h2>Your building</h2>
                <p>Start with the approximate dimensions of your home.</p>
              </div>
            </div>

            <label className="estimate-field">
              Plot area <span>(sq ft)</span>
              <input
                type="number"
                min="1"
                max="1000000"
                required
                value={plotArea}
                onChange={(event) => setPlotArea(event.target.value)}
              />
            </label>

            <label className="estimate-field">
              Building area per floor <span>(sq ft)</span>
              <input
                type="number"
                min="1"
                max="100000"
                required
                value={areaPerFloor}
                onChange={(event) => setAreaPerFloor(event.target.value)}
              />
              <small>The covered building footprint on each floor.</small>
            </label>

            <label className="estimate-field">
              Number of floors
              <select
                value={floors}
                onChange={(event) => setFloors(event.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floor) => (
                  <option key={floor} value={floor}>
                    {floor} {floor === 1 ? "floor" : "floors"}
                  </option>
                ))}
              </select>
            </label>

            {error && <p className="estimate-error" role="alert">{error}</p>}

            <button className="estimate-button" type="submit">
              Continue <span aria-hidden="true">→</span>
            </button>
            <p className="estimate-step-footnote">
              You can return to this step and adjust your details later.
            </p>
          </form>
        )}

        {step === 2 && (
          <form
            className="estimate-form" ref={cardRef}
            onSubmit={(event) => {
              event.preventDefault();
              handleCalculate();
            }}
          >
            <div className="estimate-section-heading">
              <span>02</span>
              <div>
                <h2>Choose your finish</h2>
                <p>Your selection adjusts applicable finish allowances.</p>
              </div>
            </div>

            <div className="estimate-building-review">
              <div>
                <span>Plot area</span>
                <strong>{Number(plotArea).toLocaleString("en-IN")} sq ft</strong>
              </div>
              <div>
                <span>Built-up area</span>
                <strong>
                  {(Number(areaPerFloor) * Number(floors)).toLocaleString("en-IN")} sq ft
                </strong>
              </div>
              <div>
                <span>Floors</span>
                <strong>{floors}</strong>
              </div>
            </div>

            <div className="estimate-finish-options">
              {finishes.map(([id, name, description]) => (
                <label
                  key={id}
                  className={`estimate-finish-option ${finishLevel === id ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="finishLevel"
                    value={id}
                    checked={finishLevel === id}
                    onChange={() => setFinishLevel(id)}
                  />
                  <span className="estimate-radio" />
                  <span>
                    <strong>{name}</strong>
                    <small>{description}</small>
                  </span>
                  <span className="estimate-finish-check" aria-hidden="true">
                    {finishLevel === id ? "✓" : ""}
                  </span>
                </label>
              ))}
            </div>

            {error && <p className="estimate-error" role="alert">{error}</p>}

            <div className="estimate-step-actions">
              <button
                className="estimate-back-button"
                type="button"
                onClick={() => transitionTo(1)}
              >
                ← Back
              </button>
              <button className="estimate-button" type="submit">
                Calculate estimate <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <section
            className="estimate-form estimate-calculating estimate-card-enter"
            aria-live="polite"
          >
            <div className="estimate-rocket-scene" aria-hidden="true">
              <span className="estimate-rocket-orbit orbit-one" />
              <span className="estimate-rocket-orbit orbit-two" />
              <span className="estimate-rocket">🚀</span>
              <span className="estimate-rocket-trail" />
            </div>
            <p className="estimate-eyebrow">WORKING ON YOUR PROJECT</p>
            <h2>Putting your estimate together.</h2>
            <p>
              Reviewing your building dimensions and selected finish to prepare
              the cost breakdown.
            </p>
            <div className="estimate-loading-track">
              <span />
            </div>
          </section>
        )}

        {step === 4 && result && (
          <section
            className="estimate-results estimate-summary-card estimate-card-enter"
            aria-live="polite"
          >
            <div className="estimate-summary-topline">
              <p className="estimate-eyebrow">YOUR PROJECT SUMMARY</p>
              <span className="estimate-summary-status">Estimate ready</span>
            </div>

            <p className="estimate-result-label">Preliminary estimated total</p>
            <h2 className="estimate-total">{money(result.totalCost)}</h2>
            <p className="estimate-result-note">
              Including {result.contingencyPercentage}% contingency allowance
            </p>

            <div className="estimate-metrics">
              <div>
                <span>Total built-up area</span>
                <strong>{result.totalBuiltUpArea.toLocaleString("en-IN")} sq ft</strong>
              </div>
              <div>
                <span>Selected finish</span>
                <strong>{result.finishName}</strong>
              </div>
            </div>

            <details className="estimate-cost-breakdown">
              <summary>
                <span>View detailed cost breakdown</span>
                <span className="estimate-breakdown-count">14 categories</span>
              </summary>
              <div className="estimate-breakdown-totals">
                <div>
                  <span>Construction subtotal</span>
                  <strong>{money(result.subtotal)}</strong>
                </div>
                <div>
                  <span>Contingency allowance</span>
                  <strong>{money(result.contingencyAmount)}</strong>
                </div>
              </div>

            <div className="estimate-category-heading">
              <h3>Cost breakdown</h3>
              <span>14 categories</span>
            </div>

            <div className="estimate-category-list">
              {result.categories.map((category) => (
                <details className="estimate-category" key={category.id}>
                  <summary>
                    <span>{category.name}</span>
                    <strong>{money(category.totalCost)}</strong>
                  </summary>
                  {category.items.length > 0 ? (
                    <div className="estimate-line-items">
                      {category.items.map((item) => (
                        <div className="estimate-line-item" key={item.id}>
                          <span>
                            {item.name}
                            <small>
                              {item.quantity.toLocaleString("en-IN")} {item.unit}
                            </small>
                          </span>
                          <strong>{money(item.totalCost)}</strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="estimate-no-items">
                      This category is shown as a separate allowance.
                    </p>
                  )}
                </details>
              ))}
            </div>

            <div className="estimate-grand-total">
              <span>Estimated total including contingency</span>
              <strong>{money(result.totalCost)}</strong>
            </div>

            </details>

            <details className="estimate-extra-details">
              <summary>Contingency and price allowance</summary>
              <div>
                <p>
                  The total includes a {result.contingencyPercentage}% contingency
                  allowance of {money(result.contingencyAmount)}. This is a
                  preliminary provision for cost uncertainty, not a guaranteed
                  final price.
                </p>
              </div>
            </details>

            <details className="estimate-extra-details">
              <summary>Assumptions</summary>
              <div>
                <ul>
                  {result.assumptions.map((assumption, index) => (
                    <li key={index}>{assumption}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="estimate-extra-details">
              <summary>Exclusions</summary>
              <div>
                <ul>
                  {result.exclusions.map((exclusion) => (
                    <li key={exclusion}>{exclusion}</li>
                  ))}
                </ul>
              </div>
            </details>

            <details className="estimate-extra-details">
              <summary>About this estimate</summary>
              <div>
                <p className="estimate-disclaimer">
                  Development estimate only. Rates and quantity factors are
                  unverified assumptions, not a contractor quotation or
                  engineering bill of quantities. Actual costs depend on site
                  conditions, drawings, specifications and local quotations.
                  Foundation and structural allowances require professional
                  review.
                </p>
              </div>
            </details>

            <div className="estimate-summary-actions">
              <button
                className="estimate-back-button"
                type="button"
                onClick={() => setStep(1)}
              >
                Edit building details
              </button>
              <button
                className="estimate-button"
                type="button"
                onClick={handleShareEstimate}
              >
                Share Estimate <span aria-hidden="true">↗</span>
              </button>
              {shareMessage && (
                <p className="estimate-share-message" role="status">
                  {shareMessage}
                </p>
              )}
            </div>
          </section>
        )}
      </section>

      <footer className="estimate-footer">
        <span>STRUCTURA</span>
        <span>Thoughtful spaces. Considered costs.</span>
      </footer>
    </main>
  );
}
