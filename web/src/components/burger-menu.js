import React, { useState } from 'react'
import { elastic as Menu } from 'react-burger-menu'
import { Link } from 'gatsby'
import styles from './burger-menu.module.css'
import ReactSVG from 'react-svg'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

export default function burgerMenu({ siteTitle, logo }) {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  const handleChange = ({ isOpen }) => setOpen(isOpen)
  return (
    <Menu right pageWrapId={'page-wrap'} isOpen={open} onStateChange={handleChange}>
      <Link id="about" className="menu-item" to="/about/" onClick={closeMenu}>
        About
      </Link>
      <Link
        id="sonder-series"
        className="menu-item"
        to="/projects/sonder-series/"
        onClick={closeMenu}
      >
        Sonder Series
      </Link>
      <Link id="elopement-packages" className="menu-item" to="/elopements/" onClick={closeMenu}>
        Elopements
      </Link>
      <Link id="portfolio" className="menu-item" to="/portfolio/" onClick={closeMenu}>
        Portfolio
      </Link>
      <Link id="contact" className="menu-item" to="/contact/" onClick={closeMenu}>
        Contact
      </Link>
      <div className={styles.branding}>
        <Link to="/" onClick={closeMenu}>
          <ReactSVG
            svgClassName={styles.svgStyle}
            className={styles.svgWrapper}
            src={logo && imageUrlFor(buildImageObj(logo)).url()}
          />
        </Link>
        {/* <h2 className={styles.logo}>{siteTitle}</h2> */}
      </div>
    </Menu>
  )
}
