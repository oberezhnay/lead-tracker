import { redirect } from "next/navigation";
import AddComment from "./AddComment";
import CommentsList from "./CommentsList";

interface LeadPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getLead(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch lead');
  }

  return res.json();
}

export default async function LeadPage({ params }: LeadPageProps) {
  const { id } = await params;
  const lead = await getLead(id);

  async function updateLead(formData: FormData) {
    "use server";

    const body = { 
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      status: formData.get('status'),
      value: Number(formData.get('value')),
      notes: formData.get('notes'),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    redirect(`/leads/${id}`);
  }

  async function deleteLead() {
    "use server";

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/${id}`, {
      method: "DELETE"
    });
    redirect("/leads");
  }
  return (
    
    <div className="space-y-10">
      
      <div className="flex items-center justify-between">
        <a href="/leads" className="text-blue-600 hover:underline">
          &larr; Back to Leads
        </a>

         <h2 className="text-2xl font-semibold mt-4 mb-6">{lead.name}</h2>

        <form 
          action={deleteLead} 
          className="space-y-4 bg-white p-6 rounded shadow mb-10"
        >
          <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Delete Lead
          </button>
        </form>
      </div>

      <form 
        action={updateLead} 
        className="space-y-4 bg-white p-6 rounded shadow mb-10"
      >
        <input 
          name="name" 
          defaultValue={lead.name} 
          className="border p-2 w-full"
          placeholder="Name" 
        />
        <input 
          name="email" 
          defaultValue={lead.email} 
          className="border p-2 w-full" 
          placeholder="Email" 
        />
        <input 
          name="company" 
          defaultValue={lead.company} 
          className="border p-2 w-full" 
          placeholder="Company" 
        />
        <select 
          name="status" 
          defaultValue={lead.status} 
          className="border p-2 w-full" 
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In Progress</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        <input 
          name="value" 
          defaultValue={lead.value} 
          className="border p-2 w-full" 
          placeholder="Value" 
        />
        <textarea 
          name="notes" 
          defaultValue={lead.notes} 
          className="border p-2 w-full" 
          placeholder="Notes" 
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </form>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <CommentsList comments={lead.comments} />
        <AddComment leadId={id} />
      </div>
    </div>
  );
}