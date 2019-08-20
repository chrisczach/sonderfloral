import React, { useState } from 'react'
import styles from './portfolio-masonry-grid.module.css'
import PortfolioMasonryTile from './portfolio-masonry-tile'
import ResizeAware from 'react-resize-aware'

import PortfolioMasonryModal from './portfolio-masonry-modal'

export default function PortfolioMasonryGrid({ nodes }) {
  const [listener, { width }] = ResizeAware()
  let columns = 12

  try {
    columns = window.innerHeight > window.innerWidth ? 6 : 12
  } catch (e) {}

  const size = width / columns
  const [modalShown, setModal] = useState(false)
  const [modalImage, setModalImage] = useState()
  const [aspect, setAspect] = useState(1)
  const toggleModalOn = ({ mainImage, columns, rows }) => () => {
    setModal(true)
    setModalImage(mainImage)
    setAspect(columns / rows || 1)
  }

  const { normal, small } = nodes.reduce(
    (a, c, ind, arr) => {
      if (getSize(c) === 1) {
        a.small.push(c)
      } else {
        a.normal.push(c)
      }

      return a
    },
    { normal: [], small: [] }
  )

  const resizeSmalls = smallArr => {
    const working = [...smallArr]
    const lastChunk = working.splice(0, 12)

    return [...lastChunk, ...working]
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {listener}
      <PortfolioMasonryModal
        modalShown={modalShown}
        aspect={aspect}
        toggleModal={() => setModal(!modalShown)}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
      <div
        className={styles.grid}
        style={{ gridAutoRows: `${size}px`, gridTemplateColumns: `repeat(${columns}, ${size}px)` }}
      >
        {[...normal, ...small].map(props =>
          PortfolioMasonryTile({
            ...props,
            setModal,
            setModalImage,
            setAspect,
            size,
            toggleModalOn
          })
        )}
      </div>
    </div>
  )
}

const getSize = node => node.rows * node.columns
