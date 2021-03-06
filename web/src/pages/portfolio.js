import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import PortfolioMasonryGrid from '../components/portfolio-masonry-grid'
import { responsiveTitle1 } from '../components/typography.module.css'
import styles from './portfolio.module.css'
import Container from '../components/container'
import PortfolioMasonryModal from '../components/portfolio-masonry-modal'

export const query = graphql`
  query PortfolioPageQuery {
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
  }
`

const PortfolioPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

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
      <SEO title="Portfolio" />
      <PortfolioMasonryModal
        modalShown={modalShown}
        aspect={aspect}
        toggleModal={() => setModal(!modalShown)}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <Container>
        <div style={{ minHeight: '100vh', padding: '.5em' }}>
          <h1 className={`${responsiveTitle1} ${styles.headerText}`}>Portfolio</h1>
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
      </Container>
    </>
  )
}

export default PortfolioPage
