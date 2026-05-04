"use client";

import { useState } from "react";

export default function AddComment({ leadId }: { leadId: string }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${leadId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    setText("");
    setLoading(false);

    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3">
      <textarea
        className="w-full border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        disabled={loading}
        required
      />

      <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        {loading ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
}