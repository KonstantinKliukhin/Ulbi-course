import { fireEvent, render, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/ui/Sidebar/Sidebar';
import { renderWithTranslation } from 'shared/lib';

describe('Sidebar', () => {
  test('button must appear', () => {
    render(<Sidebar/>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('with translation', () => {
    renderWithTranslation(<Sidebar/>);

    const toggleBtn = screen.getByTestId('sidebar-toggle');
    const sidebar = screen.getByTestId('sidebar');
    expect(sidebar).toBeInTheDocument();
    fireEvent.click(toggleBtn);
    expect(sidebar).toHaveClass('collapsed');
  });
});
