import type { Meta, StoryObj } from "@storybook/react";
import BasicSelect from "@/components/master/inputes/BasicSelect";
import { Mail, User, Globe, Building, Flag } from "lucide-react";
import { Option } from "@/components/master/inputes/BasicSelect";

const countries: Option[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
];

const roles: Option[] = [
  { value: 'admin', label: 'Administrator', icon: '👑' },
  { value: 'user', label: 'Regular User', icon: '👤' },
  { value: 'editor', label: 'Content Editor', icon: '✍️' },
  { value: 'viewer', label: 'Viewer', icon: '👀' },
];

const departments: Option[] = [
  { value: 'eng', label: 'Engineering', additionalInfo: '(Technical)' },
  { value: 'sales', label: 'Sales', additionalInfo: '(Business)' },
  { value: 'marketing', label: 'Marketing', additionalInfo: '(Creative)' },
  { value: 'hr', label: 'Human Resources', additionalInfo: '(Management)' },
];

const meta: Meta<typeof BasicSelect> = {
  title: "Components/Form/BasicSelect",
  component: BasicSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "The size of the select",
      defaultValue: "default",
    },
    options: {
      control: "object",
      description: "Array of options for the select",
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
      description: "Label text for the select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the select should take full width",
    },
    value: {
      control: "text",
      description: "Selected value",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasicSelect>;

// Base select
export const Default: Story = {
  args: {
    placeholder: "Select an option",
    options: countries,
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small select",
    options: countries,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large select",
    options: countries,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: "Select country",
    placeholder: "Choose your country",
    options: countries,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    label: "User Role",
    placeholder: "Select role",
    options: roles,
  },
};

// With additional info
export const WithAdditionalInfo: Story = {
  args: {
    label: "Department",
    placeholder: "Select department",
    options: departments,
  },
};

// States
export const WithError: Story = {
  args: {
    error: "Please select a country",
    placeholder: "Select country",
    label: "Country",
    options: countries,
  },
};

export const WithSuccess: Story = {
  args: {
    success: "Valid country selected",
    placeholder: "Select country",
    label: "Country",
    options: countries,
    value: "us",
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: "Full width select",
    label: "Full width",
    options: countries,
  },
  parameters: {
    layout: "padded",
  },
};

// Complex examples
export const CountrySelector: Story = {
  args: {
    label: "Country",
    placeholder: "Select your country",
    options: countries,
    size: "lg",
    fullWidth: true,
  },
  parameters: {
    layout: "padded",
  },
};

export const RoleSelector: Story = {
  args: {
    label: "Role",
    placeholder: "Select user role",
    options: roles,
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
      <BasicSelect 
        size="sm" 
        placeholder="Small select" 
        label="Small" 
        options={countries}
      />
      <BasicSelect 
        size="default" 
        placeholder="Default select" 
        label="Default"
        options={countries}
      />
      <BasicSelect 
        size="lg" 
        placeholder="Large select" 
        label="Large"
        options={countries}
      />
    </div>
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BasicSelect 
        placeholder="Default state" 
        label="Default"
        options={countries}
      />
      <BasicSelect 
        placeholder="Error state" 
        label="Error"
        error="Please select a country"
        options={countries}
      />
      <BasicSelect 
        placeholder="Success state" 
        label="Success"
        success="Valid selection"
        options={countries}
        value="us"
      />
    </div>
  ),
};

// Different option types showcase
export const OptionTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <BasicSelect 
        placeholder="Countries with flags" 
        label="Countries"
        options={countries}
        size="lg"
      />
      <BasicSelect 
        placeholder="Roles with emojis" 
        label="Roles"
        options={roles}
        size="lg"
      />
      <BasicSelect 
        placeholder="Departments with info" 
        label="Departments"
        options={departments}
        size="lg"
      />
    </div>
  ),
};
