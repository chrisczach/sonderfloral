import React from 'react'
import Img from 'gatsby-image'
import { getFluidGatsbyImage, getFixedGatsbyImage } from 'gatsby-source-sanity'

import { imageUrlFor } from '../lib/image-url'
let sanityConfig = {
  api: {
    projectId: 'z8zw1m88',
    dataset: 'production'
  }
}

export default function Image({ asset, args, fixed = false, ...props }) {
  const imageArgs =
    args || (fixed ? { width: 1200, height: Math.floor((9 / 16) * 1200) } : { maxWidth: 1200 })

  const imgProps = fixed
    ? getFixedGatsbyImage(asset, imageArgs, sanityConfig.api)
    : getFluidGatsbyImage(asset, imageArgs, sanityConfig.api)
  try {
    imgProps.base64 = asset.asset.metadata.lqip
  } catch (err) {
    // console.log(err)
  }
  // console.log(imageArgs)
  let processedImg = imageUrlFor(asset)
  if (fixed) {
    processedImg = processedImg.width(Math.round(args.width)).height(Math.round(args.height))
  } else {
    // console.log(imgProps)
    processedImg = processedImg.width(Math.round(imageArgs.maxWidth))

    // if (!imageArgs.maxHeight) {
    //   imageArgs.maxHeight = imageArgs.maxWidth * imageArgs.aspectRatio
    // }
    processedImg = processedImg.height(Math.round(imageArgs.maxHeight))
    processedImg = processedImg.url()
  }

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
