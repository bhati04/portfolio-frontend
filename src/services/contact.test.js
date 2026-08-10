const FORM = {
  name: "  Jane Doe  ",
  email: "  JANE@EXAMPLE.COM ",
  subject: "Cloud Infrastructure",
  message: "  Please contact me about a project.  ",
  website: "",
};

function loadContactService(endpoint) {
  if (endpoint) {
    process.env.REACT_APP_CONTACT_ENDPOINT = endpoint;
  } else {
    delete process.env.REACT_APP_CONTACT_ENDPOINT;
  }
  jest.resetModules();
  return require("./contact").submitContactForm;
}

afterEach(() => {
  delete process.env.REACT_APP_CONTACT_ENDPOINT;
  delete global.fetch;
  jest.restoreAllMocks();
});

test("fails safely when the Lambda endpoint is not configured", async () => {
  const submitContactForm = loadContactService();

  await expect(submitContactForm(FORM)).rejects.toMatchObject({ code: "NOT_CONFIGURED" });
});

test("normalizes and posts a contact submission to Lambda", async () => {
  const submitContactForm = loadContactService("https://example.lambda-url.ap-south-1.on.aws/");
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 204,
    headers: { get: jest.fn().mockReturnValue("") },
  });

  await submitContactForm(FORM);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  const [endpoint, request] = global.fetch.mock.calls[0];
  expect(endpoint).toBe("https://example.lambda-url.ap-south-1.on.aws/");
  expect(request).toMatchObject({
    method: "POST",
    credentials: "omit",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
  });
  expect(JSON.parse(request.body)).toMatchObject({
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Please contact me about a project.",
    website: "",
  });
});

test("returns a useful error when Lambda throttles requests", async () => {
  const submitContactForm = loadContactService("https://example.lambda-url.ap-south-1.on.aws/");
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 429,
    headers: { get: jest.fn().mockReturnValue("application/json") },
  });

  await expect(submitContactForm(FORM)).rejects.toMatchObject({ code: "HTTP_429" });
});
