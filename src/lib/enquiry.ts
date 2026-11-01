// Both website forms post here. The address receives the enquiry, saves it and emails
// the resort. Reports failure honestly: a form must never say "thank you" for an
// enquiry that went nowhere, which is what the preview build did until 01/11/2026.
const ENDPOINT = 'https://launcht.app.n8n.cloud/webhook/blue-whale-enquiry';

export async function sendEnquiry(data: Record<string, unknown>): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, page: window.location.pathname }),
  });
  if (!res.ok) throw new Error(`Enquiry not sent (${res.status})`);
}
