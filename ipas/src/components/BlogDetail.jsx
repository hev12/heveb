import { useParams, Link, useNavigate } from "react-router-dom";
import { doc, collection } from "@firebase/firestore";
import { useDocumentData, useCollection } from "react-firebase-hooks/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { where, query } from "firebase/firestore";
import { db, auth } from "../firebase";
import { removeDoc } from "../helpers";

// import image from "../images/event_image.png";
import "../styles/blogDetail.css";
import { toast } from "react-toastify";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { useEffect } from "react";

const BlogDetail = () => {
  const [user] = useAuthState(auth);
  const [value, setValue] = useState(null);
  const [users, setUsers] = useState(null);
  const [posterUser, setPosterUser] = useState(null);
  const navigate = useNavigate();
  let { blogId } = useParams();
  const docRef = doc(db, "blogs", blogId);
  const [blog, loading] = useDocumentData(docRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const usersRef = collection(db, "users");
  const usersQuery = query(
    usersRef,
    where("uid", "==", value ? value?.postedBy : "")
  );
  const [poster, usersLoading] = useCollection(usersQuery);

  useEffect(() => {
    if (blog) {
      setValue(blog);
    }
  }, [blog]);
  useEffect(() => {
    if (poster) {
      console.log("====================================");
      console.log(poster);
      setPosterUser(poster.docs[0]?.data()?.uid);
      console.log("====================================");
      setUsers(poster);
    }
  }, [poster]);

  if (!value || !users || loading || usersLoading) return;
  return (
    !loading &&
    !usersLoading && (
      <div>
        <div className="header-image">
          <img src={value.coverImage} alt="Cover" />
        </div>

        <div id="content-detail">
          <h1 className="blog-detail-title">{value.title}</h1>

          <div className="profile-section">
            <div className="profile-pic">
              {!usersLoading && users && (
                <img src={users.docs[0]?.data()?.image} alt="profile" />
              )}
            </div>

            <div className="profile-text">
              <p>
                Post By{" "}
                {!usersLoading && users && users.docs[0]?.data()?.fullName}
              </p>
              <p>{new Date(value.postDate?.toDate()).toUTCString()}</p>
            </div>
          </div>
          {user &&
            users &&
            !usersLoading &&
            user.uid === users.docs[0]?.data()?.uid && (
              <div style={{ display: "flex" }}>
                <li className="filled-link-alt">
                  <Link to={`/edit/${blogId}`}>Edit Post</Link>
                </li>
                <li
                  className="filled-link-alt"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    await removeDoc(blogId).then(() => {
                      toast.success("Post Deleted Successfully!", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                      navigate("/blogs");
                    });
                  }}
                >
                  Delete Post
                </li>
              </div>
            )}

          <p className="blog-content">{value.content}</p>

          <div className="blog-image">
            <img src={value.image} alt="blog detail" />
          </div>
        </div>
        {users && (
          <CommentSection
            blogId={blogId}
            postedBy={value.postedBy}
          />
        )}
      </div>
    )
  );
};

export default BlogDetail;
