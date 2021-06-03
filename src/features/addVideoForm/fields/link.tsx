import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField } from "@material-ui/core";
import { isYoutubeLink } from "../../../utils/youtube/link";
import { sliceSelector } from "../selectors";
import { setLink } from "../slice";

import { useStyles } from "./link.styles";

const LinkField: React.FC = () => {
  const classes = useStyles();
  const [isVisLinkError, setIsVisLinkError] = useState(false);

  const dispatch = useDispatch();
  const link = useSelector(sliceSelector).link;

  const handleLinkChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({ target }) => {
    dispatch(setLink(target.value));
  };

  const validateLink = () => {
    if (!(link === "") && !isYoutubeLink(link)) {
      setIsVisLinkError(true);
    } else {
      setIsVisLinkError(false);
    }
  };

  return (
    <TextField
      className={classes.linkField}
      inputProps={{ className: classes.link }}
      value={link}
      onChange={handleLinkChange}
      fullWidth
      label="Ссылка"
      placeholder="https://www.youtube.com/watch?v=????????"
      onBlur={validateLink}
      helperText={isVisLinkError ? "Неверная ссылка" : undefined}
      error={isVisLinkError}
    />
  );
};

export default LinkField;
