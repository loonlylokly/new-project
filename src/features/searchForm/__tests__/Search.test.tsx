import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { SearchForm } from 'features/searchForm/SearchForm';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Search', () => {
  afterEach(cleanup);
  it('should render Search form', () => {
    render(<SearchForm setSearch={() => {}} />);
    expect(screen.getByLabelText('Search')).toBeTruthy();
  });

  it('should call onChange', async () => {
    const setSearch = vi.fn();
    render(<SearchForm setSearch={setSearch} />);
    fireEvent.change(screen.getByPlaceholderText('MyTask 1'), {
      target: { value: 'Task 1' },
    });
    await waitFor(() => expect(setSearch).toHaveBeenCalledTimes(1));
  });
});
