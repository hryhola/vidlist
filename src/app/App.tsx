import React from "react";

import { Videoplayer } from "../features";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Videoplayer
        video={{
          youtubeId: "kQ-I-VQsvko",
          watchTime: 10,
          queue: 1,
          start: 2,
          info: {
            title: "Video",
            channelTitle: "ChTitle",
            publishedAt: new Date("December 17, 1995 03:24:00"),
            thumbnail: "https://i.ytimg.com/vi/kQ-I-VQsvko/maxresdefault.jpg",
            isAgeRestricted: false,
            duration: 120,
          }
        }}
      />
    </div>
  );
}

export default App;
