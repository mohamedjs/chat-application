import type { Meta, StoryObj } from "@storybook/react"
import { BaseInputOtp } from "../components/master/inputes/base-input-otp"

const meta: Meta<typeof BaseInputOtp> = {
  title: "Components/Form/BaseInputOtp",
  component: BaseInputOtp,
  tags: ["autodocs"],
  args: {
    size: "md",
    variant: "default",
    fullWidth: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the OTP input fields",
    },
    variant: {
      control: "select",
      options: ["default", "error", "success"],
      description: "Visual style variant of the input",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take full width",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    success: {
      control: "text",
      description: "Success message to display",
    },
  },
}

export default meta
type Story = StoryObj<typeof BaseInputOtp>

export const Default: Story = {
  args: {
    size: "md",
    variant: "default",
  },
}

export const Small: Story = {
  args: {
    size: "sm",
    variant: "default",
  },
}

export const Large: Story = {
  args: {
    size: "lg",
    variant: "default",
  },
}

export const Error: Story = {
  args: {
    variant: "error",
    error: "Invalid OTP code",
  },
}

export const Success: Story = {
  args: {
    variant: "success",
    success: "OTP verified successfully",
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
} 