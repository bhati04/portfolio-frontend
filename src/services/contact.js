const CONTACT_ENDPOINT = process.env.REACT_APP_CONTACT_ENDPOINT?.trim();
const REQUEST_TIMEOUT_MS = 15000;

class ContactRequestError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "ContactRequestError";
    this.code = code;
  }
}

function validateEndpoint() {
  if (!CONTACT_ENDPOINT) {
    throw new ContactRequestError(
      "The contact form is temporarily unavailable. Please email me directly instead.",
      "NOT_CONFIGURED"
    );
  }

  let url;
  try {
    url = new URL(CONTACT_ENDPOINT);
  } catch {
    throw new ContactRequestError("The contact form endpoint is misconfigured.", "INVALID_ENDPOINT");
  }

  const isLocalDevelopment =
    process.env.NODE_ENV !== "production" &&
    url.protocol === "http:" &&
    ["localhost", "127.0.0.1"].includes(url.hostname);

  if (url.protocol !== "https:" && !isLocalDevelopment) {
    throw new ContactRequestError("The contact form endpoint must use HTTPS.", "INSECURE_ENDPOINT");
  }

  return url.toString();
}

function messageForStatus(status) {
  if (status === 400 || status === 422) {
    return "Please check the form fields and try again.";
  }
  if (status === 429) {
    return "Too many messages were sent recently. Please wait a moment and try again.";
  }
  if (status >= 500) {
    return "The contact service is temporarily unavailable. Please try again later.";
  }
  return "Your message could not be sent. Please try again.";
}

export async function submitContactForm(form) {
  const endpoint = validateEndpoint();
  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = window.setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  const payload = {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    subject: form.subject,
    message: form.message.trim(),
    website: form.website,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "omit",
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ContactRequestError(messageForStatus(response.status), `HTTP_${response.status}`);
    }

    if (response.status === 204) return null;

    const contentType = response.headers.get("content-type") || "";
    return contentType.includes("application/json") ? response.json() : null;
  } catch (error) {
    if (error instanceof ContactRequestError) throw error;
    if (error.name === "AbortError" && timedOut) {
      throw new ContactRequestError(
        "The request timed out. Please check your connection and try again.",
        "TIMEOUT"
      );
    }
    throw new ContactRequestError(
      "Unable to reach the contact service. Please check your connection or email me directly.",
      "NETWORK_ERROR"
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}
