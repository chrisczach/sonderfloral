import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage, getFixedGatsbyImage } from 'gatsby-source-sanity'
import sanityConfig from '../../../studio/sanity.json'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'
import { join } from 'path'

export default function Image({ asset, args, fixed = false, ...props }) {
  const imageArgs = args || (fixed ? { width: 1200, height: window.in } : { maxWidth: 1200 })

  const imgProps = getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)
  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {}

  let processedImg = imageUrlFor(asset)
  processedImg = processedImg.width(Math.round(imageArgs.maxWidth))
  processedImg = processedImg.height(Math.round(imageArgs.maxHeight))
  processedImg = processedImg.url()

  const url = processedImg.split('?')[0] + '?'
  const urlWithRect = processedImg.split('&')[0] + '&'
  console.log(urlWithRect)
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
