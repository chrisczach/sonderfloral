export default function resolveProductionUrl(document) {
  const { _type } = document;

  let path = "";
  if (_type === "category") {
    const {
      slug: { current }
    } = document;
    path = `projects/${current}`;
  } else if (_type === "page") {
    const { _id } = document;
    if (_id.endsWith("home")) {
      path = "";
    } else if (_id.endsWith("about")) {
      path = "about";
    } else if (_id.endsWith("contact")) {
      path = "contact";
    }
  } else if (_type === "project") {
    const {
      slug: { current },
      categories: { _ref }
    } = document;

    path = `preview?category=${_ref}&project=${current}`;
  }

  return `https://sonderpreview.herokuapp.com/${path}`;
}
