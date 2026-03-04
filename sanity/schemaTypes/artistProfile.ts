import { defineField, defineType } from "sanity";

export const artistProfile = defineType({
  name: "artistProfile",
  title: "Artist Profile",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "portrait", title: "Portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "shortBio", title: "Short Bio", type: "text" }),
    defineField({ name: "statement", title: "Artist Statement", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "email", title: "Public Email (optional)", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
  ],
});