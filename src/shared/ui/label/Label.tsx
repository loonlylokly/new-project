import { forwardRef } from 'react';

type Props = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, Props>(
  (props, forwardedRef) => <label {...props} ref={forwardedRef} />
);
