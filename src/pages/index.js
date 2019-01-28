import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-3">最新</h1>
            </div>
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  key={post.id}
                >
                  <Link 
                    className="content"
                    to={post.fields.slug}
                  >
                    <p className="title is-4">{post.frontmatter.title}</p>
                    <p className="subtitle is-6">{post.frontmatter.date}</p>
                    {/* <p className="subtitle is-6">{post.excerpt}</p> */}
                  </Link>
                </div>
              ))}
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 120)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "YYYY年MM月DD日")
          }
        }
      }
    }
  }
`
