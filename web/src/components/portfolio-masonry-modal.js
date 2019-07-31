import React from 'react'

import styles from './portfolio-masonry-modal.module.css'

export default function PortfolioMasonryModal({
  modalImage,
  setModalImage,
  modalShown,
  toggleModal
}) {
  return (
    modalShown && (
      <div onClick={toggleModal} className={modalShown ? styles.shown : styles.hidden}>
        {JSON.stringify(modalImage)}
      </div>
    )
  )
}
