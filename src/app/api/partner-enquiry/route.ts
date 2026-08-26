import { NextResponse } from "next/server";
import { Resend } from "resend";
import { NOTIFICATION_RECIPIENTS } from "@/lib/notification-recipients";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.venueName || !body.contactName || !body.email || !body.venueType) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.log("Partner enquiry received:", body);

  const { error } = await resend.emails.send({
    from: "STACKD Website <notifications@stackdvending.co.za>",
    to: NOTIFICATION_RECIPIENTS,
    replyTo: body.email,
    subject: `New partner enquiry: ${body.venueName}`,
    text: [
      `Venue name: ${body.venueName}`,
      `Contact name: ${body.contactName}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || "—"}`,
      `Venue type: ${body.venueType}`,
      `City: ${body.city || "—"}`,
      `Estimated weekly foot traffic: ${body.footTraffic || "—"}`,
      "",
      `Message:`,
      body.message || "—",
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send partner enquiry email:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
