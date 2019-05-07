import React from 'react'

export default function GlobalStyles({ children, siteSettings }) {
  const { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings
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
