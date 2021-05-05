import React from "react";

import { Videoplayer } from "../features";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Videoplayer
        video={{
          youtubeId: "kQ-I-VQsvko",
          duration: 10,
          queue: 1,
          start: 2,
        }}
      />
    </div>
  );
}

export default App;
