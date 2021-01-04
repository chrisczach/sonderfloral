import React, { createContext, useEffect, useState } from 'react'

export default function GlobalStyles({
  children,
  siteSettings = {
    title: 'Sonder Floral',
    primaryLight: { hex: '#f1f2f1' },
    accentLight: { hex: '#f7f5f1' },
    brandAccent: { hex: '#e1c6d2' },
    accentDark: { hex: '#b87c6e' },
    primaryDark: { hex: '#5c4841' },
  },
}) {
  var { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings

  const getHex = ({ hex }) => hex

  const globalColors = {
    '--color-main-light': getHex(primaryLight),
    '--color-accent-light': getHex(accentLight),
    '--color-accent-light2': getHex(accentLight) + '77',
    '--color-brand': getHex(brandAccent),
    '--color-accent-dark': getHex(accentDark),
    '--color-main-dark': getHex(primaryDark),
    // background: 'var(--color-main-light)',
    color: 'var(--color-main-dark)',
    height: '100%',
  }
  const [scrollProviderValue, setScrollProviderValue] = useState({ position: 0, percentScroll: 0 })
  useEffect(() => {
    const handler = (event) => {
      window.requestAnimationFrame(() => {
        const {
          target: {
            scrollingElement: { scrollTop, scrollHeight, offsetHeight },
          },
        } = event

        const scrollObject = {
          position: scrollTop,
          percentScroll: scrollTop / (scrollHeight - offsetHeight),
          scrollHeight,
          offsetHeight,
          lastTrigger: new Date().getTime(),
        }
        setScrollProviderValue(scrollObject)
      })
    }
    document.addEventListener('scroll', throttled(1000 / 60, handler))
    return () => {
      document.removeEventListener('scroll', throttled(1000 / 60, handler))
    }
  }, [])
  return (
    <ScrollContext.Provider value={scrollProviderValue}>
      <div style={globalColors}>{children}</div>
    </ScrollContext.Provider>
  )
}

const throttled = (delay, fn) => {
  let lastCall = 0
  return function (...args) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return fn(...args)
  }
}

export const ScrollContext = createContext({ position: 0, percentScroll: 0 })
