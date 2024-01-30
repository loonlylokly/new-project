import { forwardRef } from 'react';

type Props = {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, Props>(
  ({ children, ...props }, ref) => (
    <label {...props} ref={ref}>
      {children}
    </label>
  )
);
