import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Image, { FixedObject } from "gatsby-image"

import { rhythm } from "../utils/typography"
import { Query } from "../graphql-types"

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`

interface Data extends Query {
  avatar: {
    childImageSharp: {
      fixed: FixedObject
    }
  }
}

const Bio = () => {
  const data: Data = useStaticQuery(bioQuery)
  const { author, social } = data.site.siteMetadata

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p>
        Written by <strong>{author}</strong>: CodeMonkey👨🏽‍💻, CS Nerd 🖥,
        Thoughtful 🤔 & Minimalist in Progress 📝
        {` `}
      </p>
    </div>
  )
}

export default Bio
