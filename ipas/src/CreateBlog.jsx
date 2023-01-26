import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import * as Yup from "yup";
import FormFieldError from "./components/FormFieldError";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import FileSelector from "./components/FileSelector";
import {  toast } from "react-toastify";

import { createBlog } from "./helpers";

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

const CreateBlog = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState("");
  const [contentImage, setContentImage] = useState("");

  if (!user) {
    navigate("/");
    return;
  }
  return (
    <div className="create-blog-form-wrapper">
      <h1 className="signup-form-title">Add New Blog</h1>
      <Formik
        initialValues={{
          title: "",
          content: "",
        }}
        validationSchema={BlogSchema}
        onSubmit={async (values) => {
          if (coverImage && contentImage) {
            await createBlog(
              values.title,
              values.content,
              coverImage,
              contentImage,
              user.uid
            ).then(() => {
              toast.success("Post Created Successfully!", {
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
            <FileSelector state={coverImage} setState={setCoverImage} buttonText={coverImage ? "Change Cover Image": "Add New Cover Image"} />

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
              rows={20}
              name="content"
              type="text"
              placeholder="Content"
            />

            <FileSelector state={contentImage} setState={setContentImage} />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBlog;
