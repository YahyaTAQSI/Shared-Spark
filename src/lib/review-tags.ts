export const encodeServiceTags = (slugs: string[]) => (slugs.length ? `,${slugs.join(",")},` : "");
export const decodeServiceTags = (value: string) => value.split(",").filter(Boolean);
