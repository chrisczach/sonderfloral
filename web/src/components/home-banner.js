import React from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import BlockContent from './block-content'
import { Link } from 'gatsby'

export default function HomeBanner({ image, _rawBody, landscape }) {
  return (
    <>
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
      <div className={styles.imageWrapper}>
        <Image
          asset={image}
          args={{
            maxWidth: 1200,
            maxHeight: 800
          }}
        />
      </div>
    </>
  )
}
