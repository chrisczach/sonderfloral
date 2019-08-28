import { format, formatDistance, differenceInDays } from 'date-fns'
import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import BlockContent from './block-content'
import Container from './container'
import RoleList from './role-list'
import Image from './image'
import styles from './project.module.css'
import { ScrollContext } from './global-styles'
import { responsiveTitle1 } from '../components/typography.module.css'
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
  const { position } = useContext(ScrollContext)

  const portrait = windowHeight > width

  return (
    <article className={styles.root}>
      {!portrait && (
        <Link className={styles.categoryLink} to={`/projects/${categorySlug}`}>
          ← back to {categoryTitle}
        </Link>
      )}
      {props.mainImage && mainImage.asset && (
        <div className={styles.imageWrapper} style={{ opacity: position > windowHeight ? 0 : 1 }}>
          {listener}
          <Image asset={mainImage} args={{ maxWidth: width || 1200, maxHeight: height || 1200 }} />
        </div>
      )}
      <div className={styles.backgroundOverlay} style={{}} />
      <Container className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={`${responsiveTitle1} ${styles.title}`}>{title}</h1>
            {_rawBody && <BlockContent blocks={_rawBody || []} />}
          </div>
          <aside className={styles.metaContent}>
            {publishedAt && (
              <div className={styles.publishedAt}>
                Published{' '}
                {differenceInDays(new Date(), new Date(publishedAt)) < 3
                  ? formatDistance(new Date(publishedAt), new Date()) + ' ago'
                  : `on ` + format(new Date(publishedAt), 'MMMM do yyyy')}
              </div>
            )}
            {members && <RoleList items={members} title="Contributors" />}
            {relatedProjects && relatedProjects.length > 0 && (
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
