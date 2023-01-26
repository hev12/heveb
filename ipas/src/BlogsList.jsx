import BlogItem from "./components/BlogItem";
import { useState, useEffect } from "react";
import { collection, query, where } from "@firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import "./styles/blogsList.css";

const BlogsList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [values, setValues] = useState(null);
  const [blogsValues, loading] = useCollection(collection(db, "blogs"));

  const blogsRef = collection(db, "blogs");
  const blogsSearchQuery = query(
    blogsRef,
    where("title", "==", searchKey.toLowerCase().trim())
  );
  const [searchResult] = useCollection(blogsSearchQuery);

  useEffect(() => {
    if (searchResult && searchKey.length > 0) {
      setValues(searchResult);
    } else if (blogsValues) {
      setValues(blogsValues);
    }
  }, [blogsValues, searchResult, searchKey]);

  if (!values) return;
  return (
    !loading && (
      <div id="content-bloglist">
        <div className="search-bar">
          <input
            style={{ marginTop: "2rem", height: "4rem" , fontSize: "1.3rem", }}
            className="text-input"
            placeholder="Search What you want to read"
            type="text"
            name="search"
            onInput={(e) => {
              setSearchKey(e.target.value);
            }}
          />
        </div>

        <h1 id="list-title">
          {searchKey.length === 0 ? "Blogs for you to read." : "Search Results"}
        </h1>

        {searchKey.length > 0 && values?.docs.length === 0 && (
          <div>There is no blog by that title.</div>
        )}
        <div className="blogList">
          {values &&
            values?.docs.map((doc) => (
              <BlogItem key={doc.id} data={doc.data()} postId={doc.id} />
            ))}
        </div>
        
      </div>
    )
  );
};

export default BlogsList;
