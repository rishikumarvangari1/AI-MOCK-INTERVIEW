"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontent";

export default function ProtectedRoute({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { user, isLoggedIn, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";
      router.replace(`/login${next}`);
      return;
    }

    if (requireAdmin && user?.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [isLoading, isLoggedIn, requireAdmin, user?.role, pathname, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <main
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-gray-50 px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <p className="text-sm text-gray-500">Verifying your session...</p>
      </main>
    );
  }

  if (requireAdmin && user?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
