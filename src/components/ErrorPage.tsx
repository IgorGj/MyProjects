import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="text-center" style={{ height: "50vh" }}>
      <div
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <h1 style={{ color: "red" }}>ERROR 404</h1>
        <h5>
          You reached a dead end. Go back to the{" "}
          <Link to="/" style={{ color: "red" }}>
            Homepage
          </Link>
        </h5>
      </div>
    </div>
  );
};
