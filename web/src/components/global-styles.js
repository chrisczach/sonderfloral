import React, { createRef, useEffect, useState } from 'react'
import styles from './global-styles.module.css'

export default function GlobalStyles({
  children,
  siteSettings = {
    title: 'Sonder Floral',
    primaryLight: { hex: '#f1f2f1' },
    accentLight: { hex: '#f7f5f1' },
    brandAccent: { hex: '#e1c6d2' },
    accentDark: { hex: '#b87c6e' },
    primaryDark: { hex: '#5c4841' }
  }
}) {
  var { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings

  const getHex = ({ hex }) => hex

  const globalColors = {
    '--color-main-light': getHex(primaryLight),
    '--color-accent-light': getHex(accentLight),
    '--color-brand': getHex(brandAccent),
    '--color-accent-dark': getHex(accentDark),
    '--color-main-dark': getHex(primaryDark),
    background: 'var(--color-main-light)',
    color: 'var(--color-main-dark)'
  }

  const scrollDiv = createRef()
  try {
    if (window) {
      setTimeout(
        () => (
          scrollDiv.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          }),
          0
        )
      )
    }
  } catch (err) {
    console.log('prevent build error when window is undefined')
  }

  useEffect(() => {
    scrollDiv.current.addEventListener('scroll', ({ target }) => console.log(target.scrollTop))
    return () => {
      scrollDiv.current.removeEventListener('scroll', ({ target }) => console.log(target.scrollTop))
    }
  }, [scrollDiv])

  return (
    <div ref={scrollDiv} style={globalColors} className={styles.scroll}>
      <>{children}</>
    </div>
  )
}
