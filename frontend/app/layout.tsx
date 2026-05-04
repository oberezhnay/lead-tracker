import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lead Tracker",
  description: "Managing leads CRM",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-5xl mx-auto py-10 px-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Lead Tracker</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
