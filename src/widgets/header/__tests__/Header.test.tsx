import { screen } from '@testing-library/react';
import { createTestRouter, renderComponent } from 'shared/mocks/TestRoute';
import { describe, expect, it } from 'vitest';
import Header from 'widgets/header/Header';

const router = createTestRouter(Header);

describe('Header', () => {
  it('should render Header', () => {
    renderComponent(router);
    expect(screen.findByText('Toodo')).toBeTruthy();
  });
});
