import type { Meta, StoryObj } from '@storybook/react';
import BasicHeader from './BasicHeader';

const meta: Meta<typeof BasicHeader> = {
  title: 'Components/Layout/BasicHeader',
  component: BasicHeader,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading level (h1-h6)'
    },
    isDarkTheme: {
      control: 'boolean',
      description: 'Toggle between dark and light theme'
    },
    title: {
      control: 'text',
      description: 'Main heading text'
    },
    subtitle: {
      control: 'text',
      description: 'Optional subheading text'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the container'
    },
    titleClassName: {
      control: 'text',
      description: 'Additional CSS classes for the title'
    },
    subtitleClassName: {
      control: 'text',
      description: 'Additional CSS classes for the subtitle'
    }
  }
};

export default meta;
type Story = StoryObj<typeof BasicHeader>;

// Default story
export const Default: Story = {
  args: {
    title: 'Welcome to Our App',
    subtitle: 'Start your journey here',
    isDarkTheme: true,
    level: 1
  }
};

// Light theme variant
export const LightTheme: Story = {
  args: {
    title: 'Light Theme Header',
    subtitle: 'This is how it looks in light mode',
    isDarkTheme: false,
    level: 1
  }
};

// Different heading levels
export const SecondaryHeading: Story = {
  args: {
    title: 'Secondary Heading',
    subtitle: 'Using h2 element',
    level: 2,
    isDarkTheme: true
  }
};

// Without subtitle
export const NoSubtitle: Story = {
  args: {
    title: 'Header Without Subtitle',
    isDarkTheme: true,
    level: 1
  }
};

// With custom classes
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Header',
    subtitle: 'With custom classes',
    titleClassName: 'text-3xl text-blue-500',
    subtitleClassName: 'italic text-blue-300',
    isDarkTheme: true,
    level: 1
  }
};
