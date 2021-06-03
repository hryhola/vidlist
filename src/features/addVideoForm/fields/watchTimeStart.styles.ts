import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({ spacing }) => ({
  watchTimeStart: {
    marginTop: spacing(2),
    display: "block",
  },
  watchTimeStartInput: {
    width: "201px",
  },
}));
