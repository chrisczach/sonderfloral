import { Link } from 'gatsby'
import React, { useState, useContext, useEffect } from 'react'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'

import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'
import { ScrollContext } from './global-styles'

const Header = ({ logo, pathname }) => {
  const { percentScroll } = useContext(ScrollContext)
  const [homeLarge, setHomeLarge] = useState(false)
  const largePaths = ['/', '/elopements/', '/about/', '/contact/', '/projects/sonder-series/']
  const setHomeSize = () =>
    setHomeLarge(
      window.innerWidth > window.innerHeight &&
        largePaths.includes(pathname) &&
        window.innerWidth > 900
    )

  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setHomeSize()
  }

  useEffect(() => {
    setHomeSize()
    window.addEventListener('resize', setHomeSize)
    return () => {
      window.removeEventListener('resize', setHomeSize)
    }
  }, [])

  const scaleCalc = Math.max(1.75 - percentScroll * 4, 1)
  const translateCalc = 35 - Math.round(Math.min(percentScroll * 300, 35))

  return (
    <div className={styles.wrapper}>
      <h1
        style={{
          opacity: homeLarge ? Math.min(1 - (scaleCalc - 1.45), 1) : 0.85,
          transform: `scale(${homeLarge ? scaleCalc : 1} ) translateY(${
            homeLarge ? translateCalc : 0
          }%)`,
        }}
        className={styles.branding}
      >
        <Link className={styles.logoText} to="/">
          {/* {siteTitle.toUpperCase()}{' '} */}

          <div className={styles.logo}>
            <ReactSVG
              className={styles.svgWrapper}
              src={logo && imageUrlFor(buildImageObj(logo)).url()}
            />
          </div>
        </Link>
      </h1>
    </div>
  )
}

export default Header
