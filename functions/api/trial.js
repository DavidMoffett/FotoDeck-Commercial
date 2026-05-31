// START FOTODECK COMMERCIAL TRIAL FUNCTION

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();

    const name = cleanText(formData.get("name"));
    const email = cleanText(formData.get("email"));
    const business = cleanText(formData.get("business"));
    const shoots = cleanText(formData.get("shoots"));
    const message = cleanText(formData.get("message"));

    if (!name || !email) {
      return htmlResponse(
        "Missing details",
        "Please go back and enter your name and email address.",
        400
      );
    }

    if (!env.RESEND_API_KEY) {
      return htmlResponse(
        "Email is not configured",
        "The trial request could not be sent because email is not configured yet.",
        500
      );
    }

    const emailBody = [
      "New FotoDeck Commercial trial request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Photography/business name: ${business || "Not provided"}`,
      `What they shoot: ${shoots || "Not provided"}`,
      "",
      "Message:",
      message || "Not provided"
    ].join("\n");

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "FotoDeck Trial <downloads@fotodeck.app>",
        to: ["info@fotodeck.app"],
        reply_to: email,
        subject: "FotoDeck trial request",
        text: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();

      return htmlResponse(
        "Trial request not sent",
        `Resend returned an error: ${escapeHtml(errorText)}`,
        500
      );
    }

    return htmlResponse(
      "Trial request sent",
      "Thanks. Your FotoDeck trial request has been sent."
    );
  } catch (error) {
    return htmlResponse(
      "Something went wrong",
      `The trial request could not be sent. ${escapeHtml(error.message || "Unknown error")}`,
      500
    );
  }
}

export async function onRequestGet() {
  return htmlResponse(
    "FotoDeck Commercial",
    "This address handles trial requests from the FotoDeck Commercial page."
  );
}

function cleanText(value) {
  if (!value) {
    return "";
  }

  return String(value).trim().slice(0, 2000);
}

function htmlResponse(title, message, status = 200) {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      background: #f4f4f1;
      color: #171717;
    }

    main {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 28px;
    }

    section {
      width: 100%;
      max-width: 620px;
      padding: 36px;
      border-radius: 34px;
      background: #ffffff;
      border: 1px solid #e1e1dc;
    }

    p.brand {
      margin: 0 0 42px;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      font-size: clamp(40px, 7vw, 72px);
      line-height: 0.95;
      letter-spacing: -0.06em;
    }

    p {
      margin: 22px 0 0;
      font-size: 19px;
      line-height: 1.4;
      color: #555555;
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 52px;
      margin-top: 30px;
      padding: 0 24px;
      border-radius: 999px;
      background: #171717;
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <main>
    <section>
      <p class="brand">FOTODECK</p>
      <h1>${escapeHtml(title)}</h1>
      <p>${escapeHtml(message)}</p>
      <a href="/">Back to FotoDeck</a>
    </section>
  </main>
</body>
</html>`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    }
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// END FOTODECK COMMERCIAL TRIAL FUNCTION
