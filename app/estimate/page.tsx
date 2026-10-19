"use client";

import "./estimate.css";
import ArchitectureNav from "../components/ArchitectureNav";

import { useState } from "react";
import { calculateEstimate } from "../lib/estimate-engine";
import type { EstimateResult } from "../lib/estimate-engine";

type FinishLevel = "basic" | "standard" | "premium" | "luxury";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function EstimatePage() {
  const [plotArea, setPlotArea] = useState("2400");
  const [areaPerFloor, setAreaPerFloor] = useState("1200");
  const [floors, setFloors] = useState("2");
  const [finishLevel, setFinishLevel] = useState<FinishLevel>("standard");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    try {
      const estimate = calculateEstimate({
        plotArea: Number(plotArea),
        areaPerFloor: Number(areaPerFloor),
        floors: Number(floors),
        finishLevel,
      });
      setResult(estimate);
      setError("");
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error ? err.message : "Unable to calculate the estimate."
      );
    }
  }

  return (
    <main className="estimate-page">
      <header className="estimate-header">
        <a href="/" className="estimate-brand">
          <span className="estimate-brand-mark">S</span> STRUCTURA
        </a>
        <nav className="estimate-nav" aria-label="Main navigation">
          <ArchitectureNav />
        </nav>
            </header>

      <section className="estimate-intro">
        <p className="estimate-eyebrow">PLAN YOUR HOME</p>
        <h1>Construction cost estimator</h1>
        <p>
          Explore a preliminary construction budget based on your building size
          and preferred finish. Adjust the details below to get an itemised estimate.
        </p>
        <span className="estimate-location">Estimate basis: Shillong, Meghalaya</span>
      </section>

      <section className="estimate-layout">
        <form
          className="estimate-form"
          onSubmit={(event) => {
            event.preventDefault();
            handleCalculate();
          }}
        >
          <div className="estimate-section-heading">
            <span>01</span>
            <div>
              <h2>Your building</h2>
              <p>Enter the approximate dimensions.</p>
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
            <select value={floors} onChange={(event) => setFloors(event.target.value)}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floor) => (
                <option key={floor} value={floor}>
                  {floor} {floor === 1 ? "floor" : "floors"}
                </option>
              ))}
            </select>
          </label>

          <div className="estimate-section-heading estimate-finish-heading">
            <span>02</span>
            <div>
              <h2>Choose your finish</h2>
              <p>Your selection adjusts applicable finish allowances.</p>
            </div>
          </div>

          <div className="estimate-finish-options">
            {([
              ["basic", "Basic", "Essential materials and fittings"],
              ["standard", "Standard", "Practical everyday finishes"],
              ["premium", "Premium", "Higher-grade materials"],
              ["luxury", "Luxury", "High-end finishes and fittings"],
            ] as const).map(([id, name, description]) => (
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
              </label>
            ))}
          </div>

          <button className="estimate-button" type="submit">
            Calculate estimate <span aria-hidden="true">↗</span>
          </button>

          {error && <p className="estimate-error" role="alert">{error}</p>}
        </form>

        <section className="estimate-results" aria-live="polite">
          <p className="estimate-eyebrow">YOUR PROJECT SUMMARY</p>
          {result ? (
            <>
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

              <div className="estimate-assumptions">
                <h3>Assumptions</h3>
                <ul>
                  {result.assumptions.map((assumption, index) => (
                    <li key={index}>{assumption}</li>
                  ))}
                </ul>
              </div>

              <div className="estimate-assumptions">
                <h3>Exclusions</h3>
                <ul>
                  {result.exclusions.map((exclusion) => (
                    <li key={exclusion}>{exclusion}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="estimate-empty">
              <span className="estimate-empty-mark">S</span>
              <h2>Your estimate starts here.</h2>
              <p>
                Review your building details and select Calculate estimate to
                see the projected budget and itemised cost breakdown.
              </p>
              <div className="estimate-empty-detail">
                <span>Location basis</span><strong>Shillong, Meghalaya</strong>
              </div>
              <div className="estimate-empty-detail">
                <span>Cost categories</span><strong>14 included</strong>
              </div>
            </div>
          )}

          <p className="estimate-disclaimer">
            Development estimate only. Rates and quantity factors are unverified
            assumptions, not a contractor quotation or engineering bill of quantities.
            Actual costs depend on site conditions, drawings, specifications and local
            quotations. Foundation and structural allowances require professional review.
          </p>
        </section>
      </section>

      <footer className="estimate-footer">
        <a href="/">STRUCTURA</a>
        <span>Thoughtfully designed. Carefully built.</span>
      </footer>
    </main>
  );
}
