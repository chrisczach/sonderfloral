import React from 'react'

export default function PortfolioMasonryTile(props) {
  const { columns, rows } = props
  return (
    <div
      style={{
        overflow: 'hidden',
        gridArea: `span ${rows || 1} / span ${columns || 1}`,
        margin: '2px'
      }}
    >
      {JSON.stringify(props)}
    </div>
  )
}
