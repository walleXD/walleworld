import React, { ReactNode } from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

interface Props {
  location: {
    pathname: string
  },
  title: string,
  children: ReactNode
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const header = location.pathname === `${__PATH_PREFIX__}/` ?
    (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  : (
      <h3
        style={{
          marginTop: 0
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )

  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        paddingRight: `${rhythm(3 / 4)}`,
        paddingLeft: `${rhythm(3 / 4)}`,
        paddingTop: `${rhythm(1.5)}`,
        height: '100%'
      }}
    >
      <div style={{
        minHeight: 'calc(100vh - 90px)'
      }}>
        <header>{header}</header>
        <main>{children}</main>
      </div>
      <footer style={{
        height: '50px'
      }}>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://github.com/walleXD/walleworld">React & Typescript</a>
      </footer>
    </div>
  )
}

export default Layout
