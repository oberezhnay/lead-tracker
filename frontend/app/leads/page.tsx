import LeadsFilters from "./LeadsFilter";

function normalizeSearchParams(params: any) {
  const obj: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && typeof key === "string") {
      obj[key] = String(value);
    }
  }

  return obj;
}

async function  getLeads(params: any) {
  const safeParams = normalizeSearchParams(params);
  const query = new URLSearchParams(safeParams).toString();
  const base_Url = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const res = await fetch(`${base_Url}/api/leads?${query}`, {cache: 'no-store'});

    if (!res.ok) {
      throw new Error('Failed to fetch leads');
    }

    return res.json();
    }  catch (error) { 
      console.error('Error fetching leads:', error);
      throw error;
    }
}

export default async function LeadsPage({ searchParams }: any) {
  const params = await searchParams;
  const data = await getLeads(params);

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const totalPages = Math.ceil(data.total / limit);
  
  if (!data.items || data.items.length === 0) {
    return (
      <div className="p6">
        <LeadsFilters />

        <h2 className="text-2xl font-semibold mb-6">Leads</h2>
        <p className="text-gray-600">No leads found.</p>

        <div className="mt-6">
          <a 
            href="/leads/new" 
            className="inline-block mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Create New Lead
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Leads</h2>

      <LeadsFilters />

      <a 
        href="/leads/new" 
        className="inline-block mb-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        Create New Lead
      </a>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          
          <tbody>
            {data.items.map((lead: any) => (
              <tr 
                key={lead.id} 
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="py-2 px-4">
                  <a href={`/leads/${lead.id}`} className="text-blue-600 hover:underline">
                    {lead.name}
                  </a>
                </td>
                <td className="py-2 px-4">{lead.email || 'N/A'}</td>
                <td className="py-2 px-4">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 mt-6">
          {page > 1 && (
            <a 
              href={`/leads?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`} 
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Previous
            </a>
          )}

          {page < totalPages && (
            <a 
              href={`/leads?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}  
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            >
              Next
            </a>
          )}
        </div>
      </div>
    </div>
  );
}