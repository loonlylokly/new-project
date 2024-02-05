import { fireEvent, screen } from '@testing-library/react';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { describe, expect, it } from 'vitest';
import { AddTask } from 'widgets/addTask/AddTask';

describe('AddTask', () => {
  it('should render AddTask', () => {
    const router = createTestRouter(AddTask);
    renderComponent(router);
    expect(screen.findByText('Add Task')).toBeTruthy();
  });

  it('should open dialog', () => {
    const router = createTestRouter(AddTask);
    renderComponent(router);
    fireEvent.click(screen.getByText('Add Task'));
    expect(screen.getByRole('dialog')).toHaveProperty('open');
  });
});
