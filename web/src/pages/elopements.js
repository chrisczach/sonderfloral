import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import { getSerializer } from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import HomeBanner from '../components/home-banner'
import SEO from '../components/seo'
import styles from './index.module.css'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, buildImageObj } from '../lib/helpers'

import PageCard from '../components/page-card'

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
  }
`

const ElopementsPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }
  const serializer = getSerializer({ header: styles.headerText })

  const {
    page: { mainImage, title, _rawBody },
  } = data && data
  const personNodes =
    data && data.people && mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs)

  if (!data.page) {
    throw new Error(
      'Missing "About" page data. Open the studio at http://localhost:3333 and add "About" page data and restart the development server.'
    )
  }

  return (
    <>
      <SEO title={title} />
      <Container>
        <HomeBanner customHero={true} />
        <BlockContent blocks={data.page._rawBody || []} customSerializer={serializer} />
      </Container>
    </>
  )
}

export default ElopementsPage
