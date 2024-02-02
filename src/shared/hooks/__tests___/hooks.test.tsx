import { renderHook } from '@testing-library/react';
import { useFetchTasks } from 'shared/hooks/useFetchTasks';
import {
  createTestRouter,
  returnComponentWithRoute,
} from 'shared/mocks/TestRoute';
import { describe, it } from 'vitest';

describe('Hooks', () => {
  it.todo('should render useFetchTask', async () => {
    const createWrapper = () => {
      const router = createTestRouter(() => <></>);
      return () => returnComponentWithRoute(router);
    };

    const { result } = renderHook(() => useFetchTasks(''), {
      wrapper: createWrapper(),
    });
    console.log(result);
    // expect(result.current.isError).toEqual(false);
  });
});
