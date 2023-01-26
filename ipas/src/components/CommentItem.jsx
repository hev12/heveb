import { defaultProfile } from "../rawData";
import { collection, query, where } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useEffect } from "react";

const CommentItem = ({ data }) => {
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("uid", "==", data ? data.userId : ""));
  const [users, loading] = useCollectionData(userQuery);

  if (data == null) return;
  if (!users) return;
  return (
    users && (
      <div style={{ margin: "1.4rem 0" }}>
        <div className="comment-profile-section">
          <div className="comment-profile-pic">
            <img src={users[0]?.image} alt="profile" />
          </div>

          <div className="comment-text">
            <p>{users && users[0]?.fullName}</p>
            <p>{data.comment}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default CommentItem;
