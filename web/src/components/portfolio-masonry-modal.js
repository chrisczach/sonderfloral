import React from 'react'

import styles from './portfolio-masonry-modal.module.css'
import Image from './image'

export default function PortfolioMasonryModal({
  modalImage,
  setModalImage,
  modalShown,
  toggleModal,
  aspect
}) {
  let windowWidth
  let windowHeight

  try {
    windowWidth = window.innerWidth
    windowHeight = window.innerHeight
  } catch (e) {}

  const imageSizeLimitBy = windowWidth / windowHeight > aspect ? 'height' : 'width'
  const width =
    imageSizeLimitBy === 'width' ? Math.floor(windowWidth) : Math.floor(windowHeight * aspect)
  const height =
    imageSizeLimitBy === 'height' ? Math.floor(windowHeight) : Math.floor(windowWidth / aspect)
  return (
    modalShown && (
      <div onClick={toggleModal} className={styles.modal}>
        <div style={{ width: `${width}px`, height: `${height}px` }} className={styles.imageWrapper}>
          <Image
            style={{ top: '-5px', width: '100%', height: '100%' }}
            asset={modalImage}
            args={{ maxWidth: width, maxHeight: height }}
          />
        </div>
      </div>
    )
  )
}
