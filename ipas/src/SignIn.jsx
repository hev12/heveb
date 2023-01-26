import { Formik, Field, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import FormFieldError from "./components/FormFieldError";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import "./styles/signup.css";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required Field"),
  password: Yup.string()
    .min(8, "Too Short! Password Must be atleast 8 characters")
    .required("Required Field"),
});

const SignIn = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  if (user) {
    navigate("/");
  }
  return (
    <div className="signup-form-wrapper">
      <h1 className="signup-form-title">Sign In</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={async (values) => {
          signInWithEmailAndPassword(values.email, values.password).then(() => {
            navigate("/");
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
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
            <button type="submit">Sign In</button>
            <p id="have-acc">
              Don't have account? <Link to="/register"> Sign Up</Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
