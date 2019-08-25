import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import BlockContent from '../components/block-content'
import { responsiveTitle1 } from '../components/typography.module.css'
import styles from './category.module.css'

export const query = graphql`
  query ProjectsCategoryPageQuery($id: String) {
    category: sanityCategory(id: { eq: $id }) {
      id
      title
      _rawBody
    }

    projects: allSanityProject(
      filter: { category: { id: { eq: $id } } }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          category {
            id
            title
            slug {
              current
            }
          }
          mainImage {
            asset {
              _id
              metadata {
                lqip
              }
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const CategoryPageTemplate = props => {
  const { data, errors } = props
  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title={data.category.title} />
      <Container>
        <h1 className={responsiveTitle1 + ' ' + styles.headerText}>{data.category.title}</h1>
        {data.category._rawBody && (
          <div className={styles.bodyText}>
            <BlockContent blocks={data.category._rawBody || []} />
          </div>
        )}
        {projectNodes && projectNodes.length > 0 && <ProjectPreviewGrid nodes={projectNodes} />}
      </Container>
    </>
  )
}

export default CategoryPageTemplate
