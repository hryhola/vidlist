import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  newQueueBtn: {
    minWidth: "100px",
    height: "40px",
  },
  newQueueField: {
    minWidth: "100px",
    maxWidth: "100px",
    height: "40px",
  },
  newQueueBtnFull: {
    minWidth: "100%",
    width: "100%",
    marginTop: spacing(1),
  },
  queueBtn: {
    height: "40px",
  },
  stretch: {
    display: "flex",
    justifyContent: "start",
  },
  newQueueML: {
    marginLeft: spacing(1),
  },
  newQueueLabel: {
    marginBottom: spacing(0.5),
    fontSize: "12px",
    color: "rgba(0, 0, 0, 0.54)",
    transition: "100ms",
  },
  newQueueLabelActive: {
    color: palette.primary.main,
  },
}));
