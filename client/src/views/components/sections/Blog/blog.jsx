import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const [userID, setUserID] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        console.log("Login response:", response.data);
        setUserID(response.data.userData.userID);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/blogPosts")
      .then((response) => {
        setTitles(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching blog post titles:", error);
      });
  }, []);

  const handlePostComment = () => {
    if (!userID) {
      alert("Please log in to post a comment.");
      return;
    }

    // Submit the comment using axios or your preferred method
    // For demonstration purposes, this logs the comment to the console
    console.log(`User ${userID} is posting comment: ${commentText}`);

    // Clear the comment textarea after posting
    setCommentText("");
  };

  const handleBlogPostClick = (postId) => {
    // Fetch comments for the selected blog post
    axios
      .get(`http://localhost:3001/blog/${postId}/comments`)
      .then((response) => {
        setComments(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching blog post comments:", error);
      });
  };

  return (
    <div>
      <h4>Blog Posts</h4>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {titles.map((title) => (
          <div
            key={title.PostID}
            style={{
              backgroundColor: "white",
              width: "48%",
              padding: "16px",
              margin: "8px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              boxSizing: "border-box",
            }}
          >
            <Link
              to="/blogPost"
              onClick={() => handleBlogPostClick(title.PostID)}
            >
              <h3 style={{ margin: "8px 0", fontWeight: "bold" }}>
                {title.title}
              </h3>
            </Link>
            <img
              src="https://picsum.photos/500/300/?blur=2"
              alt="Blog Post Thumbnail"
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </div>

      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.commentID}>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>

      {userID !== null && (
        <div>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button onClick={handlePostComment}>Post Comment</button>
          <Link to="/">Return Home</Link>
        </div>
      )}

      {userID === null && (
        <div>
          <p>Please log in to post a comment.</p>
          <Link to="/">Return Home</Link>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
