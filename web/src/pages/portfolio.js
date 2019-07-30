import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import PortfolioMasonryGrid from '../components/portfolio-masonry-grid'
import { responsiveTitle1 } from '../components/typography.module.css'

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(limit: 12, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          _id
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
          columns
          rows
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const PortfolioPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <>
      <SEO title="Portfolio" />
      <div style={{ minHeight: '100vh', padding: '.5em' }}>
        <h1 className={responsiveTitle1}>Portfolio</h1>
        {postNodes && postNodes.length > 0 && <PortfolioMasonryGrid nodes={postNodes} />}
      </div>
    </>
  )
}

export default PortfolioPage
