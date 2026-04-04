import { createSupabaseAdmin } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

/**
 * GET /api/supabase-check
 * Smoke test: reads one row from table `hello` (create it in Supabase SQL Editor).
 */
export async function GET() {
  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("hello")
      .select("message")
      .limit(1)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message, hint: error.hint },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: data?.message ?? null,
      note: data
        ? undefined
        : "Table exists but is empty — insert a row in Supabase Table Editor.",
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
