import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Input } from 'shared/ui';
import { TFormTask } from 'types/task';

type Props = {
  errors: FieldErrors<TFormTask>;
  registore: UseFormRegister<TFormTask>;
};

export function FieldsFormTask({ errors, registore }: Props) {
  return (
    <>
      <Input
        data-testid="Text Task"
        type="text"
        label="Text Task"
        error={errors.text?.message}
        {...registore('text')}
      />
      <Input
        data-testid="Datetime Task"
        type="datetime-local"
        label="Datetime Task"
        error={errors.datetime?.message}
        {...registore('datetime')}
      />
    </>
  );
}
