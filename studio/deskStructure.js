import S from "@sanity/desk-tool/structure-builder";
import { MdBusiness, MdSettings, FaFileO } from "react-icons/fa";

const hiddenTypes = [
  "category",
  "companyInfo",
  "page",
  "person",
  "post",
  "project",
  "siteSettings",
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(S.editor().id("siteSettings").schemaType("siteSettings").documentId("siteSettings"))
        .icon(MdSettings),
      S.listItem()
        .title("Company Info")
        .child(S.editor().id("companyInfo").schemaType("companyInfo").documentId("companyInfo"))
        .icon(MdBusiness),
      S.listItem().title("Projects").schemaType("project").child(S.documentTypeList("project")),
      S.listItem()
        .title("Portfolio posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Portfolio posts")),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home")
                .child(S.editor().id("homePage").schemaType("page").documentId("home"))
                .icon(FaFileO),
              S.listItem()
                .title("About")
                .child(S.editor().id("aboutPage").schemaType("page").documentId("about"))
                .icon(FaFileO),
              S.listItem()
                .title("Elopements")
                .child(S.editor().id("elopementsPage").schemaType("page").documentId("elopements"))
                .icon(FaFileO),
              S.listItem()
                .title("Contact")
                .child(S.editor().id("contactPage").schemaType("page").documentId("contact"))
                .icon(FaFileO),
            ])
        ),
      S.listItem()
        .title("People")
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      ...S.documentTypeListItems().filter((listItem) => !hiddenTypes.includes(listItem.getId())),
    ]);
