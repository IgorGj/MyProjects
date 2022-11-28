import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataType } from "../../components/MovieList/types";
import { MovieDetailsType } from "./types";


const MovieDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<MovieDetailsType>();


  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=7829002c`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="row justify-content-center my-5">
      <div className="col-6">
        <div className="card">
          <img src={data?.Poster} className="card-img-top" alt={data?.Poster} />
          <div className="card-body">
            <h5 className="card-title">{data?.Title}</h5>
            <p className="card-text">{data?.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
