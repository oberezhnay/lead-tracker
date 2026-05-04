"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LeadsFilters() {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") || "")
  const [status, setStatus] = useState(params.get("status") || "");
  const [sort, setSort] = useState(params.get("sort") || "createdAt");
  const [order, setOrder] = useState(params.get("order") || "desc");
  const [limit, setLimit] = useState(params.get("limit") || "10");

  function applyFilters() {
    const query = new URLSearchParams();

    if (q) query.set("q", q);
    if (status) query.set("status", status);

    query.set("sort", sort); 
    query.set("order", order);
    query.set("limit", limit);
    query.set("page", "1");

    router.push(`/leads?${query.toString()}`);
  }

  function resetFilters() {
    setQ("");
    setStatus("");
    setSort("createdAt");
    setOrder("desc");
    router.push("/leads");
  }
  
    return (
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-3 items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, email, or company"
          className="border rounded p-2"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>

        <div className="flex gap-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded p-2 "
          >
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border rounded p-2"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>

        <select
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="border rounded p-2"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Apply
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-300 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Reset              
          </button>
        </div>
      </div>
    )
}