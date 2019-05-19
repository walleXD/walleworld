import React, { ReactElement } from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { Query } from "../graphql-types"

interface Props {
  location: {
    pathname: string
  }
  data: Query
}

const BlogIndex: React.FC<Props> = ({ data, location }): ReactElement => {
  const { site, allMarkdownRemark } = data
  const siteTitle = site.siteMetadata.title || ""
  const posts = allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      {posts.map(
        ({ node: { frontmatter, fields, excerpt } }): ReactElement => {
          const title = frontmatter.title || fields.slug || ""
          return (
            <wired-card key={fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={fields.slug}>
                  {title}
                </Link>
              </h3>
              <h5>{frontmatter.date}</h5>
              <p
                dangerouslySetInnerHTML={{
                  __html: frontmatter.description || excerpt,
                }}
              />
            </wired-card>
          )
        }
      )}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { draft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
