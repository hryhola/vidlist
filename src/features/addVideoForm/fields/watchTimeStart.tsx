import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DurationPicker from "../../../ui/durationPicker";
import { sliceSelector } from "../selectors";
import { setWatchTimeStart } from "../slice";
import { useStyles } from "./watchTimeStart.styles";
import { validHMS } from "../../../utils/format"

const WatchTimeStartField: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { watchTimeStart } = useSelector(sliceSelector);

  const [isVisiberError, setIsVisiberError] = useState(false);

  const div = useRef<HTMLDivElement>();
  
  const handleBlur = () => {
    if(!validHMS(watchTimeStart)) setIsVisiberError(true);
  }

  return (
    <DurationPicker
      className={classes.watchTimeStart}
      inputClass={classes.watchTimeStartInput}
      label="Начало просмотра с"
      value={watchTimeStart}
      onChange={({ target }) => { dispatch(setWatchTimeStart(target.value)); setIsVisiberError(false) }}
      onBlur={handleBlur}
      error={isVisiberError}
      helperText={isVisiberError && "Неверная временная метка"}
      divRef={div}
      onFocus={() => (div.current?.children[0] as HTMLInputElement).select()}
    />
  );
};

export default WatchTimeStartField;
