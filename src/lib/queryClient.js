import { QueryClient } from "@tanstack/react-query";

// Read backend origin from env, e.g. VITE_API_BASE_URL=http://localhost:3000
const API_BASE =
  (import.meta.env?.VITE_API_BASE_URL || "")
    .toString()
    .replace(/\/+$/, ""); // trim trailing slash

const isAbsoluteUrl = (u) => /^https?:\/\//i.test(u);

// Build a full URL from a path or absolute URL
const resolveUrl = (u) => {
  if (!u) return u;
  if (isAbsoluteUrl(u)) return u;
  const path = u.startsWith("/") ? u : `/${u}`;
  // If API_BASE is empty, we'll still return a relative path (useful for SSR/proxy)
  return `${API_BASE}${path}`;
};

async function throwIfResNotOk(res) {
  if (!res.ok) {
    // Try parse JSON error; fall back to text/status
    let message;
    try {
      const text = await res.text();
      message = text || res.statusText;
    } catch {
      message = res.statusText;
    }
    throw new Error(`${res.status}: ${message}`);
  }
}

// Generic JSON request with credentials passthrough
export async function apiRequest(method, url, data) {
  const fullUrl = resolveUrl(url);
  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });
  await throwIfResNotOk(res);
  return res;
}

// Query function factory (kept behavior)
export const getQueryFn =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    // Turn queryKey into a path like "/api/users/123"
    // If the key already contains absolute URL parts, respect them.
    const joined =
      Array.isArray(queryKey) ? queryKey.map(String).join("/") : String(queryKey || "");
    const urlLike = joined.startsWith("/") ? joined : `/${joined}`;
    const fullUrl = resolveUrl(urlLike);

    const res = await fetch(fullUrl, { credentials: "include" });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    // Some endpoints may return empty body (204 etc.)
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
