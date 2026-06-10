import { getStrapiURL } from "@/lib/strapi";

export interface ContactPayload {
  Name: string;
  Email: string;
  Message: string;
}

export async function submitContact(payload: ContactPayload) {
  const url = new URL("/api/contacts", getStrapiURL());

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: payload }),
    cache: "no-cache",
  });

  return response.json();
}
