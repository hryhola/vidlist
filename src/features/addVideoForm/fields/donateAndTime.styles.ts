import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing }) => ({
  watchTime: {
    width: "470px",
  },
  doateTimeBlock: {
    marginTop: spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
}));
