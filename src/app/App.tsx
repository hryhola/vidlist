import React from "react";
import { Container } from "@material-ui/core";

import { Videolist, Videoplayer, AddVideoForm } from "../features";

import "./App.css";

function App() {
  return (
    <Container>
      <AddVideoForm />
      <Videolist />
      <Videoplayer />
    </Container>
  );
}

export default App;
