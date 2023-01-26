import { useState } from "react";
import CommentItem from "./CommentItem";
import "../styles/commentSection.css";
import { createComment } from "../helpers";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { useEffect } from "react";

const CommentSection = ({ blogId, postedBy }) => {
  const [user] = useAuthState(auth);
  const [comment, setComment] = useState("");

  const commentsRef = collection(db, "comments");
  const commentsQuery = query(commentsRef, where("blogId", "==", blogId));
  const [comments, loading] = useCollection(commentsQuery);

  const postComment = () => {
    if (comment.length > 0) {
      createComment(blogId, user.uid, comment.trim());
      setComment("");
    }
  };

  useEffect(() => {
    if (user) {
      console.log("====================================");
      console.log(user.uid, postedBy);
      console.log("====================================");
    }
  }, [user]);

  if (loading || !comments) return;
  return (
    <div className="comment-section-container">
      <h1 className="comments-title">Comments</h1>
      {user && postedBy !== user.uid && (
        <div className="comment-bar">
          <input
            className="comment-text-input"
            placeholder="Write your comments here"
            type="text"
            name="search"
            value={comment}
            onInput={(e) => {
              setComment(e.target.value);
            }}
          />
          <button id="comment-btn" type="submit" onClick={postComment}>
            Comment
          </button>
        </div>
      )}

      {comments &&
        comments?.docs.map((doc) => (
          <CommentItem key={doc.id} data={doc.data()} />
        ))}

      {comments.docs.length === 0 && (
        <div>There are no comments currently.</div>
      )}
    </div>
  );
};

export default CommentSection;
