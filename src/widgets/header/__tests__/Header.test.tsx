import { screen, waitFor } from '@testing-library/react';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { describe, expect, it } from 'vitest';
import Header from 'widgets/header/Header';

const router = createTestRouter(Header);

describe('Header', () => {
  it('should render Header', async () => {
    renderComponent(router);
    await waitFor(() => expect(screen.queryByText('Toodo')).toBeTruthy());
  });
});
