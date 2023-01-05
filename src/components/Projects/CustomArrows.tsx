import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
  direction: string;
}
export const CustomArrows = ({ direction }: Props) => {
  const [isLeft, setIsLeft] = useState(false);

  useEffect(() => {
    if (direction === "left") {
      setIsLeft(true);
    } else {
      setIsLeft(false);
    }
  }, []);

  return <FontAwesomeIcon icon={isLeft ? faArrowLeftLong : faArrowRightLong} />;
};
