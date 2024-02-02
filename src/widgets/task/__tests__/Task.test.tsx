import { screen } from '@testing-library/react';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { describe, expect, it } from 'vitest';
import { Task } from 'widgets/task/Task';

describe('Task Widget', () => {
  it('should render TaskWidget', () => {
    const router = createTestRouter(Task);
    renderComponent(router);
    expect(screen.findByText('There is no such task')).toBeTruthy();
  });
});
