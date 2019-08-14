import React from 'react'
import SEO from '../components/seo'
import Container from '../components/layout'
import Layout from '../containers/layout'
import { Link } from 'gatsby'

import { responsiveTitle1 } from '../components/typography.module.css'

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Container>
      <h1 className={responsiveTitle1}>Page not found</h1>
      <p>
        We couldn't find the page you were looking for. This is either because there is an error in
        the URL entered into your web browser or the page that you're looking for has been moved or
        deleted.
      </p>
      Please double check the url and try again or <Link to="/">click here</Link> to return to the
      homepage.
    </Container>
  </>
)

export default NotFoundPage
