const { createPageDependency } = require('gatsby/dist/redux/actions/add-page-dependency')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// async function createBlogPostPages(graphql, actions, reporter) {
//   const { createPage, createPageDependency } = actions
//   const result = await graphql(`
//     {
//       allSanityPost(filter: { slug: { current: { ne: null } } }) {
//         edges {
//           node {
//             id
//             publishedAt
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) throw result.errors

//   const postEdges = (result.data.allSanityPost || {}).edges || []

//   postEdges.forEach((edge, index) => {
//     const { id, slug = {}, publishedAt } = edge.node
//     const dateSegment = format(publishedAt, 'yyyy/MM')
//     const path = `/portfolio/${dateSegment}/${slug.current}/`

//     reporter.info(`Creating blog post page: ${path}`)

//     createPage({
//       path,
//       component: require.resolve('./src/templates/blog-post.js'),
//       context: { id }
//     })

//     createPageDependency({ path, nodeId: id })
//   })
// }

async function createProjectPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProject(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
            category {
              id
              title
              slug {
                current
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []

  projectEdges.forEach((edge) => {
    const id = edge.node.id
    const categorySlug = edge.node.category.slug.current
    const slug = edge.node.slug.current
    const path = `/projects/${categorySlug}/${slug}/`

    reporter.info(`Creating project page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/project.js'),
      context: { id },
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createProjectCategories(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityCategory {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const categoryEdges = (result.data.allSanityCategory || {}).edges || []

  categoryEdges.forEach((edge) => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/projects/${slug}/`

    reporter.info(`Creating project page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/category.js'),
      context: { id },
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // await createBlogPostPages(graphql, actions, reporter)
  await createProjectPages(graphql, actions, reporter)
  await createProjectCategories(graphql, actions, reporter)
}
