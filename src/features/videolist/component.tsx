import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/rootReducer";

import Cardsview from "./cardsview";
import Tableview from "./tableview";
import Filters from "./filters";
import { VideoSortBy } from "../../types";
import { sortVideosBy } from "../../utils/format";

const Videolist = () => {
  const videos = useSelector((state: RootState) => state.videolist.videos);
  const [view, setView] = useState<"table" | "cards">("table");
  const [sortBy, setSortBy] = useState<VideoSortBy>("order");

  const listWithPosition = videos.map((v, i) => ({ ...v, absolutePosition: i + 1 }));
  const preparedData = sortVideosBy(sortBy, listWithPosition);


  return (
    <>
      <Filters />
      {view === "table" ? <Tableview filtredList={preparedData} setSortBy={setSortBy} sortBy={sortBy} /> : <Cardsview filtredList={preparedData}/>}
    </>
  );
};

export default Videolist;
