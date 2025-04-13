import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !phone || !message) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`;

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM, // from: info@yourdomain.com
      to: process.env.EMAIL_TO, // to: your@receivingmail.com
      subject: `New message from ${fullName}`,
      reply_to: email,
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return Response.json(
      { message: "Email sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email send error:", error);
    return Response.json(
      { message: "Failed to send email", error },
      { status: 500 }
    );
  }
}
