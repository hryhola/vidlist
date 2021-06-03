import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import youtubeUtils from "../../utils/youtube";

const Videoplayer = () => {
  const list = useSelector((state: RootState) => state.videolist.videos);
  const video = list[0];

  return (
    <div style={{position:"relative", paddingTop:"56.25%"}}>
      <iframe
        style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
        height="100%"
        width="100%"
        src={youtubeUtils.getEmbedLink(video)}
        title={video.info.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Videoplayer;
