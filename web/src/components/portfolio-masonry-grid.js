import React from 'react'
import styles from './portfolio-masonry-grid.module.css'
import PortfolioMasonryTile from './portfolio-masonry-tile'
import ResizeAware from 'react-resize-aware'

export default function PortfolioMasonryGrid({ nodes }) {
  const [listener, { width }] = ResizeAware()
  const size = width / 12
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {listener}
      <div
        className={styles.grid}
        style={{ gridAutoRows: `${size}px`, gridTemplateColumns: `repeat(12, ${size}px)` }}
      >
        {nodes.map(PortfolioMasonryTile)}
      </div>
    </div>
  )
}
