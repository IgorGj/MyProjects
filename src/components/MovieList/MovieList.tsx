import MovieCard from "../MovieCard/MovieCard";
import { DataType } from "./types";

interface Props {
  data: DataType[];
}

const MovieList = ({ data }: Props) => {
  return (
    <div className="container">
      <div className="row mt-5 ">
        {data &&
          data.length > 0 &&
          data.map((movie: DataType) => <MovieCard {...movie} />)}
      </div>
    </div>
  );
};

export default MovieList;
