import { MdSettings } from "react-icons/fa";

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
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "author",
      title: "Author",
      type: "string",
    },
    {
      name: "logo",
      title: "Main Logo",
      type: "mainImage",
    },
    {
      name: "alt1logo",
      title: "Alt 1 Logo",
      type: "image",
    },
    {
      name: "alt2logo",
      title: "Alt 2 Logo",
      type: "image",
    },
    {
      name: "submarkLogo",
      title: "Submark Logo",
      type: "image",
    },
    {
      name: "primaryLight",
      title: "Primary Light",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "accentLight",
      title: "Accent Light",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "brandAccent",
      title: "Brand Accent",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "accentDark",
      title: "Accent Dark",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "primaryDark",
      title: "Primary Dark",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
  ],
};
