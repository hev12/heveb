import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import "./styles/header.css";

const Header = () => {
  const [user, ] = useAuthState(auth);
  const [signOut, ] = useSignOut(auth);
  return (
    <header>
      <div className="content">
        <Link to="/">
          <h1 id="logo">Manbeb.</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          {user && (
            <li>
              <Link to={"/create"}>New Blog</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          )}
          {user ? (
            <li
              className="filled-link sign-out"
              onClick={async () => {
                await signOut();
              }}
            >
              Sign Out
            </li>
          ) : (
            <li className="filled-link">
              <Link to={"/signin"}>Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
