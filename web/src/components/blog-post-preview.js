import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj, cn, getBlogUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockText from './block-text'
import Image from './image'
import styles from './blog-post-preview.module.css'
import { responsiveTitle3 } from './typography.module.css'

function BlogPostPreview(props) {
  return (
    <Link className={styles.root} to={getBlogUrl(props.publishedAt, props.slug.current)}>
      {props.mainImage && props.mainImage.asset && (
        // <img
        //     src={imageUrlFor(buildImageObj(props.mainImage))
        //       .width(600)
        //       .height(Math.floor((9 / 16) * 600))
        //       .url()}
        //     alt={props.mainImage.alt}
        //   />
        <Image
          asset={props.mainImage}
          args={{ maxWidth: 1200, maxHeight: Math.floor((9 / 16) * 1200) }}
        />
      )}
      <h3 className={cn(responsiveTitle3, styles.title)}>{props.title}</h3>
      {props._rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={props._rawExcerpt} />
        </div>
      )}
    </Link>
  )
}

export default BlogPostPreview
