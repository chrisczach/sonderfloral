import { Link } from 'gatsby'
import React, { useState } from 'react'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'

import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'

const Header = ({ siteTitle, logo }) => {
  const [homeLarge, setHomeLarge] = useState(false)
  try {
    setHomeLarge(window.innerWidth > window.innerHeight && window.location.pathname === '/')
  } catch (e) {}
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.branding}>
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
