import { useNavigate } from "react-router-dom";
type CardProps = {
  id: number;
  title: string;
  price: string;
  desc?: string;
  stars: number;
};

export const Card = (props: CardProps) => {
  const navigate = useNavigate();
  let howManyStars: JSX.Element[] = [];

  for (let i = 0; i < props.stars; i++) {
    const aStar = (
      <span style={{ color: "red" }}>
        <span className="material-symbols-outlined">star</span>
      </span>
    );
    howManyStars.push(aStar);
  }
  const clickHandler = () => {
    navigate(`/details/${props.id}`);
  };

  return (
    <div className="col-4">
      <div className="card" onClick={clickHandler}>
        <img
          src={require(`./img/${props.id}.jpg`)}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body text-center">
          <h5 className="card-title">{props.title}</h5>
          <p
            className="card-text"
            style={{ color: "red", fontWeight: "bolder" }}
          >
            {props.price}
          </p>
          {howManyStars?.map((el) => {
            return el;
          })}
        </div>
      </div>
    </div>
  );
};
