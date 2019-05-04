import React from 'react'
import { elastic as Menu } from 'react-burger-menu'
import { Link } from 'gatsby'
import styles from './burger-menu.module.css'

export default function burgerMenu ({ siteTitle }) {
  return (
    <Menu right pageWrapId={'page-wrap'}>
      <Link id='about' className='menu-item' to='/about'>
        About
      </Link>
      <Link id='projects' className='menu-item' to='/projects'>
        Projects
      </Link>
      <Link id='blog' className='menu-item' to='/blog'>
        Blog
      </Link>
      <Link id='contact' className='menu-item' to='/contact'>
        Contact
      </Link>
      <h4 className={styles.branding}>{siteTitle}</h4>
    </Menu>
  )
}
