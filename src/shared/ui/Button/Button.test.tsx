import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  test('button must appear', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('button must have class of provided theme', () => {
    render(<Button theme="clear">TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
  });
});
