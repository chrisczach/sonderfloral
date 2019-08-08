import React, { createRef, createContext } from 'react'
// import styles from './global-styles.module.css'
import BackgroundImage from './background-image'
import Div100vh from 'react-div-100vh'

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
    // background: 'var(--color-main-light)',
    color: 'var(--color-main-dark)',
    height: '100%'
  }

  return <div style={globalColors}>{children}</div>
}
