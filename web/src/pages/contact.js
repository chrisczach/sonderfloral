import React from 'react'
import { graphql } from 'gatsby'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import PeopleGrid from '../components/people-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'
import ResizeAware from 'react-resize-aware'

import { responsiveTitle1 } from '../components/typography.module.css'
import Image from '../components/image'
import styles from './contact.module.css'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
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
  }
`

const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const page = data && data.page
  const { mainImage } = page

  if (!page) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }

  const [listener, { width }] = ResizeAware()

  let portrait = false
  try {
    portrait = window.innerWidth < window.innerHeight
  } catch (e) {}

  const imageWidth = portrait ? width : Math.ceil(width / 4)
  const imageHeight = portrait ? width : Math.ceil((imageWidth / 2) * 3)

  return (
    <>
      <SEO title={page.title} />
      <Container>
        {' '}
        {listener}
        <div
          style={{ flexDirection: portrait ? 'column' : 'row' }}
          className={styles.contactContent}
        >
          <div
            className={styles.imageWrapper}
            style={{
              width: portrait ? '100%' : imageWidth,
              height: portrait ? 'auto' : imageHeight
            }}
          >
            <Image
              asset={mainImage}
              args={{
                maxWidth: imageWidth,
                maxHeight: imageHeight
              }}
            />
          </div>
          <div
            style={{ padding: portrait ? '1em 1em 2em 1em' : '2em 2em 4em 2em' }}
            className={styles.textWrapper}
          >
            <h1 className={responsiveTitle1}>{page.title}</h1>
            <BlockContent blocks={page._rawBody || []} />
          </div>
        </div>
      </Container>
    </>
  )
}

export default ContactPage
