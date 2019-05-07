import MdSettings from "react-icons/lib/md/settings";

export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  icon: MdSettings,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "description",
      title: "Description",
      type: "text"
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    },
    {
      name: "author",
      title: "Author",
      type: "string"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage"
    },
    {
      name: "primaryLight",
      title: "Primary Light",
      type: "color",
      options: {
        disableAlpha: true
      }
    },
    {
      name: "accentLight",
      title: "Accent Light",
      type: "color",
      options: {
        disableAlpha: true
      }
    },
    {
      name: "brandAccent",
      title: "Brand Accent",
      type: "color",
      options: {
        disableAlpha: true
      }
    },
    {
      name: "accentDark",
      title: "Accent Dark",
      type: "color",
      options: {
        disableAlpha: true
      }
    },
    {
      name: "primaryDark",
      title: "Primary Dark",
      type: "color",
      options: {
        disableAlpha: true
      }
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
