"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateLeadPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
    value: "",
    notes: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email || undefined,
        company: form.company || undefined,
        status: form.status,
        value: form.value ? parseFloat(form.value) : undefined,
        notes: form.notes || undefined,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || "Failed to create lead");
      setLoading(false);
      return;
    }

    const lead = await res.json();
    setLoading(false);
    router.push(`/leads/${lead.id}`); 
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">Create New Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded-lg p-6">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Company</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="in_progress">In Progress</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Value</label>
          <input
            type="number"
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {loading ? "Creating..." : "Create Lead"}
        </button> 
      </form>
    </div>
  )
};
