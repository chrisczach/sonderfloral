import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import styles from './image-blur-up.module.css'

export default function ImageBlurUp({ src, placeholder, alt, className }) {
  return (
    <ProgressiveImage src={src} placeholder={placeholder || src}>
      {(imagSrc, loading) => (
        <>
          <img
            className={`${className} ${loading ? styles.beforeLoad : styles.afterLoaded}`}
            src={imagSrc}
            alt={alt}
          />
          <noscript>
            <img className={className} src={src} />
          </noscript>
        </>
      )}
    </ProgressiveImage>
  )
}
