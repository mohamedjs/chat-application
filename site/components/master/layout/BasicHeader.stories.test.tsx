import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './BasicHeader.stories';

// Compile all stories for this component
const { Default, LightTheme, SecondaryHeading, NoSubtitle, CustomStyling } = composeStories(stories);

describe('BasicHeader Stories', () => {
  it('renders Default story', () => {
    render(<Default />);
    expect(screen.getByText('Welcome to Our App')).toBeInTheDocument();
    expect(screen.getByText('Start your journey here')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders LightTheme story', () => {
    render(<LightTheme />);
    const heading = screen.getByText('Light Theme Header');
    expect(heading).toBeInTheDocument();
    expect(heading.className).toContain('text-black');
    expect(screen.getByText('This is how it looks in light mode')).toBeInTheDocument();
  });

  it('renders SecondaryHeading story', () => {
    render(<SecondaryHeading />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('Secondary Heading')).toBeInTheDocument();
    expect(screen.getByText('Using h2 element')).toBeInTheDocument();
  });

  it('renders NoSubtitle story', () => {
    render(<NoSubtitle />);
    expect(screen.getByText('Header Without Subtitle')).toBeInTheDocument();
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });

  it('renders CustomStyling story', () => {
    render(<CustomStyling />);
    const heading = screen.getByText('Custom Styled Header');
    const subtitle = screen.getByText('With custom classes');
    
    expect(heading.className).toContain('text-3xl');
    expect(heading.className).toContain('text-blue-500');
    expect(subtitle.className).toContain('italic');
    expect(subtitle.className).toContain('text-blue-300');
  });
});
