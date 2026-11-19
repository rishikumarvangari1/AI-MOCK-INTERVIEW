"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DOMAINS, type Domain } from "@/lib/domains";

type DomainPickerProps = {
  open: boolean;
  onClose: () => void;
};

function DomainCard({
  domain,
  highlighted,
  onHover,
  onSelect,
}: {
  domain: Domain;
  highlighted: boolean;
  onHover: () => void;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
        highlighted
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-xl shadow-sm ring-1 ring-gray-100">
        {domain.icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">
          {domain.title}
        </span>

        <span className="mt-0.5 block text-[11px] text-gray-500">
          {domain.description}
        </span>
      </span>

      {highlighted && <span className="text-sm text-gray-400">→</span>}
    </button>
  );
}

export default function DomainPicker({ open, onClose }: DomainPickerProps) {
  const router = useRouter();
  const [highlightedId, setHighlightedId] = useState<string>(DOMAINS[0].id);

  useEffect(() => {
    if (!open) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSelect(domain: Domain) {
    onClose();
    router.push(`/dashboard/interview?domain=${domain.id}`);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-picker-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="domain-picker-title"
              className="text-lg font-bold text-gray-900"
            >
              Pick a Domain
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Choose the career domain you want to be interviewed for
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-600 transition hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DOMAINS.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              highlighted={highlightedId === domain.id}
              onHover={() => setHighlightedId(domain.id)}
              onSelect={() => handleSelect(domain)}
            />
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-medium text-gray-500 transition hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
