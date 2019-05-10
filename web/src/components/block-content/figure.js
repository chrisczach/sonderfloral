import React from 'react'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'
import ImageBlurUp from '../image-blur-up'
import styles from './figure.module.css'

function Figure(props) {
  return (
    <figure className={styles.root}>
      {props.asset && (
        <ImageBlurUp
          src={imageUrlFor(buildImageObj(props))
            .width(1200)
            .url()}
          placeholder={imageUrlFor(buildImageObj(props))
            .width(60)
            .url()}
          alt={props.alt}
        />
      )}
      <figcaption className={styles.caption}>{props.caption}</figcaption>
    </figure>
  )
}

export default Figure
