import React from 'react'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

import styles from './role-list.module.css'

function ucfirst(str) {
  return `${str.substr(0, 1).toUpperCase()}${str.substr(1)}`
}

function RoleList({ items, title }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.headline}>{title}</h2>
      <ul className={styles.list}>
        {items.map(item =>
          addLink(item.person.instagram)(
            <li
              key={item._key}
              className={styles.listItem}
              style={{ cursor: item.person.instagram ? 'pointer' : 'auto' }}
            >
              <div>
                <div className={styles.avatar}>
                  {item.person && item.person.image && item.person.image.asset && (
                    <img
                      src={imageUrlFor(buildImageObj(item.person.image))
                        .width(100)
                        .height(100)
                        .fit('crop')
                        .url()}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div
                className={item.person.instagram ? styles.nameWrapper : styles.nameWrapperNoShare}
              >
                <div className={styles.names}>
                  <div>
                    <strong>{(item.person && item.person.name) || <em>Missing</em>}</strong>
                  </div>
                  {item.roles && (
                    <div>
                      {item.roles.map((role, idx) => {
                        switch (true) {
                          case idx === 0:
                            return <span key={role}>{ucfirst(role)}</span>
                          case idx === item.roles.length - 1:
                            return <span key={role}> & {role}</span>
                          default:
                            return <span key={role}>, {role}</span>
                        }
                      })}
                    </div>
                  )}
                </div>
                <div className={styles.followLink}>
                  {item.person.instagram && `Follow ${(item.person && item.person.name) || ''}`}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

const addLink = link => element => {
  if (link) {
    return (
      <a href={link} target="_blank" className={styles.link}>
        {element}
      </a>
    )
  } else {
    return element
  }
}
export default RoleList
