import React from 'react'
import Header from './header'
import BurgerMenu from './burger-menu'
import '../styles/layout.css'
import styles from './layout.module.css'
import GlobalStyles from './global-styles'

const Layout = ({ children, companyInfo, siteTitle, siteSettings }) => {
  console.log(siteSettings.logo)
  return (
    <GlobalStyles siteSettings={siteSettings}>
      <BurgerMenu siteTitle={siteTitle} />
      <div id="page-wrap">
        <Header siteTitle={siteTitle} logo={siteSettings.logo} />
        <div className={styles.content}>{children}</div>
        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.companyAddress}>
              {companyInfo && (
                <div>
                  {companyInfo.name}
                  <br />
                  {companyInfo.address1}
                  <br />
                  {companyInfo.address2 && (
                    <span>
                      {companyInfo.address2}
                      <br />
                    </span>
                  )}
                  {companyInfo.zipCode} {companyInfo.city}
                  {companyInfo.country && <span>, {companyInfo.country}</span>}
                </div>
              )}
            </div>

            <div className={styles.siteInfo}>
              © {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{' '}
              &amp;
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </div>
          </div>
        </footer>
      </div>
    </GlobalStyles>
  )
}

export default Layout
