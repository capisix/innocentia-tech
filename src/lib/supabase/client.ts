// =============================================================================
// INNOCENTIA TECH • SUPABASE DATABASE & BACKEND REST CLIENT
// =============================================================================

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const cleanUrl = rawUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  return {
    url: cleanUrl,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  };
};

export const isSupabaseConfigured = (): boolean => {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith("http"));
};

/**
 * Executes a direct REST query against Supabase with graceful fallback
 */
export async function supabaseRestQuery<T>(
  table: string,
  options?: {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: any;
    params?: Record<string, string>;
  }
): Promise<{ data: T | null; error: string | null }> {
  const { url, anonKey } = getSupabaseConfig();

  if (!isSupabaseConfigured()) {
    return { data: null, error: "SUPABASE_NOT_CONFIGURED" };
  }

  try {
    const queryParams = new URLSearchParams(options?.params || {}).toString();
    const endpoint = `${url}/rest/v1/${table}${queryParams ? `?${queryParams}` : ""}`;

    const res = await fetch(endpoint, {
      method: options?.method || "GET",
      headers: {
        "apikey": anonKey,
        "Authorization": `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
      body: options?.body ? JSON.stringify(options?.body) : undefined,
    });

    if (!res.ok) {
      const errText = await res.text();
      return { data: null, error: errText || `HTTP error ${res.status}` };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message || "Failed to communicate with Supabase" };
  }
}
