"use server";

import { insertConnection } from "@/lib/data/connections";
import { revalidatePath } from "next/cache";

export type ConnectionFormState = {
  error?: string;
  success?: boolean;
};

export async function createConnection(
  _prev: ConnectionFormState,
  formData: FormData,
): Promise<ConnectionFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const host = String(formData.get("host") ?? "").trim();
  const portRaw = String(formData.get("port") ?? "").trim();
  const db_type = String(formData.get("db_type") ?? "").trim();

  if (!name || !host || !portRaw || !db_type) {
    return {
      error: "Please fill in database name, host, port, and database type.",
    };
  }

  const port = parseInt(portRaw, 10);
  if (Number.isNaN(port) || port < 1 || port > 65535) {
    return { error: "Port must be a number between 1 and 65535." };
  }

  const { error } = await insertConnection({ name, host, port, db_type });
  if (error) {
    return { error };
  }

  revalidatePath("/connections");
  return { success: true };
}
