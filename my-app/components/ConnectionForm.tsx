"use client";

import { createConnection, type ConnectionFormState } from "@/app/connections/actions";
import { useActionState, useEffect, useRef, useState } from "react";

const initial: ConnectionFormState = {};

export default function ConnectionForm() {
  const [state, formAction, pending] = useActionState(createConnection, initial);
  const formRef = useRef<HTMLFormElement>(null);
  const [testHint, setTestHint] = useState<string | null>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      setTestHint(null);
    }
  }, [state.success]);

  function handleTestClick() {
    setTestHint(null);
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const host = String(fd.get("host") ?? "").trim();
    const portRaw = String(fd.get("port") ?? "").trim();
    const port = parseInt(portRaw, 10);

    if (!name || !host || !portRaw) {
      setTestHint("Fill in database name, host, and port before testing.");
      return;
    }
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      setTestHint("Enter a valid port (1–65535).");
      return;
    }

    setTestHint(
      "Fields look valid. A real test would open a DB connection from the server — use Save to store this connection for now.",
    );
  }

  return (
    <form ref={formRef} action={formAction} className="conn-form">
      <input
        type="text"
        name="name"
        placeholder="Database Name"
        className="conn-input"
        autoComplete="off"
      />

      <input
        type="text"
        name="host"
        placeholder="Host"
        className="conn-input"
        autoComplete="off"
      />

      <div className="conn-row">
        <input
          type="text"
          name="port"
          placeholder="Port"
          className="conn-input"
          defaultValue="5432"
          inputMode="numeric"
          autoComplete="off"
        />

        <select
          name="db_type"
          className="conn-select"
          defaultValue="PostgreSQL"
        >
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MySQL">MySQL</option>
          <option value="SQL Server">SQL Server</option>
        </select>
      </div>

      <p className="conn-form-note">
        Username and password are not stored in this prototype — only name, host,
        port, and type are saved.
      </p>

      <input
        type="text"
        name="username"
        placeholder="Username (optional, not saved)"
        className="conn-input"
        autoComplete="username"
      />

      <input
        type="password"
        name="password"
        placeholder="Password (optional, not saved)"
        className="conn-input"
        autoComplete="new-password"
      />

      {state.error ? (
        <p className="conn-form-msg conn-form-msg--error" role="alert">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="conn-form-msg conn-form-msg--ok" role="status">
          Connection saved — it appears in the table below.
        </p>
      ) : null}

      {testHint ? (
        <p className="conn-form-msg conn-form-msg--muted">{testHint}</p>
      ) : null}

      <div className="conn-btn-group">
        <button
          type="button"
          className="conn-btn conn-btn--primary"
          onClick={handleTestClick}
        >
          Test Connection
        </button>
        <button
          type="submit"
          className="conn-btn conn-btn--secondary"
          disabled={pending}
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
