import { FC } from "react";
import { Image } from "../../../constants/types/Image";

type Props = {
  image: Image;
};
const DeckItem: FC<Props> = ({ image }) => {
  return (
    <figure className="border-gray-800 rounded-md py-4 ">
      <img src={image.fullPath} alt="Deck Image" loading="lazy" />
    </figure>
  );
};

export default DeckItem;
