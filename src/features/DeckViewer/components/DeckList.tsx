import { FC } from "react";
import { ResponseDataImages } from "../../../constants/types/Image";
import DeckItem from "./DeckItem";

type Props = {
  data: ResponseDataImages;
};
const DeckList: FC<Props> = ({ data }) => {
  if (!data) return <></>;
  return (
    <ul className="list-none hover:list-disc bg-cyan-500 shadow-lg shadow-cyan-500/50">
      {data.images.map((deckImage, key) => (
        <DeckItem image={deckImage} key={deckImage.id} />
      ))}
    </ul>
  );
};

export default DeckList;
