import ConnectionForm from "../../components/ConnectionForm";
import ConnectionsTable from "../../components/ConnectionsTable";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export const dynamic = "force-dynamic";

export default function ConnectionsPage() {
  return (
    <div className="db-layout">
      <Sidebar current="Connections" />

      <main className="db-main">
        <Topbar
          title="Connections"
          text="Add and manage database connections."
        />

        <div className="conn-card">
          <h2 className="conn-card__title">Add Connection</h2>
          <ConnectionForm />
        </div>

        <div className="conn-card">
          <h2 className="conn-card__title">Saved Connections</h2>
          <ConnectionsTable />
        </div>
      </main>
    </div>
  );
}