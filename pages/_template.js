import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, scale } from 'utils/typography'
import { config } from 'config'
import Header from '../components/header'

const style = {
  Container: {
    maxWidth: rhythm(24),
    padding: `0 ${rhythm(1.5)}`
  }
}

class Template extends React.Component {
  render () {
    const { children } = this.props
    return (
    <Container style={style.Container}>
      <Header />
      {children}
    </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object
}

export default Template
