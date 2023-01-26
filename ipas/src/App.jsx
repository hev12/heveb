import { Routes, Route } from "react-router-dom";

import BlogsList from "./BlogsList";
import BlogDetail from "./components/BlogDetail";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Header from "./Header";
import HomePage from "./HomePage";
import CreateBlog from "./CreateBlog";
import UpdatePost from "./UpdatePost";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="blogs" element={<BlogsList />} />
        <Route path="register" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />

        <Route path="create" element={<CreateBlog />} />
        <Route path="edit/:blogId" element={<UpdatePost />} />
        <Route path="blog/:blogId" element={<BlogDetail />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
