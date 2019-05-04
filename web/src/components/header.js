import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'

import styles from './header.module.css'

const Header = ({ siteTitle }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.branding}>
      <Link to='/'>{siteTitle}</Link>
    </h1>
  </div>
)

export default Header
