"use client";

import { useState } from "react";

type Room = {
  name: string;
  area: number;
  x: number;
  y: number;
  w: number;
  h: number;
};

const plans: Record<"Ground floor" | "First floor", Room[]> = {
  "Ground floor": [
    { name: "Living room", area: 320, x: 20, y: 20, w: 230, h: 150 },
    { name: "Kitchen", area: 120, x: 250, y: 20, w: 145, h: 100 },
    { name: "Dining", area: 145, x: 250, y: 120, w: 145, h: 100 },
    { name: "Bedroom 01", area: 180, x: 395, y: 20, w: 185, h: 140 },
    { name: "Bedroom 02", area: 155, x: 20, y: 170, w: 150, h: 140 },
    { name: "Bathroom", area: 48, x: 170, y: 170, w: 80, h: 85 },
    { name: "Utility", area: 65, x: 170, y: 255, w: 80, h: 55 },
    { name: "Hallway", area: 100, x: 250, y: 220, w: 145, h: 90 },
    { name: "Entry porch", area: 95, x: 395, y: 160, w: 185, h: 150 },
  ],
  "First floor": [
    { name: "Main bedroom", area: 245, x: 20, y: 20, w: 220, h: 150 },
    { name: "Bedroom 03", area: 170, x: 240, y: 20, w: 170, h: 135 },
    { name: "Study", area: 115, x: 410, y: 20, w: 170, h: 115 },
    { name: "Bathroom", area: 55, x: 240, y: 155, w: 85, h: 90 },
    { name: "Landing", area: 125, x: 325, y: 155, w: 85, h: 155 },
    { name: "Family lounge", area: 210, x: 20, y: 170, w: 220, h: 140 },
    { name: "Balcony", area: 100, x: 410, y: 135, w: 170, h: 75 },
    { name: "Terrace", area: 160, x: 410, y: 210, w: 170, h: 100 },
  ],
};

function Furniture({ room }: { room: Room }) {
  const cx = room.x + room.w / 2;
  const cy = room.y + room.h / 2;

  if (room.name.toLowerCase().includes("bedroom")) {
    return (
      <g className="plan-fixture">
        <rect x={cx - 32} y={cy - 29} width="64" height="70" rx="1" />
        <rect x={cx - 27} y={cy - 24} width="24" height="13" />
        <rect x={cx + 3} y={cy - 24} width="24" height="13" />
        <path d={`M${cx - 32} ${cy - 5}H${cx + 32}`} />
        <rect x={cx - 47} y={cy - 24} width="10" height="13" />
      </g>
    );
  }

  if (room.name === "Living room" || room.name === "Family lounge") {
    return (
      <g className="plan-fixture">
        <rect x={cx - 45} y={cy - 25} width="90" height="35" rx="3" />
        <path d={`M${cx - 15} ${cy - 25}V${cy + 10}M${cx + 15} ${cy - 25}V${cy + 10}`} />
        <rect x={cx - 20} y={cy + 20} width="40" height="22" rx="2" />
        <rect x={cx - 8} y={cy + 47} width="16" height="9" />
      </g>
    );
  }

  if (room.name === "Kitchen") {
    return (
      <g className="plan-fixture">
        <path d={`M${room.x + 10} ${room.y + 12}H${room.x + room.w - 10}V${room.y + 42}H${room.x + 10}Z`} />
        <circle cx={room.x + 35} cy={room.y + 27} r="7" />
        <circle cx={room.x + 55} cy={room.y + 27} r="7" />
        <rect x={room.x + room.w - 42} y={room.y + 15} width="20" height="20" />
        <rect x={cx - 25} y={cy + 8} width="50" height="23" />
      </g>
    );
  }

  if (room.name === "Dining") {
    return (
      <g className="plan-fixture">
        <rect x={cx - 28} y={cy - 22} width="56" height="44" rx="2" />
        {[[-18, -31], [0, -31], [18, -31], [-18, 31], [0, 31], [18, 31]].map(([dx, dy], i) => (
          <rect key={i} x={cx + dx - 5} y={cy + dy - 5} width="10" height="10" rx="1" />
        ))}
      </g>
    );
  }

  if (room.name === "Bathroom") {
    return (
      <g className="plan-fixture">
        <rect x={room.x + 8} y={room.y + 8} width="25" height="25" rx="2" />
        <circle cx={room.x + 20.5} cy={room.y + 20.5} r="7" />
        <rect x={room.x + room.w - 32} y={room.y + 8} width="22" height="32" rx="7" />
        <ellipse cx={room.x + room.w / 2} cy={room.y + room.h - 20} rx="12" ry="15" />
        <ellipse cx={room.x + room.w / 2} cy={room.y + room.h - 20} rx="6" ry="8" />
      </g>
    );
  }

  if (room.name === "Hallway" || room.name === "Landing") {
    return (
      <g className="plan-fixture">
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M${room.x + 15} ${room.y + 15 + i * 8}H${room.x + 58}`} />
        ))}
        <path d={`M${room.x + 36} ${room.y + 70}V${room.y + 28}M${room.x + 30} ${room.y + 36}L${room.x + 36} ${room.y + 28}L${room.x + 42} ${room.y + 36}`} />
      </g>
    );
  }

  if (room.name === "Study") {
    return (
      <g className="plan-fixture">
        <rect x={room.x + 20} y={room.y + 15} width={room.w - 40} height="20" />
        <rect x={cx - 20} y={cy + 5} width="40" height="25" />
        <circle cx={cx} cy={cy + 42} r="9" />
      </g>
    );
  }

  if (room.name === "Entry porch" || room.name === "Balcony" || room.name === "Terrace") {
    return (
      <g className="plan-fixture">
        {Array.from({ length: Math.max(3, Math.floor(room.w / 22)) }, (_, i) => (
          <path key={i} d={`M${room.x + 10 + i * 22} ${room.y + 12}V${room.y + room.h - 12}`} />
        ))}
        <rect x={cx - 18} y={cy - 10} width="36" height="20" />
      </g>
    );
  }

  if (room.name === "Utility") {
    return (
      <g className="plan-fixture">
        <rect x={room.x + 8} y={room.y + 8} width="25" height="25" rx="2" />
        <circle cx={room.x + 20.5} cy={room.y + 20.5} r="8" />
        <rect x={room.x + room.w - 28} y={room.y + 8} width="18" height="35" />
      </g>
    );
  }

  return null;
}

function Dimensions() {
  return (
    <g className="plan-dimensions" pointerEvents="none">
      <path d="M20 17V5M250 17V5M395 17V5M580 17V5" />
      <path d="M20 9H580M20 6L24 12M580 6L576 12" />
      <text x="135" y="6">23'-0&quot;</text>
      <text x="322" y="6">14'-6&quot;</text>
      <text x="487" y="6">18'-6&quot;</text>

      <path d="M17 20H5M17 170H5M17 310H5M9 20V310M6 20L12 24M6 310L12 306" />
      <text x="5" y="95" transform="rotate(-90 5 95)">15'-0&quot;</text>
      <text x="5" y="248" transform="rotate(-90 5 248)">14'-0&quot;</text>

      <path d="M20 313V327M250 313V327M395 313V327M580 313V327M20 322H580" />
      <text x="135" y="320">23'-0&quot;</text>
      <text x="322" y="320">14'-6&quot;</text>
      <text x="487" y="320">18'-6&quot;</text>

      <path d="M583 20H600M583 160H600M583 310H600M592 20V310" />
      <text x="600" y="100" transform="rotate(90 600 100)">14'-0&quot;</text>
      <text x="600" y="245" transform="rotate(90 600 245)">15'-0&quot;</text>
    </g>
  );
}

function WindowsAndDoors() {
  return (
    <g className="plan-openings" pointerEvents="none">
      {/* Windows: double lines across the wall */}
      <path d="M60 20V17H105V20M60 23V17M105 23V17" />
      <path d="M290 20V17H340V20M290 23V17M340 23V17" />
      <path d="M445 20V17H500V20M445 23V17M500 23V17" />
      <path d="M20 55H17V100H20M23 55H17M23 100H17" />
      <path d="M580 55H583V100H580M577 55H583M577 100H583" />
      <path d="M20 220H17V265H20M23 220H17M23 265H17" />
      <path d="M440 310V313H490V310M440 307V313M490 307V313" />

      {/* Door leaves and swing arcs */}
      <path d="M250 65H282M250 65A32 32 0 0 1 282 97" />
      <path d="M250 190H278M250 190A28 28 0 0 1 278 218" />
      <path d="M395 75H425M395 75A30 30 0 0 1 425 105" />
      <path d="M170 200H194M170 200A24 24 0 0 1 194 224" />
      <path d="M310 220V244M310 220A24 24 0 0 0 286 244" />
      <path d="M465 160V188M465 160A28 28 0 0 1 493 188" />
      <path d="M90 310V285M90 310A25 25 0 0 0 115 285" />
    </g>
  );
}

export default function FloorPlan() {
  const [floor, setFloor] = useState<"Ground floor" | "First floor">("Ground floor");
  const [selected, setSelected] = useState("Living room");
  const [zoom, setZoom] = useState(1);

  const rooms = plans[floor];
  const room = rooms.find((item) => item.name === selected) ?? rooms[0];

  function changeFloor(next: "Ground floor" | "First floor") {
    setFloor(next);
    setSelected(plans[next][0].name);
    setZoom(1);
  }

  return (
    <section className="plan-viewer" aria-label="Interactive sample floor plan">
      <div className="plan-toolbar">
        <div className="plan-floor-buttons">
          {(["Ground floor", "First floor"] as const).map((item) => (
            <button type="button" key={item}
              className={floor === item ? "active" : ""}
              aria-pressed={floor === item}
              onClick={() => changeFloor(item)}>{item}</button>
          ))}
        </div>
        <div className="plan-zoom-controls">
          <button type="button" aria-label="Zoom out" disabled={zoom <= 0.8}
            onClick={() => setZoom((v) => Math.max(0.8, +(v - 0.1).toFixed(1)))}>−</button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" aria-label="Zoom in" disabled={zoom >= 1.5}
            onClick={() => setZoom((v) => Math.min(1.5, +(v + 0.1).toFixed(1)))}>+</button>
          <button type="button" className="plan-reset" onClick={() => setZoom(1)}>Reset</button>
        </div>
      </div>

      <div className="plan-meta">
        <span>ST-2026-001 / {floor.toUpperCase()}</span>
        <span>SCHEMATIC PLAN · REV 01</span>
      </div>

      <div className="plan-canvas">
        <div className="plan-drawing" style={{ transform: `scale(${zoom})` }}>
          <svg viewBox="0 0 640 355" role="img"
            aria-label={`${floor} architectural plan. Select a room to inspect it.`}>
            <defs>
              <pattern id="plan-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0H0V10" fill="none" stroke="#e7e5de" strokeWidth=".5" />
              </pattern>
            </defs>
            <rect width="640" height="355" fill="url(#plan-grid)" />

            {rooms.map((item) => (
              <g key={item.name}
                className={`plan-room ${selected === item.name ? "selected" : ""}`}
                role="button" tabIndex={0}
                aria-label={`${item.name}, approximately ${item.area} square feet`}
                aria-pressed={selected === item.name}
                onClick={() => setSelected(item.name)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(item.name);
                  }
                }}>
                <rect className="plan-room-fill" x={item.x} y={item.y}
                  width={item.w} height={item.h} />
                <Furniture room={item} />
                <text x={item.x + item.w / 2} y={item.y + item.h / 2 - 5}
                  textAnchor="middle" className="plan-room-name">{item.name}</text>
                <text x={item.x + item.w / 2} y={item.y + item.h / 2 + 13}
                  textAnchor="middle" className="plan-room-area">{item.area} sq ft</text>
              </g>
            ))}

            <WindowsAndDoors />
            <rect x="20" y="20" width="560" height="290" fill="none"
              stroke="#303631" strokeWidth="3" pointerEvents="none" />
            <Dimensions />

            {/* North indicator and scale bar */}
            <g className="plan-annotation" pointerEvents="none">
              <text x="620" y="38" textAnchor="middle">N</text>
              <path d="M620 46V72M614 54L620 44L626 54" />
              <text x="620" y="84" textAnchor="middle">NORTH</text>
              <path d="M500 343H550M500 339V347M525 339V347M550 339V347" />
              <text x="525" y="336" textAnchor="middle">SCALE GUIDE</text>
              <text x="500" y="352">0</text>
              <text x="550" y="352" textAnchor="end">10 ft</text>
            </g>
          </svg>
        </div>
      </div>

      <div className="plan-room-details">
        <div>
          <span>SELECTED SPACE</span>
          <strong>{room.name}</strong>
        </div>
        <div className="plan-area">
          <span>APPROX. AREA</span>
          <strong>{room.area} <small>sq ft</small></strong>
        </div>
      </div>

      <div className="plan-legend">
        <span><i className="legend-wall" /> Wall</span>
        <span><i className="legend-window" /> Window</span>
        <span><i className="legend-door" /> Door swing</span>
        <span><i className="legend-selected" /> Selected room</span>
      </div>

      <p className="plan-disclaimer">
        Concept illustration only. Dimensions, symbols, room areas and layout are illustrative and must not be used for construction.
      </p>
    </section>
  );
}
