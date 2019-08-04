import React from 'react'

import styles from './portfolio-masonry-tile.module.css'
import Image from './image'
export default function PortfolioMasonryTile({ columns, rows, size, mainImage, toggleModalOn }) {
  const aspect = mainImage.asset._rawDataMetadata.dimensions.aspectRatio
  return (
    <div
      onClick={toggleModalOn({ mainImage, columns: aspect, rows: 1 })}
      className={styles.wrapper}
      style={{
        gridArea: `span ${rows} / span ${columns}`
      }}
    >
      <Image
        asset={mainImage}
        args={{
          maxWidth: Math.ceil(size * columns),
          maxHeight: Math.ceil(size * rows) + 10
        }}
      />
    </div>
  )
}
