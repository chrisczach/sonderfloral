import React, { useState } from 'react'
import ResizeAware from 'react-resize-aware'

import { responsiveTitle1 } from '../components/typography.module.css'
import Image from '../components/image'
import styles from './page-card.module.css'

export default function PageCard({ image, title, children }) {
  const [wrapListener, { width, height }] = ResizeAware()
  const [contentListener, { height: contentHeight }] = ResizeAware()
  let [isPortrait, setPortrait] = useState(true)
  try {
    setPortrait(window.innerHeight > window.innerWidth)
  } catch (e) {}

  return (
    <div className={styles.card}>
      {wrapListener}
      <div style={{ height: isPortrait ? width : contentHeight }} className={styles.imageWrapper}>
        <Image
          asset={image}
          args={{
            maxWidth: width,
            maxHeight: isPortrait ? width : contentHeight
          }}
        />
      </div>

      <div className={styles.contentWrapper}>
        {contentListener}
        <h1 className={responsiveTitle1}>{title}</h1>
        {children}
      </div>
    </div>
  )
}
