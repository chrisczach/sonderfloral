import React from 'react'
import ResizeAware from 'react-resize-aware'

import styles from './portfolio-masonry-tile.module.css'
import Image from './image'
export default function PortfolioMasonryTile({
  columns,
  rows,
  size,
  mainImage,
  setModal,
  setModalImage,
  setAspect
}) {
  const width = size * columns
  const height = size * rows
  const handleToggleModal = () => {
    setModal(true)
    setModalImage(mainImage)
    setAspect(columns / rows || 1)
  }
  return (
    <div
      onClick={handleToggleModal}
      className={styles.wrapper}
      style={{
        gridArea: `span ${rows} / span ${columns}`
      }}
    >
      <Image
        asset={mainImage}
        args={{
          maxWidth: width,
          maxHeight: height
        }}
      />
    </div>
  )
}
