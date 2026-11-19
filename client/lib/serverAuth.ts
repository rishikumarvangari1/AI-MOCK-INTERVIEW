export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: "student" | "admin";
};

const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export async function getUserFromRequest(
  req: Request
): Promise<AuthUser | null> {
  const authorization = req.headers.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: authorization },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    const user = data.user ?? data;
    const id = user?.id ?? user?._id;

    if (!id) return null;

    return {
      id: String(id),
      name: String(user.name ?? ""),
      email: String(user.email ?? ""),
      role: user.role === "admin" ? "admin" : "student",
    };
  } catch {
    return null;
  }
}
