import { NextResponse } from 'next/server';

let contactRequests = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Interested in your services.',
    date: '2024-10-15',
  },
];

// GET: Fetch contact requests
export async function GET() {
  return NextResponse.json({ results: contactRequests });
}

// POST: Add a new contact request
export async function POST(req: Request) {
  const data = await req.json();
  const newRequest = {
    ...data,
    id: String(contactRequests.length + 1),
    date: new Date().toISOString(),
  };
  contactRequests.push(newRequest);

  return NextResponse.json({ message: 'Contact request saved successfully!' }, { status: 201 });
}