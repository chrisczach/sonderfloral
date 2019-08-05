import React from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import ResizeAware from 'react-resize-aware'
import BlockContent from './block-content'
import { Link } from 'gatsby'

export default function HomeBanner({ image, _rawBody, landscape }) {
  const [listener, { width }] = ResizeAware()
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
      <div className={styles.bannerWrapper}>
        <div
          className={styles.imageWrapper}
          style={{
            width: landscape ? width / 3 : width || '50%',
            height: landscape ? (0.66 * width) / 3 : 0.66 * width
          }}
        >
          <Image
            asset={image}
            args={{
              maxWidth: landscape ? width / 3 : width,
              maxHeight: landscape ? (0.66 * width) / 3 : 0.66 * width
            }}
          />
        </div>
        <div
          className={styles.textWrapper}
          style={{ width: landscape ? width / 3 : width || '50%' }}
        >
          <BlockContent blocks={_rawBody || []} />
        </div>
      </div>
    </>
  )
}
