import { forwardRef, InputHTMLAttributes, useMemo } from 'react';
import { Label } from 'shared/ui';
import { debounce } from 'shared/utils/debounce/debounce';

import styles from './Input.module.css';

type Props = {
  styleClass?: string;
  error?: string;
  label?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debounceTime?: number;
  inputStyleClass?: string;
  labelStyleClass?: string;
  errorStyleClass?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      debounceTime = null,
      error = '',
      errorStyleClass = '',
      handleChange = () => {},
      inputStyleClass = '',
      label = '',
      labelStyleClass = '',
      ...rest
    },
    ref
  ) => {
    const debounceHandleChange = useMemo(() => {
      if (debounceTime) {
        return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
        }, debounceTime);
      }
      return null;
    }, [debounceTime, handleChange]);

    return (
      <>
        <Label className={`${styles.label} ${labelStyleClass}`} htmlFor={label}>
          {label}
        </Label>
        <input
          name={label}
          className={`${styles.input} ${inputStyleClass}`}
          onChange={() => (debounceTime ? debounceHandleChange : handleChange)}
          ref={ref}
          {...rest}
        />
        {!!error.length ? (
          <span className={`${styles.error} ${errorStyleClass}`}>{error}</span>
        ) : null}
      </>
    );
  }
);
