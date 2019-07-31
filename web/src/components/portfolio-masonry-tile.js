import React from 'react'
import ResizeAware from 'react-resize-aware'

import styles from './portfolio-masonry-tile.module.css'
import Image from './image'
export default function PortfolioMasonryTile({
  columns,
  rows,
  mainImage,
  setModal,
  setModalImage,
  setAspect
}) {
  let isPortrait

  try {
    isPortrait = window.innerWidth < window.innerHeight
  } catch (e) {}

  if (isPortrait && columns <= 6) {
    columns *= 2
    rows *= 2
  }

  const [listener, { width, height }] = ResizeAware()
  const size = Math.ceil(Math.max(width, height) / 300) * 300

  const handleToggleModal = () => {
    setModal(true)
    setModalImage(mainImage)
    setAspect(size / Math.ceil((rows / columns) * size))
  }
  return (
    <div
      onClick={handleToggleModal}
      className={styles.wrapper}
      style={{
        gridArea: `span ${rows || 1} / span ${columns || 1}`
      }}
    >
      {listener}
      <Image
        style={{ top: '-10px' }}
        asset={mainImage}
        args={{ maxWidth: size, maxHeight: Math.ceil((rows / columns) * size * 1.05) }}
      />
    </div>
  )
}
