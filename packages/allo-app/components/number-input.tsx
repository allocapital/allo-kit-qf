import {
  forwardRef,
  type ComponentPropsWithRef,
  type PropsWithChildren,
} from "react";
import { NumericFormat } from "react-number-format";

import { Input } from "~/components/ui/input";

export const NumberInput = forwardRef(function NumberInput(
  {
    name,
    children,
    onBlur,
    onChange,
    ...props
  }: PropsWithChildren & ComponentPropsWithRef<typeof NumericFormat>,
  ref
) {
  return (
    <NumericFormat
      aria-label="number-input"
      type="tel"
      ref={ref}
      {...props}
      customInput={Input}
      name={name}
      autoComplete="off"
      disabled={props.disabled}
      onBlur={onBlur}
      thousandSeparator=","
    >
      {children}
    </NumericFormat>
  );
});
