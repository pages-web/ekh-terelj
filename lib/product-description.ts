type DescriptionBlock = {
  type?: string;
  content?: Array<{ text?: string }>;
};

export const getProductDescriptionHtml = (description?: string) => {
  if (!description) return "";

  try {
    const blocks = JSON.parse(description) as DescriptionBlock[];

    if (!Array.isArray(blocks)) return description;

    return blocks
      .map((block) => {
        const text =
          block.content?.map((content) => content.text || "").join("") || "";

        if (!text.trim()) return "";

        if (block.type === "bulletListItem") {
          return `<ul><li>${text}</li></ul>`;
        }

        return `<p>${text}</p>`;
      })
      .join("");
  } catch {
    return description;
  }
};
