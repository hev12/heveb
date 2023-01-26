import { Formik, Field, Form } from "formik";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import FormFieldError from "./components/FormFieldError";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { registerWithEmailAndPassword } from "./helpers";
import { defaultProfile } from "./rawData";
import "./styles/signup.css";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required Field"),
  email: Yup.string().email("Invalid email").required("Required Field"),
  password: Yup.string()
    .min(8, "Too Short! Password Must be atleast 8 characters")

    .required("Required Field"),
  confirmPassword: Yup.string()
    .min(8, "Too Short! Confirm Password Must be atleast 8 characters")
    .oneOf([Yup.ref("password"), null], "Passwords must match")

    .required("Required Field"),
});

const SignUp = () => {
  const [user] = useAuthState(auth);
  let [selectedImage, setSelectedImage] = useState(defaultProfile);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }
  return (
    <div className="signup-form-wrapper">
      <h1 className="signup-form-title">Start Your Journey Here</h1>

      <div id="profile-preview">
        <img src={selectedImage} alt="" />
      </div>
      <FileBase
        className="file-input"
        type="file"
        multiple={false}
        onDone={({ base64 }) => setSelectedImage(base64)}
      />
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          await registerWithEmailAndPassword(
            values.fullName,
            values.email,
            values.password,
            selectedImage
          ).then(() => {
            signInWithEmailAndPassword(values.email, values.password);
          });
          navigate("/");
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {errors.fullName && touched.fullName ? (
              <FormFieldError message={errors.fullName} />
            ) : null}
            <Field
              className="text-input"
              name="fullName"
              type="text"
              placeholder="Your Name"
            />
            {errors.email && touched.email ? (
              <FormFieldError message={errors.email} />
            ) : null}
            <Field
              className="text-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            {errors.password && touched.password ? (
              <FormFieldError message={errors.password} />
            ) : null}
            <Field
              className="text-input"
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <FormFieldError message={errors.confirmPassword} />
            ) : null}
            <Field
              className="text-input"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <button type="submit">Sign Up</button>
            <p id="have-acc">
              Already have an account? <Link to="/signin"> Sign In</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
