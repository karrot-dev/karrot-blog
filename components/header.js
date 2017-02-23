import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'


export default class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="links">
          <a href="https://github.com/yunity">Github</a>
          <a href="https://yunity.atlassian.net/wiki/display/FSINT">Wiki</a>
        </div>
        <Link to={prefixLink('/')} ><img src="/logo.svg"/></Link>
          <div><a href="https://foodsaving.world">foodsaving.world</a></div>
          <h2><Link to={prefixLink('/')} >Blog</Link></h2>
      </header>
    )
  }
}
