import { createSupabaseAdmin } from "@/lib/supabase/admin";

export type ConnectionRow = {
  id: string;
  name: string;
  db_type: string;
  host: string;
  port: number;
};

export async function listConnections(): Promise<{
  rows: ConnectionRow[];
  error: string | null;
  envError: string | null;
}> {
  let envError: string | null = null;
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    envError =
      "Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.";
    return { rows: [], error: null, envError };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("connections")
      .select("id, name, db_type, host, port")
      .order("created_at", { ascending: true });

    if (error) {
      return { rows: [], error: error.message, envError: null };
    }

    return {
      rows: (data ?? []) as ConnectionRow[],
      error: null,
      envError: null,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return { rows: [], error: msg, envError: null };
  }
}

export async function insertConnection(input: {
  name: string;
  db_type: string;
  host: string;
  port: number;
}): Promise<{ error: string | null }> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return { error: "Missing Supabase environment variables in .env.local." };
  }

  try {
    const supabase = createSupabaseAdmin();
    const { error } = await supabase.from("connections").insert(input);
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to save connection.";
    return { error: msg };
  }
}
