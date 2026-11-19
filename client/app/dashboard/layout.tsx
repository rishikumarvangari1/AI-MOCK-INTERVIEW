"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/Authcontent";

type SidebarItem = {
  label: string;
  href: string;
  icon: string;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "⚡" },
  { label: "Resume Analyzer", href: "/dashboard/resume", icon: "📄" },
  { label: "Job Matching", href: "/dashboard/jobs", icon: "💼" },
  { label: "Skill Gap Analysis", href: "/dashboard/skills", icon: "🧩" },
  { label: "Learning Roadmap", href: "/dashboard/roadmap", icon: "🗺️" },
  { label: "AI Mock Interview", href: "/dashboard/interview", icon: "🎤" },
  { label: "Interview History", href: "/dashboard/history", icon: "📋" },
  { label: "Analytics", href: "/dashboard/analytics", icon: "📊" },
  { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

function isLinkActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1440px]">
      <aside
        aria-label="Workspace sidebar"
        className="no-print hidden w-60 shrink-0 border-r border-gray-200 bg-white px-3 py-6 lg:block"
      >
        <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Career Platform
        </p>

        <nav className="mt-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const active = isLinkActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                  active
                    ? "bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-cyan-500/10 text-blue-700 ring-1 ring-blue-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-100 bg-red-50/70 px-3 py-2.5 text-xs font-bold text-red-700 transition hover:bg-red-100"
            >
              <span aria-hidden="true">🛡️</span>
              <span>Admin Console</span>
            </Link>
          )}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
