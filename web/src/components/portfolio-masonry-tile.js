import React from 'react'

export default function PortfolioMasonryTile(props) {
  const { columns, rows } = props
  return (
    <div
      style={{
        overflow: 'hidden',
        gridArea: `span ${columns || 1} / span ${rows || 1}`
      }}
    >
      {JSON.stringify(props)}
    </div>
  )
}
