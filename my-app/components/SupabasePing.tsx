import { createSupabaseAdmin } from "@/lib/supabase/admin";

export default async function SupabasePing() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return (
      <div className="dash-card">
        <h2 className="dash-card__title">Supabase check</h2>
        <p className="dash-text">
          Add{" "}
          <code className="rounded bg-black/10 px-1 py-0.5 text-sm">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-black/10 px-1 py-0.5 text-sm">
            SUPABASE_SERVICE_ROLE_KEY
          </code>{" "}
          to <code className="rounded bg-black/10 px-1 py-0.5 text-sm">.env.local</code>, then restart{" "}
          <code className="rounded bg-black/10 px-1 py-0.5 text-sm">npm run dev</code>.
        </p>
      </div>
    );
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("hello")
    .select("message")
    .limit(1)
    .maybeSingle();

  if (error) {
    return (
      <div className="dash-card">
        <h2 className="dash-card__title">Supabase check</h2>
        <p className="dash-text text-red-700">
          Error: {error.message}
          {error.hint ? ` — ${error.hint}` : ""}
        </p>
        <p className="dash-text mt-2 text-sm opacity-80">
          Create table <code className="rounded bg-black/10 px-1">hello</code> in Supabase (see{" "}
          <code className="rounded bg-black/10 px-1">.env.example</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="dash-card">
      <h2 className="dash-card__title">Supabase check</h2>
      {data?.message ? (
        <p className="dash-text">
          Connected — read from DB: <strong>{data.message}</strong>
        </p>
      ) : (
        <p className="dash-text">
          Connected, but <code className="rounded bg-black/10 px-1">hello</code> has no rows yet.
          Insert one in the Supabase Table Editor.
        </p>
      )}
      <p className="dash-text mt-2 text-sm opacity-80">
        Or open{" "}
        <code className="rounded bg-black/10 px-1">GET /api/supabase-check</code> in the browser.
      </p>
    </div>
  );
}
