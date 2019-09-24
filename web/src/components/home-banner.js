import React, { useState, useEffect } from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import { Link } from 'gatsby'

export default function HomeBanner({ image }) {
  const [landscape, setLandscape] = useState(false)
  const [width, setWidth] = useState(1200)
  try {
    useEffect(() => {
      const handler = () => {
        setLandscape(window.innerWidth > window.innerHeight && window.innerWidth > 900)
        setWidth(window.innerWidth)
      }
      handler()
      window.addEventListener('resize', handler)
      return () => {
        window.removeEventListener('resize', handler)
      }
    }, [window.innerWidth, window.innerHeight])
  } catch (e) {}
  return (
    <>
      <div className={styles.nav}>
        <Link id="about" to="/about/">
          About
        </Link>
        <Link id="sonder-series" to="projects/sonder-series/">
          Sonder Series
        </Link>
        <Link id="portfolio" to="/portfolio/">
          Portfolio
        </Link>
        <Link id="contact" to="/contact/">
          Contact
        </Link>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          asset={image}
          alt={image.alt}
          args={{
            maxWidth: width,
            maxHeight: landscape ? Math.round(width * 0.667) : width
          }}
        />
      </div>
    </>
  )
}
