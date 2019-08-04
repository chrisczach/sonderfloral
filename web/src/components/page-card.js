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
  const imageWidth = isPortrait ? width : width / 3
  const imageHeight = Math.ceil(isPortrait ? width : contentHeight)
  console.log(imageHeight)
  return (
    <div className={styles.card}>
      {wrapListener}
      <div className={styles.imageWrapper}>
        <Image
          asset={image}
          args={{
            maxWidth: imageWidth,
            maxHeight: imageHeight + 20
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
