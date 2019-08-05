import React from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import ResizeAware from 'react-resize-aware'
import BlockContent from './block-content'
import { Link } from 'gatsby'

export default function HomeBanner({ image, _rawBody, landscape }) {
  const [listener, { width: divWidth }] = ResizeAware()
  const width = (landscape ? divWidth * 0.33 : divWidth) || '33%'
  const height = (landscape ? (0.66 * divWidth) / 3 : 0.66 * divWidth) || '66%'
  return (
    <>
      {listener}
      {landscape && (
        <div className={styles.nav}>
          <Link id="about" to="/about">
            About
          </Link>
          <Link id="projects" to="/projects">
            Sonder Series
          </Link>
          <Link id="portfolio" to="/portfolio">
            Portfolio
          </Link>
          <Link id="contact" to="/contact">
            Contact
          </Link>
        </div>
      )}
      <div style={{ height }} className={styles.bannerWrapper}>
        <div
          className={styles.imageWrapper}
          style={{
            width,
            height
          }}
        >
          {divWidth && (
            <Image
              asset={image}
              args={{
                maxWidth: width,
                maxHeight: height
              }}
            />
          )}
        </div>
        <div className={styles.textWrapper} style={{ width }}>
          <BlockContent blocks={_rawBody || []} />
        </div>
      </div>
    </>
  )
}
