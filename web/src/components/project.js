import { format, distanceInWords, differenceInDays } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import Image from './image'
import styles from './project.module.css'
import { ScrollContext } from './global-styles'
import { responsiveTitle1 } from '../components/typography.module.css'
import { relative } from 'path'
import ResizeAware from 'react-resize-aware'

function Project(props) {
  const {
    _rawBody,
    title,
    mainImage,
    members,
    publishedAt,
    relatedProjects,
    category: {
      slug: { current: categorySlug },
      title: categoryTitle
    }
  } = props

  const [listener, { width, height }] = ResizeAware()
  const [windowHeight, setWindowHeight] = useState(1000)
  try {
    setWindowHeight(window.innerHeight)
  } catch (e) {}
  const { percentScroll, position, lastTrigger } = useContext(ScrollContext)

  const portrait = windowHeight > width

  const timeBetweenRender = Math.min(new Date().getTime() - lastTrigger, 100) || 100
  return (
    <article className={styles.root}>
      {!portrait && (
        <Link className={styles.categoryLink} to={`/projects/${categorySlug}`}>
          ← back to {categoryTitle}
        </Link>
      )}
      {props.mainImage && mainImage.asset && (
        <div className={styles.imageWrapper}>
          {listener}
          <Image asset={mainImage} args={{ maxWidth: width || 1200, maxHeight: height || 1200 }} />
        </div>
      )}
      <div
        className={styles.backgroundOverlay}
        style={{
          transition: `all ${timeBetweenRender / 1000}s linear`,
          transform: `translateY( calc( ${portrait ? '75vw' : '85vh'} - ${Math.min(
            portrait ? position * 1.25 : position * 1.125,
            windowHeight
          )}px + var(--burger-size) / 6 * 5 + var(--burger-size) * 2))`
        }}
      />
      <Container className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={`${responsiveTitle1} ${styles.title}`}>{title}</h1>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do YYYY')}
              </div>
            )}
            {members && <RoleList items={members} title="Contributors" />}
            {relatedProjects && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
                <ul>
                  {relatedProjects.map(project => (
                    <li key={`related_${project._id}`}>
                      <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default Project
