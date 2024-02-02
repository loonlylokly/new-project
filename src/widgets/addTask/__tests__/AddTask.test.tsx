import { screen } from '@testing-library/react';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { describe, expect, it } from 'vitest';
import { AddTask } from 'widgets/addTask/AddTask';

describe('AddTask', () => {
  it('should render AddTask', () => {
    const router = createTestRouter(AddTask);
    renderComponent(router);
    expect(screen.findByText('Add Task')).toBeTruthy();
  });
});
