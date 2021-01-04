import BaseBlockContent from '@sanity/block-content-to-react'
import React from 'react'
import Figure from './figure'
import Slideshow from './slideshow'

import typography from '../typography.module.css'

export const getSerializer = (
  { header, h1, h2, h3, h4, paragraph } = {
    header: '',
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    paragraph: '',
  }
) => ({
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return (
            <h1 className={typography.responsiveTitle1 + ' ' + header + ' ' + h1}>
              {props.children}
            </h1>
          )

        case 'h2':
          return (
            <h2 className={typography.responsiveTitle2 + ' ' + header + ' ' + h2}>
              {props.children}
            </h2>
          )

        case 'h3':
          return (
            <h3 className={typography.responsiveTitle3 + ' ' + header + ' ' + h3}>
              {props.children}
            </h3>
          )

        case 'h4':
          return (
            <h4 className={typography.responsiveTitle4 + ' ' + header + ' ' + h4}>
              {props.children}
            </h4>
          )

        case 'blockquote':
          return <blockquote className={typography.blockQuote}>{props.children}</blockquote>

        default:
          return <p className={typography.paragraph + ' ' + paragraph}>{props.children}</p>
      }
    },
    figure(props) {
      return <Figure {...props.node} />
    },
    slideshow(props) {
      return <Slideshow {...props.node} />
    },
  },
})

const serializers = getSerializer()

const BlockContent = ({ blocks, customSerializer }) => (
  <BaseBlockContent blocks={blocks} serializers={customSerializer || serializers} />
)

export default BlockContent
