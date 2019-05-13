import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage, getFixedGatsbyImage } from 'gatsby-source-sanity'
import sanityConfig from '../../../studio/sanity.json'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import { join } from 'path'

export default function Image({ asset, args, fixed = false, ...props }) {
  // console.log('asset', asset)
  const imageArgs =
    args || (fixed ? { width: 1200, height: Math.floor((9 / 16) * 1200) } : { maxWidth: 1200 })
  const processedImg = imageUrlFor(asset)
    .width(args.maxWidth || args.width || null)
    .height(args.maxHeight || args.height || null)
    .url()
  const url = processedImg.split('?')[0] + '?'
  const urlWithRect = processedImg.split('&')[0] + '&'

  const imgProps = fixed
    ? getFixedGatsbyImage(asset, imageArgs, sanityConfig.api)
    : getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)
  // console.log(imgProps)
  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {
    console.log(err)
  }

  const addRect = srcToAddRect => srcToAddRect.split(url).join(urlWithRect)
  imgProps.src = addRect(imgProps.src)
  imgProps.srcSet = addRect(imgProps.srcSet)
  imgProps.srcWebp = addRect(imgProps.srcWebp)
  imgProps.srcSetWebp = addRect(imgProps.srcSetWebp)
  if (fixed) {
    return <Img fixed={{ ...imgProps }} alt={asset.alt} {...props} />
  } else {
    if (imageArgs.maxWidth && imageArgs.maxHeight) {
      imgProps.aspectRatio = imageArgs.maxWidth / imageArgs.maxHeight
    }
    return <Img fluid={{ ...imgProps }} alt={asset.alt} {...props} />
  }
}
