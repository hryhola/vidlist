import React from "react";
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody, Typography, makeStyles } from "@material-ui/core";

import { VideoSortBy, VideoWithPosition } from "../../types";

import { getQueueColor, getReadableDuration } from "../../utils/format";
import { getYTLink } from "../../utils/youtube/link";

export const useStyles = makeStyles({
  chanelTitle: {
    fontSize: "10px",
    fontWeight: "bold",
  },
  queue: {
    width: "39px",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 0,
  },
  queueColStyle: {
    width: "39px",
    textAlign: "center",
    padding: 0,
  },
});

interface Props {
  filtredList: VideoWithPosition[];
  setSortBy: (s: VideoSortBy) => void;
  sortBy: VideoSortBy;
}

const VidTable = (p: Props) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell className={classes.queueColStyle}>Q</TableCell>
            <TableCell onClick={() => p.setSortBy(p.sortBy === "order" ? "orderReverse" : "order")}>#</TableCell>
            <TableCell onClick={() => p.setSortBy(p.sortBy === "channel" ? "channelReverse" : "channel")}>Канал</TableCell>
            <TableCell>Название</TableCell>
            <TableCell onClick={() => p.setSortBy(p.sortBy === "watchTime" ? "watchTimeReverse" : "watchTime")}>Время просмотра</TableCell>
            <TableCell onClick={() => p.setSortBy(p.sortBy === "duration" ? "durationReverse" : "duration")}>Длительность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {p.filtredList.map((v) => (
            <TableRow key={`${v.queue}-${v.youtubeId}`}>
              <TableCell className={classes.queue} style={{ background: getQueueColor(v.queue) }}>
                {v.queue}
              </TableCell>
              <TableCell>{v.absolutePosition}</TableCell>
              <TableCell>
                <Typography variant="overline" className={classes.chanelTitle}>
                  {v.info.channelTitle}
                </Typography>
              </TableCell>
              <TableCell>
                <a href={getYTLink(v.youtubeId)} target="_blank" rel="noreferrer">
                  {v.info.title}
                </a>
              </TableCell>
              <TableCell>{v.watchTime === v.info.duration ? "Полностью" : getReadableDuration(v.watchTime)}</TableCell>
              <TableCell>{getReadableDuration(v.info.duration)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VidTable;
