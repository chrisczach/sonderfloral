import React from 'react'

export default function GlobalStyles({ children, siteSettings }) {
  const { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings
  const getHex = ({ hex }) => hex
  const globalColors = {
    '--color-main-light': getHex(primaryLight || '#F1F2F1'),
    '--color-accent-light': getHex(accentLight) || '#F7F5F1',
    '--color-brand': getHex(brandAccent) || '#E1C6D2',
    '--color-accent-dark': getHex(accentDark) || '#b87c6e',
    '--color-main-dark': getHex(primaryDark) || '#5c4841',
    background: 'var(--color-main-light)',
    color: 'var(--color-main-dark)'
  }
  return (
    <div style={globalColors}>
      <>{children}</>
    </div>
  )
}
