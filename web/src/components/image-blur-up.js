import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import styles from './image-blur-up.module.css'

export default function ImageBlurUp({ src, placeholder, alt, className }) {
  return (
    <ProgressiveImage src={src} placeholder={placeholder || src}>
      {(imageSrc, loading) => (
        <>
          <img
            className={`${className} ${styles.base} ${
              loading ? styles.beforeLoad : styles.afterLoaded
            }`}
            src={imageSrc}
            alt={alt}
          />
          <noscript>
            <img
              className={`${className} ${styles.base}  ${styles.afterLoaded}`}
              src={src}
              alt={alt}
            />
          </noscript>
        </>
      )}
    </ProgressiveImage>
  )
}
