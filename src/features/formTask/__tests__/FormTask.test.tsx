import { render, screen } from '@testing-library/react';
import { FormTask } from 'features/formTask/FormTask';
import { describe, expect, it } from 'vitest';

describe('FormTask', () => {
  it('should render FormTask', () => {
    render(
      <FormTask
        taskCurrent={{ datetime: '', text: '' }}
        btnConfirmText={'ConfitmTest'}
      />
    );
    expect(screen.getByText('ConfitmTest')).toBeTruthy();
  });
});
