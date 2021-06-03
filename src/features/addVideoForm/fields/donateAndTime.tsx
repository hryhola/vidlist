import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { TextField } from "@material-ui/core";
import { calcWatchTime } from "../../../utils/queue";
import { useDispatch, useSelector } from "react-redux";
import { setDonateSum, setWatchTime } from "../slice";
import { sliceSelector } from "../selectors";
import { useStyles } from "./donateAndTime.styles";
import { getReadableDuration, validNumerField, validPositiveNumber } from "../../../utils/format";
import NumberFormatCustom from "../../../ui/moneyFormat";

const DonateAndTimeField: React.FC = () => {
  const s = useStyles();

  const dispatch = useDispatch();
  const { queue, donateSum, watchTime } = useSelector(sliceSelector);

  const [donateSumField, setDonateSumField] = useState("")
  const [isVisibleError, setIsVisibleError] = useState(false);

  useEffect(() => {
    if (donateSum && typeof queue === "number") {
      dispatch(setWatchTime(calcWatchTime({
        money: +donateSum,
        queueNumber: queue,
      })));
    } else {
      dispatch(setWatchTime(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donateSum, queue]);

  const onDonateSumChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({ target }) => {
   validNumerField(target.value) && !(target.value === "-") && setDonateSumField(target.value);
    if(validPositiveNumber(target.value)) {
      dispatch(setDonateSum(+target.value));
      setIsVisibleError(false);
    } else {
      dispatch(setDonateSum(undefined));
    }
  };

  const handleBlur = () => {
    if (!donateSum && donateSumField !== "") setIsVisibleError(true)
  }

  return (
    <div className={classNames(s.doateTimeBlock)}>
      <TextField
        fullWidth
        InputProps={{
          inputComponent: NumberFormatCustom as any,
        }}
        label="Сума доната"
        value={donateSumField}
        onChange={onDonateSumChange}
        onBlur={handleBlur}
        error={isVisibleError}
        helperText={isVisibleError && "Некорректная сумма"}
      />
      <TextField
        className={s.watchTime}
        fullWidth
        label="Время просмотра"
        defaultValue={watchTime}
        value={watchTime ? getReadableDuration(watchTime, "long") : ""}
        inputProps={{ readOnly: true }}
        InputLabelProps={{
          shrink: !!watchTime,
        }}
      />
    </div>
  );
};

export default DonateAndTimeField;
