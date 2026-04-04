import { listConnections } from "@/lib/data/connections";

export default async function ConnectionsTable() {
  const { rows, error, envError } = await listConnections();

  if (envError) {
    return (
      <p className="conn-table-hint">{envError}</p>
    );
  }

  if (error) {
    return (
      <div className="conn-table-hint">
        <p>Could not load connections: {error}</p>
        <p className="mt-2 text-sm opacity-80">
          Create the table and seed rows from{" "}
          <code className="rounded bg-black/10 px-1">supabase/seed-test-data.sql</code>{" "}
          in the Supabase SQL Editor.
        </p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <p className="conn-table-hint">
        No rows yet. Run{" "}
        <code className="rounded bg-black/10 px-1">supabase/seed-test-data.sql</code>{" "}
        in Supabase, then refresh.
      </p>
    );
  }

  return (
    <table className="conn-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Host</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.db_type}</td>
            <td>
              {row.host}:{row.port}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
