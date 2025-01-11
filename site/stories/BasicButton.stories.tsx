import type { Meta, StoryObj } from '@storybook/react';
import BasicButton from '../components/master/buttons/BasicButton';
import { Mail, ArrowRight } from 'lucide-react';

const meta: Meta<typeof BasicButton> = {
  title: 'Components/Buttons/BasicButton',
  component: BasicButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasicButton>;

// Base button variations
export const Default: Story = {
  args: {
    children: 'Default Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

// Size variations
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Default_Size: Story = {
  args: {
    children: 'Default Size Button',
    size: 'default',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// State variations
export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Icon variations
export const WithLeftIcon: Story = {
  args: {
    children: 'Email Sign In',
    icon: <Mail className="h-4 w-4" />,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Next Step',
    icon: <ArrowRight className="h-4 w-4" />,
    iconPosition: 'right',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
};
