import { NextResponse } from "next/server";
import { Resend } from "resend";
import { NOTIFICATION_RECIPIENTS } from "@/lib/notification-recipients";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  console.log("Contact enquiry received:", body);

  const { error } = await resend.emails.send({
    from: "STACKD Website <notifications@stackdvending.co.za>",
    to: NOTIFICATION_RECIPIENTS,
    replyTo: body.email,
    subject: `New contact form message from ${body.name}`,
    text: [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Topic: ${body.topic || "—"}`,
      "",
      `Message:`,
      body.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Failed to send contact enquiry email:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
