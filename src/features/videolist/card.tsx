import { Paper } from "@material-ui/core";
import React from "react";
import { Video } from "../../types";

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(({ spacing }) => ({
  paper: {
    width: "320px",
  },
  img: {
    width: "100%"
  }
}));


interface Props {
  video: Video;
}

const Card = (p: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={3}>
      {p.video.info.title}
      <img className={classes.img} src={p.video.info.thumbnail} alt="video thumbnail" />
    </Paper>
  );
};

export default Card;
