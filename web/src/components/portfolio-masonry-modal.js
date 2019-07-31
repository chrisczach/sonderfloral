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

  const imageSizeLimit = windowWidth / windowHeight > aspect ? windowHeight : windowWidth
  const margin = 0

  const width = imageSizeLimit
  const height = imageSizeLimit
  //need to fix
  console.log(aspect)
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
