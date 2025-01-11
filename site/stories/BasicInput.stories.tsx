import type { Meta, StoryObj } from "@storybook/react";
import BasicInput from "@/components/master/inputes/BasicInput";
import { Mail, User, Lock, Search, ArrowRight } from "lucide-react";

const meta: Meta<typeof BasicInput> = {
  title: "Components/Form/BasicInput",
  component: BasicInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the input",
      defaultValue: "default",
    },
    icon: {
      control: "select",
      options: ["none", "mail", "user", "lock", "search", "arrow"],
      mapping: {
        none: undefined,
        mail: <Mail className="h-4 w-4" />,
        user: <User className="h-4 w-4" />,
        lock: <Lock className="h-4 w-4" />,
        search: <Search className="h-4 w-4" />,
        arrow: <ArrowRight className="h-4 w-4" />,
      },
      description: "Icon to display in the input",
    },
    iconPosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the icon",
      defaultValue: "left",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    success: {
      control: "text",
      description: "Success message to display",
    },
    label: {
      control: "text",
      description: "Label text for the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasicInput>;

// Base input
export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: "Email address",
    placeholder: "Enter your email",
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    icon: <Mail className="h-4 w-4" />,
    iconPosition: "left",
    placeholder: "Enter your email",
    label: "Email",
  },
};

export const WithRightIcon: Story = {
  args: {
    icon: <ArrowRight className="h-4 w-4" />,
    iconPosition: "right",
    placeholder: "Enter your email",
    label: "Email",
  },
};

// States
export const WithError: Story = {
  args: {
    error: "This field is required",
    placeholder: "Enter text...",
    label: "Username",
    icon: <User className="h-4 w-4" />,
  },
};

export const WithSuccess: Story = {
  args: {
    success: "Username is available",
    placeholder: "Enter username",
    label: "Username",
    icon: <User className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    label: "Disabled field",
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "Full width input",
    label: "Full width",
  },
  parameters: {
    layout: "padded",
  },
};

// Complex example
export const SearchExample: Story = {
  args: {
    label: "Search users",
    placeholder: "Enter username or email",
    icon: <Search className="h-4 w-4" />,
    iconPosition: "left",
    size: "lg",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const SubmitExample: Story = {
  args: {
    label: "Enter code",
    placeholder: "Enter verification code",
    icon: <ArrowRight className="h-4 w-4" />,
    iconPosition: "right",
    size: "lg",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BasicInput 
        size="sm" 
        placeholder="Small input" 
        label="Small" 
        icon={<Mail className="h-4 w-4" />}
      />
      <BasicInput 
        size="default" 
        placeholder="Default input" 
        label="Default"
        icon={<Mail className="h-4 w-4" />}
      />
      <BasicInput 
        size="lg" 
        placeholder="Large input" 
        label="Large"
        icon={<Mail className="h-4 w-4" />}
      />
    </div>
  ),
};

// Icon positions showcase
export const IconPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BasicInput 
        placeholder="Left icon (default)" 
        label="Left icon"
        icon={<Mail className="h-4 w-4" />}
        iconPosition="left"
      />
      <BasicInput 
        placeholder="Right icon" 
        label="Right icon"
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
      />
      <BasicInput 
        placeholder="Search with left icon" 
        label="Search"
        icon={<Search className="h-4 w-4" />}
        iconPosition="left"
        size="lg"
      />
      <BasicInput 
        placeholder="Submit with right icon" 
        label="Submit"
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
        size="lg"
      />
    </div>
  ),
};
