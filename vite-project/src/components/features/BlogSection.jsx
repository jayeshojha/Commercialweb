/**
 * BlogSection Component
 *
 * Renders the recent articles preview grid with author metadata and dates.
 */

import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../../data/blogData";

export function BlogSection({ title = "Recent Blog", showViewAll = true }) {
  return (
    <div className="blog-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-6">
            <h2 className="section-title">{title}</h2>
          </div>
          {showViewAll && (
            <div className="col-md-6 text-start text-md-end">
              <Link to="/blog" className="more">
                View All Posts
              </Link>
            </div>
          )}
        </div>

        <div className="row">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
              <div className="post-entry">
                <Link to="/blog" className="post-thumbnail">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="img-fluid rounded"
                  />
                </Link>
                <div className="post-content-entry">
                  <h3>
                    <Link to="/blog">{post.title}</Link>
                  </h3>
                  <div className="meta">
                    <span>
                      by <a href="#author">{post.author}</a>
                    </span>{" "}
                    <span>
                      on <a href="#date">{post.date}</a>
                    </span>
                  </div>
                  {post.summary && (
                    <p className="mt-2 text-muted small">{post.summary}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogSection;

