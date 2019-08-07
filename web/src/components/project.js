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
import { ScrollRefContext } from '../components/global-styles'

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

  let width = 2400
  try {
    size = window.innerWidth
  } catch (e) {}
  const height = Math.floor((9 / 16) * width)

  // const scrollDivRef = useContext(ScrollRefContext)

  // const [imageTop, setImageTop] = useState(0)

  // useEffect(() => {
  //   const handle = ({ target: { scrollTop } }) => setImageTop(scrollTop)
  //   scrollDivRef.current.addEventListener('scroll', handle)

  //   // return () => scrollDivRef.current.removeEventListener('scroll', handle)
  // }, [])

  return (
    <article className={styles.root}>
      <Link className={styles.categoryLink} to={`/projects/${categorySlug}`}>
        back to {categoryTitle}
      </Link>
      {props.mainImage && mainImage.asset && (
        <div className={styles.imageWrapper}>
          <div className={styles.innerImageWrapper}>
            <Image
              // style={{ top: `${Math.floor(imageTop)}px` }}
              asset={mainImage}
              args={{ maxWidth: width, maxHeight: height }}
            />
          </div>
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
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
