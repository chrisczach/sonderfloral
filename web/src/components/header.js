import { Link } from 'gatsby'
import React, { useState, useContext } from 'react'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'

import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'
import { ScrollContext } from './global-styles'

const Header = ({ siteTitle, logo }) => {
  const { percentScroll, position } = useContext(ScrollContext)

  const [homeLarge, setHomeLarge] = useState(false)

  try {
    setHomeLarge(
      window.innerWidth > window.innerHeight &&
        window.location.pathname === '/' &&
        window.innerWidth > 900
    )
  } catch (e) {}

  const scaleCalc = Math.max(1.75 - percentScroll * 4, 1)
  const translateCalc = 35 - Math.round(Math.min(percentScroll * 300, 35))

  return (
    <div className={styles.wrapper}>
      <h1
        style={{
          transform: `scale(${homeLarge ? scaleCalc : 1} ) translateY(${
            homeLarge ? translateCalc : 0
          }%)`
        }}
        className={styles.branding}
      >
        <Link className={styles.logoText} to="/">
          {siteTitle.toUpperCase()}{' '}
        </Link>
        <div className={styles.logo}>
          <ReactSVG
            className={styles.svgWrapper}
            src={logo && imageUrlFor(buildImageObj(logo)).url()}
          />
        </div>
      </h1>
    </div>
  )
}

export default Header
