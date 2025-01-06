import React from 'react';
import { render, screen } from '@testing-library/react';
import BasicHeader from './BasicHeader';

describe('BasicHeader', () => {
  it('renders title correctly', () => {
    render(<BasicHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<BasicHeader title="Test Title" subtitle="Test Subtitle" />);
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle when not provided', () => {
    render(<BasicHeader title="Test Title" />);
    expect(screen.queryByText('Test Subtitle')).not.toBeInTheDocument();
  });

  it('applies dark theme classes by default', () => {
    render(<BasicHeader title="Test Title" />);
    const heading = screen.getByText('Test Title');
    expect(heading.className).toContain('text-white');
  });

  it('applies light theme classes when isDarkTheme is false', () => {
    render(<BasicHeader title="Test Title" isDarkTheme={false} />);
    const heading = screen.getByText('Test Title');
    expect(heading.className).toContain('text-black');
  });

  it('renders correct heading level', () => {
    render(<BasicHeader title="Test Title" level={2} />);
    const heading = screen.getByText('Test Title');
    expect(heading.tagName.toLowerCase()).toBe('h2');
  });

  it('applies custom class names correctly', () => {
    render(
      <BasicHeader
        title="Test Title"
        className="custom-class"
        titleClassName="title-class"
        subtitle="Test Subtitle"
        subtitleClassName="subtitle-class"
      />
    );
    
    const container = screen.getByText('Test Title').parentElement;
    const title = screen.getByText('Test Title');
    const subtitle = screen.getByText('Test Subtitle');
    
    expect(container?.className).toContain('custom-class');
    expect(title.className).toContain('title-class');
    expect(subtitle.className).toContain('subtitle-class');
  });
});
