export type ContactActionState = {
  success: boolean;
  message: string;
  zodErrors: Record<string, string[]> | null;
  strapiErrors: unknown | null;
};

export const contactInitialState: ContactActionState = {
  success: false,
  message: "",
  zodErrors: null,
  strapiErrors: null,
};
