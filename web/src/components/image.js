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

  const imgProps = fixed
    ? getFixedGatsbyImage(asset, imageArgs, sanityConfig.api)
    : getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)
  // console.log(imgProps)
  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {
    console.log(err)
  }
  console.log(imageArgs)
  let processedImg = imageUrlFor(asset)
  if (fixed) {
    processedImg = processedImg.width(args.width).height(args.height)
  } else {
    console.log(imgProps)
    processedImg = processedImg.width(imageArgs.maxWidth)

    // if (!imageArgs.maxHeight) {
    //   imageArgs.maxHeight = imageArgs.maxWidth * imageArgs.aspectRatio
    // }
    processedImg = processedImg.height(imageArgs.maxHeight)
    processedImg = processedImg.url()
  }

  const url = processedImg.split('?')[0] + '?'
  const urlWithRect = processedImg.split('&')[0] + '&'

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
