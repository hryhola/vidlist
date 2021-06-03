import { FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import React from "react";
import MaskedInput from "react-text-mask";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "Ubuntu Mono",
  },
}));

export const DurationPickerMask = React.forwardRef<HTMLElement>(function TextMaskCustom(props, ref) {
  const setRef = React.useCallback(
    (maskedInputRef: { inputElement: HTMLElement } | null) => {
      const value = maskedInputRef ? maskedInputRef.inputElement : null;

      if (typeof ref === "function") {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    },
    [ref]
  );

  return (
    <MaskedInput {...props} keepCharPositions ref={setRef} mask={[/[0-9]/, /[0-9]/, ":", /[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]} placeholderChar={"_"} showMask />
  );
});

interface Props {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  value?: string;
  name?: string;
  variant?: "standard" | "outlined" | "filled";
  id?: string;
  label?: string;
  inputClass?: string;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  error?: boolean;
  helperText?: string | false;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>
  divRef?: React.MutableRefObject<HTMLDivElement | undefined>
}

const DurationPicker: React.FC<Props> = (p) => {
  const s = useStyles();
  return (
    <FormControl className={classNames(p.className)} variant={p.variant || "standard"} error={p.error}>
      <InputLabel htmlFor={p.id} shrink>
        {p.label}
      </InputLabel>
      <Input
        className={classNames(s.input, p.inputClass)}
        defaultValue="00:00:00"
        value={p.value || "00:00:00"}
        onChange={p.onChange}
        name={p.name}
        id={p.id}
        inputComponent={DurationPickerMask as any}
        ref={p.divRef}
        onBlur={p.onBlur}
        onFocus={p.onFocus}
      />
      {p.helperText && <FormHelperText error={p.error}>{p.helperText}</FormHelperText>}
    </FormControl>
  );
};

export default DurationPicker;
