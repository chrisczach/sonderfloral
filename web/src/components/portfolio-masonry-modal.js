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
  const margin = 15
  const imageSizeLimit = Math.min(windowWidth / aspect, windowHeight)
  const width = imageSizeLimit * aspect
  const height = imageSizeLimit

  return (
    modalShown && (
      <Div100vh onClick={toggleModal} className={styles.modal}>
        {listener}
        <div
          style={{ width: `${width - margin}px`, height: `${height - margin}px` }}
          className={styles.imageWrapper}
        >
          <Image
            aspectFixed
            asset={modalImage}
            args={{ maxWidth: width - margin, maxHeight: height - margin }}
          />
        </div>
      </Div100vh>
    )
  )
}
