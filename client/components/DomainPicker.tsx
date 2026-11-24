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
      className={`group flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition-all duration-200 ${
        highlighted
          ? "border-blue-500 bg-blue-50/80 shadow-sm ring-1 ring-blue-300 dark:border-blue-500 dark:bg-blue-950/40 dark:ring-blue-900/60"
          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-800/70 dark:hover:border-slate-700 dark:hover:bg-slate-800"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-xl shadow-xs ring-1 ring-gray-200/80 transition-transform duration-200 group-hover:scale-110 dark:bg-slate-700 dark:ring-slate-600">
        {domain.icon}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
          {domain.title}
        </span>

        <span className="mt-0.5 line-clamp-1 block text-[11px] leading-4 text-gray-500 dark:text-slate-400">
          {domain.description}
        </span>
      </span>

      <span
        className={`text-sm transition-transform duration-200 group-hover:translate-x-0.5 ${
          highlighted
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-300 group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400"
        }`}
      >
        →
      </span>
    </button>
  );
}

export default function DomainPicker({ open, onClose }: DomainPickerProps) {
  const router = useRouter();
  const [highlightedId, setHighlightedId] = useState<string>(DOMAINS[0].id);
  const [search, setSearch] = useState("");

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

  const filteredDomains = search.trim()
    ? DOMAINS.filter(
        (d) =>
          d.title.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase())
      )
    : DOMAINS;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs transition-opacity"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="domain-picker-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl transition-all dark:border-slate-800 dark:bg-slate-900 sm:p-8"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              Technical Domain Catalog
            </span>
            <h2
              id="domain-picker-title"
              className="mt-1.5 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-2xl"
            >
              Pick an Interview Domain
            </h2>

            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
              Choose from {DOMAINS.length} technical domains for a live 10-question AI assessment
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500 transition hover:bg-gray-200 hover:text-gray-800 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Search bar inside domain picker */}
        <div className="mt-5">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search domains (e.g. Python, Full Stack, DevOps, AI, Cybersecurity)..."
            aria-label="Search domains"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400 dark:focus:border-blue-400 dark:focus:bg-slate-800 dark:focus:ring-blue-900/30"
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {filteredDomains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              highlighted={highlightedId === domain.id}
              onHover={() => setHighlightedId(domain.id)}
              onSelect={() => handleSelect(domain)}
            />
          ))}
          {filteredDomains.length === 0 && (
            <p className="col-span-full py-8 text-center text-xs text-gray-500 dark:text-slate-400">
              No domains matched &quot;{search}&quot;. Try searching for &quot;Python&quot;, &quot;Java&quot;, &quot;Cloud&quot; or &quot;Full Stack&quot;.
            </p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-slate-800">
          <p className="text-[11px] text-gray-400 dark:text-slate-500">
            Tip: You can also configure a custom domain in the Interview Studio.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
