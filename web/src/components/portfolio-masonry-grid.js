import React from 'react'
import styles from './portfolio-masonry-grid.module.css'
import PortfolioMasonryTile from './portfolio-masonry-tile'

export default function PortfolioMasonryGrid({ nodes }) {
  return <div className={styles.grid}>{nodes.map(PortfolioMasonryTile)}</div>
}
