import { DataType } from "../MovieList/types";
import { Link } from "react-router-dom";

const MovieCard = ({ Poster, Title, imdbID }: DataType) => {
  return (
    <div className="col-4 card mb-3">
      <Link to={`/details/${imdbID}`}>
        <img src={Poster} alt="title" style={{ height: "20vh" }} />
        <h1>{Title}</h1>
      </Link>
    </div>
  );
};

export default MovieCard;
