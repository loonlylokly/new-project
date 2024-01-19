/* eslint-disable react/require-default-props */
import { forwardRef } from 'react';

import styles from './Button.module.css';

type Props = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'lg';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className = '', size = 'md', variant = 'primary', ...props }, ref) => (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      ref={ref}
      {...props}
    />
  )
);
