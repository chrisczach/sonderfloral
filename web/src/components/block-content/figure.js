import React, { useState } from 'react'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import ImageBlurUp from '../image-blur-up'
import styles from './figure.module.css'
import Image from '../image'
import ProgressiveImage from 'react-progressive-image'
function Figure(props) {
  let [height, setHeight] = useState(800)
  if (height === 800) {
    try {
      setHeight(Math.round(window.innerHeight * 0.75))
    } catch (e) {}
  }
  const imageSrc = imageUrlFor(buildImageObj(props))
    .height(height)
    .url()
  const placeholderSrc = imageUrlFor(buildImageObj(props))
    .height(40)
    .url()
  return (
    <div className={styles.wrapper}>
      <figure className={styles.root}>
        <ProgressiveImage src={imageSrc} placeholder={placeholderSrc}>
          {(imageSrc, loading) => (
            <>
              <img
                className={`${styles.base} ${props.caption && styles.captionBlur} ${
                  loading ? styles.beforeLoad : styles.afterLoaded
                }`}
                src={imageSrc}
              />
              <noscript>
                <img
                  className={`${styles.base} ${props.caption && styles.captionBlur}  ${
                    styles.afterLoaded
                  }`}
                  src={imageSrc}
                />
              </noscript>
            </>
          )}
        </ProgressiveImage>

        {props.caption && <figcaption className={styles.caption}>{props.caption}</figcaption>}
      </figure>
    </div>
  )
}

export default Figure
