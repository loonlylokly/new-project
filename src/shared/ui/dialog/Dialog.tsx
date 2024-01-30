import { forwardRef } from 'react';

import styles from './Dialog.module.css';

type Props = {
  children?: React.ReactNode;
  className?: string;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, className, ...props }, ref) => (
    <dialog className={`${styles.dialog} ${className}`} {...props} ref={ref}>
      {children}
    </dialog>
  )
);
