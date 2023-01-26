import BlogsList from "./BlogsList";
import "./styles/homepage.css";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <div className="header-intro">
        <div className="header-intro-texts">
          <h1 className="header-intro-title">
            <span>Manbeb</span> is a place to read and to connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>

        <div className="big-logo">
          <img
            src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
            alt=""
          />
        </div>
      </div>
      <BlogsList />
    </div>
  );
};

export default HomePage;
