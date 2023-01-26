import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  updateDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPassword = async (
  fullName,
  email,
  password,
  image
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      fullName,
      email,
      image,
      password,
    });

    // await logInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    return err.message;
  }
};

const createBlog = async (title, content, coverImage, contentImage, userId) => {
  await addDoc(collection(db, "blogs"), {
    title: title.toLowerCase().trim(),
    content,
    coverImage,
    image: contentImage,
    postedBy: userId,
    postDate: serverTimestamp(),
  });
};
const updateBlog = async (title, content, coverImage, contentImage, blogId) => {
  await updateDoc(doc(db, "blogs", blogId), {
    title: title.toLowerCase().trim(),
    content,
    coverImage,
    image: contentImage,
    postDate: serverTimestamp(),
  });
};

const removeDoc = async (blogId) => {
  await deleteDoc(doc(db, "blogs", blogId));
};

const createComment = async (blogId, userId, comment) => {
  await addDoc(collection(db, "comments"), {
    blogId,
    userId,
    comment,
  });
};

export {
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  createBlog,
  updateBlog,
  removeDoc,
  createComment,
};
