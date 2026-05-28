import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return json(503, { error: "Contact form is not configured" });
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body || "{}") as ContactPayload;
  } catch {
    return json(400, { error: "Invalid request body" });
  }

  const name = payload.name?.trim() || "";
  const email = payload.email?.trim() || "";
  const subject = payload.subject?.trim() || "";
  const message = payload.message?.trim() || "";

  if (!name || !email || !subject || !message) {
    return json(400, { error: "All fields are required" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(400, { error: "Invalid email address" });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `[Contact] ${subject}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return json(502, { error: "Failed to send message" });
  }

  return json(200, { success: true });
};
