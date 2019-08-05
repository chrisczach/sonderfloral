import React, { useRef, useContext, useEffect, useState } from 'react'
import { graphql, Link } from 'gatsby'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs, buildImageObj } from '../lib/helpers'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import ProjectPreviewGrid from '../components/project-preview-grid'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import Image from '../components/image'
import ReactSVG from 'react-svg'
import styles from './index.module.css'
import { imageUrlFor } from '../lib/image-url'
import headerStyles from '../components/header.module.css'
import { ScrollRefContext } from '../components/global-styles'
import { Match } from '@reach/router'
import PortfolioMasonryGrid from '../components/portfolio-masonry-grid'
import HomeBanner from '../components/home-banner'

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
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
    : []
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }
  const scrollDivRef = useContext(ScrollRefContext)

  const logoRef = useRef()
  const [logoSize, setLogoSize] = useState(200)
  let landscape
  try {
    landscape = window.innerWidth > window.innerHeight
  } catch (e) {}

  useEffect(() => {
    const { y: logoRectY } =
      logoRef.current &&
      logoRef.current.getBoundingClientRect &&
      logoRef.current.getBoundingClientRect()

    const handle = ({ target: { scrollTop } }) =>
      setLogoSize(parseInt(((logoRectY - Math.min(scrollTop, logoRectY)) / logoRectY + 1) * 100))
    if (landscape) {
      scrollDivRef.current.addEventListener('scroll', handle)
    }
    // return () => scrollDivRef.current.removeEventListener('scroll', handle)
  }, [])

  return (
    <>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        <div
          style={{ display: landscape ? 'flex' : 'none' }}
          className={styles.bannerWrapper}
          ref={logoRef}
        >
          <h1 style={{ transform: `scale(${logoSize / 100})` }} className={headerStyles.branding}>
            <Link
              style={{ pointerEvents: 'visibleStroke' }}
              className={headerStyles.logoText}
              to="/"
            >
              {site.title.toUpperCase()}{' '}
            </Link>
            <div className={headerStyles.logo}>
              <ReactSVG
                className={headerStyles.svgWrapper}
                src={site.logo && imageUrlFor(buildImageObj(site.logo)).url()}
              />
            </div>
          </h1>
        </div>

        <HomeBanner image={page.mainImage} _rawBody={page._rawBody} landscape={landscape} />
        <div style={{ height: '150vh', padding: '20em' }}>Spacer to check layout</div>
      </Container>
    </>
  )
}

export default IndexPage
