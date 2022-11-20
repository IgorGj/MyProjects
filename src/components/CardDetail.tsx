import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../library";
import { Banner } from "./Banner";

type CardDetailState = {
  id: number;
  title: string;
  price: string;
  desc: string;
  stars: number;
};

export const CardDetail = () => {
  const { currentCardId } = useParams();
  const [card, setCard] = useState<CardDetailState[]>();
  const [title, setTitle] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    const ID = currentCardId ? currentCardId : 0;

    let currentProduct = products.filter((el) => el.id == ID);
    console.log("ha");
    if (ID > products.length) {

      navigate("*");
    }
    if (currentProduct?.length) {
      let title = currentProduct[0].title;
      setCard(currentProduct);
      console.log(currentProduct[0].title);
      setTitle(title);
    }
  }, []);
  return (
    <>
      <Banner title={title} />
      {card?.map((el) => {
        return (
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 text-right">
                <img src={require(`./img/${el.id}.jpg`)} alt="" />
              </div>
              <div className="col-6 ">
                <span
                  style={{ color: "red", fontWeight: "900", fontSize: "25px" }}
                >
                  {el.price}
                </span>
                <h2>{el.title}</h2>
                <p>{el.desc}</p>
                <button className="btn btn-danger">Add to Card</button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
