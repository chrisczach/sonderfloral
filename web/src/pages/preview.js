import React, { useState } from 'react'
import sanityClient from '@sanity/client'
import BlogPostTemplate from '../templates/blog-post'
import ProjectTemplate from '../templates/project'

const clientForPreview = sanityClient({
  projectId: 'z8zw1m88',
  dataset: 'production',
  useCdn: false,
  withCredentials: true
})

const templates = {
  post: BlogPostTemplate,
  project: ProjectTemplate
}

export default function preview() {
  const [previewData, setPreviewData] = useState(null)
  previewData ||
    clientForPreview
      .getDocument(getUrlParameter('document'))
      .then(post => console.log(post) || setPreviewData({ post }))
  try {
    const type = previewData._type
    const PreviewTempate = templates[type]
    return <PreviewTempate data={previewData} />
  } catch (err) {
    return 'data not loaded'
  }
}

const getUrlParameter = name => {
  try {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    var results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  } catch (err) {}
}
