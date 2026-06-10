"use server";

import { z } from "zod";
import { submitContact } from "@/data/services/contact-service";
import type { ContactActionState } from "@/components/types/contact";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().min(1, "Email is required").email("Must be a valid email"),
  message: z.string().min(1, "Message is required").max(2000, "Message is too long"),
});

export async function handleContactAction(
  prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ...prevState,
      success: false,
      zodErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      strapiErrors: null,
      message: "Please correct the errors below.",
    };
  }

  const result = await submitContact({
    Name: parsed.data.name,
    Email: parsed.data.email,
    Message: parsed.data.message,
  });

  if (result?.error) {
    return {
      ...prevState,
      success: false,
      zodErrors: null,
      strapiErrors: result.error,
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    success: true,
    message: "Message sent.",
    zodErrors: null,
    strapiErrors: null,
  };
}

