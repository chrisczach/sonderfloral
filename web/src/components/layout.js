import React from 'react'
import ReactSVG from 'react-svg'
import { Link } from 'gatsby'
import Header from './header'
import BurgerMenu from './burger-menu'
import '../styles/layout.css'
import styles from './layout.module.css'
import GlobalStyles from './global-styles'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import Transition from './page-transition'
import BackgroundImage from './background-image'
import instagramLogo from '../images/instagram-logo.svg'
const Layout = ({ children, companyInfo, siteTitle, siteSettings, location }) => {
  let logo, submarkLogo, alt1logo
  let title = ''
  let pathname = ''
  try {
    title = siteTitle.toUpperCase()
  } catch (err) {
    console.log('prevent build error')
  }

  try {
    pathname = location.pathname
  } catch (err) {
    console.log('prevent build error')
  }

  try {
    logo = siteSettings.logo
    submarkLogo = siteSettings.submarkLogo
    alt1logo = siteSettings.alt1logo
  } catch (err) {
    console.log('prevent build error')
  }

  return (
    <GlobalStyles siteSettings={siteSettings}>
      <BurgerMenu siteTitle={title} logo={alt1logo} />
      <div id="page-wrap">
        <Header siteTitle={title} logo={logo} pathname={pathname} />

        <Transition location={{ pathname }}>
          <>
            <div className={styles.content}>{children}</div>
          </>
        </Transition>

        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.companyInfo}>
              {companyInfo && (
                <div>
                  {/* <br />
                  {companyInfo.address1}
                  <br />
                  {companyInfo.address2 && (
                    <span>
                      {companyInfo.address2}
                      <br />
                    </span>
                  )}
                  {companyInfo.zipCode} {companyInfo.city}
                  {companyInfo.country && <span>, {companyInfo.country}</span>} */}
                  <Link to="/">
                    <ReactSVG
                      className={styles.svgWrapper}
                      src={submarkLogo && imageUrlFor(buildImageObj(submarkLogo)).url()}
                    />
                  </Link>
                  {/* {companyInfo.name.toUpperCase()} */}
                </div>
              )}
            </div>

            <a
              href="https://www.instagram.com/sonderfloral/"
              target="_blank"
              className={styles.followSection}
            >
              <img
                src={instagramLogo}
                style={{ display: 'inline-block', height: '1.25em', margin: '0.5em' }}
              />
              @sonderfloral
            </a>
            {/* <div className={styles.siteInfo}>
              © {new Date().getFullYear()}, Built with <a href="https://www.sanity.io">Sanity</a>{' '}
              &amp;
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </div> */}
          </div>
        </footer>

        {/* <Div100vh className={styles.background} /> */}
      </div>
      <BackgroundImage />
    </GlobalStyles>
  )
}

export default Layout
