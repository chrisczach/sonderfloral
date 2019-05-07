import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'

const Header = ({ siteTitle, logo }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.branding}>
      <Link className={styles.logoText} to="/">
        {siteTitle}{' '}
      </Link>
      <img
        className={styles.logo}
        src={
          logo &&
          imageUrlFor(buildImageObj(logo))
            .height(40)
            .fit('crop')
            .url()
        }
      />
    </h1>
  </div>
)

export default Header
