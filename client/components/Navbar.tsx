"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/Authcontent";
import { useTheme } from "@/context/ThemeContext";
import { apiRequest } from "@/lib/api";

/* ---------------------------------------
   TYPES
--------------------------------------- */

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

type AvatarProps = {
  name: string;
  size?: "sm" | "md";
};

type NavLinkProps = {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
  variant: "desktop" | "mobile";
};

/* ---------------------------------------
   NAVIGATION DATA
--------------------------------------- */

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "⚡" },
  { label: "Practice", href: "/dashboard/interview", icon: "🎯" },
  { label: "Resume", href: "/dashboard/resume", icon: "📄" },
  { label: "Career", href: "/dashboard/career", icon: "🧭" },
  { label: "Jobs", href: "/dashboard/jobs", icon: "💼" },
  { label: "Sessions", href: "/dashboard/history", icon: "📋" },
];

const profileMenuItems: NavItem[] = [
  { label: "My Profile", href: "/dashboard/profile", icon: "👤" },
  { label: "Resume Analyzer", href: "/dashboard/resume", icon: "📄" },
  { label: "Resume Builder", href: "/dashboard/resume/builder", icon: "✍️" },
  { label: "Career Roadmap", href: "/dashboard/career", icon: "🧭" },
  { label: "Job Tracker", href: "/dashboard/jobs", icon: "💼" },
  { label: "My Sessions", href: "/dashboard/history", icon: "📋" },
];

/* ---------------------------------------
   HELPERS
--------------------------------------- */

function getFirstName(name?: string | null): string {
  return name?.trim().split(" ")[0] || "User";
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/* ---------------------------------------
   AVATAR
--------------------------------------- */

function Avatar({ name, size = "sm" }: AvatarProps) {
  const sizeClass =
    size === "md" ? "h-9 w-9 text-sm" : "h-6 w-6 text-[11px]";

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white ${sizeClass}`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

/* ---------------------------------------
   BRAND
--------------------------------------- */

function Brand({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
        AI
      </div>

      <div className="leading-tight">
        <p className="text-sm font-bold text-blue-700">MockInterview</p>
        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
          AI Powered
        </p>
      </div>
    </Link>
  );
}

/* ---------------------------------------
   NAV LINK (desktop + mobile)
--------------------------------------- */

function NavLink({ item, active, onClick, variant }: NavLinkProps) {
  const base =
    variant === "desktop"
      ? "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition"
      : "flex items-center gap-2 rounded-lg px-4 py-3 text-sm transition";

  const state =
    variant === "desktop"
      ? active
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:bg-gray-100"
      : active
        ? "bg-blue-50 text-blue-700"
        : "text-gray-700 hover:bg-gray-50";

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`${base} ${state}`}
    >
      <span>{item.icon}</span>
      {item.label}
    </Link>
  );
}

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<
    Array<{ _id: string; title: string; message: string; actionUrl: string; read: boolean }>
  >([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    apiRequest<{
      unreadCount: number;
      notifications: Array<{
        _id: string;
        title: string;
        message: string;
        actionUrl: string;
        read: boolean;
      }>;
    }>("/api/notifications")
      .then((res) => {
        if (!active) return;
        setUnread(res.unreadCount || 0);
        setItems(res.notifications || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  async function handleMarkAllRead() {
    try {
      await apiRequest("/api/notifications/read-all", { method: "PATCH" });
      setUnread(0);
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      // ignore
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-sm transition hover:bg-gray-100"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-40 w-80 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <p className="text-xs font-bold text-gray-900">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={() => void handleMarkAllRead()}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="mt-2 max-h-64 space-y-2 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-4 text-center text-xs text-gray-400">
                No notifications yet.
              </p>
            ) : (
              items.slice(0, 6).map((item) => (
                <Link
                  key={item._id}
                  href={item.actionUrl || "/dashboard"}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl p-2.5 text-xs transition hover:bg-gray-50 ${
                    item.read ? "bg-white" : "bg-blue-50/60"
                  }`}
                >
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-4 text-gray-600">
                    {item.message}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------
   PROFILE DROPDOWN
--------------------------------------- */

function ProfileDropdown({
  firstName,
  email,
  isAdmin,
  logout,
}: {
  firstName: string;
  email?: string;
  isAdmin?: boolean;
  logout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      <button
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-gray-50 py-1 pl-1 pr-3 transition hover:bg-gray-100"
      >
        <Avatar name={firstName} />

        <p className="text-xs text-gray-600">
          Hi, <span className="font-bold text-gray-900">{firstName}</span>
        </p>

        <span
          className={`text-[9px] text-gray-400 transition ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-12 w-60 rounded-xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="px-3 py-3">
            <p className="text-sm font-semibold text-gray-900">
              {firstName}
            </p>

            <p className="mt-1 truncate text-xs text-gray-500">
              {email || "No email available"}
            </p>
          </div>

          <div className="my-1 border-t border-gray-100" />

          {profileMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs text-gray-700 transition hover:bg-gray-50"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-50"
            >
              <span>🛡️</span>
              Admin Console
            </Link>
          )}

          <div className="my-1 border-t border-gray-100" />

          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-red-600 transition hover:bg-red-50"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------
   MOBILE MENU
--------------------------------------- */

function MobileMenu({
  pathname,
  firstName,
  email,
  logout,
  close,
}: {
  pathname: string;
  firstName: string;
  email?: string;
  logout: () => void;
  close: () => void;
}) {
  return (
    <div className="border-t border-gray-100 bg-white px-6 py-4 md:hidden">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            active={isActivePath(pathname, item.href)}
            onClick={close}
            variant="mobile"
          />
        ))}

        <div className="my-2 border-t border-gray-100" />

        <div className="flex items-center gap-3 px-4 py-2">
          <Avatar name={firstName} size="md" />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {firstName}
            </p>

            <p className="truncate text-xs text-gray-500">
              {email || "No email available"}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/profile"
          onClick={close}
          className="rounded-lg px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
        >
          👤 My Profile
        </Link>

        <button
          onClick={() => {
            close();
            logout();
          }}
          className="rounded-lg px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}

/* ---------------------------------------
   MAIN NAVBAR
--------------------------------------- */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const firstName = getFirstName(user?.name);

  // Add a shadow once the page has been scrolled
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-white transition-shadow ${
        scrolled ? "border-gray-200 shadow-sm" : "border-gray-100"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Brand href={isLoggedIn ? "/dashboard" : "/"} />

        {/* Center links (logged in only) */}
        {isLoggedIn && (
          <nav
            className="hidden items-center gap-2 md:flex"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                item={item}
                active={isActivePath(pathname, item.href)}
                variant="desktop"
              />
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-sm transition hover:bg-gray-100"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {isLoggedIn ? (
            <>
              <NotificationBell />

              <ProfileDropdown
                firstName={firstName}
                email={user?.email}
                isAdmin={user?.role === "admin"}
                logout={logout}
              />

              <button
                onClick={() => setMenuOpen((value) => !value)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 md:hidden"
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
              >
                {menuOpen ? "✕" : "☰"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      {isLoggedIn && menuOpen && (
        <MobileMenu
          pathname={pathname}
          firstName={firstName}
          email={user?.email}
          logout={logout}
          close={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}