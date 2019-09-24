import React, { useRef, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import HomeBanner from '../components/home-banner'
import BlockContent from '../components/block-content'
import PortfolioMasonryModal from '../components/portfolio-masonry-modal'
import { mapEdgesToNodes } from '../lib/helpers'
import styles from './index.module.css'
import PortfolioMasonryGrid from '../components/portfolio-masonry-grid'
import { responsiveTitle1, responsiveTitle2 } from '../components/typography.module.css'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      logo {
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
        }
        alt
      }
    }

    page: sanityPage(_id: { regex: "/(drafts.|)home/" }) {
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
    posts: allSanityPost(sort: { fields: [_createdAt], order: DESC }) {
      edges {
        node {
          _id
          mainImage {
            asset {
              metadata {
                dimensions {
                  aspectRatio
                }
              }
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
    projects: allSanityProject(limit: 6, sort: { fields: [publishedAt], order: DESC }) {
      edges {
        node {
          id
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
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const site = (data || {}).site
  const page = (data || {}).page

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  //portfolio
  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  const [modalShown, setModal] = useState(false)
  const [modalImage, setModalImage] = useState()
  const [aspect, setAspect] = useState(1)
  const toggleModalOn = ({ mainImage, columns, rows }) => () => {
    setModal(true)
    setModalImage(mainImage)
    setAspect(columns / rows || 1)
  }

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <PortfolioMasonryModal
        modalShown={modalShown}
        aspect={aspect}
        toggleModal={() => setModal(!modalShown)}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <HomeBanner image={page.mainImage} />
        <div className={styles.bodyWrapper}>
          <BlockContent blocks={data.page._rawBody || []} />
        </div>
        <div style={{ minHeight: '100vh', margin: '1em -1em' }}>
          <Link to="/portfolio/">
            <h2 className={`${responsiveTitle1} ${styles.headerText}`}>Portfolio</h2>
          </Link>
          {postNodes && postNodes.length > 0 && (
            <PortfolioMasonryGrid
              nodes={postNodes}
              {...{
                modalShown,
                setModal,
                modalImage,
                setModalImage,
                aspect,
                setAspect,
                toggleModalOn
              }}
            />
          )}
        </div>
        <Link to="/contact/">
          <div className={styles.contactWrapper}>
            <h2 className={styles.contactText}>contact us</h2>
          </div>
        </Link>
      </Container>
    </>
  )
}

export default IndexPage
