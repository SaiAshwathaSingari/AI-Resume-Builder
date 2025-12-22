import React, { useState, useRef, useEffect } from "react";

const ACCENT_COLORS = [
  "#3b82f6", // Blue
  "#16a34a", // Green
  "#7c3aed", // Purple
  "#dc2626", // Red
  "#ea580c", // Orange
  "#f59e0b", // Amber
  "#0f766e", // Teal
  "#0891b2", // Cyan
  "#9333ea", // Violet
  "#374151", // Gray
  "#111827", // Black
];

function AccentSelector({ data, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Accent Color
      </label>

      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50"
      >
        <span className="flex items-center gap-2">
          <span
            className="h-4 w-4 rounded-full border border-black/10"
            style={{ backgroundColor: data.accent_color }}
          />
          Select color
        </span>
        <span className="text-xs text-gray-500">▼</span>
      </button>

      {/* Color picker panel */}
      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border border-black/10 bg-white p-3 shadow-lg">
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((color) => {
              const selected = data.accent_color === color;

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setOpen(false);
                  }}
                  className={`h-9 w-9 rounded-full transition
                    ${
                      selected
                        ? "ring-2 ring-black ring-offset-2"
                        : "hover:scale-105"
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select accent color ${color}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AccentSelector;
