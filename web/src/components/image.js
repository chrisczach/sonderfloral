import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage, getFixedGatsbyImage } from 'gatsby-source-sanity'
import sanityConfig from '../../../studio/sanity.json'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'

export default function Image({ asset, args, fixed = false, ...props }) {
  const imageArgs =
    args || (fixed ? { width: 1200, height: Math.floor((9 / 16) * 1200) } : { maxWidth: 1200 })

  const imgProps = fixed
    ? getFixedGatsbyImage(asset, imageArgs, sanityConfig.api)
    : getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)
  // console.log(imgProps)
  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {
    console.log(err)
  }

  if (fixed) {
    return <Img fixed={{ ...imgProps }} alt={asset.alt} {...props} />
  } else {
    if (imageArgs.maxWidth && imageArgs.maxHeight) {
      imgProps.aspectRatio = imageArgs.maxWidth / imageArgs.maxHeight
    }
    return <Img fluid={{ ...imgProps }} alt={asset.alt} {...props} />
  }
}
