import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const [userID, setUserID] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [postID, setPostID] = useState(null);

  useEffect(() => {
    // Fetch the user ID from the session when the component mounts
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        console.log("Login response:", response.data);
        setUserID(response.data.userData.userID); // Extracting user ID here

        // Fetch blog content and comments when the user ID is available
        fetchBlogData(response.data.userData.userID);
      })
      .catch((error) => {
        console.error("Error fetching user ID:", error);
      });
  }, []);

  const handlePostComment = () => {
    // Check if comment text is not empty
    if (commentText.trim() === "") {
      return;
    }
    const blogContent = () => {
      // Fetch blog content and comments when the component mounts
      axios
        .get(`http://localhost:3001/blog/posts`)
        .then((response) => {
          setBlogContent(response.data.title);
          setComments(response.data.comments);
          setPostID(response.data.postID);
        })
        .catch((error) => {
          console.error("Error fetching blog post:", error);
        });
    };

    // Send the comment to the server
    axios
      .post("http://localhost:3001/blog/comments", {
        userID,
        postID,
        content: commentText,
      })
      .then((response) => {
        // Update the comments state with the new comment
        setComments([...comments, response.data.comment]);

        // Clear the comment input
        setCommentText("");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
      });
  };

  return (
    <div>
      <h6>Blog Posts</h6>
      <div>
        <p>{blogContent}</p>
      </div>

      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <div key={comment.commentID}>
            <p>{comment.content}</p>
            {/* Display other comment details as needed */}
          </div>
        ))}
      </div>

      {userID ? (
        <div>
          <h4>Blog Posts </h4>
          <div>
            <p>{blogContent}</p>
          </div>

          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
          ></textarea>
          <button onClick={handlePostComment}>Post Comment</button>
        </div>
      ) : (
        <p>Please log in to post a comment.</p>
      )}

      {/* Option to return home */}
      <Link to="/homepage">Return Home</Link>
    </div>
  );
};

export default BlogPost;
