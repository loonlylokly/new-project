/* eslint-disable react/require-default-props */
import { FC, InputHTMLAttributes, MutableRefObject, useMemo } from 'react';
import { Label } from 'shared/ui';
import { debounce } from 'shared/utils/debounce/debounce';

import styles from './Input.module.css';

type Props = {
  styleClass?: string;
  errors?: string[];
  label?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debounceTime?: number;
  inputStyleClass?: string;
  labelStyleClass?: string;
  errorStyleClass?: string;
  listErrorsStyleClass?: string;
  inputRef?: MutableRefObject<HTMLInputElement> | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  debounceTime = null,
  errorStyleClass = '',
  errors = [],
  handleChange = () => {},
  inputRef = null,
  inputStyleClass = '',
  label = '',
  labelStyleClass = '',
  listErrorsStyleClass = '',
  ...rest
}) => {
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
        ref={inputRef}
        {...rest}
      />
      {errors.length ? (
        <ul className={`${styles.list__errors} ${listErrorsStyleClass}`}>
          {errors.map((error, index) => (
            <li className={`${styles.error} ${errorStyleClass}`} key={index}>
              {error}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
