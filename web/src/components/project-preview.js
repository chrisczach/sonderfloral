import { Link } from 'gatsby'
import React from 'react'
import { cn, buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import Image from './image'
import styles from './project-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'

function ProjectPreview(props) {
  return (
    <Link
      className={styles.root}
      to={`/projects/${props.category.slug.current}/${props.slug.current}/`}
    >
      {props.mainImage && props.mainImage.asset && (
        <div className={styles.imageWrapper}>
          <Image
            asset={props.mainImage}
            alt={props.mainImage.alt}
            args={{ maxWidth: 300, maxHeight: 300 }}
          />
        </div>
      )}
      <h3 className={responsiveTitle3 + ' ' + styles.title}>{props.title}</h3>
    </Link>
  )
}

export default ProjectPreview
