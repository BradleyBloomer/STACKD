import { NextResponse } from "next/server";

// TODO: wire this up to a real destination (email service, CRM, or
// spreadsheet) once that decision is made — see src/app/api/partner-enquiry
// for the same pattern. For now this just validates the payload and logs it
// so the form is fully functional end-to-end locally.
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.log("Contact enquiry received:", body);

  return NextResponse.json({ ok: true });
}
