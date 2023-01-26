import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "./firebase";
import { doc } from "firebase/firestore";
import * as Yup from "yup";
import FormFieldError from "./components/FormFieldError";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import FileSelector from "./components/FileSelector";
import { toast } from "react-toastify";
import { updateBlog } from "./helpers";

import "./styles/createBlog.css";

const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Too Short! Title Must be atleast 5 characters")
    .max(150, "Title Too Long!")
    .required("Required Field"),
  content: Yup.string()
    .min(100, "Too Short! Content Must be atleast 100 characters")
    .required("Required Field"),
});

const UpdatePost = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  let { blogId } = useParams();
  const docRef = doc(db, "blogs", blogId);
  const [blog, loading] = useDocumentData(docRef, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const [coverImage, setCoverImage] = useState("");
  const [contentImage, setContentImage] = useState("");

  useEffect(() => {
    if (loading !== true) {
      setCoverImage(blog.coverImage);
      setContentImage(blog.image);
    }
  }, [loading, blog]);

  if (!user) {
    navigate("/");
  }
  if (!blog) return;
  return (
    <div className="create-blog-form-wrapper">
      <h1 className="signup-form-title">Update Blog</h1>
      <Formik
        initialValues={{
          title: blog.title + "",
          content: blog.content + "",
        }}
        validationSchema={BlogSchema}
        onSubmit={async (values) => {
          if (coverImage && contentImage) {
            await updateBlog(
              values.title,
              values.content,
              coverImage,
              contentImage,
              blogId
            ).then(() => {
              toast.success("Post Updated Successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });

              navigate("/");
            });
          } else {
            toast.error("Cover Image & Content Image Are Required!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="create-blog-form">
            <FileSelector
              state={coverImage}
              setState={setCoverImage}
              buttonText="Update Image"
            />

            {errors.title && touched.title ? (
              <FormFieldError message={errors.title} />
            ) : null}
            <Field
              className="text-input"
              name="title"
              type="text"
              placeholder="Blog Title"
            />
            {errors.content && touched.content ? (
              <FormFieldError message={errors.content} />
            ) : null}
            <Field
              className="text-input textarea"
              as="textarea"
              name="content"
              type="text"
              placeholder="Content"
            />

            <FileSelector
              state={contentImage}
              setState={setContentImage}
              buttonText="Update Image"
            />
            <button type="submit">Update</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdatePost;
