import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { componentRender } from 'shared/config/tests/componentRender';

describe('Sidebar', () => {
  test('button must appear', () => {
    componentRender(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('with translation', () => {
    componentRender(<Sidebar />);

    const toggleBtn = screen.getByTestId('sidebar-toggle');
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(sidebar).toHaveClass('collapsed');
  });
});
