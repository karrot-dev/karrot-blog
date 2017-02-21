import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'


export default class Header extends React.Component {
  render () {
    return (
      <header>
        <div className="links">
          <Link to={prefixLink('/team/')}>Team</Link>
          <Link to="https://github.com/yunity">Github</Link>
          <Link to="https://yunity.atlassian.net/wiki/display/FSINT">Wiki</Link>
        </div>
        <Link to={prefixLink('/')} ><img src="/logo.svg"/></Link>
          <div><a href="https://foodsaving.world">Foodsaving Worldwide</a></div>
          <h2><Link to={prefixLink('/')} >Development Blog</Link></h2>
      </header>
    )
  }
}
