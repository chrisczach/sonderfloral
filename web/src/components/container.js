import React from 'react'

import styles from './container.module.css'

const Container = ({ children, style, className }) => {
  return (
    <div className={`${styles.root} ${className}`} style={style}>
      {children}
    </div>
  )
}

export default Container
