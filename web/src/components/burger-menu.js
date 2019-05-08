import React from 'react'
import { elastic as Menu } from 'react-burger-menu'
import { Link } from 'gatsby'
import styles from './burger-menu.module.css'
import ReactSVG from 'react-svg'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

export default function burgerMenu({ siteTitle, logo }) {
  return (
    <Menu right pageWrapId={'page-wrap'}>
      <Link id="about" className="menu-item" to="/about">
        About
      </Link>
      <Link id="projects" className="menu-item" to="/projects">
        Projects
      </Link>
      <Link id="blog" className="menu-item" to="/blog">
        Blog
      </Link>
      <Link id="contact" className="menu-item" to="/contact">
        Contact
      </Link>
      <div className={styles.branding}>
        <ReactSVG
          svgClassName={styles.svgStyle}
          className={styles.svgWrapper}
          src={logo && imageUrlFor(buildImageObj(logo)).url()}
        />
        <h2 className={styles.logo}>{siteTitle.toUpperCase()}</h2>
      </div>
    </Menu>
  )
}
