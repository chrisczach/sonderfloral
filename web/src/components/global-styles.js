import React from 'react'

export default function GlobalStyles({ children, siteSettings }) {
  try {
    var { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings
  } catch (err) {
    var primaryLight = '#F1F2F1'
    var accentLight = '#F7F5F1'
    var brandAccent = '#E1C6D2'
    var accentDark = '#b87c6e'
    var primaryDark = '#5c4841'
  }
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
