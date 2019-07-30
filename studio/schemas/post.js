export default {
  name: "post",
  title: "Portfolio Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        maxLength: 96
      }
    },
    {
      name: "columns",
      title: "Columns",
      description:
        "The portfolio is setup to be 8 columns wide. This field is to choose how many columns this image will occupy. It is recommended to use columns widths of 1, 2, 4, or 8",
      type: "number"
    },
    {
      name: "rows",
      title: "Rows",
      description:
        "The portfolio is setup to be grid 8 columns wide. This field is to choose how many rows this image will occupy. Use columns and rows to determine aspect ratio, eg 4 columns and 4 rows will be a square aspect ratio",
      type: "number"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage"
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "blockText"
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }]
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],
  orderings: [
    {
      title: "Publishing date new–>old",
      name: "publishingDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }, { field: "title", direction: "asc" }]
    },
    {
      title: "Publishing date old->new",
      name: "publishingDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }, { field: "title", direction: "asc" }]
    }
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      image: "mainImage"
    },
    prepare({ title = "No title", publishedAt, image }) {
      return {
        title,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString()
          : "Missing publishing date",
        media: image
      };
    }
  }
};
