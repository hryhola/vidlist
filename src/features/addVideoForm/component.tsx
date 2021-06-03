import React from "react";
import classNames from "classnames";

import { Button, Paper } from "@material-ui/core";

import CloseBtn from "../../ui/closeBtn";

import { useStyles } from "./styles";

import DonateAndTimeField from "./fields/donateAndTime";
import QueueField from "./fields/queue";

import LinkField from "./fields/link";
import WatchTimeStartField from "./fields/watchTimeStart";

interface Props {
  className?: string;
}

const AddVideoForm = (p: Props) => {
  const s = useStyles();

  return (
    <div className={classNames(p.className)}>
      <div className={s.closeContainer}>
        <CloseBtn color="secondary" className={s.closeBtn} size="small" />
      </div>
      <form noValidate autoComplete="off">
        <Paper className={s.paper}>
          <LinkField />
          <QueueField />
          <DonateAndTimeField />
          <WatchTimeStartField />
          <Button className={s.addBtn} variant="contained" color="primary">
            Добавить
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default AddVideoForm;
