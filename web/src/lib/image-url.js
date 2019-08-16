// import sanityConfig from '../../../studio/sanity.json'
import imageUrlBuilder from '@sanity/image-url'

const sanityConfig = {
  api: {
    projectId: 'z8zw1m88',
    dataset: 'production'
  }
}

const builder = imageUrlBuilder(sanityConfig.api)

export function imageUrlFor(source) {
  return builder.image(source)
}
