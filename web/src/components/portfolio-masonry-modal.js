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
  return (
    modalShown && (
      <div onClick={toggleModal} className={modalShown ? styles.shown : styles.hidden}>
        <div className={styles.imageWrapper}>
          Image Aspect: {aspect}
          <br />
          Screen Aspect: {window.innerWidth / window.innerHeight}
          <Image
            asset={modalImage}
            args={{ maxWidth: window.innerWidth, maxHeight: Math.ceil((4 / 6) * window * 1.05) }}
          />
        </div>
      </div>
    )
  )
}
