import React from 'react'
import ResizeAware from 'react-resize-aware'

import styles from './portfolio-masonry-tile.module.css'
import Image from './image'
export default function PortfolioMasonryTile({ columns, rows, size, mainImage, toggleModalOn }) {
  return (
    <div
      onClick={toggleModalOn({ mainImage, columns, rows })}
      className={styles.wrapper}
      style={{
        gridArea: `span ${rows} / span ${columns}`
      }}
    >
      <Image
        asset={mainImage}
        args={{
          maxWidth: Math.ceil(size * columns),
          maxHeight: Math.ceil(size * rows)
        }}
      />
    </div>
  )
}
