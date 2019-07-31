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

  const imageSizeLimit = windowWidth / windowHeight < aspect ? windowWidth : windowHeight
  const margin = 0
  const isLandscape = windowWidth > windowHeight
  const width = isLandscape ? imageSizeLimit * aspect : imageSizeLimit
  const height = isLandscape ? imageSizeLimit : imageSizeLimit / aspect

  return (
    modalShown && (
      <Div100vh onClick={toggleModal} className={styles.modal}>
        {listener}
        <div
          style={{ width: `${width - margin}px`, height: `${height - margin}px` }}
          className={styles.imageWrapper}
        >
          <Image asset={modalImage} args={{ maxWidth: width, maxHeight: height }} />
        </div>
      </Div100vh>
    )
  )
}
