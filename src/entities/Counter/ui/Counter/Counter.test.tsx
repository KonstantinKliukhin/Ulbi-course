import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/config/tests/componentRender';
import { Counter } from './Counter';

describe('Counter', () => {
  test('counter must display state', () => {
    componentRender(<Counter/>, { initialState: { counter: { value: 10, }, }, });
    expect(screen.getByTestId('value-title')).toHaveTextContent('10');
  });

  test('on increment button click value must increase', () => {
    componentRender(<Counter/>, { initialState: { counter: { value: 10, }, }, });
    const incrementBtn = screen.getByTestId('increment-btn');
    void fireEvent.click(incrementBtn);

    expect(screen.getByTestId('value-title')).toHaveTextContent('11');
  });

  test('on decrement button click value must decrement', () => {
    componentRender(<Counter/>, { initialState: { counter: { value: 10, }, }, });
    const decrementBtn = screen.getByTestId('decrement-btn');
    void fireEvent.click(decrementBtn);

    expect(screen.getByTestId('value-title')).toHaveTextContent('9');
  });
});
