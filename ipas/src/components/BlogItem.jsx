import { useNavigate } from "react-router-dom";
import "../styles/blogItem.css";

const BlogItem = ({ data, postId }) => {
  const { title, postDate, coverImage, postedBy } = data;
  const navigate = useNavigate();

  const navigateToDetail = (id) => {
    navigate(`/blog/${id}`);
  };
  return (
    <div className="container" onClick={() => navigateToDetail(postId)}>
      <div className="image-container">
        <img src={coverImage} alt="" />
      </div>
      <div className="text">
        <h3>{title}</h3>
        <p>{new Date(postDate?.toDate()).toUTCString()}</p>
      </div>
    </div>
  );
};

export default BlogItem;
