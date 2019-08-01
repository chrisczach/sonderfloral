export default {
  name: "page",
  title: "Page",
  type: "document",
  liveEdit: true,
  __experimental_actions: ["update", "publish" /* 'create', 'delete' */],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string"
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "mainImage"
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent"
    }
  ],
  preview: {
    select: {
      image: "mainImage"
    },
    prepare({ image }) {
      return {
        media: image
      };
    }
  }
};
