import React from 'react'
import Div100vh from 'react-div-100vh'
import ResizeAware from 'react-resize-aware'

import styles from './portfolio-masonry-modal.module.css'
import Image from './image'

export default function PortfolioMasonryModal({
  modalImage,
  setModalImage,
  modalShown,
  toggleModal,
  aspect
}) {
  const [listener, { width: windowWidth, height: windowHeight }] = ResizeAware()

  const imageSizeLimitBy = windowWidth / windowHeight > aspect ? 'height' : 'width'
  const margin = imageSizeLimitBy === 'height' ? windowHeight * 0.05 : windowWidth * 0.05
  const width =
    imageSizeLimitBy === 'width' ? Math.floor(windowWidth) : Math.floor(windowHeight * aspect)
  const height =
    imageSizeLimitBy === 'height' ? Math.floor(windowHeight) : Math.ceil(windowWidth / aspect)
  return (
    modalShown && (
      <Div100vh onClick={toggleModal} className={styles.modal}>
        {listener}
        <div
          style={{ width: `${width - margin}px`, height: `${height - margin}px` }}
          className={styles.imageWrapper}
        >
          <Image
            style={{ width: '100%', height: '100%' }}
            asset={modalImage}
            args={{ maxWidth: width, maxHeight: height }}
          />
        </div>
      </Div100vh>
    )
  )
}
