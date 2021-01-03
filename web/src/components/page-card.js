import React, { useState } from 'react'
import ResizeAware from 'react-resize-aware'

import { responsiveTitle1 } from '../components/typography.module.css'
import Image from '../components/image'
import styles from './page-card.module.css'

export default function PageCard({ image, title, children }) {
  const [wrapListener, { width }] = ResizeAware()
  const [contentListener, { height: contentHeight }] = ResizeAware()
  let [isPortrait, setPortrait] = useState(undefined)

  try {
    if (isPortrait === undefined) {
      setPortrait(window.innerHeight > window.innerWidth)
    }
  } catch (e) {}
  const imageWidth = isPortrait ? width : width / 3
  const imageHeight = Math.ceil(isPortrait ? width : contentHeight)
  console.log(imageHeight)
  return (
    <>
      <h1 className={responsiveTitle1 + ' ' + styles.headerText}>{title}</h1>
      <div className={styles.card}>
        {wrapListener}
        <div className={styles.imageWrapper}>
          <Image
            asset={image}
            alt={image.alt}
            args={{
              maxWidth: imageWidth,
              maxHeight: imageWidth * 1.5,
            }}
          />
        </div>

        <div className={styles.contentWrapper}>
          {contentListener}
          {children}
        </div>
      </div>
    </>
  )
}
