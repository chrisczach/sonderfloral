import React, { useState, useEffect } from 'react'
import styles from './home-banner.module.css'
import Image from './image'
import { Link } from 'gatsby'
import ReactSVG from 'react-svg'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import { useStaticQuery, graphql } from 'gatsby'

const CustomDefault = () => {
  const {
    site: { alt2logo },
  } = useStaticQuery(
    graphql`
      query {
        site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
          alt2logo {
            asset {
              _id
            }
          }
        }
      }
    `
  )
  return alt2logo && alt2logo.asset ? (
    <ReactSVG
      svgClassName={styles.customBannerSvgStyle}
      className={styles.customBannerSvgWrapper}
      src={alt2logo && imageUrlFor(buildImageObj(alt2logo)).url()}
    />
  ) : null
}

export default function HomeBanner({ image, customHero }) {
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
        <Link id="about" to="/about/" activeClassName={styles.currentPage}>
          About
        </Link>
        <Link id="sonder-series" to="/projects/sonder-series/" activeClassName={styles.currentPage}>
          Sonder Series
        </Link>
        <Link id="elopement-packages" to="/elopements/" activeClassName={styles.currentPage}>
          Elopements
        </Link>
        <Link id="portfolio" to="/portfolio/" activeClassName={styles.currentPage}>
          Portfolio
        </Link>
        <Link id="contact" to="/contact/" activeClassName={styles.currentPage}>
          Contact
        </Link>
      </div>
      {customHero ? (
        customHero === true ? (
          <CustomDefault />
        ) : (
          customHero
        )
      ) : (
        <div className={styles.imageWrapper}>
          <Image
            asset={image}
            alt={image.alt}
            args={{
              maxWidth: width,
              maxHeight: landscape ? Math.round(width * 0.667) : width,
            }}
          />
        </div>
      )}
    </>
  )
}
