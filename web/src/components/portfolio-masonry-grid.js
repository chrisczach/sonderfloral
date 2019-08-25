import React, { useState } from 'react'
import styles from './portfolio-masonry-grid.module.css'
import PortfolioMasonryTile from './portfolio-masonry-tile'
import ResizeAware from 'react-resize-aware'

export default function PortfolioMasonryGrid({
  nodes,
  modalShown,
  setModal,
  modalImage,
  setModalImage,
  aspect,
  setAspect,
  toggleModalOn
}) {
  const [listener, { width }] = ResizeAware()
  let columns = 12

  try {
    columns = window.innerHeight > window.innerWidth ? 6 : 12
  } catch (e) {}

  const size = width / columns

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
