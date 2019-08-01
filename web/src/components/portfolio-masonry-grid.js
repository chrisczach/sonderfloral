import React, { useState } from 'react'
import styles from './portfolio-masonry-grid.module.css'
import PortfolioMasonryTile from './portfolio-masonry-tile'
import ResizeAware from 'react-resize-aware'

import PortfolioMasonryModal from './portfolio-masonry-modal'

export default function PortfolioMasonryGrid({ nodes }) {
  const [listener, { width }] = ResizeAware()
  let columns = 12

  try {
    columns = screen.height > screen.width ? 6 : 12
  } catch (e) {}

  const size = width / columns
  const [modalShown, setModal] = useState(false)
  const [modalImage, setModalImage] = useState()
  const [aspect, setAspect] = useState(1)
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {listener}
      <div
        className={styles.grid}
        style={{ gridAutoRows: `${size}px`, gridTemplateColumns: `repeat(${columns}, ${size}px)` }}
      >
        {nodes.map(props => PortfolioMasonryTile({ ...props, setModal, setModalImage, setAspect }))}
      </div>
      <PortfolioMasonryModal
        modalShown={modalShown}
        aspect={aspect}
        toggleModal={() => setModal(!modalShown)}
        modalImage={modalImage}
        setModalImage={setModalImage}
      />
    </div>
  )
}
