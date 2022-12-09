import urlSlug, { revert, TITLECASE_TRANSFORMER } from "url-slug";

export const slugify = (text: string) => urlSlug(text);

export const unslugify = (text: string, transformer = TITLECASE_TRANSFORMER) =>
  revert(text, { transformer });
