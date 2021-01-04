import React from 'react'
import { graphql } from 'gatsby'
import BlockContent, { getSerializer } from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import HomeBanner, { LineBreak } from '../components/home-banner'
import SEO from '../components/seo'
import styles from './index.module.css'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, buildImageObj } from '../lib/helpers'
import ProjectPreviewGrid from '../components/project-preview-grid'
import typography from '../components/typography.module.css'
import elopement from './elopement.module.css'

export const query = graphql`
  query ElopementsPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)elopements/" }) {
      id
      _id
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          metadata {
            lqip
          }
        }
        alt
      }
      title
      _rawBody
    }
    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
              metadata {
                lqip
              }
            }
          }
          name
          _rawBio
        }
      }
    }
    category: sanityCategory(slug: { current: { eq: "elopements" } }) {
      id
      title
      slug {
        current
      }
      _rawBody
    }
    projects: allSanityProject(
      filter: { category: { slug: { current: { eq: "elopements" } } } }
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

const ElopementsPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }
  const pageSerializer = getSerializer({ header: styles.headerText, breakOn: ['h2'] })
  const projectSerializer = getSerializer({ paragraph: elopement.projectParagraphOverride })

  const {
    page: { mainImage, title, _rawBody },
    category,
  } = data
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)

  if (!data.page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={title} />
      <Container>
        <HomeBanner customHero={<></>} />
        <BlockContent blocks={_rawBody || []} customSerializer={pageSerializer} />
        <LineBreak />
        <BlockContent blocks={category._rawBody || []} customSerializer={projectSerializer} />
        <ProjectPreviewGrid nodes={projectNodes} />
      </Container>
    </>
  )
}

export default ElopementsPage
