import React from 'react'
import ResizeAware from 'react-resize-aware'

import Image from './image'
export default function PortfolioMasonryTile({ columns, rows, mainImage }) {
  let isPortrait

  try {
    isPortrait = window.innerWidth < window.innerHeight
  } catch (e) {}

  if (isPortrait && columns <= 6) {
    columns *= 2
    rows *= 2
  }

  const [listener, { width, height }] = ResizeAware()
  const size = Math.ceil(Math.max(width, height) / 300) * 300
  return (
    <div
      style={{
        overflow: 'hidden',
        position: 'relative',
        gridArea: `span ${rows || 1} / span ${columns || 1}`,
        margin: '0.25em'
      }}
    >
      {listener}
      <Image
        asset={mainImage}
        args={{ maxWidth: size, maxHeight: Math.ceil((rows / columns) * size + 10) }}
      />
    </div>
  )
}
