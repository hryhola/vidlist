import { Typography, ButtonGroup, Button, TextField, TextFieldProps } from "@material-ui/core";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentVideoQueuesSelector } from "../../videolist/selectors";
import { useStyles } from "./queue.styles";

import { validNumerField, validPositiveNumber } from "../../../utils/format"
import { setQueue } from "../slice";
import { sliceSelector } from "../selectors";

interface Props {}

const QueueField = (p: Props) => {
  const classes = useStyles();

  const dispatch = useDispatch()
  const [isHoverQueue, setIsHoverQueue] = useState(false);
  const [queryIndexStart, setQueryIndexStart] = useState(0);
  const [queueField, setQueueField] = useState("");
  const [isVisibleNewQueueField, setIsVisibleNewQueueField] = useState(false);
  const [isVisibleError, setIsVisibleError] = useState(false);

  const queues = useSelector(currentVideoQueuesSelector);
  const slicedQueues = queues.slice(queryIndexStart, queryIndexStart + 6);


  const { queue } = useSelector(sliceSelector);

  const newQueueRef = useRef<HTMLInputElement>();
  const newQueueWideRef = useRef<HTMLInputElement>();

  const handleShiftQueueIndexLeft = () => {
    if (queryIndexStart > 0) {
      setQueryIndexStart(queryIndexStart - 1);
    }
  };

  const handleShiftQueueIndexRight = () => {
    if (queryIndexStart + 6 < queues.length) {
      setQueryIndexStart(queryIndexStart + 1);
    }
  };

  const handleQueueChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({ target }) => {
    validNumerField(target.value) && setQueueField(target.value);
    if (validPositiveNumber(target.value)) {
      dispatch(setQueue(+target.value));
      setIsVisibleError(false);
    } else {
      dispatch(setQueue(undefined));
    }
  };

  const onBlur = () => {
    if(!queue) {
      setIsVisibleError(true);
      return;
    }
    if(queueField === "" || queues.includes(queue!)) setIsVisibleNewQueueField(false);
  }

  useEffect(() => {
    if (!isVisibleNewQueueField) return;
    newQueueWideRef.current?.focus();
    if (queues.length > 6) {
    } else {
      newQueueRef.current?.focus();
    }
  }, [isVisibleNewQueueField, queues]);

  useEffect(() => {
    dispatch(setQueue(queues[0]))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queues]);

  const newQueueFieldProps: TextFieldProps = {
    inputRef: newQueueWideRef,
    className: classes.newQueueField,
    size: "small",
    onChange: handleQueueChange,
    value: queueField,
    error: isVisibleError,
  };

  return (
    <>
      <Typography className={classNames(classes.newQueueLabel, { [classes.newQueueLabelActive]: isHoverQueue })} display="block">
        Очередь
      </Typography>
      <div
        className={classNames({ [classes.stretch]: queues.length < 6 })}
        onFocus={() => setIsHoverQueue(true)}
        onBlur={() => {setIsHoverQueue(false); onBlur(); }}
        onMouseOver={() => setIsHoverQueue(true)}
        onMouseOut={() => setIsHoverQueue(false)}
      >
        <ButtonGroup color="primary" size="small" fullWidth={queues.length >= 6}>
          {queues.length >= 7 && (
            <Button disabled={slicedQueues[0] === queues[0]} onClick={handleShiftQueueIndexLeft}>
              {"<<"}
            </Button>
          )}
          {slicedQueues.map((v) => (
            <Button
              key={v}
              className={classes.queueBtn}
              variant={queue === v ? "contained" : undefined}
              onClick={() => {
                dispatch(setQueue(v));
                setIsVisibleNewQueueField(false);
              }}
            >
              {v}
            </Button>
          ))}
          {queues.length >= 7 && (
            <Button disabled={slicedQueues[slicedQueues.length - 1] === queues[queues.length - 1]} onClick={handleShiftQueueIndexRight}>
              {">>"}
            </Button>
          )}
          {isVisibleNewQueueField
            ? queues.length >= 6 && (
                <TextField {...newQueueFieldProps}/>
              )
            : queues.length >= 6 && (
                <Button className={classes.newQueueBtn} color="default" variant="outlined" onClick={() => setIsVisibleNewQueueField(true)}>
                  Другая
                </Button>
              )}
        </ButtonGroup>
        {queues.length < 6 && (
          <div className={classes.newQueueML}>
            {isVisibleNewQueueField ? (
              <TextField
                {...newQueueFieldProps}
                variant="outlined"
                
              />
            ) : (
              <Button className={classes.newQueueBtn} color="default" variant="outlined" onClick={() => setIsVisibleNewQueueField(true)}>
                Другая
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default QueueField;
