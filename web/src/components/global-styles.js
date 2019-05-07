import React from 'react'

export default function GlobalStyles({ children, siteSettings }) {
  const {
    primaryLight = '#F1F2F1',
    accentLight = '#F7F5F1',
    brandAccent = '#E1C6D2',
    accentDark = '#b87c6e',
    primaryDark = '#5c4841'
  } = siteSettings
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
  return (
    <div style={globalColors}>
      <>{children}</>
    </div>
  )
}
