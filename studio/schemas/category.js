import MdApps from "react-icons/lib/md/apps";

export default {
  name: "category",
  title: "Category",
  type: "document",
  icon: MdApps,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Some frontend will require a slug to be set to be able to show the project",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    },

    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage",
      validation: Rule => Rule.required()
    }
  ]
};
