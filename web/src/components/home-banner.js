import React from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import ResizeAware from 'react-resize-aware'
import BlockContent from './block-content'

export default function HomeBanner({ image, _rawBody }) {
  const [listener, { width }] = ResizeAware()
  return (
    <>
      {listener}
      <div className={styles.bannerWrapper}>
        <div
          className={styles.imageWrapper}
          style={{ width: width / 3 || '50%', height: width / 3 }}
        >
          <Image asset={image} args={{ maxWidth: width / 3, maxHeight: width / 3 }} />
        </div>
        {/* <div className={styles.textWrapper} style={{ width: width / 3 || '50%' }}>
          <BlockContent blocks={_rawBody || []} />
        </div> */}
      </div>
    </>
  )
}
