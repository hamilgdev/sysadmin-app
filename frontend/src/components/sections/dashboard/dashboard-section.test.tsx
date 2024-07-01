import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { DashboardSection } from './dashboard-section';

describe('DashboardSection', () => {
  it('should render', () => {
    render(<DashboardSection />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
