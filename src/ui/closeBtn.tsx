import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { Fab, makeStyles } from "@material-ui/core";
import classNames from "classnames";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  small: {
    width: "14px",
    height: "14px",
  },
  smallBtn: {
    width: "28px!important",
    height: "28px!important",
    minWidth: "28px!important",
    minHeight: "28px!important",
  },
}));

interface Props {
  className?: string;
  color: 'inherit' | 'primary' | 'secondary' | 'default',
  size?: "small"
}

const CloseBtn = (props: Props) => {
  const s = useStyles();
  return (
    <div className={classNames(props.className)}>
      <Fab  className={classNames({ [s.smallBtn]: props.size === "small"})} size="small" color={props.color} aria-label="close">
        <CloseIcon className={classNames({ [s.small]: props.size === "small"})} />
      </Fab>
    </div>
  );
};

export default CloseBtn;
