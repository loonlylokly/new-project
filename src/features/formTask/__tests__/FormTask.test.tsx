import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormTask } from 'features/formTask/FormTask';
import { TFormTask } from 'types/task';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('FormTask', () => {
  afterEach(cleanup);
  it('should render FormTask', () => {
    render(
      <FormTask
        taskCurrent={{ datetime: '', text: '' }}
        btnConfirmText={'ConfirmTest'}
      />
    );
    expect(screen.getByText('ConfirmTest')).toBeTruthy();
  });

  it('should submit form', async () => {
    const testConfirm = vi
      .fn()
      .mockImplementation((newTask?: TFormTask) => newTask);
    render(
      <FormTask
        taskCurrent={{ datetime: '', text: '' }}
        btnConfirmText={'ConfirmTest'}
        actionConfirm={testConfirm}
      />
    );
    await userEvent.setup().type(screen.getByTestId('Text Task'), 'TestTask 1');

    await userEvent
      .setup()
      .type(screen.getByTestId('Datetime Task'), '2024-01-01T13:13');

    await userEvent.setup().click(screen.getByText('ConfirmTest'));
    expect(testConfirm).toHaveBeenCalledTimes(1);
    expect(testConfirm).toHaveReturnedWith({
      datetime: '2024-01-01T13:13',
      text: 'TestTask 1',
    });
  });
});
