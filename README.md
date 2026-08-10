# Shelu Singh Portfolio

A static React and Tailwind portfolio. The site has no application server, database, or AWS credentials. Contact submissions are sent over HTTPS to a separately deployed AWS Lambda Function URL or API Gateway endpoint.

## Local development

Requirements: Node.js 20 LTS and npm.

```bash
npm ci
copy .env.example .env
npm start
```

Set the contact endpoint in `.env`:

```dotenv
REACT_APP_CONTACT_ENDPOINT=https://your-function-id.lambda-url.ap-south-1.on.aws/
```

Restart the development server after changing environment variables. Values prefixed with `REACT_APP_` are embedded in the browser bundle, so never store AWS keys or secrets in them.

## Contact Lambda contract

The frontend sends a JSON `POST` request with this shape:

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "subject": "Cloud Infrastructure",
  "message": "Message text",
  "website": "",
  "submittedAt": "2026-08-10T12:00:00.000Z"
}
```

The Lambda should return `200` or `204` on success. The frontend also handles validation errors (`400`/`422`), throttling (`429`), server errors, network failures, and timeouts.

Configure the Lambda separately from this frontend:

1. Create a Lambda function and send the validated message through Amazon SES or another server-side email provider.
2. Create a Function URL with public access (`NONE`) or place the function behind API Gateway. A browser cannot call an `AWS_IAM` URL without request signing.
3. Configure CORS on the Function URL itself:
   - Allowed origins: the exact production portfolio origin and local development origin.
   - Allowed methods: `POST`.
   - Allowed headers: `content-type` and `accept`.
4. Validate every field in Lambda. Treat `submittedAt` as untrusted client data, reject oversized payloads, and silently discard submissions whose `website` honeypot is populated.
5. Add reserved concurrency or API Gateway throttling, CloudWatch alarms/log retention, and an abuse-control layer such as AWS WAF or CAPTCHA when traffic warrants it.
6. Store recipient addresses and provider configuration in Lambda environment variables or Secrets Manager—not in this repository.

AWS setup reference: [Lambda Function URLs](https://docs.aws.amazon.com/lambda/latest/dg/urls-configuration.html).

## Production build

```bash
npm ci
npm run build
```

Set `REACT_APP_CONTACT_ENDPOINT` in the hosting provider's production environment before building. Deploy the generated `build` directory to a static host such as AWS Amplify, S3/CloudFront, Vercel, or Netlify.

Recommended hosting headers:

- `Content-Security-Policy` tailored to the portfolio origin, Google Fonts, images, and the Lambda endpoint.
- `Strict-Transport-Security`.
- `X-Content-Type-Options: nosniff`.
- `Permissions-Policy` with unused browser capabilities disabled.
- Long-lived immutable caching for hashed files under `/static`, but not for `index.html`.
