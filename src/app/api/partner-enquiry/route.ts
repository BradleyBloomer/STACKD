import { NextResponse } from "next/server";

// TODO: wire this up to a real destination (email service, CRM, or spreadsheet)
// once that decision is made — see Phase 1 missing-info notes. For now this
// just validates the payload and logs it so the form is fully functional
// end-to-end locally.
export async function POST(request: Request) {
  const body = await request.json();

  if (!body.venueName || !body.contactName || !body.email || !body.venueType) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.log("Partner enquiry received:", body);

  return NextResponse.json({ ok: true });
}
