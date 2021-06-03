import React from "react";
import { Video } from "../../types";

import Videocard from "./card";

interface Props {
  filtredList: Video[];
}

const Cardsview = (p: Props) => {
  return (
    <div>
      {p.filtredList.map((v) => (
        <Videocard video={v} />
      ))}
    </div>
  );
};

export default Cardsview;
