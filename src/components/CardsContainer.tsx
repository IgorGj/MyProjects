import products from "../library";
import { Card } from "./Card";

export const CardsContainer = () => {
  return (
    <div className="container">
      <div className="row">
        {products?.map((el) => {
          return (
            <Card
              id={el.id}
              title={el.title}
              price={el.price}
              stars={el.stars}
            />
          );
        })}
      </div>
    </div>
  );
};
